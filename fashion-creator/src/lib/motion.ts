export const duration = {
  instant: 0.12,
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
  cinematic: 1.1,
} as const;

export const easing = {
  standard: [0.22, 1, 0.36, 1],
  emphasized: [0.16, 1, 0.3, 1],
  soft: [0.33, 1, 0.68, 1],
  exit: [0.4, 0, 1, 1],
} as const;

export const spring = {
  soft: {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    mass: 0.8,
  },
  responsive: {
    type: "spring" as const,
    stiffness: 220,
    damping: 24,
    mass: 0.6,
  },
  magnetic: {
    type: "spring" as const,
    stiffness: 300,
    damping: 22,
    mass: 0.5,
  },
} as const;
