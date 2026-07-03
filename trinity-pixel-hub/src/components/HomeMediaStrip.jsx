import { motion } from 'framer-motion'
import heroImage from '../assets/hero.png'
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg'
import designLeadPhotoA from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg'
import RouterLink from './RouterLink'

const frames = [
  { src: heroImage, title: 'Hero identity' },
  { src: designLeadPhotoA, title: 'Design direction' },
  { src: dataLeadPhoto, title: 'Data leadership' },
  { src: webLeadPhoto, title: 'Web delivery' },
]

export default function HomeMediaStrip() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const frameVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 85, damping: 15 },
    },
  }

  return (
    <section className="bg-[#08080c] px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Visual overview</p>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl leading-tight">
              More imagery, more motion, more proof of craft.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              The home page now acts like a landing hub for the whole studio, with visuals pulled from the team, brand, and product work.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block mt-7"
            >
              <RouterLink
                href="/contact"
                className="inline-flex rounded-full bg-tph-gradient px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-pink-glow"
              >
                Contact Us
              </RouterLink>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-2 gap-4"
          >
            {frames.map((frame) => (
              <motion.div
                key={frame.title}
                variants={frameVariants}
                whileHover={{ y: -5, borderColor: 'rgba(0, 210, 255, 0.4)', boxShadow: '0 8px 30px rgba(0, 210, 255, 0.05)' }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 backdrop-blur-sm"
              >
                <div className="overflow-hidden aspect-video bg-black">
                  <img src={frame.src} alt={frame.title} className="h-full w-full object-cover opacity-80 transition duration-700 hover:scale-105 hover:opacity-100" />
                </div>
                <div className="p-4 border-t border-white/5">
                  <p className="text-xs font-bold text-white/80">{frame.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
