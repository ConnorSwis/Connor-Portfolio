import { useEffect, useState, type FormEvent } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { RetroFrame } from "../components/RetroFrame";
import { RouteLink } from "../components/RouteLink";
import { SectionFallback } from "../components/SectionFallback";
import {
  education,
  guestbookEntries,
  journeyTimeline,
  projects,
  // skillGroups,
} from "../server/portfolioData";
import type { GuestbookEntry } from "../types/portfolio";

const guestbookStorageKey = "retro-guestbook-entries-v1";

const isGuestbookEntry = (value: unknown): value is GuestbookEntry => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.handle === "string" && typeof candidate.note === "string"
  );
};

const normalizeStoredGuestbook = (value: unknown): GuestbookEntry[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isGuestbookEntry)
    .map((entry) => ({
      handle: entry.handle.trim() || "@anonymous",
      note: entry.note.trim(),
    }))
    .filter((entry) => entry.note.length > 0)
    .slice(0, 50);
};

const calculateAge = (
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  referenceDate: Date = new Date(),
): number => {
  const monthIndex = birthMonth - 1;
  const yearsSinceBirth = referenceDate.getFullYear() - birthYear;
  const alreadyHadBirthday =
    referenceDate.getMonth() > monthIndex ||
    (referenceDate.getMonth() === monthIndex &&
      referenceDate.getDate() >= birthDay);

  return alreadyHadBirthday ? yearsSinceBirth : yearsSinceBirth - 1;
};

type HomePageProps = {
  visitorCount: number;
};

export function HomePage({ visitorCount }: HomePageProps) {
  const currentAge = calculateAge(2004, 9, 24);
  const [photoMissing, setPhotoMissing] = useState<boolean>(false);
  const [isPhotoHovered, setIsPhotoHovered] = useState<boolean>(false);
  const [isPhotoPinned, setIsPhotoPinned] = useState<boolean>(false);
  const [guestbookList, setGuestbookList] =
    useState<GuestbookEntry[]>(guestbookEntries);
  const [guestHandle, setGuestHandle] = useState<string>("");
  const [guestMessage, setGuestMessage] = useState<string>("");
  const [guestbookStatus, setGuestbookStatus] = useState<string>("");

  useEffect(() => {
    const hdImage = new Image();
    hdImage.src = "/profile_hd.png";
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(guestbookStorageKey);

      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored) as unknown;
      const normalized = normalizeStoredGuestbook(parsed);

      if (normalized.length > 0) {
        setGuestbookList(normalized);
      }
    } catch {
      setGuestbookStatus("Local storage is unavailable in this browser.");
    }
  }, []);

  const isHdPhotoActive = isPhotoHovered || isPhotoPinned;
  const profilePhotoSrc = isHdPhotoActive
    ? "/profile_hd.png"
    : "/profile_retro.png";

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGuestbookSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedHandle = guestHandle.trim().replace(/^@+/, "");
    const normalizedMessage = guestMessage.trim();

    if (!normalizedHandle || !normalizedMessage) {
      setGuestbookStatus("Enter both a name and a message.");
      return;
    }

    const nextEntry: GuestbookEntry = {
      handle: `@${normalizedHandle.slice(0, 32)}`,
      note: normalizedMessage.slice(0, 220),
    };
    const nextEntries = [nextEntry, ...guestbookList].slice(0, 50);

    setGuestbookList(nextEntries);
    setGuestHandle("");
    setGuestMessage("");

    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          guestbookStorageKey,
          JSON.stringify(nextEntries),
        );
      }
      setGuestbookStatus("Saved locally on this browser.");
    } catch {
      setGuestbookStatus("Message added, but local storage is unavailable.");
    }
  };

  return (
    <RetroFrame
      onJumpToSection={scrollToSection}
      tickerText="WELCOME TO CONNOR'S SITE :: ENGINEERING, AUTOMATION, DATA PIPELINES, SELF-HOSTED SYSTEMS"
      visitorCount={visitorCount}
    >
      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card hero-card"
            id="top"
            message="The profile section failed to load."
            title="Profile"
          />
        }
        name="HomeHero"
      >
        <section className="retro-card hero-card" id="top">
          <h1>Connor's Cyber Portfolio Terminal</h1>
          <p className="blink-text">THIS SITE IS ALWAYS UNDER CONSTRUCTION</p>
          <p>
            Full-stack engineer building data pipelines, automation tools, and
            self-hosted systems.
          </p>

          <div className="hero-grid">
            <div className="portrait-shell">
              {!photoMissing && (
                <img
                  alt="Portrait of Connor Swislow"
                  onBlur={() => setIsPhotoHovered(false)}
                  onClick={() => setIsPhotoPinned((previous) => !previous)}
                  onFocus={() => setIsPhotoHovered(true)}
                  onError={() => setPhotoMissing(true)}
                  onMouseEnter={() => setIsPhotoHovered(true)}
                  onMouseLeave={() => setIsPhotoHovered(false)}
                  src={profilePhotoSrc}
                />
              )}
              {photoMissing && (
                <div className="photo-fallback">
                  <p>Photo unavailable</p>
                </div>
              )}
            </div>

            <table className="facts-table" role="presentation">
              <tbody>
                <tr>
                  <th scope="row">Name</th>
                  <td>Connor Swislow</td>
                </tr>
                <tr>
                  <th scope="row">Age</th>
                  <td>{currentAge} (Born 09/24/2004)</td>
                </tr>
                <tr>
                  <th scope="row">School</th>
                  <td>Georgia State University</td>
                </tr>
                <tr>
                  <th scope="row">Major</th>
                  <td>Mathematics (Computer Science concentration)</td>
                </tr>
                <tr>
                  <th scope="row">Location</th>
                  <td>Atlanta, Georgia</td>
                </tr>
                <tr>
                  <th scope="row">Current Focus</th>
                  <td>Automation, data pipelines, and full-stack systems</td>
                </tr>
                <tr>
                  <th scope="row">Availability</th>
                  <td>Open to internships, research, and engineering roles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card timeline-card"
            id="timeline"
            message="The timeline section failed to load."
            title="Journey Timeline"
          />
        }
        name="HomeTimeline"
      >
        <section className="retro-card timeline-card" id="timeline">
          <h2>Journey Timeline</h2>
          <p className="section-note">
            How I picked up each skill along the way.
          </p>
          <ol className="timeline-list">
            {journeyTimeline.map((entry) => (
              <li
                className="timeline-item"
                key={`${entry.period}-${entry.title}`}
              >
                <details className="timeline-details">
                  <summary>
                    <span className="timeline-period">{entry.period}</span>
                    <h3>{entry.title}</h3>
                  </summary>
                  <div className="timeline-entry-body">
                    <p className="timeline-context">{entry.context}</p>
                    <p className="timeline-label">
                      Skills + how I learned them
                    </p>
                    <ul className="timeline-skill-list">
                      {entry.skillJourney.map((skill) => (
                        <li
                          key={`${entry.period}-${entry.title}-${skill.skill}`}
                          className="timeline-skill-item"
                        >
                          <p className="timeline-skill-name">{skill.skill}</p>
                          <p className="timeline-skill-detail">
                            {skill.learnedBy}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            id="projects"
            message="The projects list failed to load."
            title="Project Hangar"
          />
        }
        name="HomeProjects"
      >
        <section className="retro-card" id="projects">
          <h2>Project Hangar</h2>
          <p className="section-note">
            Click a project to see the full breakdown.
          </p>
          <div className="retro-table-wrap">
            <table className="retro-data-table">
              <thead>
                <tr>
                  <th scope="col">Project</th>
                  <th scope="col">Status</th>
                  <th scope="col">Timeline</th>
                  <th scope="col">Focus</th>
                  <th scope="col">Open</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr className={`signal-${project.signal}`} key={project.slug}>
                    <td>
                      <strong>{project.title}</strong>
                    </td>
                    <td>{project.status}</td>
                    <td>{project.timeline}</td>
                    <td>{project.tagline}</td>
                    <td>
                      <RouteLink
                        className="retro-link"
                        to={`/projects/${project.slug}`}
                      >
                        ENTER
                      </RouteLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            id="guestbook"
            message="The guestbook section failed to load."
            title="Guestbook"
          />
        }
        name="HomeGuestbook"
      >
        <section className="retro-card" id="guestbook">
          <div className="guestbook-shell">
            <h2>Guestbook</h2>
            <p className="section-note">Local mode. Saved per browser.</p>
            <ul className="guestbook-list">
              {guestbookList.map((entry, index) => (
                <li key={`${entry.handle}-${entry.note}-${index}`}>
                  <strong>{entry.handle}</strong>
                  <span>{entry.note}</span>
                </li>
              ))}
            </ul>
            <form className="fake-form" onSubmit={handleGuestbookSubmit}>
              <label>
                Name
                <input
                  maxLength={32}
                  onChange={(event) => setGuestHandle(event.target.value)}
                  placeholder="@your_handle_99"
                  type="text"
                  value={guestHandle}
                />
              </label>
              <label>
                Message
                <textarea
                  maxLength={220}
                  onChange={(event) => setGuestMessage(event.target.value)}
                  placeholder="Sign the guestbook..."
                  rows={3}
                  value={guestMessage}
                />
              </label>
              <button type="submit">Sign Guestbook</button>
              <p className="section-note">{guestbookStatus}</p>
            </form>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card"
            id="education"
            message="The education section failed to load."
            title="Education + Experience"
          />
        }
        name="HomeEducation"
      >
        <section className="retro-card" id="education">
          <h2>Education + Experience</h2>
          <div className="education-grid">
            {education.map((entry) => (
              <article
                className="education-item"
                key={`${entry.school}-${entry.program}`}
              >
                <p className="education-tag">{entry.category}</p>
                <h3>{entry.school}</h3>
                <p className="education-period">{entry.period}</p>
                {entry.location ? (
                  <p className="education-location">{entry.location}</p>
                ) : null}
                <p className="education-program">{entry.program}</p>
                <p>{entry.details}</p>
              </article>
            ))}
          </div>
        </section>
      </ErrorBoundary>

      {/* <ErrorBoundary
        fallback={
          <SectionFallback
            className="retro-card link-outpost"
            message="External links are unavailable right now."
            title="Link Outpost"
          />
        }
        name="HomeLinks"
      >
        <section className="retro-card link-outpost">
          <h2>Link Outpost</h2>
          <ul>
            <li>
              <a
                href="https://www.spacejam.com/1996/cmp/sitemap.html"
                rel="noreferrer noopener"
                target="_blank"
              >
                Space Jam 1996 Site Map
              </a>
            </li>
            <li>
              <a
                href="https://www.cameronsworld.net/"
                rel="noreferrer noopener"
                target="_blank"
              >
                Cameron's World GeoCities Collage
              </a>
            </li>
            <li>
              <a
                href="https://wiki.archiveteam.org/index.php/GeoCities"
                rel="noreferrer noopener"
                target="_blank"
              >
                ArchiveTeam: GeoCities History
              </a>
            </li>
          </ul>
        </section>
      </ErrorBoundary> */}
    </RetroFrame>
  );
}
