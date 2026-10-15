export interface Companion {
  id: "koji" | "mochi" | "kai";
  name: string;
  species: string;
  emoji: string;
  title: string;
  imageSrc: string;
  themeColor: string;
  accentHex: string;
  vibe: string;
  speechBubbles: string[];
  bio: string;
  role: string;
  gear: string;
  mantra: string;
  stats: {
    latency: string;
    focus: string;
    vibeRating: string;
    renderBudget: string;
  };
}

export const COMPANIONS: Record<string, Companion> = {
  koji: {
    id: "koji",
    name: "Koji",
    species: "Cyber Panda",
    emoji: "🐼",
    title: "Chief Vibe Officer & Systems Architect",
    imageSrc: "/mascots/koji.jpg",
    themeColor: "cyan",
    accentHex: "#06b6d4",
    vibe: "Warm techwear hoodie, hot bamboo latte, zero unhandled errors.",
    bio: "Koji ensures distributed systems maintain sub-15ms edge latency while keeping the workspace serene and cozy.",
    role: "Edge Routing, Web Crypto API Isolates & Zero-Server Cryptography",
    gear: "Tactical Matte Black Techwear Hoodie + Cybernetic Bamboo Latte Tumbler",
    mantra: "Deterministic systems. Zero cold starts. Hot matcha.",
    speechBubbles: [
      "Low latency, fresh matcha, zero drama. Welcome to Craft Studio!",
      "I keep Cloudflare edge routes running cool even under heavy traffic.",
      "Check out the production case studies below—real systems, real architectures.",
      "Click me again! I never turn down high-entropy bamboo bytes.",
    ],
    stats: {
      latency: "12ms",
      focus: "100%",
      vibeRating: "99.999%",
      renderBudget: "Sub-15ms",
    },
  },
  mochi: {
    id: "mochi",
    name: "Mochi",
    species: "Zen Capybara",
    emoji: "🦫",
    title: "High-Availability Reliability Master",
    imageSrc: "/mascots/mochi.jpg",
    themeColor: "amber",
    accentHex: "#f59e0b",
    vibe: "Unbothered, onsen hot-spring calm, glowing yuzu on head.",
    bio: "Mochi believes when an entire cloud availability zone drops, you take a deep breath, trigger failover, and sip tea.",
    role: "Database Connection Pooling, Multi-Region SLA Sentinel & Observability",
    gear: "Hand-Knit Earthy Knitwear + Luminescent Balancing Onsen Yuzu",
    mantra: "When an entire availability zone drops, trigger failover and sip tea.",
    speechBubbles: [
      "Breathe in. Deploy to edge. Breathe out. Uptime is peaceful.",
      "The citrus on my head balances our database connection pools.",
      "Every production bug is just an unpolished learning moment.",
      "Take your time exploring the studio. There is no rush in craft.",
    ],
    stats: {
      latency: "14ms",
      focus: "Infinite",
      vibeRating: "100%",
      renderBudget: "Rock Solid",
    },
  },
  kai: {
    id: "kai",
    name: "Kai",
    species: "Kitsune Fox",
    emoji: "🦊",
    title: "Arcade Champion & UI/Graphics Specialist",
    imageSrc: "/mascots/kai.jpg",
    themeColor: "violet",
    accentHex: "#a855f7",
    vibe: "Neon headset, retro console, 60 FPS frame-pacing wizard.",
    bio: "Kai lives for 16.6ms render loops, responsive canvas shaders, and playful micro-interactions that make interfaces unforgettable.",
    role: "Web Audio DSP Synthesis, Canvas 2D/WebGL Loops & Mobile Touch Physics",
    gear: "RGB Streamer Headset + Cyber Deck Retro Handheld Console",
    mantra: "16.6ms frame budget locked. Lag is a design bug.",
    speechBubbles: [
      "60 FPS locked, neon glowing, let's build something epic!",
      "Head down to the Tactile Arcade and challenge my high score!",
      "Lag is the enemy. Fluid tactile animations are the future.",
      "Have you tried the Regex Playground and Crypto Studio in utils yet?",
    ],
    stats: {
      latency: "8ms",
      focus: "Overclocked",
      vibeRating: "MAX",
      renderBudget: "16.6ms (60 FPS)",
    },
  },
};

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  metric: string;
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  status: "Live Production" | "Deployed";
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "utilities",
    title: "Developer & Recon Suite",
    subtitle: "High-Frequency Client-Side Dev Utilities",
    category: "Developer Tools & Cryptography",
    metric: "15 Production Tools · 0 Server Payload Leaks",
    description: "Reengineered legacy ad-bloated formatters into a zero-server privacy toolkit. Processes Regex ASTs, WebCrypto SHA/HMAC digests, Unix epoch time, and cron schedules strictly inside browser memory.",
    highlights: [
      "100% Web Crypto API and client-side AST transpilation",
      "Interactive Regex visualizer with color-coded capture groups",
      "Zero telemetry on user payloads with Cloudflare Workers routing",
    ],
    stack: ["Next.js 16", "Cloudflare Workers", "WebCrypto API", "OpenNext", "Tailwind CSS"],
    url: "https://utils.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "analytics-hub",
    title: "Edge Telemetry & Analytics Hub",
    subtitle: "Cookie-Less Custom Domain Telemetry",
    category: "Distributed Edge Infrastructure",
    metric: "Sub-10ms Ingestion · 10+ Connected Domains",
    description: "Custom telemetry network running on Cloudflare edge workers and D1 SQLite. Collects lightweight beacon telemetry across all portfolio domains without third-party tracking scripts or PII leaks.",
    highlights: [
      "Custom branded domain routing (`analytics.anuraaggrao.com`)",
      "Direct D1 edge database writes with zero server maintenance",
      "Real-time geographic breakdown and route performance telemetry",
    ],
    stack: ["Cloudflare Workers", "Cloudflare D1 (SQLite)", "Wrangler", "Web Standards"],
    url: "https://analytics.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "voltwatch",
    title: "VoltWatch // Battery Telemetry",
    subtitle: "Real-Time Mobile Battery Health & Ingestion Pipeline",
    category: "IoT & Hardware Telemetry",
    metric: "Sub-Second Ingestion · Automated Android Webhooks",
    description: "Real-time mobile battery health, discharge analytics, and charging intelligence suite. Features multi-user Google & Firebase authentication, automated Android webhook ingestion, resilient SQLite time-series storage, and live telemetry dashboards.",
    highlights: [
      "Automated background Android webhook ingestion for charging telemetry",
      "Resilient SQLite time-series storage with rolling-window discharge curves",
      "Multi-user Google & Firebase authentication with real-time UI updates",
    ],
    stack: ["Node.js", "Express", "SQLite", "Firebase Auth", "Chart.js", "Docker"],
    url: "https://volt.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "context-0",
    title: "Context0 // Adaptive Quiz Platform",
    subtitle: "Full-Stack Knowledge Evaluation & Spaced Repetition",
    category: "Distributed Backend & API",
    metric: "Async FastAPI · Relational PostgreSQL Schema",
    description: "Full-stack knowledge evaluation and spaced repetition platform. Powered by an async Python FastAPI backend, PostgreSQL relational schema via Alembic migrations, JWT authentication, and a sleek React SPA with multi-category trivia, streak tracking, and weakness analysis.",
    highlights: [
      "Asynchronous Python FastAPI backend with SQLAlchemy ORM",
      "PostgreSQL relational schema managed through Alembic migrations",
      "Dynamic spaced-repetition weakness analysis and category streak scoring",
    ],
    stack: ["Python FastAPI", "PostgreSQL", "SQLAlchemy", "React + Vite", "TailwindCSS", "Docker"],
    url: "https://quiz.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "music-stuff",
    title: "Reactive Web Audio Synthesizer",
    subtitle: "Digital Signal Processing & Visual Shaders",
    category: "Audio DSP & WebGL Canvas",
    metric: "Spatial Frequency FFT · 60 FPS Render Loop",
    description: "In-browser audio synthesis and reactive visualizer. Employs the Web Audio API to dissect multi-band frequencies in real-time, mapping audio waves to dynamic particle canvas shaders and 3D sonic galaxies.",
    highlights: [
      "Low-latency audio node chaining and sound stage spatialization",
      "High-performance canvas 2D and WebGL frequency renderers",
      "Custom presets and sleep timer architecture",
    ],
    stack: ["React", "Web Audio API", "HTML5 Canvas", "TypeScript", "Tailwind CSS"],
    url: "https://music.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "tetris-mobile-clone",
    title: "Neon Grid Arcade Engine",
    subtitle: "Tetra Overflow Ultra // 60 FPS Canvas Game Loop",
    category: "Game Physics & Interaction",
    metric: "Native Touch Physics · Zero-Dependency Loop",
    description: "High-performance mobile-first arcade puzzle engine engineered from raw canvas primitives. Features tactile touch gesture controls, chip-tune audio synthesis, progressive Zodiac level challenges, and signature time-dilation Zone mechanics.",
    highlights: [
      "Precision touch swipe gesture recognition and instant hard drops",
      "Procedural Web Audio sound effects without audio file assets",
      "Signature time-dilation Zone mechanic with custom shader effects",
    ],
    stack: ["JavaScript", "HTML5 Canvas", "Web Audio API", "PWA"],
    url: "https://tetra.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "status-site",
    title: "Global Pulse Health Monitor",
    subtitle: "Dynamic Status Biome Engine & SLA Sentinel",
    category: "DevOps & Infrastructure Observability",
    metric: "6 Procedural Biomes · Global Health Checks",
    description: "Autonomous status monitoring engine executing scheduled probes against all production subdomains. Features 6 procedural animated biomes driven by PRNG shaders, live Spotify playback integration, and incident timelines.",
    highlights: [
      "Multi-region Cloudflare Worker health check probes with latency percentiles",
      "6 procedural animated biomes driven by Mulberry32 PRNG shaders",
      "Live Spotify playback synchronization and GitHub deployment events",
    ],
    stack: ["Next.js 15", "Procedural Shaders", "TailwindCSS", "Spotify API", "Cloudflare"],
    url: "https://status.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "countdown",
    title: "EpiCountdown Tracker",
    subtitle: "Real-Time Release Schedule & Air Time Sync",
    category: "Consumer Web Application",
    metric: "Sub-Second Air Time Sync · Multi-API Polling",
    description: "Real-time countdown system for TV series and anime releases. Automatically synchronizes release air dates across TVmaze and Jikan API endpoints with local client storage caching and zero-latency countdown timers.",
    highlights: [
      "Automated dual-API aggregation across TVmaze and Jikan endpoints",
      "Client-side localStorage caching for instant zero-latency loads",
      "Sub-second synchronized clock with multi-timezone conversion",
    ],
    stack: ["TypeScript", "REST APIs", "Local Storage", "Tailwind CSS"],
    url: "https://countdown.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "fidget-toys",
    title: "Interactive Sensory Suite",
    subtitle: "Playable Tactile Physics & Synthesized Haptics",
    category: "Sensory UX & Physics",
    metric: "60 FPS Canvas Physics · Synthesized Audio Haptics",
    description: "Playable tactile sensory simulations with spring physics, bubble wrap pops, kinetic dials, and procedural Web Audio haptic clicks crafted for focus and micro-breaks.",
    highlights: [
      "Canvas 2D spring physics with real-time dampening math",
      "Procedural micro-click audio synthesis via Web Audio API",
      "Zero external physics libraries — pure native mathematics",
    ],
    stack: ["HTML5 Canvas", "Physics Math", "Web Audio API", "Tailwind CSS"],
    url: "https://fidget.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "kei-ai",
    title: "Project Kei // Neural Chief of Staff",
    subtitle: "Autonomous Operator & Infinite-Ceiling Memory Vault",
    category: "AI & Autonomous Systems",
    metric: "Zero-Ceiling Vault Memory · Bidirectional Voice DSP",
    description: "Personal autonomous AI operating partner pairing infinite-ceiling Obsidian memory vaults, bidirectional push-to-talk voice pipeline with Kokoro TTS, and reactive matrix visualizer with silhouette rendering.",
    highlights: [
      "Deterministic Obsidian vault retrieval across multi-tier venture indexes",
      "Low-latency bidirectional push-to-talk pipeline with Kokoro neural TTS",
      "Autonomous execution loop with hands-on tool dispatch and monitoring",
    ],
    stack: ["Gemini Flash", "Python", "Obsidian Vault", "Kokoro TTS", "WebSockets"],
    url: "https://anuraaggrao.com",
    status: "Deployed",
  },
];
