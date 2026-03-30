import type { ReactNode } from "react";
import { routeHref } from "../hooks/useRoute";

type RouteLinkProps = {
  to: string;
  className?: string;
  children: ReactNode;
};

export function RouteLink({ to, className, children }: RouteLinkProps) {
  return (
    <a className={className} href={routeHref(to)}>
      {children}
    </a>
  );
}
