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
        "This system continuously monitors selected Rumble channels, detects live broadcasts, ingests chat + viewer telemetry, and serves live analytics to a polling React dashboard.",
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
            "FastAPI + Uvicorn power the API server, lifecycle hooks, middleware, and routing.",
            "Playwright (Chromium) + asyncio run channel polling and per-stream live chat/viewership scraping.",
            "SQLAlchemy 2 (async) + Pydantic v2 handle ORM models, query layers, and request/response schemas.",
            "Ingestion uses an asyncio.Queue with batched upserts for users, messages, badges, and subscriptions.",
            "API response optimization uses an in-process TTL cache and persisted historical analytics snapshots.",
          ],
        },
        {
          title: "Frontend Technologies",
          items: [
            "React 19 + TypeScript + Vite for the SPA and build tooling.",
            "wouter provides client routing for / , /channel/:id, and /stream/:id.",
            "Axios powers API calls with retry interceptors for transient network/5xx failures.",
            "Chart.js + react-chartjs-2 render stream and channel analytics visualizations.",
            "UI styling uses Tailwind CSS v4 with selected Radix UI primitives.",
          ],
        },
        {
          title: "Data + Runtime Technologies",
          items: [
            "Default DB is SQLite (aiosqlite), with support for Postgres-compatible URLs via DATABASE_URL.",
            "file_store/ holds DB files, logs, and localized badge assets.",
            "Badge files are served by FastAPI static mounts at /api/badge-images/*.",
            "Schema evolution is managed with Alembic migrations.",
            "The ingestion queue is in-memory, so unconsumed events are not durable across restarts.",
          ],
        },
        {
          title: "Deployment Technologies",
          items: [
            "Docker Compose orchestrates backend and frontend services.",
            "Backend container: python:3.13-slim + Playwright Chromium, running uvicorn main:app.",
            "Frontend container: node:20-alpine build stage + nginx:1.27-alpine runtime stage.",
            "Nginx serves the SPA and reverse-proxies /api requests to the backend service.",
            "Persistent app data uses the rumble_file_store Docker volume.",
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
            "Manager refreshes monitored channels from DB.",
            "Monitors scrape channel pages for live cards/stream URLs.",
            "Per-stream watcher starts on live detection.",
            "Watcher is cancelled when stream is idle.",
          ],
        },
        {
          title: "Ingestion + Consumer Flow",
          steps: [
            "`watch_stream()` extracts metadata, messages, badges, donations, and viewership samples.",
            "Normalized ExtractedMessage events are queued.",
            "Consumer adapts batch size and performs conflict-safe upserts.",
            "User state/history and badge localization are persisted.",
          ],
        },
        {
          title: "Analytics + UI Flow",
          steps: [
            "Frontend polls channels, stream metrics, and enriched messages.",
            "Backend serves DB aggregations and cached analytics snapshots.",
            "Live views use shorter refresh intervals than historical views.",
            "Dashboards render channel-level and stream-level drill-down analytics.",
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
        "Docker Compose mode serves frontend via Nginx and proxies /api to FastAPI backend.",
        "Backend container runs scraper + ingestion + API against persistent rumble_file_store volume.",
        "Local dev mode (make dev) runs frontend/backend with Vite /api proxy support.",
        "Scraper reliability depends on Rumble DOM selectors and may need periodic maintenance.",
        "Two .env.example flags (RUN_STARTUP_MIGRATIONS, LOCALIZE_BADGES_DURING_STARTUP) are currently not consumed at runtime.",
      ],
    },
    problem:
      "Livestream chat moves fast and it's all unstructured text. Tracking what people are saying, who's saying it (even when they change usernames), and how sentiment shifts over time isn't something you can do manually.",
    architecture:
      "Playwright watches active streams and feeds messages into an async processing queue. Messages get normalized, tagged with user metadata, and stored in PostgreSQL for analysis and visualization.",
    stack: ["FastAPI", "Playwright", "Python", "Redis", "SQLAlchemy"],
    highlights: [
      "Continuously scrapes live chat from active streams.",
      "Tracks users even when they change their username or profile.",
      "Runs sentiment scoring on messages for visualization.",
      "Uses async queues so it can handle high message volume.",
    ],
    nextSteps: [
      "Scale to handle millions of messages.",
      "Add topic modeling and toxicity detection.",
      "Build a dashboard to explore chat trends over time.",
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
      "Public social media data is scattered and messy. It's hard to spot patterns in activity, track accounts that change names, or see where things are happening geographically without building tools to do it.",
    architecture:
      "A FastAPI service orchestrates Apify scrapers that pull Instagram posts and profile metadata. Celery workers (with Redis as broker) run scheduled auto-updates, download media locally, and normalize records into versioned Markdown files via Jinja templates. Geographic and relationship layers sit on top for visualization.",
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
      "Automated pipelines that scrape public Instagram posts and profiles via Apify.",
      "Scheduled auto-updates and profile caching keep accounts tracked even when usernames or profiles change.",
      "Local media download and a versioned Markdown export pipeline produce a portable knowledge base.",
      "Maps activity geographically and structures data for network/relationship analysis.",
    ],
    nextSteps: [
      "Add community detection and network analysis.",
      "Add sentiment and topic modeling.",
      "Build interactive dashboards for exploring the data.",
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
      "Map data has tons of detail but it doesn't look good as-is. Turning raw street geometry into something you'd actually want to print and hang up takes a custom rendering pipeline.",
    architecture:
      "Pulls street and place geometry from OpenStreetMap, runs it through custom rendering logic, and outputs themed poster designs with consistent styling.",
    stack: ["FastAPI", "Flask", "Matplotlib", "OSMnx", "Python"],
    highlights: [
      "Repeatable pipeline that generates posters for any city.",
      "Multiple themes and color schemes to choose from.",
      "Outputs high-res images that are print-ready.",
      "Combines data processing with design in one tool.",
    ],
    nextSteps: [
      "Add a web UI for customizing posters.",
      "Let users pick any location and save theme presets.",
      "Add more export options for different print sizes.",
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
      "Managing media across a bunch of different services by hand is a pain. I wanted everything automated, from finding new releases to organizing files to streaming them.",
    architecture:
      "A stack of containerized services handles media discovery, downloading, indexing, and streaming. Reverse proxies and storage mounts tie everything together into a single platform.",
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
      "Automates the whole flow from finding media to streaming it.",
      "Handles storage, networking, and persistent data across all services.",
      "Gave me hands-on experience running production-style infrastructure.",
    ],
    nextSteps: [
      "Add better monitoring and health checks.",
      "Set up proper backups and tighten remote access.",
      "Automate more of the maintenance.",
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
      "I wanted to host my own projects without paying for cloud hosting, and building the infrastructure myself teaches you way more about how systems actually work.",
    architecture:
      "Traffic comes in through my domain via Cloudflare, hits Nginx Proxy Manager for routing, and gets forwarded to Docker containers managed through Portainer. A mesh VPN lets me deploy and manage everything remotely.",
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
      "Runs a full container platform on a Raspberry Pi.",
      "Routes my domain through Cloudflare and Nginx Proxy Manager.",
      "Set up cloud storage, file transfer, and remote access.",
      "Built a mesh VPN for managing everything remotely.",
      "Hosts multiple live projects.",
    ],
    nextSteps: [
      "Add monitoring and alerts.",
      "Automate backups.",
      "Add more hardware to expand capacity.",
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
      "I wanted casino-style games in Discord with images and animation instead of only text commands.",
    architecture:
      "The bot uses discord.py for commands and async events. User data is saved in SQLite. Pillow is used to render blackjack table images and slot GIFs. The repo also includes a FastAPI web demo that runs the same game logic.",
    stack: ["Python", "discord.py", "FastAPI", "Pillow", "asyncio", "SQLite"],
    highlights: [
      "Blackjack with image-based table rendering.",
      "Slots with animated GIF reels.",
      "Persistent money and credits for each user.",
      "Owner commands for economy management.",
    ],
    nextSteps: ["Archived, no further development planned."],
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
      "Most QR code generators online send your input to a server. That's unnecessary and a privacy concern, especially for sensitive content.",
    architecture:
      "Everything runs in the browser using JavaScript. Input gets encoded locally and the QR code is rendered to a canvas element for download.",
    stack: ["HTML", "CSS", "JavaScript", "Canvas API"],
    highlights: [
      "No server calls, everything happens in the browser.",
      "Supports different content types and sizes.",
      "Hosted on my Raspberry Pi server.",
    ],
    nextSteps: [
      "Add batch generation from CSV input.",
      "Support custom styling and branding on generated codes.",
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
    problem:
      "Sending individual texts to a big list of contacts by hand is tedious and error-prone. This automates it.",
    architecture:
      "The frontend lets you upload a spreadsheet and preview templated messages with per-row variables. The backend processes the data and sends messages through an SMS API.",
    stack: ["Python", "FastAPI", "JavaScript", "HTML/CSS"],
    highlights: [
      "Parses CSV and Excel spreadsheets.",
      "Supports message templates with per-row variables.",
      "Previews messages before sending.",
      "Hosted on my Raspberry Pi server.",
    ],
    nextSteps: [
      "Add scheduling for delayed message sends.",
      "Support delivery status tracking and reporting.",
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

// My name is connor swislow I am (calculate age using my birthday 9/24/2004) years old and I am a student at Georgia State University studying Mathematics with a concentration in Computer Science.

// The first point in my programming journey started when I was in middle school. I saw videos of "Scam Baiting" where people would intentionally call known tech support scam numbers to waste their time which would prevent the scammers from speaking with real vulnerable victims. Part of the scam was getting permission from the victim to allow the scammer access to the computer, where they would usually try to convince you there are hackers on the computer and display a bill for an antivirus package that costs somewhere around $700. This step of gaining access to the victim's computer is crucial for filtering victims to see who is willing and trusting enough to give complete strangers full access to their computers. Of course, if you're scambaiting, it would be a horrible idea to use your real personal computer to do this. So, I learned about virtual machines to set up a fake windows machine to allow scammers to connect. I would spend hours baiting the scammers in middle school. This taught me a lot about operating systems, hardware, and social engineering and it introduced me to Linux. I was very interested in hacking at this time, so I installed a kali linux virtual machine to learn about hacking. I learned about Metasploit, Jack the Ripper, NetCat, WireShark, reverse shell attacks, remote access trojans, and internet protocols, all around the ages of 13-14.

// I bought a Raspberry Pi Zero W around this time so I could test out some of the penetration testing skills I had learned about. But this introduced me to networking in a way that helped me go on to gain a deep understanding of networks. I learned about internet configuration, port forwarding, FileZilla/FTP, and SSH.

// I began programming in high school as a freshman when I was introduced to Python. I learned quickly by making discord bots and API's. One special project from that time was a casino bot that had an animated slot machine and a graphical blackjack table, all hand drawn and rendered programmatically, and a currency system. This project ended up getting 75 stars on Github.

// During that time, I also branched out to full stack development when I used FastAPI to serve endpoints with Jinja templates. I would write the HTML, CSS, and eventually javascript. I also learned HTMX at this time.

// As a sophomore, I took AP Computer Science A, which I got a 5 on the exam. I asked the teacher to make a class about cybersecurity because I was very interested in it at the time, to which he agreed. So, in my junior year I took a class in Cybersecurity and Networking, where I learned Cisco Packet Tracer. During my sophomore year, I was contracted to reorganize the website for a non-profit which was focused on creating communities of people of all faiths. Their system used WordPress, MailChimp, and GoDaddy. I spent a month restructuring their site and boosting their SEO.

// Then in my junior year of high school, I started exploring microservices and learned how to use Docker and build and distribute apps. I also started learning React which taught me TypeScript. I learned the full stack framework, Remix.run. But that time had a lot of developments in the full stack space so I explored lots of softwares and tools like Next.js, Vite, Bun, Tailwind Css, Firebase, Vercel, Clerk, Stripe, and Redis. I learned about serverless function, edge computing, and service workers.

// Over the summer break before my senior year, I worked at In The City Camps, a non-profit summer camp, as a Woodworking Specialist, engaging children ages 6-14 in shop skills like measuring, hammering, and sawing. At summer camp, I stepped up and helped leadership with all sorts of technology related problems, and they promoted me to be in charge of all the technology in the camp and some of the business/enterprise related tech. I was responsible over audio and video equipment, organizing and managing digital records, designing and printing staff badges, communicating with representatives from external companies on behalf of the non-profit, and reducing expenses around technology.

// Over the last two years, I have been working on my home lab. I bought my personal domain and routed it through cloudflare. On my pi, I set up docker, portainer, and nginx proxy manager, and these allow me to deploy any docker image from anywhere in the world. I set up cloud storage, p2p file transfer, remote access, a Virtual Private Mesh Network, and dynamic DNS. I started building projects and deploying them to the server. I made a client-side qr-code generator, a website to send texts to people on a spreadsheet, a map creator that generates a themed map of a specified location, a website that tracks sentiment on a stream site, and a social media tracker that automatically tracks and maps social media activity of specified accounts.

export const journeyTimeline: TimelineEntry[] = [
  {
    period: "2017-2018",
    title: "Scam-Baiting",
    context:
      "As a middle schooler, I got into scam-baiting, where I would call tech support scam numbers and let scammers connect to a virtual machine to waste their time and prevent them from scamming real victims.",
    skillJourney: [
      {
        skill: "Virtual machines and sandboxing",
        learnedBy:
          "Set up and seeded a fake Windows VM for scammers to connect to.",
      },
      {
        skill: "Operating systems and hardware",
        learnedBy:
          "Had to understand system internals to make the VM look real.",
      },
      {
        skill: "Social engineering",
        learnedBy:
          "Spent hours talking to scammers, learning how they operate.",
      },
    ],
  },
  {
    period: "2018",
    title: "Kali Linux Exploration",
    context:
      "I set up a Kali Linux VM and practiced offensive-security concepts in a controlled environment.",
    skillJourney: [
      {
        skill: "Metasploit",
        learnedBy: "Ran exploits and learned the basics of post-exploitation.",
      },
      {
        skill: "Netcat and reverse shells",
        learnedBy:
          "Set up listeners and reverse shells to see how remote access works.",
      },
      {
        skill: "John the Ripper",
        learnedBy: "Cracked test passwords and hashes.",
      },
      {
        skill: "TOR Browser",
        learnedBy: "Explored anonymous browsing and the dark web.",
      },
    ],
  },
  {
    period: "2018-2019",
    title: "Raspberry Pi Zero W Networking",
    context:
      "As an eighth grader, I received a Raspberry Pi Zero W and I began experimenting on it.",
    skillJourney: [
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
          "Configured static IPs, router settings, and fixed network issues.",
      },
      {
        skill: "Port forwarding",
        learnedBy: "Set up port forwarding to expose services from home.",
      },
    ],
  },
  {
    period: "2019-2020",
    title: "Freshman Year: Python",
    context:
      "I started programming with Python in high school and learned quickly by building bots and APIs.",
    skillJourney: [
      {
        skill: "API development",
        learnedBy: "Built API endpoints for my Python projects.",
      },
      {
        skill: "Bot architecture",
        learnedBy:
          "Built Discord bots with commands, event handlers, and persistent data.",
      },
      {
        skill: "Programmatic graphics",
        learnedBy:
          "Made a casino bot with hand-drawn slot machine and blackjack graphics rendered in code.",
      },
      {
        skill: "Python development",
        learnedBy: "Wrote scripts and bot features that actually got used.",
      },
    ],
  },
  {
    period: "2020-2021",
    title: "Sophomore Year: Web Stack Expansion",
    context:
      "I moved into full-stack development and started building frontends, not just backends. Also took AP Computer Science A and learned Java.",
    skillJourney: [
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
        learnedBy:
          "Used HTMX for interactive pages without needing a full frontend framework.",
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
      "I was contracted to reorganize an interfaith nonprofit site and improve search visibility.",
    skillJourney: [
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
          "Got their email campaigns and hosting set up to work with their existing workflow.",
      },
      {
        skill: "Client delivery",
        learnedBy:
          "Managed the project over a month, communicating with stakeholders throughout.",
      },
    ],
  },
  {
    period: "2021-2022",
    title: "Junior Year: Cybersecurity and Networking",
    context:
      "After I requested a dedicated class, I took Cybersecurity and Networking in junior year.",
    skillJourney: [
      {
        skill: "Cisco Packet Tracer",
        learnedBy:
          "Built and tested network topologies and routing in simulations.",
      },
      {
        skill: "Network troubleshooting",
        learnedBy: "Debugged network issues.",
      },
      {
        skill: "Security design",
        learnedBy:
          "Learned to think about threats and apply practical security hardening.",
      },
    ],
  },
  {
    period: "2022",
    title: "Microservices and Full-Stack Sites",
    context:
      "I built microservices and explored the evolving JavaScript ecosystem.",
    skillJourney: [
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
          "Tried out different frameworks to see what worked best for different use cases.",
      },
      {
        skill: "Serverless, edge, and service workers",
        learnedBy:
          "Deployed to Vercel, learned about edge computing and service workers.",
      },
    ],
  },
  {
    period: "Summers 2023-2025",
    title: "In The City Camps Technology Leadership",
    context:
      "I started as a woodworking specialist, then was promoted to oversee technology and business-side systems.",
    skillJourney: [
      {
        skill: "A/V systems",
        learnedBy: "Set up and managed all the audio/video equipment.",
      },
      {
        skill: "Business communications",
        learnedBy: "Talked to vendors and reps on behalf of the camp.",
      },
      {
        skill: "Digital records management",
        learnedBy:
          "Organized digital records so things were actually findable.",
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
  //   skillJourney: [
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
      "Over the last two years, I have built a home lab, then deployed multiple full projects to a Raspberry Pi server stack.",
    skillJourney: [
      {
        skill: "Domain and edge routing",
        learnedBy:
          "Bought my own domain and routed traffic through Cloudflare to protect my server. Set up Nginx Proxy Manager to route requests to different services based on URL patterns.",
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
    program: "B.S. in Mathematics (Concentration in Computer Science)",
    period: "2023 - Present",
    location: "Atlanta, Georgia",
    details:
      "Studying math with a CS concentration. Coursework includes Discrete Math, Linear Algebra, Analysis, Data Structures, Systems Programming, and Computer Architecture.",
  },
  {
    category: "Education",
    school: "The Weber School",
    program: "High School Coursework",
    period: "2019 - 2023",
    location: "Sandy Springs, Georgia",
    details:
      "Completed AP Computer Science A, AP Calculus BC, and multivariable calculus, plus advanced cybersecurity/networking coursework while building practical software and infrastructure projects. Also earned National Honor Society membership, AP Scholar with Distinction, and an honors diploma distinction for dedication to Science, Technology, Engineering, and Design.",
  },
  {
    category: "Experience",
    school: "In The City Camps",
    program: "Woodworking Specialist -> Technology Lead",
    period: "Summers 2023-2025",
    details:
      "Started as a woodworking specialist and was promoted to manage camp technology operations, including A/V systems, digital records, staff badge production, vendor communication, and cost reductions.",
  },
  {
    category: "Experience",
    school: "Interfaith Nonprofit Website Project",
    program: "Web and SEO Contractor",
    period: "2021",
    details:
      "Contracted to reorganize the nonprofit website, improve search visibility, and modernize key operational workflows across hosting and communications tools.",
  },
];

export const guestbookEntries: GuestbookEntry[] = [
  {
    handle: "@packetwizard",
    note: "Your automation stack rules. Keep shipping weird internet tools.",
  },
  {
    handle: "@data_hacker88",
    note: "This page loaded in 56k mode and still looks incredible.",
  },
  {
    handle: "@sysadmin_mom",
    note: "Respect for running a full self-hosted media stack at home.",
  },
];
