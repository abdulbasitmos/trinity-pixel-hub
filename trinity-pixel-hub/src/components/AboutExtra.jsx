import { motion } from 'framer-motion'
import { Sparkles, Compass, ShieldCheck, Cpu } from 'lucide-react'
import SectionKicker from './SectionKicker'

// Import videos & images for timeline/philosophy
import designVideo from '../istockphoto-1087806292-640_adpp_is.mp4'
import collaborationVideo from '../istockphoto-2210801206-640_adpp_is.mp4'
import studioVideo from '../istockphoto-2226650668-640_adpp_is.mp4'
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg'
import designLeadPhoto from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'

const philosophies = [
  {
    icon: Compass,
    title: 'Aesthetic Intent',
    description: 'We believe that great visuals are purposeful. Every logo, typography selection, and color layout is designed to anchor the brand identity and create a lasting impression.',
    video: designVideo,
    color: 'text-tph-pink border-tph-pink/20 bg-tph-pink/5',
  },
  {
    icon: Cpu,
    title: 'Production Engineering',
    description: 'We code with structure and performance in mind. Using React and Vite ensures fast compilations, modern frontend modules, and clean architectures ready to scale.',
    video: collaborationVideo,
    color: 'text-tph-cyan border-tph-cyan/20 bg-tph-cyan/5',
  },
  {
    icon: ShieldCheck,
    title: 'Insight-Driven Decisions',
    description: 'Analytics should not be an afterthought. We build visual reporting and insight systems directly into product interfaces to ensure business intelligence is actionable.',
    video: studioVideo,
    color: 'text-tph-orange border-tph-orange/20 bg-tph-orange/5',
  },
]

const milestones = [
  {
    year: '2024',
    title: 'Studio Foundation',
    description: 'Trinity Pixel Hub was established to unite branding specialists, software engineers, and analysts under one integrated workflow.',
    image: webLeadPhoto,
  },
  {
    year: '2025',
    title: 'Integrated Client Portals',
    description: 'We introduced custom real-time client dashboards allowing clients to track design deliverables and live build deployments directly.',
    video: collaborationVideo,
  },
  {
    year: '2026',
    title: 'Full-Scale Creative Rollout',
    description: 'Expanding our capabilities to include immersive cinematic video reels, automated brand guides, and business-focused campaign design.',
    image: designLeadPhoto,
  },
]

export default function AboutExtra() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 70, damping: 15 },
    },
  }

  return (
    <section className="bg-tph-dark py-24 px-5 sm:px-6 lg:px-8 border-t border-white/5 space-y-32">
      
      {/* 1. Core Philosophy Section */}
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionKicker label="Our Pillars" color="text-tph-pink" />
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
            The values that drive our visual and technical output.
          </h2>
          <p className="mt-4 text-xs text-white/50">
            A look behind our workflow: uniting visual storytelling, high-performance programming, and data signals.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {philosophies.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                variants={revealVariants}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
              >
                {/* Hover Video Background */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-15">
                  <video 
                    src={item.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-tph-dark/80" />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className={`grid h-12 w-12 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-tph-cyan transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-white/20 mt-8 self-end">
                  0{idx + 1}
                </span>
              </motion.article>
            )
          })}
        </motion.div>
      </div>

      {/* 2. Interactive Timeline Section */}
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionKicker label="Our Journey" color="text-tph-cyan" />
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
            How Trinity Pixel Hub evolved.
          </h2>
        </div>

        <div className="relative border-l border-white/10 pl-6 sm:pl-10 space-y-16">
          {milestones.map((milestone, idx) => (
            <motion.div
              key={milestone.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] items-center"
            >
              {/* Point Indicator */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 h-4 w-4 rounded-full bg-tph-cyan border-4 border-tph-dark shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
              
              <div className="space-y-4">
                <span className="text-sm font-black uppercase tracking-widest text-tph-cyan">
                  {milestone.year}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {milestone.title}
                </h3>
                <p className="text-xs leading-relaxed text-white/60">
                  {milestone.description}
                </p>
              </div>

              {/* Media element for milestone */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 group">
                {milestone.video ? (
                  <video 
                    src={milestone.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-103 transition-transform duration-500"
                  />
                ) : (
                  <img 
                    src={milestone.image} 
                    alt={milestone.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-103 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-tph-dark/80 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
