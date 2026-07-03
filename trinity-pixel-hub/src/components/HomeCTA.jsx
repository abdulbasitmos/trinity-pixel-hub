import { motion } from 'framer-motion'
import RouterLink from './RouterLink'

export default function HomeCTA() {
  return (
    <section className="bg-[#08080c] px-5 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-tph-gradient p-[1px] shadow-[0_8px_32px_rgba(255,0,127,0.05)]"
        >
          <div className="rounded-[15px] bg-[#09090d] px-6 py-12 sm:px-10 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Next step</p>
              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl leading-tight">Get in touch to start your project.</h2>
              <p className="mt-3 max-w-2xl text-xs leading-relaxed text-white/50">
                Brief the studio, outline your project requirements, and start the collaboration journey in one place.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 lg:mt-0"
            >
              <RouterLink
                href="/contact"
                className="inline-flex rounded-full bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-tph-dark shadow-pink-glow focus:outline-none"
              >
                Contact Us
              </RouterLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
