import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectTypes } from '../data/siteData'
import SectionKicker from './SectionKicker'
import { CheckCircle2, Loader2, ArrowRight } from 'lucide-react'

const demoAccount = {
  username: 'client@trinitypixelhub.com',
  password: 'booktphp',
}

const bookingSteps = ['Sign in', 'Choose service', 'Confirm booking']

export default function StartWithUs() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [booking, setBooking] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
    time: '',
    notes: '',
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [feedback, setFeedback] = useState('')

  const isReadyToBook = useMemo(
    () => booking.name && booking.email && booking.service && booking.date && booking.time,
    [booking],
  )

  const handleLogin = (event) => {
    event.preventDefault()
    setIsLoggingIn(true)
    setFeedback('')

    setTimeout(() => {
      setIsLoggingIn(false)
      if (
        credentials.username.trim().toLowerCase() === demoAccount.username &&
        credentials.password === demoAccount.password
      ) {
        setIsAuthenticated(true)
        setFeedback('Login successful. You can now book a session.')
        return
      }
      setFeedback('Use the demo credentials to continue.')
    }, 1200)
  }

  const handleBookingSubmit = (event) => {
    event.preventDefault()

    if (!isReadyToBook) {
      setFeedback('Fill in the booking details before sending the request.')
      return
    }

    setIsBooking(true)
    setFeedback('')

    setTimeout(() => {
      setIsBooking(false)
      setIsSuccess(true)
      setFeedback(
        `Booking request sent for ${booking.service} on ${booking.date} at ${booking.time}. We will reply to ${booking.email}.`,
      )
    }, 1500)
  }

  return (
    <section className="relative overflow-hidden bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="start-with-us-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,210,255,0.08),transparent_30%),radial-gradient(circle_at_80%_25%,rgba(255,0,127,0.08),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,153,0,0.06),transparent_34%)] pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <SectionKicker label="Start with Us" color="text-tph-cyan" />
            <h1 id="start-with-us-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Sign in, then book the studio.
            </h1>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              This page gives clients a simple login gate before they book a design, web, or content session.
              After sign-in, the booking form opens immediately.
            </p>
          </div>

          <div className="space-y-3">
            {bookingSteps.map((step, index) => (
              <div key={step} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4.5 backdrop-blur-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-tph-gradient text-xs font-bold text-white shadow-[0_0_15px_rgba(255,0,127,0.2)]">
                  {index + 1}
                </span>
                <p className="text-xs font-bold text-white">{step}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs leading-relaxed text-white/50 backdrop-blur-sm">
            <p className="font-bold text-white">Demo credentials</p>
            <p className="mt-2">Username: <span className="text-tph-cyan font-mono">{demoAccount.username}</span></p>
            <p className="mt-1">Password: <span className="text-tph-pink font-mono">{demoAccount.password}</span></p>
          </div>
        </div>

        {/* Right Column Form Wrapper */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-purple-glow/5 backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            {!isAuthenticated ? (
              // Login Form
              <motion.form 
                key="login-form"
                onSubmit={handleLogin} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-tph-orange">Client Login</span>
                  <h2 className="mt-2 text-2xl font-bold text-white leading-tight">Enter your username and password.</h2>
                </div>

                {/* Floating Inputs */}
                <div className="relative">
                  <input
                    type="email"
                    id="username"
                    name="username"
                    required
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                  >
                    Username
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                  >
                    Password
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isLoggingIn}
                  type="submit"
                  className="w-full relative flex items-center justify-center rounded-full bg-tph-gradient py-4 text-xs font-bold uppercase tracking-wider text-white shadow-pink-glow transition hover:shadow-cyan-glow focus:outline-none disabled:opacity-75"
                >
                  {isLoggingIn ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Log In <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </motion.button>
              </motion.form>
            ) : !isSuccess ? (
              // Booking Form
              <motion.form 
                key="booking-form"
                onSubmit={handleBookingSubmit} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Booking Desk</span>
                  <h2 className="mt-2 text-2xl font-bold text-white leading-tight">Choose your session details.</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      required
                      value={booking.name}
                      onChange={(e) => setBooking(prev => ({ ...prev, name: e.target.value }))}
                      placeholder=" "
                      className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      required
                      value={booking.email}
                      onChange={(e) => setBooking(prev => ({ ...prev, email: e.target.value }))}
                      placeholder=" "
                      className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="text-xs font-bold text-white/50">Service Type</label>
                  <select
                    id="service"
                    value={booking.service}
                    onChange={(e) => setBooking(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 color-scheme-dark"
                    required
                  >
                    <option value="" disabled className="bg-tph-dark text-white/50">Select a service</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-tph-dark text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="date" className="text-xs font-bold text-white/50">Preferred Date</label>
                    <input
                      type="date"
                      id="date"
                      value={booking.date}
                      onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 color-scheme-dark"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="time" className="text-xs font-bold text-white/50">Preferred Time</label>
                    <input
                      type="time"
                      id="time"
                      value={booking.time}
                      onChange={(e) => setBooking(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 color-scheme-dark"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    id="notes"
                    rows="4"
                    value={booking.notes}
                    onChange={(e) => setBooking(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 resize-none"
                  />
                  <label
                    htmlFor="notes"
                    className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                  >
                    Booking Notes
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isBooking}
                  type="submit"
                  className="w-full relative flex items-center justify-center rounded-full bg-tph-gradient py-4 text-xs font-bold uppercase tracking-wider text-white shadow-pink-glow transition hover:shadow-cyan-glow focus:outline-none disabled:opacity-75"
                >
                  {isBooking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Confirm Booking'
                  )}
                </motion.button>
              </motion.form>
            ) : (
              // Success Screen
              <motion.div 
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
                <p className="mx-auto max-w-sm text-xs leading-relaxed text-white/50">
                  {feedback}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false)
                    setBooking({ name: '', email: '', service: '', date: '', time: '', notes: '' })
                  }}
                  className="text-xs font-bold text-tph-cyan hover:underline uppercase tracking-wider"
                >
                  Book another session
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {feedback && !isSuccess && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-xl border border-white/5 bg-black/40 px-4 py-3.5 text-xs text-white/60 leading-normal text-center"
            >
              {feedback}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
