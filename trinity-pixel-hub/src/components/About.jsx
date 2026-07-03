import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { capabilities, metrics, stackItems } from '../data/siteData'
import { SparkIcon } from './icons'
import BrandLogo from './BrandLogo'
import SectionKicker from './SectionKicker'
import AnimatedCounter from './AnimatedCounter'
import aboutVideoSrc from '../istockphoto-2226650668-640_adpp_is.mp4'
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg'
import designLeadPhotoA from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg'

const aboutFrames = [
  {
    image: dataLeadPhoto,
    title: 'Insight-led thinking',
    copy: 'We use signal, structure, and presentation clarity to shape better delivery.',
  },
  {
    image: designLeadPhotoA,
    title: 'Identity-first design',
    copy: 'Brand systems, layout, and motion are tuned to feel cohesive across channels.',
  },
  {
    image: webLeadPhoto,
    title: 'Web-ready execution',
    copy: 'Interface planning and frontend delivery move together from the beginning.',
  },
]

function AboutGallery() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % aboutFrames.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  const activeFrame = aboutFrames[activeIndex]

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_8px_32px_rgba(0,210,255,0.05)] backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black aspect-video">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={activeFrame.image}
            alt={activeFrame.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-tph-dark/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-md">
          Studio Focus
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Current frame</p>
          <h3 className="mt-2 text-lg font-bold text-white">{activeFrame.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{activeFrame.copy}</p>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {aboutFrames.map((frame, index) => (
            <button
              key={frame.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-lg border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tph-cyan aspect-[4/3] ${
                activeIndex === index ? 'border-tph-cyan shadow-[0_0_15px_rgba(0,210,255,0.3)]' : 'border-white/10 opacity-50 hover:opacity-100'
              }`}
            >
              <img src={frame.image} alt="" className="h-full w-full object-cover" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  return (
    <section id="about" className="relative overflow-hidden bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="about-title">
      <video className="absolute inset-0 h-full w-full object-cover opacity-10 blur-sm pointer-events-none" src={aboutVideoSrc} autoPlay muted loop playsInline aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0f_0%,rgba(10,10,15,0.85)_40%,#0a0a0f_100%)]" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center"
      >
        <motion.div variants={revealVariants} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <SectionKicker label="The Hub" color="text-tph-cyan" />
          <h2 id="about-title" className="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl">
            We engineer digital experiences that are clear, cohesive, and ready to launch.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Trinity Pixel Hub sits at the intersection of visual storytelling and technical delivery. We connect brand systems, motion, web engineering, and data narratives into work that feels premium and stays practical.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {capabilities.map((capability) => (
              <span
                key={capability}
                className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-semibold text-white/80 transition-colors duration-300 hover:border-tph-pink hover:text-white"
              >
                {capability}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div variants={revealVariants} className="rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
          <div className="rounded-xl border border-white/5 bg-tph-gradient p-[1px]">
            <div className="rounded-[11px] bg-tph-card p-8">
              <div className="flex items-center gap-4">
                <BrandLogo className="h-12 w-12 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Studio Signal</p>
                  <h3 className="text-lg font-bold text-white leading-tight">Premium output, practical delivery.</h3>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/5 bg-white/[0.03] p-5">
                    <p className="bg-tph-gradient bg-clip-text text-3xl font-extrabold text-transparent">
                      <AnimatedCounter value={metric.value} />
                    </p>
                    <p className="mt-2 text-[10px] font-bold uppercase leading-normal tracking-wider text-white/50">{metric.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3 text-tph-orange">
                  <SparkIcon className="h-4 w-4" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Signature output</p>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  A complete creative package can include the logo, landing page, social visuals, motion edits, and analytics-ready launch reporting.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mt-12 max-w-7xl rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-tph-pink">Meet the Tech</p>
            <h3 className="mt-2 text-2xl font-bold text-white">Engineering tools and design systems working as one.</h3>
          </div>
          <BrandLogo className="h-12 w-12" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AboutGallery />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {stackItems.map((item) => (
              <motion.button
                whileHover={{ y: -3, borderColor: 'rgba(0, 210, 255, 0.4)', backgroundColor: 'rgba(25, 25, 35, 0.9)' }}
                key={item.name}
                type="button"
                className="group rounded-xl border border-white/10 bg-tph-card/90 p-5 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-tph-cyan active:scale-[0.98]"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">{item.type}</span>
                <span className="mt-2 block text-lg font-bold text-white group-hover:text-tph-cyan transition-colors duration-300">{item.name}</span>
                <span className="mt-1.5 block text-xs leading-relaxed text-white/60">{item.detail}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
