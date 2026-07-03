import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { processSteps } from '../data/siteData'
import SectionKicker from './SectionKicker'

const processSnapshots = [
  'Briefs become wireframes',
  'Wireframes become visuals',
  'Visuals become builds',
  'Builds become launches',
]

function ProcessPreview() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % processSnapshots.length)
    }, 4000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-tph-purple">Live flow</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-1 text-lg font-bold text-white"
            >
              {processSnapshots[activeIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex gap-2">
          {processSnapshots.map((item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="h-2 rounded-full transition-all duration-300 relative focus:outline-none"
              style={{ width: activeIndex === index ? '2rem' : '0.5rem' }}
              aria-label={item}
            >
              <span className={`absolute inset-0 rounded-full ${activeIndex === index ? 'bg-tph-gradient' : 'bg-white/15 hover:bg-white/30'}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {processSteps.map((step, index) => (
          <div
            key={step.title}
            onClick={() => setActiveIndex(index)}
            className={`cursor-pointer rounded-xl border p-4.5 transition-all duration-300 ${
              activeIndex === index 
                ? 'border-tph-purple bg-tph-purple/10 shadow-[0_4px_20px_rgba(138,43,226,0.15)] scale-[1.02]' 
                : 'border-white/5 bg-black/20 hover:border-white/15'
            }`}
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">Step 0{index + 1}</p>
            <p className="mt-1.5 text-xs font-bold text-white transition-colors duration-300 group-hover:text-tph-purple">{step.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Process() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15 },
    },
  }

  return (
    <section id="process" className="bg-[#08080c] px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="process-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionKicker label="Process" color="text-tph-purple" />
            <h2 id="process-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Built around clarity, momentum, and clean approvals.
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/50">
            Every engagement is structured so the creative direction, production scope, and final handoff stay visible from the first call.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative mt-12 grid gap-6 lg:grid-cols-4"
        >
          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={cardVariants}
              whileHover={{ y: -5, borderColor: 'rgba(138, 43, 226, 0.4)', boxShadow: '0 8px 30px rgba(138, 43, 226, 0.05)' }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-tph-card p-6 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-tph-gradient opacity-60" />
              <div className="mb-6 grid h-10 w-10 place-items-center rounded-full border border-tph-purple/40 bg-tph-dark text-xs font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.2)]">
                0{index + 1}
              </div>
              <h3 className="text-lg font-bold text-white leading-tight mt-4">{step.title}</h3>
              <p className="mt-3 text-xs leading-relaxed text-white/60">{step.description}</p>
            </motion.article>
          ))}
        </motion.div>
        
        <ProcessPreview />
        
        <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:grid-cols-3">
          {['Creative direction before production', 'Mobile-first preview reviews', 'Final files organized for reuse'].map((item) => (
            <p key={item} className="text-xs font-bold leading-normal text-white/50 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-tph-purple" />
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
