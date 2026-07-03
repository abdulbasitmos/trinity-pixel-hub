import { motion } from 'framer-motion'

export default function HeroText() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.h1
        variants={itemVariants}
        id="hero-title"
        className="max-w-4xl bg-tph-gradient bg-clip-text text-3xl font-extrabold leading-[1.1] tracking-tight text-transparent sm:text-5xl lg:text-6xl"
      >
        Trinity Pixel Hub builds sharp digital presence.
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="max-w-2xl text-base font-medium leading-relaxed text-white/80 sm:text-lg"
      >
        Branding, websites, motion, and data-led creative work for teams that need the whole system to move together.
      </motion.p>
      <motion.p
        variants={itemVariants}
        className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base"
      >
        Start with a clear brief, sign in to book the studio, and move from concept to launch with one focused workflow.
      </motion.p>
    </motion.div>
  )
}
