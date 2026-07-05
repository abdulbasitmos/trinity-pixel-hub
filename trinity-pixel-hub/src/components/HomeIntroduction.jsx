import { motion } from 'framer-motion'
import { capabilities, metrics } from '../data/siteData'
import { SparkIcon } from './icons'
import BrandLogo from './BrandLogo'
import AnimatedCounter from './AnimatedCounter'

// Import Team Images
import designLeadPhoto from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg'
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg'

// Import Intro Video
import introVideoSrc from '../istockphoto-2210801206-640_adpp_is.mp4'

const teamMembers = [
  {
    name: 'Yusuf Ibrahim Khalilullah',
    title: 'Graphic Design & Brand Systems',
    summary: 'Designs logos, campaign assets, and identity systems that stay consistent across print, social, and web.',
    image: designLeadPhoto,
  },
  {
    name: 'Yusuf Fuhad',
    title: 'Data Analysis & Reporting',
    summary: 'Turns raw data into readable dashboards, reporting structures, and business intelligence insights.',
    image: dataLeadPhoto,
  },
  {
    name: 'Moshood Abdubasit',
    title: 'Web Development & Product Build',
    summary: 'Builds responsive websites and frontend systems with React, Tailwind CSS, and user-first structure.',
    image: webLeadPhoto,
  },
]

const services = ['Graphic Design', 'Website Development', 'Branding & Identity', 'Data Analytics', 'UI/UX Design', 'Digital Solutions']

const reasons = [
  'Clear creative direction from the first brief',
  'Design, web, and data treated as one system',
  'Simple communication and visible progress',
  'Deliverables built to launch, not just impress',
  'A process built for repeat work and long-term support',
]

export default function HomeIntroduction() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15 },
    },
  }

  return (
    <section id="welcome" className="relative overflow-hidden bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="welcome-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,210,255,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,0,127,0.06),transparent_35%)] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        {/* Intro Banner: Split Grid Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl md:p-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Welcome to Trinity Pixel Hub</span>
            <h2 id="welcome-title" className="mt-4 text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl">
              One studio for design, web, motion, and insight.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/70">
              Trinity Pixel Hub helps businesses, organizations, and creators build a sharper digital presence through branding, modern web development, motion content, and data-led thinking.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              Whether you are launching a brand, refreshing a site, or tightening your content system, the work stays focused on clarity, speed, and measurable output.
            </p>
          </div>

          {/* Interactive video banner representing the team studio */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            <video 
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              src={introVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-tph-dark/20 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[8px] font-bold uppercase tracking-wider text-white">Live from the Hub</span>
            </div>
          </div>
        </motion.div>

        {/* Grid Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Left Column */}
          <div className="grid gap-6">
            <motion.div variants={revealVariants} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-white/15 transition-all duration-300">
              <span className="text-[10px] font-bold uppercase tracking-widest text-tph-pink">Who We Are</span>
              <p className="mt-4 text-xs leading-relaxed text-white/60">
                Trinity Pixel Hub is a small, focused studio that connects strategy, design, and technical execution around one goal: make the brand easier to understand and easier to trust.
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                The mix of graphic design, web development, branding, and analytics keeps the output coherent instead of fragmented.
              </p>
            </motion.div>

            <motion.div variants={revealVariants} className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-white/15 transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest text-tph-orange">Our Mission</span>
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  Our mission is to give clients a reliable creative partner that turns ideas into usable digital assets, from identity to launch.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-white/15 transition-all duration-300">
                <span className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Our Vision</span>
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  We aim to be known for practical creativity, clean delivery, and work that holds up after launch.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="grid gap-6">
            <motion.div variants={revealVariants} className="rounded-2xl border border-white/10 bg-tph-card/80 p-6 backdrop-blur-xl hover:border-white/15 transition-all duration-300">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Our Services</span>
              <div className="mt-4 flex flex-wrap gap-2">
                {services.map((service) => (
                  <span key={service} className="rounded-full border border-white/5 bg-white/[0.03] px-3.5 py-1.5 text-xs font-semibold text-white/80 hover:border-tph-cyan hover:text-tph-cyan transition-colors duration-300">
                    {service}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={revealVariants} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl hover:border-white/15 transition-all duration-300">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Why Choose Us</span>
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-white/60">
                {reasons.map((reason) => (
                  <li key={reason} className="rounded-xl border border-white/5 bg-white/[0.015] px-4 py-2.5 hover:bg-white/[0.03] transition-colors duration-300">
                    {reason}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Team Members Section with photos */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Meet Our Team</span>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <motion.article 
                whileHover={{ y: -4, borderColor: 'rgba(255, 0, 127, 0.3)', boxShadow: '0 8px 30px rgba(255, 0, 127, 0.03)' }}
                key={member.name} 
                className="rounded-xl border border-white/5 bg-tph-card/90 overflow-hidden transition-all duration-300"
              >
                {/* Team Lead portrait */}
                <div className="h-48 overflow-hidden relative border-b border-white/5">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover object-[50%_15%] transition-transform duration-300 hover:scale-103" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tph-card to-transparent" />
                </div>
                
                <div className="p-5">
                  <h3 className="text-sm font-bold text-white leading-tight">{member.name}</h3>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-widest text-tph-pink">{member.title}</p>
                  <p className="mt-3 text-xs leading-relaxed text-white/50">{member.summary}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* CTA Strip */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-6 rounded-2xl border border-white/10 bg-tph-gradient p-[1px] shadow-[0_8px_32px_rgba(255,0,127,0.1)]"
        >
          <div className="rounded-[15px] bg-tph-card px-6 py-10 text-center sm:px-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Let&apos;s Build Something Amazing Together</span>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl leading-tight">
              Built to keep the brand, the build, and the brief aligned.
            </h3>
            <p className="mx-auto mt-4 max-w-4xl text-xs leading-relaxed text-white/60">
              Need a brand identity, a site refresh, or a clean booking workflow? Start with us and move directly into the right next step.
            </p>
          </div>
        </motion.div>

        {/* Quick metrics in numbers */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <motion.div 
              whileHover={{ y: -3, borderColor: 'rgba(0, 210, 255, 0.3)' }}
              key={metric.label} 
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center transition-all duration-300"
            >
              <p className="bg-tph-gradient bg-clip-text text-3xl font-extrabold text-transparent">
                <AnimatedCounter value={metric.value} />
              </p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-wider text-white/40">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Capabilities tag list */}
        <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <p key={capability} className="text-xs font-semibold text-white/60 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-tph-cyan" />
              {capability}
            </p>
          ))}
        </div>
        <div className='mt-5 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-2 lg:grid-cols-3'
        >


        </div>

        {/* Footer Signal Badge */}
        <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10 border-white/10" />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">Studio Signal</p>
              <p className="text-base font-bold text-white">Premium output, practical delivery.</p>
            </div>
          </div>
          <SparkIcon className="h-5 w-5 text-tph-cyan" />
        </div>
      </div>
    </section>
  )
}
