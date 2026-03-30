import { useEffect, useState } from "react";

const normalizeRoute = (value: string): string => {
  if (!value) {
    return "/";
  }

  const hasLeadingSlash = value.startsWith("/");
  const withLeadingSlash = hasLeadingSlash ? value : `/${value}`;
  const withoutQuery = withLeadingSlash.split("?")[0];
  const compact = withoutQuery.replace(/\/{2,}/g, "/");
  const trimmed = compact !== "/" ? compact.replace(/\/+$/g, "") : compact;

  return trimmed || "/";
};

const getRoute = (): string => {
  if (typeof window === "undefined") {
    return "/";
  }

  const hashRoute = window.location.hash.replace(/^#/, "");

  if (hashRoute) {
    return normalizeRoute(hashRoute);
  }

  return normalizeRoute(window.location.pathname);
};

export const routeHref = (route: string): string => `#${normalizeRoute(route)}`;

export const useRoute = (): string => {
  const [route, setRoute] = useState<string>(() => getRoute());

  useEffect(() => {
    const syncRoute = () => setRoute(getRoute());

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  return route;
};
