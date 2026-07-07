"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

/**
 * Global framer-motion config: honors the user's prefers-reduced-motion
 * setting for every motion.* element in the tree. Pairs with the CSS
 * kill-switch in globals.css; content is always visible without JS.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
