import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import AuthModal from './AuthModal'
import { ArrowUp } from 'lucide-react'

// Custom Cursor Component for Desktop
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    // Avoid showing on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]')
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setLinkHovered(true))
        el.addEventListener('mouseleave', () => setLinkHovered(false))
      })
    }

    // Set up hover listeners and re-trigger on DOM changes
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      observer.disconnect()
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-tph-cyan/40 bg-transparent"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          borderColor: linkHovered ? 'rgba(255, 0, 127, 0.7)' : 'rgba(0, 210, 255, 0.4)',
          backgroundColor: linkHovered ? 'rgba(255, 0, 127, 0.05)' : 'rgba(0, 210, 255, 0)'
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-tph-pink"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 1.5 : linkHovered ? 0.5 : 1,
          backgroundColor: linkHovered ? '#00d2ff' : '#ff007f'
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 15 }}
      />
    </>
  )
}

// Subtle Background Glow Blobs
function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      <motion.div
        className="absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-br from-tph-cyan/10 to-tph-purple/5 blur-[120px]"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-[10%] -right-[10%] h-[45vw] w-[45vw] rounded-full bg-gradient-to-tr from-tph-pink/8 to-tph-orange/5 blur-[120px]"
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Tiny subtle particles */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
    </div>
  )
}

// Back to Top Button Component
function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-tph-dark/80 text-white shadow-purple-glow backdrop-blur-lg transition-colors hover:border-tph-cyan hover:text-tph-cyan focus:outline-none focus:ring-2 focus:ring-tph-cyan"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function PageShell({ children }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-tph-dark font-display text-white antialiased selection:bg-tph-pink selection:text-white">
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px] origin-left bg-tph-gradient"
        style={{ scaleX }}
      />

      <CustomCursor />
      <FloatingBackground />
      <Navbar />

      {/* Page transitions based on routing */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <Footer />
      <AuthModal />
      <BackToTopButton />
    </div>
  )
}
