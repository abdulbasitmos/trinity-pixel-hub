import { motion, useMotionValue, useTransform } from 'framer-motion'
import BrandLogo from './BrandLogo'

const labels = ['Graphic', 'Video', 'Web']

export default function HeroShowcase() {
  // Add a subtle 3D hover tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  function handleMouseMove(event) {
    const el = event.currentTarget
    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = event.clientX - rect.left - width / 2
    const mouseY = event.clientY - rect.top - height / 2
    x.set(mouseX)
    y.set(mouseY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, x: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.25, delay: 0.3 }}
      className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-purple-glow backdrop-blur-xl transition-all duration-300 hover:border-white/20"
    >
      <div className="absolute -inset-5 -z-10 bg-hero-glow opacity-60 pointer-events-none" />
      
      <div style={{ transform: 'translateZ(20px)' }} className="overflow-hidden rounded-xl border border-white/10 bg-black">
        <BrandLogo variant="full" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
      </div>

      <div style={{ transform: 'translateZ(10px)' }} className="mt-4 grid grid-cols-3 gap-2">
        {labels.map((label) => (
          <span
            key={label}
            className="rounded-full border border-white/5 bg-white/[0.03] py-2 text-center text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-tph-cyan hover:border-tph-cyan/30 hover:bg-tph-cyan/5 transition-all duration-300"
          >
            {label}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
