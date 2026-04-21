export interface Experience {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  technologies: string;
  image: string;
  description: string;
  link?: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  details: string;
  tools: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  url: string;
}

interface SiteConfig {
  site: {
    title: string;
    description: string;
    language: string;
    logo: string;
  };
  theme: {
    fontFamily: string;
    accent: string;
    accentStrong: string;
    accentRgb: string;
    background: string;
    backgroundRgb: string;
    surface: string;
    surfaceRgb: string;
    text: string;
    muted: string;
    glow: string;
    glowShadowRgb: string;
  };
  navigation: {
    about: string;
    work: string;
    contact: string;
    backHome: string;
  };
  developer: {
    name: string;
    fullName: string;
    title: string;
    description: string;
    greeting: string;
    roleLines: string[];
    photo: {
      portrait: string;
      transparent: string;
      alt: string;
    };
  };
  about: {
    title: string;
    description: string;
  };
  sections: {
    careerLead: string;
    careerAccent: string;
    careerTrail: string;
    workLead: string;
    workAccent: string;
    workCtaTitle: string;
    workCtaDescription: string;
    workCtaLabel: string;
    allWorksLead: string;
    allWorksAccent: string;
    allWorksDescription: string;
    techStackTitle: string;
    contactSocialTitle: string;
    contactCreditLead: string;
    contactCreditBy: string;
  };
  contact: {
    email: string;
    location: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    resume?: string;
  };
  callToAction: {
    playLabel: string;
    playHref: string;
    contactLabel: string;
    contactHref: string;
  };
  loading: {
    marquee: string[];
    loadingText: string;
    welcomeText: string;
  };
  play: {
    chatTitle: string;
    chatIntro: string;
    chatPlaceholder: string;
    errorMessage: string;
    opponentName: string;
    opponentRating: string;
    opponentThinking: string;
    playerLabel: string;
    moveHistoryTitle: string;
    newGameLabel: string;
    flipBoardLabel: string;
    confirmRestart: string;
  };
  experiences: Experience[];
  projects: Project[];
  skills: {
    develop: SkillGroup;
    design: SkillGroup;
  };
  techStack: TechItem[][];
}

// Replace the values in this file to personalize the portfolio end to end.
export const config = {
  site: {
    title: "Jorge Greus Herrero | AI Engineer",
    description:
      "AI Engineer focused on machine learning, generative AI, data pipelines, and end-to-end LLM applications.",
    language: "en",
    logo: "JG",
  },
  theme: {
    fontFamily: '"Geist", sans-serif',
    accent: "#c2a4ff",
    accentStrong: "#c481ff",
    accentRgb: "194, 164, 255",
    background: "#0b080c",
    backgroundRgb: "11, 8, 12",
    surface: "#16111a",
    surfaceRgb: "22, 17, 26",
    text: "#eae5ec",
    muted: "#b7afbb",
    glow: "#fb8dff",
    glowShadowRgb: "84, 0, 255",
  },
  navigation: {
    about: "ABOUT",
    work: "WORK",
    contact: "CONTACT",
    backHome: "← Back to Home",
  },
  developer: {
    name: "Jorge",
    fullName: "Jorge Greus Herrero",
    title: "AI Engineer (ML / Generative AI)",
    description:
      "Physics graduate and AI Master's student building end-to-end Machine Learning and Generative AI applications, from robust ETL pipelines to RAG and agentic systems.",
    greeting: "Hello! I'm",
    roleLines: ["AI Engineer", "ML / Generative AI"],
    photo: {
      portrait: "/images/jorge-play.jpg",
      transparent: "/images/mypicnbg.png",
      alt: "Jorge Greus Herrero portrait",
    },
  },
  about: {
    title: "About Me",
    description:
      "I am a Physics graduate and AI Master's student based in Valencia, focused on building practical Machine Learning and Generative AI systems end to end. My work spans classical ML modeling, LLM-powered applications, data engineering, and evaluation pipelines, with a strong emphasis on Python, SQL, and production-minded ETL workflows. I enjoy turning messy data and open-ended product ideas into robust systems that are useful, reproducible, and measurable.",
  },
  sections: {
    careerLead: "My career",
    careerAccent: "&",
    careerTrail: "experience",
    workLead: "My",
    workAccent: "Work",
    workCtaTitle: "Want to see more?",
    workCtaDescription: "Explore all of my projects and creations.",
    workCtaLabel: "See All Works →",
    allWorksLead: "All",
    allWorksAccent: "Works",
    allWorksDescription: "A collection of all my projects and creations.",
    techStackTitle: "Tech Stack",
    contactSocialTitle: "Social",
    contactCreditLead: "Designed and Developed",
    contactCreditBy: "by",
  },
  contact: {
    email: "jorgegreus3@gmail.com",
    location: "Valencia, Spain",
    github: "https://github.com/jorgitogh",
    linkedin: "https://linkedin.com/in/jorge-greus",
    twitter: "",
    facebook: "",
    instagram: "",
    resume: "",
  },
  callToAction: {
    playLabel: "Play With Me →",
    playHref: "/play",
    contactLabel: "Let's Connect →",
    contactHref: "https://linkedin.com/in/jorge-greus",
  },
  loading: {
    marquee: ["AI Engineer", "Machine Learning", "Generative AI", "Data Engineering"],
    loadingText: "Loading",
    welcomeText: "Welcome",
  },
  play: {
    chatTitle: "Talk with me",
    chatIntro:
      "Hi, I'm Jorge. Ask me about machine learning, RAG systems, data pipelines, or the projects on this site.",
    chatPlaceholder: "Type a message...",
    errorMessage: "Sorry, I am having some connection issues right now. Try again in a moment.",
    opponentName: "Jorge",
    opponentRating: "AI Engineer",
    opponentThinking: "Thinking...",
    playerLabel: "You",
    moveHistoryTitle: "Moves",
    newGameLabel: "New Game",
    flipBoardLabel: "Flip Board",
    confirmRestart: "Start a new game?",
  },
  experiences: [
    {
      position: "Data Analyst / Data Engineer",
      company: "Cecotec Innovaciones",
      period: "2025 - Present",
      location: "Valencia, Spain",
      description:
        "Designing analytics-ready data systems for business planning and reporting, combining PostgreSQL schema design, SQL analysis, and Python ETL automation.",
      responsibilities: [
        "Designed PostgreSQL schemas for business analytics and strategic sales planning",
        "Built Python ELT/ETL workflows for automated ingestion and cleaning",
        "Streamlined reporting workflows to improve consistency and efficiency",
        "Worked with Git, Docker, and Docker Compose for reproducible environments",
      ],
      technologies: ["Python", "PostgreSQL", "SQL", "ETL", "Docker", "Git"],
    },
    {
      position: "Master's Degree in Artificial Intelligence",
      company: "EDEM",
      period: "2025 - Present",
      location: "Valencia, Spain",
      description:
        "Advanced study of applied machine learning and generative AI, with a focus on LLM systems, evaluation, and end-to-end AI product development.",
      responsibilities: [
        "Building practical LLM applications with RAG and agentic patterns",
        "Deepening ML foundations for modeling, evaluation, and deployment",
        "Working on product-oriented AI systems with business relevance",
        "Exploring experimentation, orchestration, and multimodal workflows",
      ],
      technologies: ["Generative AI", "LLMs", "RAG", "Agents", "Evaluation", "Python"],
    },
    {
      position: "BSc in Physics",
      company: "Universitat de València, Università di Torino & UNED",
      period: "2019 - 2025",
      location: "Valencia / Turin",
      description:
        "Physics training with strong mathematical and analytical foundations, developed through research-oriented study and problem-solving across multiple academic environments.",
      responsibilities: [
        "Built a strong foundation in mathematics, modeling, and quantitative reasoning",
        "Worked across academic contexts in Spain and Italy",
        "Developed rigorous problem-solving habits transferrable to AI engineering",
        "Combined scientific thinking with hands-on technical learning",
      ],
      technologies: ["Physics", "Mathematics", "Scientific Thinking", "Data Analysis"],
    },
    {
      position: "Key Holder",
      company: "Hollister Co.",
      period: "2021 - 2022",
      location: "Valencia, Spain",
      description:
        "Supported daily store operations while monitoring sales and inventory signals to improve replenishment and performance.",
      responsibilities: [
        "Monitored sales and inventory metrics to support store performance",
        "Optimized replenishment decisions based on operational demand",
        "Coordinated day-to-day operations as part of the floor leadership team",
        "Developed customer-facing communication and execution skills",
      ],
      technologies: ["Operations", "Inventory", "Sales Metrics", "Team Coordination"],
    },
  ],
  projects: [
    {
      id: 1,
      title: "Multiverse Agentic Arena",
      category: "Multi-Agent / GenAI",
      technologies: "LangGraph, Gemini API, Tavily, Streamlit, Python",
      image: "/images/agentic-multiverse.jpg",
      description:
        "Built a multi-agent orchestration system for complex decision-making and debating, with DAG-based routing, automated web research, and multimodal output generation.",
      link: "https://github.com/jorgitogh/Debate_absurdo_Langraph",
    },
    {
      id: 2,
      title: "GitHub RAG Assistant",
      category: "RAG / Code Search",
      technologies: "LangChain, FAISS, LLMs, Streamlit, Python",
      image: "/images/github-rag-assistant.jpg",
      description:
        "Created a Q&A assistant that indexes source code for technical queries using chunking, embeddings, and semantic retrieval over repository content.",
      link: "https://github.com/jorgitogh/Rag-de-github",
    },
    {
      id: 3,
      title: "Surface Defect Detection",
      category: "Computer Vision / CNN",
      technologies: "PyTorch, OpenCV, CNNs, Computer Vision, Streamlit",
      image: "/images/surface-defect-detection.jpg",
      description:
        "Developed a vision pipeline to detect and classify metal surface defects, covering preprocessing, augmentation, training, evaluation, and a lightweight inference demo.",
      link: "https://github.com/jorgitogh/Defect_Surface_Classificator",
    },
    {
      id: 4,
      title: "Business Analytics ETL Pipelines",
      category: "Data Engineering",
      technologies: "Python, PostgreSQL, SQL, Docker, Docker Compose",
      image: "/images/etl-pipelines.webp",
      description:
        "Designed and automated data ingestion, cleaning, and reporting workflows for analytics and strategic planning with a reproducible Python + SQL toolchain.",
    },
  ],
  skills: {
    develop: {
      title: "GENAI / LLMs",
      description: "RAG, agents, and practical LLM systems",
      details:
        "I build end-to-end Generative AI applications, from retrieval and prompt flows to multi-agent orchestration and evaluation. My focus is practical systems that combine strong context handling, useful reasoning patterns, and a solid product surface.",
      tools: [
        "Python",
        "RAG",
        "LangChain",
        "LangGraph",
        "LLMs",
        "Gemini API",
        "FAISS",
        "Tavily",
        "Prompt Engineering",
        "Streamlit",
        "Agents",
      ],
    },
    design: {
      title: "ML / DATA",
      description: "Pipelines, modeling, and reproducible tooling",
      details:
        "My engineering base is Python-first, with strong SQL and ETL fundamentals. I work comfortably across data cleaning, feature pipelines, classical ML, deep learning experiments, and the reproducible environments needed to move work from notebook to application.",
      tools: [
        "PostgreSQL",
        "SQL",
        "ETL",
        "scikit-learn",
        "PyTorch",
        "TensorFlow/Keras",
        "Docker",
        "Git",
        "BigQuery",
        "Vertex AI",
      ],
    },
  },
  techStack: [
    [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        url: "https://python.org",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        url: "https://postgresql.org",
      },
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        url: "https://git-scm.com",
      },
      {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        url: "https://docker.com",
      },
      {
        name: "Google Cloud",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
        url: "https://cloud.google.com",
      },
      {
        name: "Linux",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
        url: "https://linux.org",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        url: "https://github.com/jorgitogh",
      },
    ],
    [
      {
        name: "scikit-learn",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",
        url: "https://scikit-learn.org",
      },
      {
        name: "PyTorch",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
        url: "https://pytorch.org",
      },
      {
        name: "TensorFlow",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
        url: "https://tensorflow.org",
      },
      {
        name: "FastAPI",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        url: "https://fastapi.tiangolo.com",
      },
      {
        name: "Streamlit",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg",
        url: "https://streamlit.io",
      },
      {
        name: "OpenCV",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
        url: "https://opencv.org",
      },
    ],
    [
      {
        name: "Pandas",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
        url: "https://pandas.pydata.org",
      },
      {
        name: "NumPy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        url: "https://numpy.org",
      },
      {
        name: "Jupyter",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
        url: "https://jupyter.org",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        url: "https://react.dev",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        url: "https://typescriptlang.org",
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        url: "https://code.visualstudio.com",
      },
    ],
    [
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
        url: "https://postman.com",
      },
      {
        name: "Figma",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        url: "https://figma.com",
      },
      {
        name: "Bash",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
        url: "https://www.gnu.org/software/bash/",
      },
      {
        name: "HTML",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      },
    ],
  ],
} satisfies SiteConfig;
