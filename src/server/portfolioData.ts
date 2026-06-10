import type {
  EducationEntry,
  GuestbookEntry,
  Project,
  ProjectSignal,
  // SkillGroup,
  TimelineEntry,
} from "../types/portfolio";

export const signalLabels: Record<ProjectSignal, string> = {
  cyan: "STABLE",
  amber: "ACTIVE",
  green: "EXPLORATION",
  slate: "UNMAINTAINED",
};

export const projects: Project[] = [
  {
    slug: "rumble-chat-intelligence",
    title: "Rumble Chat Intelligence Pipeline",
    tagline: "Scraping and analyzing livestream chat in real time.",
    status: "Active Development",
    timeline: "2025–Present",
    signal: "amber",
    summary:
      "A pipeline that scrapes chat messages from livestreams, stores them in a database, and runs sentiment analysis to spot trends and track users over time.",
    extendedContent: {
      overview:
        "The system monitors selected Rumble channels, detects live broadcasts, ingests chat and viewer telemetry, and serves live analytics to a React dashboard.",
      pipelineSummary: [
        "Detect live streams on monitored channels.",
        "Scrape stream metadata, chat messages, donations, badges, and viewer counts.",
        "Persist normalized entities into relational tables.",
        "Serve analytics and stream APIs via FastAPI.",
        "Render live + historical dashboards in React.",
      ],
      architectureDiagram: `Rumble channel pages
        |
        v
Playwright scraper (channel monitor + per-stream watchers)
        |
        v
In-memory async queue (ExtractedMessage)
        |
        v
Consumer (batch upserts users/messages/badges/subscriptions/history)
        |
        v
Database (SQLite/Postgres via SQLAlchemy)
        |
        +------------------------------+
        |                              |
        v                              v
FastAPI REST endpoints         Badge image store (/api/badge-images)
        |
        v
React dashboard (MainDashboard + analytics/chart views)`,
      componentGroups: [
        {
          title: "Backend Technologies",
          items: [
            "FastAPI + Uvicorn runs the API server, with lifecycle hooks, middleware, and routing.",
            "Playwright (Chromium) + asyncio handle channel polling and live chat/viewership scraping.",
            "SQLAlchemy 2 (async) + Pydantic v2 manage ORM models, queries, and request/response schemas.",
            "An asyncio.Queue with batched upserts handles users, messages, badges, and subscriptions.",
            "An in-process TTL cache and persisted analytics snapshots optimize API responses.",
          ],
        },
        {
          title: "Frontend Technologies",
          items: [
            "React 19 + TypeScript + Vite for the SPA and build tooling.",
            "wouter handles client routing for /, /channel/:id, and /stream/:id.",
            "Axios powers API calls with retry interceptors for transient failures.",
            "Chart.js + react-chartjs-2 render stream and channel visualizations.",
            "Tailwind CSS v4 + Radix UI primitives handle styling and UI components.",
          ],
        },
        {
          title: "Data + Runtime Technologies",
          items: [
            "SQLite (aiosqlite) by default, Postgres via DATABASE_URL.",
            "file_store/ holds DB files, logs, and badge assets locally.",
            "Badge files are served at /api/badge-images/* via FastAPI static mounts.",
            "Alembic handles schema migrations.",
            "The ingestion queue is in-memory, so events don't survive restarts.",
          ],
        },
        {
          title: "Deployment Technologies",
          items: [
            "Docker Compose orchestrates backend and frontend services.",
            "Backend: python:3.13-slim + Playwright Chromium, running uvicorn main:app.",
            "Frontend: node:20-alpine build stage, nginx:1.27-alpine for runtime.",
            "Nginx serves the SPA and proxies /api to the backend.",
            "The rumble_file_store Docker volume persists app data.",
          ],
        },
      ],
      flows: [
        {
          title: "Startup Flow",
          steps: [
            "Initialize DB/session/logger/queue.",
            "Ensure tables exist.",
            "Start Playwright (when scraper enabled).",
            "Launch channel monitor + queue consumer tasks.",
          ],
        },
        {
          title: "Channel Onboarding Flow",
          steps: [
            "Frontend submits channel URL to POST /api/channels/.",
            "Backend validates host + uniqueness.",
            "Playwright extracts channel metadata.",
            "Channel is inserted with monitored=true.",
          ],
        },
        {
          title: "Live Detection Flow",
          steps: [
            "Manager refreshes monitored channels from the database.",
            "Monitors scrape channel pages for live cards and stream URLs.",
            "Per-stream watcher starts on live detection.",
            "Watcher is cancelled when the stream goes idle.",
          ],
        },
        {
          title: "Ingestion + Consumer Flow",
          steps: [
            "watch_stream() extracts metadata, messages, badges, donations, and viewership samples.",
            "Normalized ExtractedMessage events are queued.",
            "Consumer adapts batch size and performs conflict-safe upserts.",
            "User state, history, and badge assets are persisted.",
          ],
        },
        {
          title: "Analytics + UI Flow",
          steps: [
            "Frontend polls channels, stream metrics, and enriched messages.",
            "Backend serves database aggregations and cached snapshots.",
            "Live views use shorter refresh intervals than historical views.",
            "Dashboards show channel-level and stream-level analytics.",
          ],
        },
      ],
      apiSurface: [
        {
          endpoint: "GET /api/channels/",
          purpose: "List monitored channels.",
        },
        {
          endpoint: "POST /api/channels/",
          purpose: "Add and validate a channel to monitor.",
        },
        {
          endpoint: "PUT /api/channels/{id}/monitored",
          purpose: "Toggle channel monitoring state.",
        },
        {
          endpoint: "GET /api/channels/{id}/analytics",
          purpose: "Channel-level analytics metrics.",
        },
        {
          endpoint: "GET /api/channels/overview",
          purpose: "Global overview metrics for home dashboard.",
        },
        {
          endpoint:
            "GET /api/streams/{id}/viewership/aggregated/{bucket_seconds}",
          purpose: "Bucketed stream viewership series.",
        },
        {
          endpoint: "GET /api/messages/stream/{id}/enriched",
          purpose: "Live enriched stream messages with user context.",
        },
        {
          endpoint:
            "GET /api/messages/stream/{id}/aggregated/{aggregation_minutes}",
          purpose: "Stream message timeline aggregates.",
        },
        {
          endpoint: "GET /api/messages/user/{id}",
          purpose: "Message history for a specific user.",
        },
        {
          endpoint: "GET /api/users/{id}",
          purpose: "User profile details.",
        },
      ],
      deploymentNotes: [
        "Docker Compose serves the frontend via Nginx and proxies /api to the FastAPI backend.",
        "Backend container runs scraper, ingestion, and API against the rumble_file_store volume.",
        "Local dev (make dev) runs frontend/backend with Vite /api proxy support.",
        "Scraper reliability depends on Rumble DOM selectors and needs periodic maintenance.",
      ],
    },
    problem:
      "Livestream chat moves fast and it's all unstructured. You can't manually track who's saying what, especially when people change usernames or profiles. Sentiment shifts are real but invisible without tools to spot them.",
    architecture:
      "Playwright watches active streams and pushes messages into an async queue. Messages get normalized with user metadata and stored in PostgreSQL. The dashboard polls this for live analytics.",
    stack: ["FastAPI", "Playwright", "Python", "Redis", "SQLAlchemy"],
    highlights: [
      "Scrapes live chat continuously from active streams.",
      "Identifies users across username and profile changes.",
      "Scores messages for sentiment, shows trends in real time.",
      "Handles high message volume through async processing.",
    ],
    nextSteps: [
      "Handle millions of messages per stream.",
      "Add topic clustering and toxicity detection.",
      "Let users explore chat patterns and trends.",
    ],
    // demoImage: {
    //   src: "/demos/rumble-frontend-demo.gif",
    //   alt: "Rumble Chat Intelligence dashboard walkthrough",
    //   caption: "Rumble chat monitor frontend demo.",
    // },
    liveUrl: "https://rumble.connorswis.com",
  },
  {
    slug: "social-media-intelligence-mapper",
    title: "Social Media Intelligence & Mapping System",
    tagline: "Automatically tracking and mapping public social media activity.",
    status: "Active Development",
    timeline: "2025–Present",
    signal: "amber",
    summary:
      "A system that scrapes public Instagram posts and account info, structures it into a Markdown knowledge base, and maps out geographic patterns and relationships between accounts.",
    problem:
      "Public social media data lives in different places and formats. You can't easily spot activity patterns, track accounts when they change names, or see where things are happening without custom tools.",
    architecture:
      "A FastAPI service runs Apify scrapers to pull Instagram posts and profile data. Celery workers on a Redis queue handle scheduled updates, download media, and export to versioned Markdown files. Geographic and relationship visualization sits on top.",
    stack: [
      "FastAPI",
      "Celery",
      "Redis",
      "Apify",
      "Python",
      "Jinja2",
      "Pydantic",
    ],
    highlights: [
      "Scrapes Instagram posts and profiles automatically via Apify.",
      "Keeps accounts tracked across username changes through cached profiles and scheduled updates.",
      "Downloads media locally and exports to versioned Markdown files for portability.",
      "Maps activity by location and structures data for network analysis.",
    ],
    nextSteps: [
      "Detect communities and analyze relationships.",
      "Add sentiment and topic modeling.",
      "Build a web interface for exploring the data.",
    ],
    demoImage: {
      src: "/demos/social-media-intelligence-mapper-demo.gif",
      alt: "Social Media Intelligence & Mapping System Demo",
      caption: "The social media intelligence dashboard.",
    },
    liveUrl: "https://graph.connorswis.com",
  },
  {
    slug: "map-to-poster",
    title: "MapToPoster Generator",
    tagline: "Turn any city's map data into a stylized poster.",
    status: "Active Build",
    timeline: "2025",
    signal: "cyan",
    summary:
      "A tool that pulls OpenStreetMap data for a location and renders it into a styled, print-quality poster.",
    problem:
      "Raw map data is detailed but ugly. Making it into something worth printing and hanging on a wall requires a custom rendering pipeline.",
    architecture:
      "Fetches street and landmark data from OpenStreetMap, applies themed rendering, and outputs print-quality images.",
    stack: ["FastAPI", "Flask", "Matplotlib", "OSMnx", "Python"],
    highlights: [
      "Generate posters for any city with the same pipeline.",
      "Pick from different themes and color schemes.",
      "Output high-res images ready for print.",
      "Handles both data processing and design.",
    ],
    nextSteps: [
      "Build a web UI for real-time customization.",
      "Let users save and reuse theme presets.",
      "Add more export formats for different print sizes.",
    ],
    liveUrl: "https://maptoposter.connorswis.com",
    repoUrl: "https://github.com/ConnorSwis/maptoposter-docker",
    demoImage: {
      src: "/demos/map-to-poster-demo.gif",
      alt: "MapToPoster Demo",
    },
  },
  {
    slug: "media-server-stack",
    title: "Self-Hosted Media Server Stack",
    tagline:
      "Dockerized setup for automatically downloading, organizing, and streaming media.",
    status: "Operational",
    timeline: "2024–Present",
    signal: "cyan",
    summary:
      "A self-hosted media server running in Docker that automatically finds, downloads, organizes, and streams movies, TV shows, and music across my home network.",
    problem:
      "Managing movies, TV, and music across different services is tedious. I wanted one place to find releases, download them, and stream them all.",
    architecture:
      "Multiple Docker containers handle discovery, downloading, organizing, and streaming. Nginx proxies everything and storage mounts persist data across services.",
    stack: [
      "Docker",
      "Docker Compose",
      "Jellyfin",
      "Lidarr",
      "Linux",
      "Nginx Proxy Manager",
      "Prowlarr",
      "qBittorrent",
      "Radarr",
      "Sonarr",
    ],
    highlights: [
      "Runs a full media stack with multiple services in Docker.",
      "Automates the flow from discovery to download to streaming.",
      "Manages storage and networking across all services.",
      "Experience running production-style infrastructure at home.",
    ],
    nextSteps: [
      "Add better monitoring and health checks.",
      "Set up backups and secure remote access.",
      "Automate maintenance tasks.",
    ],
  },
  {
    slug: "home-lab-platform",
    title: "Self-Hosted Home Lab Platform",
    tagline:
      "Raspberry Pi server with remote deployment, mesh networking, and public-facing services.",
    status: "Operational",
    timeline: "2024–Present",
    signal: "cyan",
    summary:
      "My personal server built on a Raspberry Pi, running Docker containers, reverse-proxied services, and a mesh VPN for remote access from anywhere.",
    problem:
      "I wanted to host projects without paying cloud providers. Building the infrastructure myself teaches you way more than any tutorial.",
    architecture:
      "Domain traffic goes through Cloudflare, then Nginx Proxy Manager routes requests to Docker containers managed via Portainer. A mesh VPN lets me deploy and manage things remotely.",
    stack: [
      "Cloudflare",
      "Docker",
      "Dynamic DNS",
      "Linux",
      "Nginx Proxy Manager",
      "Portainer",
      "Raspberry Pi",
    ],
    highlights: [
      "Runs a complete container platform on a Raspberry Pi.",
      "Routes domain traffic through Cloudflare and Nginx Proxy Manager.",
      "Cloud storage, file transfer, and remote access all working.",
      "Mesh VPN lets me manage everything from anywhere.",
      "Hosts multiple live projects.",
    ],
    nextSteps: [
      "Add monitoring and alerting.",
      "Automate backups.",
      "Expand capacity with more hardware.",
    ],
  },
  {
    slug: "discord-casino-bot",
    title: "Discord Casino Bot",
    tagline:
      "A Discord casino bot with blackjack, slots, and a shared virtual currency system.",
    status: "Stable/Archived",
    timeline: "2019–2020",
    signal: "cyan",
    summary:
      "A Python Discord bot that lets users play blackjack, high card, slots, coin flip, and dice. It stores balances in SQLite and renders game images for blackjack and slots.",
    problem:
      "Discord bots were all text commands. I wanted to build actual games with visuals.",
    architecture:
      "discord.py handles commands and events. User balances live in SQLite. Pillow renders blackjack tables and slot reels as GIFs. The repo includes a FastAPI web version of the same games.",
    stack: ["Python", "discord.py", "FastAPI", "Pillow", "asyncio", "SQLite"],
    highlights: [
      "Blackjack with rendered table images.",
      "Slots with animated GIF reels.",
      "User balances persist in the database.",
      "Owner commands for managing the economy.",
    ],
    nextSteps: ["Archived. No further development."],
    repoUrl: "https://github.com/ConnorSwis/casino-bot",
    liveUrl: "https://casino-bot.connorswis.com",
    demoImage: {
      src: "/demos/discord-casino-bot-demo.gif",
      alt: "Discord Casino Bot Demo",
    },
  },
  {
    slug: "qr-code-generator",
    title: "Client-Side QR Code Generator",
    tagline:
      "QR code generator that runs entirely in the browser, no server, no tracking.",
    status: "Deployed",
    timeline: "2025",
    signal: "cyan",
    summary:
      "A simple web app that generates QR codes completely client-side. Your data never leaves your browser.",
    problem:
      "QR code generators send your data to a server. That's unnecessary and a privacy risk for sensitive content.",
    architecture:
      "Everything runs in the browser. JavaScript encodes your input locally, renders the QR code to canvas, and lets you download it.",
    stack: ["HTML", "CSS", "JavaScript", "Canvas API"],
    highlights: [
      "All processing happens in your browser. No server uploads.",
      "Supports different content types and QR sizes.",
      "Hosted on my Raspberry Pi server.",
    ],
    nextSteps: [
      "Batch generate codes from a CSV file.",
      "Custom styling and branding options.",
    ],
    liveUrl: "https://qr-code.connorswis.com",
    repoUrl: "https://github.com/connorswis/qr-code-maker",
    demoImage: {
      src: "/demos/qr-code-maker-demo.gif",
      alt: "QR Code Generator Demo",
    },
  },
  {
    slug: "spreadsheet-sms-sender",
    title: "Spreadsheet SMS Sender",
    tagline:
      "Send personalized texts to a list of contacts from a spreadsheet.",
    status: "Deployed",
    timeline: "2025",
    signal: "cyan",
    summary:
      "A web app that reads contacts from a spreadsheet and sends each person a personalized text message. Built for organizations running campaigns or reminders.",
    problem: "Texting a big list of people one by one is slow and error-prone.",
    architecture:
      "Upload a spreadsheet, preview templated messages with per-row variables, then send through an SMS API.",
    stack: ["Python", "FastAPI", "JavaScript", "HTML/CSS"],
    highlights: [
      "Parses CSV and Excel spreadsheets.",
      "Message templates with per-row variables.",
      "Preview before sending.",
      "Hosted on my Raspberry Pi server.",
    ],
    nextSteps: [
      "Schedule delayed sends.",
      "Delivery status tracking and reporting.",
    ],
    repoUrl: "https://github.com/ConnorSwis/csv-to-sms",
    liveUrl: "https://sms.connorswis.com",
    demoImage: {
      src: "/demos/csv-to-sms-demo.gif",
      alt: "Spreadsheet SMS Sender Demo",
    },
  },
];

// export const skillGroups: SkillGroup[] = [
//   {
//     title: "Core Languages",
//     skills: ["Bash", "JavaScript", "Python", "SQL", "TypeScript"],
//   },
//   {
//     title: "Frontend + Web",
//     skills: [
//       "Accessibility",
//       "HTML/CSS",
//       "React",
//       "ShadCN UI",
//       "Tailwind CSS",
//       "Vite",
//     ],
//   },
//   {
//     title: "Backend + Infrastructure",
//     skills: [
//       "Bun",
//       "Cloudflare",
//       "Docker",
//       "FastAPI",
//       "Nginx",
//       "Node.js",
//       "PostgreSQL",
//       "Redis",
//     ],
//   },
//   {
//     title: "Data + Automation",
//     skills: [
//       "Async pipelines",
//       "Data visualization",
//       "Geospatial analysis",
//       "Playwright",
//       "Queue-based systems",
//       "Selenium",
//       "Sentiment analysis",
//       "Web scraping",
//     ],
//   },
// ];

// My name is Connor Swislow. I'm a student at Georgia State University studying Mathematics with a concentration in Computer Science.

// I got into scam-baiting in middle school. The idea was simple: call tech support scams and let them connect to a VM instead of a real computer, wasting their time so they couldn't target vulnerable people. That meant learning virtual machines, operating systems, and a lot about how these schemes work. I also got curious about hacking, so I set up Kali Linux and taught myself Metasploit, NetCat, and basic penetration testing tools. Nothing serious—just exploring in a sandbox.

// I picked up a Raspberry Pi and started playing with networking. SSH, FTP, port forwarding. Got my feet wet with actual systems instead of just reading about them.

// Freshman year of high school I started programming in Python. Mostly Discord bots and APIs. One project that stuck: a casino bot with hand-drawn slot machine and blackjack graphics, rendered programmatically. Got 75 stars on GitHub, which felt huge at the time.

// After that I branched into full-stack work. FastAPI for the backend, HTML/CSS/JavaScript for the frontend. Picked up HTMX too. Sophomore year I took AP Computer Science A and scored a 5. I liked security enough to ask my teacher if we could do a dedicated class on it. He agreed, so junior year I took Cybersecurity and Networking, learned Cisco Packet Tracer and how to think about threats.

// That same year I got contracted to reorganize a nonprofit's website. They used WordPress, MailChimp, and GoDaddy. Spent a month restructuring everything and improving their SEO.

// Junior year I also started exploring microservices and Docker. Learned React, which meant learning TypeScript. Tried out Remix, Next.js, Vite, and Bun. Got curious about serverless, edge computing, service workers. The JavaScript ecosystem was moving fast and I wanted to see what stuck.

// Before senior year I worked at In The City Camps as a woodworking specialist. Got good at measuring, hammering, sawing with kids ages 6-14. But I also ended up fixing tech problems for camp leadership, and they promoted me to manage all the camp technology. Handled audio/video equipment, digital records, staff badge production, vendor communication, and finding ways to cut costs.

// For the last couple years I've been building a home lab. Bought a domain, routed it through Cloudflare. Set up Docker, Portainer, and Nginx Proxy Manager on a Raspberry Pi so I could deploy services from anywhere. Added cloud storage, peer-to-peer file transfer, remote access, a mesh VPN, dynamic DNS. Built and deployed a bunch of projects: a client-side QR code generator, SMS sender for spreadsheets, a map poster generator, stream sentiment tracker, and a social media intelligence tool.

export const timeline: TimelineEntry[] = [
  {
    period: "2017-2018",
    title: "Scam-Baiting",
    context:
      "I called tech support scam numbers and let scammers connect to a VM to waste their time instead of targeting real victims.",
    timeline: [
      {
        skill: "Virtual machines and sandboxing",
        learnedBy: "Built a fake Windows VM that scammers could connect to.",
      },
      {
        skill: "Operating systems and hardware",
        learnedBy: "Had to make the VM believable.",
      },
      {
        skill: "Social engineering",
        learnedBy:
          "Spent hours talking to scammers and watching their tactics.",
      },
    ],
  },
  {
    period: "2018",
    title: "Kali Linux Exploration",
    context: "I set up a Kali Linux VM and ran security tools in a sandbox.",
    timeline: [
      {
        skill: "Metasploit",
        learnedBy: "Ran exploits and learned post-exploitation basics.",
      },
      {
        skill: "Netcat and reverse shells",
        learnedBy:
          "Set up listeners and reverse shells to understand remote access.",
      },
      {
        skill: "John the Ripper",
        learnedBy: "Cracked test hashes.",
      },
      {
        skill: "TOR Browser",
        learnedBy: "Explored anonymous browsing.",
      },
    ],
  },
  {
    period: "2018-2019",
    title: "Raspberry Pi Zero W Networking",
    context:
      "I got a Raspberry Pi and started experimenting with networking on it.",
    timeline: [
      {
        skill: "SSH operations",
        learnedBy: "Managed the Pi remotely over SSH.",
      },
      {
        skill: "FileZilla and FTP",
        learnedBy: "Transferred files between machines using FTP.",
      },
      {
        skill: "Network configuration",
        learnedBy:
          "Set static IPs, configured router settings, debugged network issues.",
      },
      {
        skill: "Port forwarding",
        learnedBy: "Exposed services from home to the internet.",
      },
    ],
  },
  {
    period: "2019-2020",
    title: "Freshman Year: Python",
    context:
      "I learned Python in high school by building Discord bots and APIs.",
    timeline: [
      {
        skill: "API development",
        learnedBy: "Built endpoints for my Python projects.",
      },
      {
        skill: "Bot architecture",
        learnedBy:
          "Built Discord bots with commands, event handlers, and persistent data.",
      },
      {
        skill: "Programmatic graphics",
        learnedBy:
          "Made a casino bot with hand-drawn slot and blackjack graphics rendered in code.",
      },
      {
        skill: "Python development",
        learnedBy: "Wrote scripts and bot features that people actually used.",
      },
    ],
  },
  {
    period: "2020-2021",
    title: "Sophomore Year: Web Stack Expansion",
    context:
      "I moved into full-stack development and started building frontends alongside backends. Also took AP Computer Science A and learned Java.",
    timeline: [
      {
        skill: "FastAPI and Jinja",
        learnedBy: "Built dynamic pages with FastAPI and Jinja templates.",
      },
      {
        skill: "HTML, CSS, and JavaScript",
        learnedBy:
          "Wrote HTML, CSS, and JavaScript by hand, wired up to backend routes.",
      },
      {
        skill: "HTMX",
        learnedBy: "Built interactive pages without a full frontend framework.",
      },
      {
        skill: "Java and OOP fundamentals",
        learnedBy: "Learned OOP and algorithms through AP CSA.",
      },
    ],
  },
  {
    period: "2021",
    title: "Nonprofit Website Contract",
    context:
      "I was hired to reorganize a nonprofit's website and improve search visibility.",
    timeline: [
      {
        skill: "SEO optimization",
        learnedBy:
          "Restructured the site and fixed metadata to improve search rankings.",
      },
      {
        skill: "WordPress operations",
        learnedBy:
          "Reorganized pages and navigation so the team could maintain it themselves.",
      },
      {
        skill: "Mailchimp and GoDaddy workflows",
        learnedBy:
          "Set up email campaigns and hosting to work with their workflow.",
      },
      {
        skill: "Client delivery",
        learnedBy:
          "Managed the project over a month, keeping stakeholders informed.",
      },
    ],
  },
  {
    period: "2021-2022",
    title: "Junior Year: Cybersecurity and Networking",
    context:
      "I requested a dedicated cybersecurity class and took it in junior year.",
    timeline: [
      {
        skill: "Cisco Packet Tracer",
        learnedBy:
          "Built and tested network topologies and routing in simulations.",
      },
      {
        skill: "Network troubleshooting",
        learnedBy: "Debugged network problems.",
      },
      {
        skill: "Security design",
        learnedBy:
          "Learned to think about threats and apply practical hardening.",
      },
    ],
  },
  {
    period: "2022",
    title: "Microservices and Full-Stack Sites",
    context: "I built microservices and explored the JavaScript ecosystem.",
    timeline: [
      {
        skill: "React and TypeScript",
        learnedBy: "Built frontend apps with typed React components.",
      },
      {
        skill: "Docker",
        learnedBy:
          "Containerized my projects and set up repeatable deployment workflows.",
      },
      {
        skill: "Remix, Next.js, Vite, and Bun",
        learnedBy:
          "Tried different frameworks to see what worked best for different cases.",
      },
      {
        skill: "Serverless, edge, and service workers",
        learnedBy:
          "Deployed to Vercel, learned edge computing and service workers.",
      },
    ],
  },
  {
    period: "Summers 2023-2025",
    title: "In The City Camps Technology Leadership",
    context:
      "I started as a woodworking specialist and was promoted to oversee technology and business systems.",
    timeline: [
      {
        skill: "A/V systems",
        learnedBy: "Set up and managed all audio and video equipment.",
      },
      {
        skill: "Business communications",
        learnedBy: "Talked to vendors and reps on behalf of the camp.",
      },
      {
        skill: "Digital records management",
        learnedBy: "Organized digital records so they were actually findable.",
      },
      {
        skill: "Technology cost reduction",
        learnedBy: "Found ways to cut tech costs across the camp.",
      },
    ],
  },
  // {
  //   period: "2023-Present",
  //   title: "Georgia State University",
  //   context:
  //     "I am pursuing Mathematics with a Computer Science concentration while working on software projects.",
  //   timeline: [
  //     {
  //       skill: "Long-horizon project execution",
  //       learnedBy:
  //         "Built and maintained multi-year projects across automation and data systems.",
  //     },
  //     {
  //       skill: "Mathematical rigor",
  //       learnedBy:
  //         "Applied formal reasoning to data structures, algorithms, and systems work.",
  //     },
  //   ],
  // },
  {
    period: "2024-Present",
    title: "Home Lab Infrastructure and Deployed Systems",
    context:
      "I built a home lab and deployed multiple projects to a Raspberry Pi server stack.",
    timeline: [
      {
        skill: "Domain and edge routing",
        learnedBy:
          "Bought a domain and routed traffic through Cloudflare. Set up Nginx Proxy Manager to route requests based on URL patterns.",
      },
      {
        skill: "Remote networking stack",
        learnedBy:
          "Set up cloud storage, P2P file transfer, remote access, a mesh VPN, and dynamic DNS.",
      },
      {
        skill: "Self-hosted container platform",
        learnedBy:
          "Set up Docker, Portainer, and Nginx Proxy Manager on a Pi to deploy and manage services remotely.",
      },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    category: "Education",
    school: "Georgia State University",
    program: "B.S. in Computer Science",
    period: "2023 - Present",
    location: "Atlanta, Georgia",
    details:
      "GPA: 3.8/4.0. Dean's List every semester (Fall 2023–Spring 2026). Relevant coursework includes Data Structures, Computer Science II, Discrete Mathematics, Calculus III, Applied Probability & Statistics, and Physics II.",
  },
  {
    category: "Education",
    school: "The Weber School",
    program: "Honors Diploma in STEM",
    period: "2019 - 2023",
    location: "Sandy Springs, Georgia",
    details:
      "AP Scholar with Distinction and National Honor Society. Completed AP Computer Science A, AP Calculus BC, Multivariable Calculus, Cybersecurity, and Networking coursework.",
  },
];

export const guestbookEntries: GuestbookEntry[] = [
  {
    handle: "@connorsmom",
    note: "Proud of you, Connor! Keep up the great work!",
  },
  {
    handle: "@infowarrior23",
    note: "I love Connor, he's super smart and handsome!",
  },
  {
    handle: "@mikemikington",
    note: "Connor's projects are always so impressive!",
  },
];
