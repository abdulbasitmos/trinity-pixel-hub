import { motion } from 'framer-motion'
import { ArrowIcon } from './icons'
import RouterLink from './RouterLink'

export default function HeroActionButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-8 flex flex-col gap-4 sm:flex-row"
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex"
      >
        <RouterLink
          href="/contact"
          className="relative inline-flex items-center justify-center gap-3 w-full sm:w-auto rounded-full bg-white px-6 py-3.5 text-sm font-bold text-tph-dark shadow-[0_0_30px_rgba(0,210,255,0.2)] hover:shadow-[0_0_30px_rgba(255,0,127,0.3)] transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tph-cyan"
        >
          Contact Us
          <ArrowIcon />
        </RouterLink>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex"
      >
        <RouterLink
          href="/portfolio"
          className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md hover:border-tph-orange hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,153,0,0.25)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tph-orange"
        >
          Explore Our Work
        </RouterLink>
      </motion.div>
    </motion.div>
  )
}
