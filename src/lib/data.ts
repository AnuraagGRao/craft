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
      "Check out the 5 case studies below—real systems, real architectures.",
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
      "Head down to Player 1 Sanctuary and challenge my high score!",
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
    id: "music-stuff",
    title: "Reactive Web Audio Synthesizer",
    subtitle: "Digital Signal Processing & Visual Shaders",
    category: "Audio DSP & WebGL Canvas",
    metric: "Spatial Frequency FFT · 60 FPS Render Loop",
    description: "In-browser audio synthesis and reactive visualizer. Employs the Web Audio API to dissect multi-band frequencies in real-time, mapping audio waves to dynamic particle canvas shaders.",
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
    subtitle: "Mobile-First 60 FPS Canvas Game Loop",
    category: "Game Physics & Interaction",
    metric: "Native Touch Physics · Zero-Dependency Loop",
    description: "High-performance mobile-first Tetris clone engineered from raw canvas primitives. Features tactile touch gesture controls, chip-tune audio synthesis, and fluid 60 FPS frame pacing.",
    highlights: [
      "Precision touch swipe gesture recognition and instant hard drops",
      "Procedural Web Audio sound effects without audio file assets",
      "Responsive canvas scaling for modern mobile aspect ratios",
    ],
    stack: ["JavaScript", "HTML5 Canvas", "Web Audio API", "PWA"],
    url: "https://tetris.anuraaggrao.com",
    status: "Live Production",
  },
  {
    id: "status-site",
    title: "Global Pulse Health Monitor",
    subtitle: "Multi-Region Distributed Availability SLA",
    category: "DevOps & Infrastructure Observability",
    metric: "Global Region Probes · Real-Time Incident Timelines",
    description: "Autonomous status monitoring engine executing scheduled probes against all production subdomains. Automatically logs uptime percentages, response latency metrics, and incident timelines.",
    highlights: [
      "Multi-region Cloudflare Worker health check probes",
      "Automated latency tracking with percentile histograms",
      "Zero-downtime static dashboard with live refresh",
    ],
    stack: ["Next.js", "Cloudflare KV", "Cron Triggers", "Tailwind CSS"],
    url: "https://status.anuraaggrao.com",
    status: "Live Production",
  },
];
