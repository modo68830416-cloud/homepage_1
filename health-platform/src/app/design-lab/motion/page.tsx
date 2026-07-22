import type { Metadata } from "next";
import { MotionLabClient } from "./MotionLabClient";

export const metadata: Metadata = {
  title: "Motion Lab",
  robots: { index: false, follow: false },
};

/**
 * Internal QA route (TASK-004 §7): every catalog interaction rendered in
 * isolation so each one can be checked independently, including with
 * `prefers-reduced-motion` toggled at the OS level.
 */
export default function MotionLabPage() {
  return <MotionLabClient />;
}
