"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useSegment } from "@/providers/segment-provider";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    event: string;
    properties?: Record<string, string | number | boolean>;
  };

export function TrackedLink({
  children,
  event,
  properties,
  onClick,
  ...props
}: TrackedLinkProps) {
  const { track } = useSegment();

  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        track(event, properties);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </Link>
  );
}

