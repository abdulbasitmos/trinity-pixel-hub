import { motion } from 'framer-motion'
import RouterLink from './RouterLink'

const spotlights = [
  {
    title: 'Strategy-first creative',
    text: 'Start with us, then map the visual, content, and web system around it.',
    href: '/about',
  },
  {
    title: 'High-signal motion',
    text: 'Use cinematic clips and animated layers to give every page more depth.',
    href: '/portfolio',
  },
  {
    title: 'Conversion-focused web',
    text: 'Build pages that look premium and still guide the visitor to action.',
    href: '/services',
  },
]

export default function HomeSpotlight() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15 },
    },
  }

  return (
    <section className="bg-tph-dark px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-tph-pink">Why Trinity Pixel Hub</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl leading-tight">
              A homepage with direction, not just a hero.
            </h2>
          </div>
          <RouterLink href="/portfolio" className="text-xs font-semibold text-white/50 hover:text-tph-cyan transition-colors duration-300">
            View selected work →
          </RouterLink>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {spotlights.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: 'rgba(255, 0, 127, 0.4)', boxShadow: '0 8px 32px rgba(255, 0, 127, 0.05)' }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 backdrop-blur-sm"
            >
              <RouterLink href={item.href} className="block group focus:outline-none">
                <p className="text-[9px] font-bold uppercase tracking-widest text-white/30 group-hover:text-tph-pink/70 transition-colors duration-300">
                  Featured pillar
                </p>
                <h3 className="mt-3 text-xl font-bold text-white group-hover:text-tph-pink transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  {item.text}
                </p>
              </RouterLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
