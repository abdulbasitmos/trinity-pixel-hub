import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BadgeIcon, ChartIcon, CodeIcon, FilmIcon, PenIcon, PixelIcon, SparkIcon } from './icons'
import { services } from '../data/siteData'
import SectionKicker from './SectionKicker'

const accentStyles = {
  cyan: 'hover:border-tph-cyan/40 hover:shadow-[0_8px_32px_rgba(0,210,255,0.06)]',
  pink: 'hover:border-tph-pink/40 hover:shadow-[0_8px_32px_rgba(255,0,127,0.06)]',
  orange: 'hover:border-tph-orange/40 hover:shadow-[0_8px_32px_rgba(255,153,0,0.06)]',
  purple: 'hover:border-tph-purple/40 hover:shadow-[0_8px_32px_rgba(138,43,226,0.06)]',
}

const accentColors = {
  cyan: 'text-tph-cyan border-tph-cyan/20 bg-tph-cyan/5',
  pink: 'text-tph-pink border-tph-pink/20 bg-tph-pink/5',
  orange: 'text-tph-orange border-tph-orange/20 bg-tph-orange/5',
  purple: 'text-tph-purple border-tph-purple/20 bg-tph-purple/5',
}

const icons = [PenIcon, BadgeIcon, PixelIcon, FilmIcon, CodeIcon, ChartIcon, SparkIcon]

function DashboardPreview() {
  return (
    <div className="mt-5 rounded-xl border border-tph-cyan/20 bg-black/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-wider text-tph-cyan bg-tph-cyan/10 px-2 py-0.5 rounded">Live Build</span>
        <span className="h-1.5 w-1.5 rounded-full bg-tph-cyan animate-ping" />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {[72, 48, 88].map((height, index) => (
          <div key={index} className="rounded bg-white/[0.02] border border-white/5 p-2">
            <div className="h-12 flex items-end">
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="w-full rounded bg-gradient-to-t from-tph-cyan/80 to-tph-pink/60" 
              />
            </div>
            <p className="mt-2 text-center text-[8px] font-bold text-white/30">M0{index + 1}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartPreview() {
  return (
    <div className="mt-5 rounded-xl border border-tph-orange/20 bg-black/40 p-4 overflow-hidden">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-wider text-tph-orange bg-tph-orange/10 px-2 py-0.5 rounded">Active Insights</span>
        <span className="h-1.5 w-1.5 rounded-full bg-tph-orange animate-pulse" />
      </div>
      <svg className="h-20 w-full overflow-visible" viewBox="0 0 260 100" aria-label="Animated analytics chart">
        <motion.path 
          d="M10 84 C 44 62, 58 72, 86 48 S 140 18, 172 42 220 62, 250 22" 
          fill="none" 
          stroke="#ff9900" 
          strokeWidth="4" 
          strokeLinecap="round" 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <motion.path 
          d="M10 84 C 44 70, 70 88, 104 66 S 160 48, 194 60 224 44, 250 54" 
          fill="none" 
          stroke="#00d2ff" 
          strokeWidth="3" 
          strokeLinecap="round" 
          opacity="0.6" 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
        />
        {[10, 86, 172, 250].map((x, idx) => (
          <motion.circle 
            key={x} 
            cx={x} 
            cy={x === 10 ? 84 : x === 86 ? 48 : x === 172 ? 42 : 22} 
            r="4" 
            fill="#ff007f" 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + idx * 0.1 }}
          />
        ))}
      </svg>
    </div>
  )
}

function TypeSlider() {
  const [active, setActive] = useState(0)
  const slides = [
    { title: 'Bold Type', style: 'text-tph-cyan', sample: 'IMPACT' },
    { title: 'Color Heat', style: 'text-tph-pink', sample: 'NEON' },
    { title: 'Luxury Contrast', style: 'text-tph-orange', sample: 'SIGNAL' },
  ]
  const slide = slides[active]

  return (
    <div className="mt-5 rounded-xl border border-tph-pink/20 bg-black/40 p-4 flex flex-col justify-between aspect-video sm:aspect-auto">
      <div className="h-16 flex flex-col justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <p className={`text-3xl font-extrabold tracking-tight ${slide.style}`}>{slide.sample}</p>
            <p className="mt-1 text-[8px] font-bold uppercase tracking-widest text-white/30">{slide.title}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex gap-1.5">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(index)}
            className="h-1.5 flex-1 rounded-full relative focus:outline-none"
            aria-label={`Show ${item.title}`}
          >
            <span className={`absolute inset-0 rounded-full transition-all duration-300 ${active === index ? 'bg-tph-gradient' : 'bg-white/10 hover:bg-white/20'}`} />
          </button>
        ))}
      </div>
    </div>
  )
}

function ServiceCard({ service, index }) {
  const Icon = icons[index]
  
  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15, delay: index * 0.05 },
    },
  }

  return (
    <motion.article
      variants={revealVariants}
      whileHover={{ y: -4 }}
      className={`group rounded-2xl border border-white/10 bg-tph-card/90 p-6.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm ${accentStyles[service.accent]} ${service.span}`}
    >
      <div className="flex h-full flex-col justify-between gap-6">
        <div className="flex items-start justify-between">
          <div className={`grid h-12 w-12 place-items-center rounded-xl border border-white/10 transition-transform duration-300 group-hover:scale-105 ${accentColors[service.accent]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xs font-semibold text-white/20">0{index + 1}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white leading-tight">{service.title}</h3>
          <p className="mt-3 text-xs leading-relaxed text-white/60">{service.description}</p>
          
          <div className="mt-4 flex flex-wrap gap-1.5">
            {service.deliverables.map((item) => (
              <span key={item} className="rounded-full bg-white/5 border border-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/40">
                {item}
              </span>
            ))}
          </div>

          {service.title === 'Web Development' && <DashboardPreview />}
          {service.title === 'Data Analysis' && <ChartPreview />}
          {(service.title === 'Graphic Design' || service.title === 'Banner & Flyer Design') && <TypeSlider />}
        </div>
      </div>
    </motion.article>
  )
}

export default function Services() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section id="services" className="bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="services-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionKicker label="Core Services" color="text-tph-cyan" />
          <h2 id="services-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
            Seven creative pillars, one focused delivery system.
          </h2>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
