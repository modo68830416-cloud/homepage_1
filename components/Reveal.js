import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, as = 'div', delay = 0, y = 24, ...rest }) {
  const Comp = motion[as] || motion.div
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    const Static = as
    const { whileHover, whileTap, whileInView, initial, animate, transition, viewport, ...staticRest } = rest
    return <Static {...staticRest}>{children}</Static>
  }

  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
