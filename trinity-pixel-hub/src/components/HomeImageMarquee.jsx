import { motion } from 'framer-motion'
import { projects } from '../data/siteData'
import SectionKicker from './SectionKicker'

export default function HomeImageMarquee() {
  // Extract all projects with visual image assets
  const visualProjects = projects.filter((p) => p.image)

  // Duplicate items for infinite marquee rows
  const row1Items = [...visualProjects, ...visualProjects]
  const row2Items = [...visualProjects, ...visualProjects].reverse()

  return (
    <section className="bg-tph-dark py-16 overflow-hidden border-y border-white/5 relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.02),transparent_60%)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-12 text-center">
        <SectionKicker label="Studio Output" color="text-tph-pink" />
        <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
          Visual craft in constant motion.
        </h2>
        <p className="mt-4 text-xs text-white/50 max-w-md mx-auto">
          Hover to pause and explore the brand designs, interfaces, and campaign flyers built inside Trinity Pixel Hub.
        </p>
      </div>

      <div className="space-y-6 relative">
        {/* Left and Right blur covers for seamless fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-tph-dark to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-tph-dark to-transparent z-20 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -2500] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: 'linear',
            }}
            className="flex gap-6 pr-6 items-center"
            whileHover={{ style: { animationPlayState: 'paused' } }}
          >
            {row1Items.map((proj, idx) => (
              <div
                key={`marquee1-${idx}`}
                className="relative h-56 w-72 shrink-0 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02] transition-all duration-300 hover:border-tph-cyan/40 hover:shadow-cyan-glow/5"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-3 group-hover:translate-y-0 text-left whitespace-normal">
                  <p className="text-white font-bold text-xs leading-tight">{proj.title}</p>
                  <p className="text-tph-cyan text-[8px] font-bold uppercase tracking-widest mt-1">
                    {proj.category}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <motion.div
            animate={{ x: [-2500, 0] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: 'linear',
            }}
            className="flex gap-6 pr-6 items-center"
          >
            {row2Items.map((proj, idx) => (
              <div
                key={`marquee2-${idx}`}
                className="relative h-56 w-72 shrink-0 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02] transition-all duration-300 hover:border-tph-pink/40 hover:shadow-pink-glow/5"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-103 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-3 group-hover:translate-y-0 text-left whitespace-normal">
                  <p className="text-white font-bold text-xs leading-tight">{proj.title}</p>
                  <p className="text-tph-pink text-[8px] font-bold uppercase tracking-widest mt-1">
                    {proj.category}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
