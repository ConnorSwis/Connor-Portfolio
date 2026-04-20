export type ProjectSignal = "cyan" | "amber" | "green";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  status: string;
  timeline: string;
  signal: ProjectSignal;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  highlights: string[];
  nextSteps: string[];
  repoUrl?: string;
  liveUrl?: string;
  demoImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type EducationEntry = {
  school: string;
  program: string;
  period: string;
  details: string;
};

export type GuestbookEntry = {
  handle: string;
  note: string;
};

export type SkillJourney = {
  skill: string;
  learnedBy: string;
};

export type TimelineEntry = {
  period: string;
  title: string;
  context: string;
  skillJourney: SkillJourney[];
};
