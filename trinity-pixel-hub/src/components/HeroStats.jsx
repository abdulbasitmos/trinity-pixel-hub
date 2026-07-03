import { motion } from 'framer-motion'
import { heroStats } from '../data/siteData'

export default function HeroStats() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {heroStats.map((item) => (
        <motion.div
          key={item.label}
          variants={cardVariants}
          whileHover={{ scale: 1.02, borderColor: 'rgba(0, 210, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-md transition-colors duration-300"
        >
          <p className="text-base font-extrabold text-white">{item.value}</p>
          <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
