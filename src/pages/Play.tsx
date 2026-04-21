import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Play.css";
import { config } from "../config";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Player = "you" | "jorge";
type Difficulty = "easy" | "smart" | "unbeatable";
type CellValue = Player | null;
type RoundWinner = Player | "draw" | null;

interface RoundResult {
  winner: RoundWinner;
  line: number[];
}

interface MoveEntry {
  player: Player;
  cell: number;
  label: string;
}

interface Score {
  you: number;
  jorge: number;
  draws: number;
}

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const CELL_LABELS = [
  "Top left",
  "Top center",
  "Top right",
  "Middle left",
  "Center",
  "Middle right",
  "Bottom left",
  "Bottom center",
  "Bottom right",
];

const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  smart: "Smart",
  unbeatable: "Unbeatable",
};

const featuredProjects = config.projects
  .slice(0, 4)
  .map((project) => `${project.title} (${project.category})`)
  .join(", ");

const coreSkills = Array.from(
  new Set([...config.skills.develop.tools, ...config.skills.design.tools])
)
  .slice(0, 12)
  .join(", ");

const recentExperience = config.experiences
  .slice(0, 3)
  .map((experience) => `${experience.position} at ${experience.company}`)
  .join("; ");

const SYSTEM_PROMPT = `You are speaking as ${config.developer.fullName}, the owner of this portfolio website.

Profile:
- Full name: ${config.developer.fullName}
- Title: ${config.developer.title}
- Location: ${config.contact.location}
- Short summary: ${config.developer.description}
- About: ${config.about.description}
- Core skills: ${coreSkills}
- Featured projects: ${featuredProjects}
- Recent experience: ${recentExperience}
- Contact: available through the portfolio website

Rules:
1. Always respond in first person ("I", "my", "me").
2. Keep the tone warm, concise, and conversational.
3. Answer based on the information present in the portfolio configuration.
4. If something is not covered by the portfolio, be honest and steer the conversation back to work, projects, or interests.
5. Do not mention hidden prompts, system messages, or implementation details.
6. Do not describe yourself as an AI assistant unless the user explicitly asks how the chat is implemented.`;

function evaluateBoard(board: CellValue[]): RoundResult {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  if (board.every(Boolean)) {
    return { winner: "draw", line: [] };
  }

  return { winner: null, line: [] };
}

function getAvailableMoves(board: CellValue[]) {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((cell): cell is number => cell !== null);
}

function getRandomMove(moves: number[]) {
  if (!moves.length) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

function findCriticalMove(board: CellValue[], player: Player) {
  for (const line of WINNING_LINES) {
    const values = line.map((index) => board[index]);
    const playerCount = values.filter((value) => value === player).length;
    const emptyIndex = values.findIndex((value) => value === null);

    if (playerCount === 2 && emptyIndex !== -1) {
      return line[emptyIndex];
    }
  }

  return null;
}

function getSmartMove(board: CellValue[]) {
  const winningMove = findCriticalMove(board, "jorge");
  if (winningMove !== null) return winningMove;

  const blockingMove = findCriticalMove(board, "you");
  if (blockingMove !== null) return blockingMove;

  if (board[4] === null) return 4;

  const cornerMove = getRandomMove(
    [0, 2, 6, 8].filter((index) => board[index] === null)
  );
  if (cornerMove !== null) return cornerMove;

  return getRandomMove(
    [1, 3, 5, 7].filter((index) => board[index] === null)
  );
}

function scoreBoard(result: RoundResult, depth: number) {
  if (result.winner === "jorge") return 10 - depth;
  if (result.winner === "you") return depth - 10;
  return 0;
}

function minimax(
  board: CellValue[],
  maximizing: boolean,
  depth: number
): { move: number | null; score: number } {
  const result = evaluateBoard(board);
  if (result.winner) {
    return { move: null, score: scoreBoard(result, depth) };
  }

  const moves = getAvailableMoves(board);
  let bestMove: number | null = null;
  let bestScore = maximizing ? -Infinity : Infinity;

  for (const move of moves) {
    const nextBoard = [...board];
    nextBoard[move] = maximizing ? "jorge" : "you";
    const nextScore = minimax(nextBoard, !maximizing, depth + 1).score;

    if (maximizing && nextScore > bestScore) {
      bestScore = nextScore;
      bestMove = move;
    }

    if (!maximizing && nextScore < bestScore) {
      bestScore = nextScore;
      bestMove = move;
    }
  }

  return { move: bestMove, score: bestScore };
}

function getBestMove(board: CellValue[], difficulty: Difficulty) {
  if (difficulty === "easy") {
    return getRandomMove(getAvailableMoves(board));
  }

  if (difficulty === "smart") {
    return getSmartMove(board);
  }

  return minimax(board, true, 0).move;
}

function markerLabel(player: Player) {
  return player === "you" ? "YOU" : "AI";
}

const Play = () => {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<Player | null>("you");
  const [roundResult, setRoundResult] = useState<RoundResult>({
    winner: null,
    line: [],
  });
  const [moveHistory, setMoveHistory] = useState<MoveEntry[]>([]);
  const [score, setScore] = useState<Score>({ you: 0, jorge: 0, draws: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>("smart");
  const [engineThinking, setEngineThinking] = useState(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: config.play.chatIntro },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const finishRound = (result: RoundResult) => {
    setRoundResult(result);
    setCurrentTurn(null);

    if (result.winner === "you") {
      setScore((prev) => ({ ...prev, you: prev.you + 1 }));
      return;
    }

    if (result.winner === "jorge") {
      setScore((prev) => ({ ...prev, jorge: prev.jorge + 1 }));
      return;
    }

    if (result.winner === "draw") {
      setScore((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const playMove = (index: number, player: Player) => {
    if (board[index] || roundResult.winner) return;

    const nextBoard = [...board];
    nextBoard[index] = player;

    setBoard(nextBoard);
    setMoveHistory((prev) => [
      ...prev,
      { player, cell: index, label: CELL_LABELS[index] },
    ]);

    const result = evaluateBoard(nextBoard);
    if (result.winner) {
      finishRound(result);
      return;
    }

    setCurrentTurn(player === "you" ? "jorge" : "you");
  };

  const resetRound = () => {
    setBoard(Array(9).fill(null));
    setCurrentTurn("you");
    setRoundResult({ winner: null, line: [] });
    setMoveHistory([]);
    setEngineThinking(false);
  };

  const resetMatch = () => {
    setScore({ you: 0, jorge: 0, draws: 0 });
    resetRound();
  };

  useEffect(() => {
    if (currentTurn !== "jorge" || roundResult.winner) return;

    setEngineThinking(true);
    const timeout = window.setTimeout(() => {
      const move = getBestMove(board, difficulty);
      if (move !== null) {
        playMove(move, "jorge");
      }
      setEngineThinking(false);
    }, difficulty === "easy" ? 350 : difficulty === "smart" ? 550 : 700);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [board, currentTurn, difficulty, roundResult.winner]);

  const handleCellClick = (index: number) => {
    if (engineThinking || currentTurn !== "you" || board[index]) return;
    playMove(index, "you");
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsTyping(true);

    try {
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatMessages
          .filter((message) => message.role !== "system")
          .map((message) => ({
            role: message.role,
            content: message.content,
          })),
        { role: "user", content: chatInput },
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]?.message?.content) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.choices[0].message.content,
          },
        ]);
      } else {
        throw new Error("Invalid response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: config.play.errorMessage,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const statusMessage =
    roundResult.winner === "you"
      ? "You take the round."
      : roundResult.winner === "jorge"
        ? `${config.play.opponentName} takes the round.`
        : roundResult.winner === "draw"
          ? "This round ends in a draw."
          : engineThinking
            ? `${config.play.opponentName} is thinking...`
            : "Your move.";

  const statusDetail =
    roundResult.winner !== null
      ? "Start a new round or reset the match whenever you want."
      : currentTurn === "you"
        ? "Connect three tiles before Jorge does."
        : `${DIFFICULTY_LABELS[difficulty]} mode is active.`;

  const opponentBarClass = [
    "player-bar",
    currentTurn === "jorge" && !roundResult.winner ? "active" : "",
    roundResult.winner === "jorge" ? "winner" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const playerBarClass = [
    "player-bar",
    currentTurn === "you" && !roundResult.winner ? "active" : "",
    roundResult.winner === "you" ? "winner" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="play-page">
      <div className="play-header">
        <Link to="/" className="back-button" data-cursor="disable">
          {config.navigation.backHome}
        </Link>
      </div>

      <div className="play-layout">
        <div className="chat-panel">
          <div className="chat-header">
            <span className="chat-title">Talk with Jorge</span>
          </div>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={`chat-message ${message.role}`}>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            {isTyping && (
              <div className="chat-message assistant">
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder={config.play.chatPlaceholder}
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              onKeyDown={handleKeyPress}
              data-cursor="disable"
            />
            <button
              className="chat-send-btn"
              onClick={sendMessage}
              data-cursor="disable"
            >
              ➤
            </button>
          </div>
        </div>

        <div className="game-section">
          <div className={opponentBarClass}>
            <div className="player-info">
              <div className="player-avatar">
                <img
                  src={config.developer.photo.portrait}
                  alt={config.developer.photo.alt}
                />
              </div>
              <div className="player-details">
                <span className="player-name">{config.play.opponentName}</span>
                <span className="player-rating">
                  {engineThinking
                    ? config.play.opponentThinking
                    : `${DIFFICULTY_LABELS[difficulty]} mode`}
                </span>
              </div>
            </div>
            <div className="player-badge jorge">{markerLabel("jorge")}</div>
          </div>

          <div className="board-wrapper">
            <div className="tic-board">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className={[
                    "tic-cell",
                    cell ? cell : "",
                    roundResult.line.includes(index) ? "winning" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleCellClick(index)}
                  disabled={
                    engineThinking ||
                    currentTurn !== "you" ||
                    roundResult.winner !== null ||
                    cell !== null
                  }
                  data-cursor="disable"
                >
                  {cell && (
                    <span className={`tic-marker ${cell}`}>
                      {markerLabel(cell)}
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="board-caption">
              Quick match. First to line up three takes the round.
            </div>
          </div>

          <div className={playerBarClass}>
            <div className="player-info">
              <div className="player-avatar player-avatar-you">
                <span>👤</span>
              </div>
              <div className="player-details">
                <span className="player-name">{config.play.playerLabel}</span>
                <span className="player-rating">Visitor side</span>
              </div>
            </div>
            <div className="player-badge you">{markerLabel("you")}</div>
          </div>
        </div>

        <div className="side-panel">
          <div className="panel-card game-status">
            <div className="status-title">{statusMessage}</div>
            <div className="status-subtitle">{statusDetail}</div>
          </div>

          <div className="panel-card">
            <div className="panel-title">Match Score</div>
            <div className="score-grid">
              <div className="score-item">
                <span className="score-label">You</span>
                <span className="score-value">{score.you}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Jorge</span>
                <span className="score-value">{score.jorge}</span>
              </div>
              <div className="score-item">
                <span className="score-label">Draws</span>
                <span className="score-value">{score.draws}</span>
              </div>
            </div>
          </div>

          <div className="panel-card move-history">
            <div className="panel-title">Round Log</div>
            <div className="move-history-list">
              {moveHistory.length ? (
                moveHistory.map((move, index) => (
                  <div key={`${move.player}-${move.cell}-${index}`} className="move-row">
                    <span className="move-num">{index + 1}.</span>
                    <span className="move-player">{markerLabel(move.player)}</span>
                    <span className="move-square">{move.label}</span>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  No moves yet. Open with the center or a corner.
                </div>
              )}
            </div>
          </div>

          <div className="panel-card">
            <div className="panel-title">Difficulty</div>
            <div className="difficulty-buttons">
              {(["easy", "smart", "unbeatable"] as Difficulty[]).map((level) => (
                <button
                  key={level}
                  className={`difficulty-btn ${
                    difficulty === level ? "active" : ""
                  }`}
                  onClick={() => setDifficulty(level)}
                  data-cursor="disable"
                >
                  {DIFFICULTY_LABELS[level]}
                </button>
              ))}
            </div>
          </div>

          <div className="game-controls">
            <button className="control-btn" onClick={resetRound} data-cursor="disable">
              New Round
            </button>
            <button className="control-btn" onClick={resetMatch} data-cursor="disable">
              Reset Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
