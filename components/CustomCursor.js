import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, label'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const scale = useMotionValue(1)

  const dotX = useSpring(x, { stiffness: 800, damping: 40, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 800, damping: 40, mass: 0.2 })
  const ringX = useSpring(x, { stiffness: 200, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 200, damping: 26, mass: 0.5 })
  const ringScale = useSpring(scale, { stiffness: 300, damping: 20 })

  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)')
    if (!mql.matches) return undefined

    setEnabled(true)
    document.body.classList.add('merion-cursor-active')

    function handleMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    function handleOver(e) {
      if (e.target.closest?.(HOVER_SELECTOR)) scale.set(1.8)
    }
    function handleOut(e) {
      if (e.target.closest?.(HOVER_SELECTOR)) scale.set(1)
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleOver)
    document.addEventListener('mouseout', handleOut)

    return () => {
      document.body.classList.remove('merion-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [x, y, scale])

  if (!enabled) return null

  return (
    <>
      <motion.div className={styles.dot} style={{ x: dotX, y: dotY }} />
      <motion.div className={styles.ring} style={{ x: ringX, y: ringY, scale: ringScale }} />
    </>
  )
}
