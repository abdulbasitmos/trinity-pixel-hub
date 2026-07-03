import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseIcon, MenuIcon } from './icons'
import { navLinks } from '../data/siteData'
import BrandLogo from './BrandLogo'
import RouterLink from './RouterLink'
import { useAuth } from '../context/AuthContext'
import { Sun, Moon } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, openAuthModal } = useAuth()
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    // Default to dark mode
    return 'dark'
  })

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    const handleScroll = () => setScrolled(window.scrollY > 20)

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  const closeMenu = () => setIsOpen(false)
  
  const handleStartProject = () => {
    closeMenu()
    window.history.pushState({}, '', '/contact')
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isActive = (href) => {
    if (href === '/') {
      return currentPath === '/' || currentPath === '/home'
    }
    return currentPath.startsWith(href)
  }

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b py-4 ${
        scrolled 
          ? 'navbar-scrolled border-white/10 bg-tph-dark/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.4)]' 
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <RouterLink href="/" className="group flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-tph-cyan">
          <BrandLogo className="h-10 w-10 transition-transform duration-300 group-hover:rotate-3" />
          <span className="text-base font-bold tracking-tight text-white sm:text-lg">Trinity Pixel Hub</span>
        </RouterLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <RouterLink
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 focus:outline-none ${
                isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="relative z-10">{link.label}</span>
              {isActive(link.href) && (
                <motion.span
                  layoutId="activeNavBackground"
                  className="absolute inset-0 rounded-full bg-white/10 border border-white/5 shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </RouterLink>
          ))}
          
          {/* Theme Toggle Button Desktop */}
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-3 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-white hover:border-tph-cyan transition-all active:scale-95 focus:outline-none cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={handleStartProject}
            className="ml-4 relative group overflow-hidden rounded-full bg-tph-gradient p-[1px] font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:shadow-[0_0_25px_rgba(255,0,127,0.3)]"
          >
            <span className="block px-5 py-2 text-xs uppercase tracking-wider rounded-full bg-tph-dark transition-colors duration-300 group-hover:bg-transparent">
              Contact Us
            </span>
          </button>
        </div>

        {/* Mobile Nav Actions Container */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Theme Toggle Button Mobile */}
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-tph-cyan hover:bg-white/10 focus:outline-none active:scale-95 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-tph-cyan hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-tph-cyan active:scale-95"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[65px] z-40 bg-tph-dark/95 border-b border-white/10 backdrop-blur-xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-8">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <RouterLink
                      href={link.href}
                      onClick={closeMenu}
                      className={`block rounded-2xl border border-white/5 px-6 py-4 text-lg font-bold transition-all duration-300 ${
                        isActive(link.href)
                          ? 'border-tph-cyan bg-white/5 text-tph-cyan'
                          : 'bg-white/[0.02] text-white hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </RouterLink>
                  </motion.div>
                ))}
              </div>
              <motion.button
                type="button"
                onClick={handleStartProject}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="w-full inline-flex items-center justify-center rounded-full bg-tph-gradient py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-pink-glow transition hover:scale-[1.02] active:scale-95"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
