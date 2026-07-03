import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const stringVal = String(value)
    const numericMatch = stringVal.match(/^[0-9.]+/)
    if (!numericMatch) {
      setCount(stringVal)
      return
    }

    const target = parseFloat(numericMatch[0])
    const suffix = stringVal.replace(numericMatch[0], '')
    
    let start = 0
    const end = target
    if (start === end) {
      setCount(stringVal)
      return
    }

    let totalMilliseconds = duration * 1000
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / totalMilliseconds, 1)
      
      // easeOutQuad
      const easedProgress = progress * (2 - progress)
      
      const current = easedProgress * (end - start) + start
      const rounded = String(target).includes('.') ? current.toFixed(1) : Math.floor(current)
      
      setCount(`${rounded}${suffix}`)

      if (progress < 1) {
        window.requestAnimationFrame(animate)
      } else {
        setCount(stringVal)
      }
    }

    window.requestAnimationFrame(animate)
  }, [value, duration, isInView])

  return <span ref={ref}>{count}</span>
}
