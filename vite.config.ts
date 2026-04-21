import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

function sendJson(
  res: any,
  status: number,
  payload: unknown
) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
}

function readRequestBody(req: any) {
  return new Promise<string>((resolve, reject) => {
    let body = "";

    req.on("data", (chunk: any) => {
      body += chunk.toString();
    });

    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function localChatApiPlugin(groqApiKey?: string) {
  return {
    name: "local-chat-api",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        const pathname = req.url?.split("?")[0];

        if (pathname !== "/api/chat") {
          next();
          return;
        }

        if (req.method !== "POST") {
          sendJson(res, 405, { error: "Method not allowed" });
          return;
        }

        if (!groqApiKey) {
          sendJson(res, 500, {
            error: "Server configuration error: Missing API Key",
          });
          return;
        }

        try {
          const rawBody = await readRequestBody(req);
          const { messages } = JSON.parse(rawBody || "{}");

          if (!Array.isArray(messages)) {
            sendJson(res, 400, { error: "Invalid request: messages is required" });
            return;
          }

          const response = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages,
              model: GROQ_MODEL,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            sendJson(res, response.status, {
              error: data.error?.message || "Failed to fetch from Groq",
            });
            return;
          }

          sendJson(res, 200, data);
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Internal Server Error";

          console.error("Local chat API error:", error);
          sendJson(res, 500, { error: "Internal Server Error", details: message });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const groqApiKey = env.GROQ_API_KEY;

  return {
    plugins: [react(), localChatApiPlugin(groqApiKey)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three", "three-stdlib"],
            gsap: ["gsap"],
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    optimizeDeps: {
      include: ["three", "gsap", "lenis"],
    },
  };
});
