import type {
  EducationEntry,
  GuestbookEntry,
  Project,
  ProjectSignal,
  // SkillGroup,
  TimelineEntry,
} from "../types/portfolio";

export const projects: Project[] = [
  {
    slug: "rumble-chat-intelligence",
    title: "Rumble Chat Intelligence Pipeline",
    tagline: "Real-time ingestion and analysis of livestream chat at scale.",
    status: "Active Development",
    timeline: "2025–Present",
    signal: "cyan",
    summary:
      "A real-time data pipeline that collects, processes, stores, and analyzes livestream chat messages to extract sentiment, trends, and user-level behavioral insights.",
    problem:
      "Livestream chat is high-volume, unstructured, and difficult to analyze in real time, especially when tracking message flow, user identity changes, and long-term trends.",
    architecture:
      "Browser automation monitors active streams and ingests messages into an asynchronous processing pipeline. Messages are normalized, queued, enriched with user metadata, and stored in a database for downstream analysis and visualization.",
    stack: [
      "FastAPI",
      "Playwright",
      "PostgreSQL",
      "Python",
      "Redis",
      "SQLAlchemy",
    ],
    highlights: [
      "Built a continuous ingestion system for live chat message streams.",
      "Tracked users across changing usernames and profile metadata.",
      "Integrated sentiment scoring for downstream visualization and analysis.",
      "Designed the system around asynchronous queues to support scale.",
    ],
    nextSteps: [
      "Scale the processing pipeline to millions of messages.",
      "Add topic modeling, toxicity detection, and richer language analysis.",
      "Build a historical dashboard for chat trends and activity exploration.",
    ],
  },
  {
    slug: "social-media-intelligence-mapper",
    title: "Social Media Intelligence & Mapping System",
    tagline:
      "Automated ingestion and geographic mapping of public social media activity.",
    status: "Active Development",
    timeline: "2025–Present",
    signal: "amber",
    summary:
      "A system for scraping, structuring, and analyzing public social media activity, with tools for mapping geographic patterns and relationships between accounts.",
    problem:
      "Public social media data is fragmented and unstructured, making it difficult to analyze activity patterns, identity changes, relationships, and location-based trends at scale.",
    architecture:
      "Automated scraping pipelines ingest posts and account metadata, normalize entities such as users and locations, and store structured records for downstream analysis. Geographic and relationship layers make it possible to visualize regional patterns and account networks.",
    stack: [
      "FastAPI",
      "Playwright",
      "PostgreSQL",
      "Python",
      "Redis",
      "Selenium",
    ],
    highlights: [
      "Built automated pipelines for collecting public social media data.",
      "Normalized accounts across changing usernames and profile details.",
      "Mapped activity geographically to identify location-based patterns.",
      "Structured data for future network analysis and relationship visualization.",
    ],
    nextSteps: [
      "Add community detection and account network analysis.",
      "Integrate sentiment and topic modeling into the analysis layer.",
      "Build interactive dashboards for exploring mapped activity.",
    ],
  },
  {
    slug: "map-to-poster",
    title: "MapToPoster Generator",
    tagline:
      "Generate stylized city posters from geospatial data and custom rendering pipelines.",
    status: "Active Build",
    timeline: "2025",
    signal: "amber",
    summary:
      "A geospatial design tool that transforms OpenStreetMap data into stylized poster-quality visual outputs for cities and locations.",
    problem:
      "Raw map data is technically rich but not directly suited for attractive visual presentation or print-ready designs.",
    architecture:
      "The system pulls street and place geometry from geospatial sources, processes it through custom rendering logic, and outputs themed poster designs with consistent styling and layout control.",
    stack: ["FastAPI", "Flask", "Matplotlib", "OSMnx", "Python"],
    highlights: [
      "Built a repeatable rendering pipeline for city poster generation.",
      "Created custom themes and styling options for visual variety.",
      "Generated high-resolution outputs suitable for print and display.",
      "Combined engineering and design considerations in one tool.",
    ],
    nextSteps: [
      "Add a browser-based UI for customization.",
      "Support user-defined locations and theme presets.",
      "Expand the export system for print-ready templates and layouts.",
    ],
  },
  {
    slug: "media-server-stack",
    title: "Self-Hosted Media Server Stack",
    tagline:
      "Docker-based infrastructure for automated media acquisition, organization, and streaming.",
    status: "Operational",
    timeline: "2024–Present",
    signal: "cyan",
    summary:
      "A self-hosted media platform running in Docker with automated services for downloading, organizing, indexing, and streaming media across a home-lab environment.",
    problem:
      "Managing media manually across multiple services is time-consuming, fragmented, and difficult to maintain without consistent infrastructure.",
    architecture:
      "The stack uses containerized services for media acquisition, indexing, download management, and streaming. Reverse proxies, storage mounts, and service orchestration create a stable internal platform for long-term operation.",
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
      "Deployed and maintained a multi-service media stack in Docker.",
      "Integrated acquisition, organization, and streaming into one platform.",
      "Managed storage, networking, and service persistence across the stack.",
      "Built practical experience with self-hosting and infrastructure operations.",
    ],
    nextSteps: [
      "Improve observability and service health monitoring.",
      "Harden remote access and backup workflows.",
      "Expand automation for maintenance and lifecycle management.",
    ],
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
          "Explored system internals to maintain a believable baiting environment.",
      },
      {
        skill: "Social engineering",
        learnedBy:
          "Interacted with scammers to understand their tactics and psychology.",
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
        learnedBy:
          "Used modules to understand exploit flow and post-exploitation basics.",
      },
      {
        skill: "Netcat and reverse shells",
        learnedBy:
          "Practiced listener/client setups to understand remote shell mechanics.",
      },
      {
        skill: "John the Ripper",
        learnedBy: "Ran password-cracking exercises on test data and hashes.",
      },
      {
        skill: "TOR Browser",
        learnedBy: "Exploring anonymous browsing and the dark web.",
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
        learnedBy:
          "Managed remote sessions, keys, and command-line administration.",
      },
      {
        skill: "FileZilla and FTP",
        learnedBy:
          "Moved files between hosts and compared transfer protocols in practice.",
      },
      {
        skill: "Network configuration",
        learnedBy:
          "Set static addresses, tuned router settings, and debugged connectivity.",
      },
      {
        skill: "Port forwarding",
        learnedBy:
          "Opened and tested external service access from home infrastructure.",
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
        learnedBy:
          "Created API endpoints as an interface for my python projects.",
      },
      {
        skill: "Bot architecture",
        learnedBy:
          "Designed commands, event handlers, and persistence for Discord bots.",
      },
      {
        skill: "Programmatic graphics",
        learnedBy:
          "Built a casino bot with custom slot and blackjack visuals rendered with code.",
      },
      {
        skill: "Python development",
        learnedBy: "Built production-style scripts and bot features.",
      },
    ],
  },
  {
    period: "2020-2021",
    title: "Sophomore Year: Web Stack Expansion",
    context:
      "I moved into full-stack development which explanded my skill set from just backend. And I was in Computer Science A learning Java.",
    skillJourney: [
      {
        skill: "FastAPI and Jinja",
        learnedBy: "Served dynamic endpoints and template-rendered pages.",
      },
      {
        skill: "HTML, CSS, and JavaScript",
        learnedBy:
          "Hand-written frontend interfaces tied directly to backend routes.",
      },
      {
        skill: "HTMX",
        learnedBy:
          "HTML that is generated server-side but has client-side interactivity without a full SPA framework.",
      },
      {
        skill: "Java and OOP fundamentals",
        learnedBy:
          "Applied class design and core algorithms through AP CSA coursework.",
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
          "Reworked structure and metadata to improve discovery and traffic quality.",
      },
      {
        skill: "WordPress operations",
        learnedBy:
          "Restructured pages, navigation, and content ownership for maintainability.",
      },
      {
        skill: "Mailchimp and GoDaddy workflows",
        learnedBy:
          "Integrated campaign and hosting workflows with existing business processes.",
      },
      {
        skill: "Client delivery",
        learnedBy:
          "Shipped a month-long scoped engagement with stakeholder communication.",
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
          "Built and validated simulated network topologies and routing paths.",
      },
      {
        skill: "Network troubleshooting",
        learnedBy:
          "Diagnosed failures in addressing, routing, and service connectivity.",
      },
      {
        skill: "Security design",
        learnedBy:
          "Mapped threat scenarios to practical hardening and monitoring choices.",
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
        learnedBy:
          "Built interactive frontend interfaces with typed components and state management.",
      },
      {
        skill: "Docker",
        learnedBy:
          "Containerized services and built repeatable deployment workflows for projects and experiments.",
      },
      {
        skill: "Remix, Next.js, Vite, and Bun",
        learnedBy:
          "Explored modern full-stack frameworks to understand their tradeoffs and capabilities.",
      },
      {
        skill: "Serverless, edge, and service workers",
        learnedBy:
          "Deployed projects to serverless platforms with Vercel. Learned about edge computing and client-side service workers for offline and background processing.",
      },
    ],
  },
  {
    period: "Summer 2022",
    title: "In The City Camps Technology Leadership",
    context:
      "I started as a woodworking specialist, then was promoted to oversee technology and business-side systems.",
    skillJourney: [
      {
        skill: "A/V systems operations",
        learnedBy: "Managed audio/video equipment setup and usage.",
      },
      {
        skill: "Business communications",
        learnedBy:
          "Worked with external representatives on behalf of the camp.",
      },
      {
        skill: "Digital records management",
        learnedBy:
          "Organized operational data for faster retrieval and cleaner workflows.",
      },
      {
        skill: "Technology cost optimization",
        learnedBy:
          "Audited tooling choices and reduced recurring expenses across camp systems.",
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
          "Built cloud storage, P2P file transfer, remote access, virtual private mesh networking, and dynamic DNS workflows.",
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
    school: "Georgia State University",
    program: "B.S. in Mathematics (Concentration in Computer Science)",
    period: "2023 - Present",
    details:
      "Studying mathematics with a computer science concentration. I have learned Discrete Mathematics, Linear Algebra, Multivariable Calculus, Differential Equations, and Analysis. I have also taken courses in Data Structures, System Level Programming, and Computer Architecture.",
  },
  {
    school: "Independent Projects",
    program: "Practical Systems Development",
    period: "Ongoing",
    details:
      "Built real-world software systems involving scraping, automation, full-stack web development, infrastructure, data pipelines, and geospatial visualization.",
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

export const signalLabels: Record<ProjectSignal, string> = {
  cyan: "STABLE",
  amber: "ACTIVE",
  green: "EXPLORATION",
};
