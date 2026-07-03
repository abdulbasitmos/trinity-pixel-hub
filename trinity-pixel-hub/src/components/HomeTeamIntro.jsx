import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'

export default function HomeTeamIntro() {
  return (
    <section className="bg-tph-dark px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:p-8"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-6">
            <BrandLogo variant="full" className="h-14 w-14 shrink-0 rounded-xl bg-white/5 p-2" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Studio Overview</p>
              <h2 className="mt-1 text-2xl font-bold text-white leading-tight">Our Core Services</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">
                Data analytics, visual systems, video reels, and responsive layouts designed to connect and convert.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
