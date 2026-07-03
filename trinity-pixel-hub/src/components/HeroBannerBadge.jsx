import { motion } from 'framer-motion'
import { SparkIcon } from './icons'

export default function HeroBannerBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] pl-2 pr-5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 shadow-[0_4px_20px_rgba(138,43,226,0.15)] backdrop-blur-md"
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-tph-gradient animate-pulse">
        <SparkIcon className="h-3.5 w-3.5 text-white" />
      </span>
      Creative Digital Agency
    </motion.div>
  )
}
