import { useEffect, useState } from "react";

const GITHUB_COMMITS_ENDPOINT =
  "https://api.github.com/repos/ConnorSwis/Connor-Portfolio/commits/master";
const STORAGE_KEY = "portfolio-latest-commit-date-v1";

let latestCommitDatePromise: Promise<string | null> | null = null;

const formatCommitDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/New_York",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  });

  return `${dateFormatter.format(date).split("/").join("-")} at ${timeFormatter.format(date)}`;
};

const readCachedCommitDate = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(STORAGE_KEY);
};

const persistCommitDate = (isoDate: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, isoDate);
};

const fetchLatestCommitDate = async (): Promise<string | null> => {
  if (!latestCommitDatePromise) {
    latestCommitDatePromise = fetch(GITHUB_COMMITS_ENDPOINT, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to load latest commit date (${response.status})`,
          );
        }

        const data = (await response.json()) as {
          commit?: { committer?: { date?: string } };
        };

        return data.commit?.committer?.date ?? null;
      })
      .catch(() => null);
  }

  return latestCommitDatePromise;
};

export const useLatestCommitDate = (): string => {
  const [commitDateText, setCommitDateText] = useState<string>(() => {
    const cachedCommitDate = readCachedCommitDate();
    return cachedCommitDate
      ? formatCommitDate(cachedCommitDate)
      : "loading latest GitHub commit";
  });

  useEffect(() => {
    let isActive = true;

    void fetchLatestCommitDate().then((commitDate) => {
      if (!isActive || !commitDate) {
        return;
      }

      persistCommitDate(commitDate);
      setCommitDateText(formatCommitDate(commitDate));
    });

    return () => {
      isActive = false;
    };
  }, []);

  return commitDateText;
};
