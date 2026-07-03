import { motion } from 'framer-motion'
import { projects } from '../data/siteData'
import SectionKicker from './SectionKicker'
import RouterLink from './RouterLink'

export default function Portfolio() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  return (
    <section id="portfolio" className="bg-[#0b0b10] px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="portfolio-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionKicker label="Portfolio" color="text-tph-cyan" />
            <h2 id="portfolio-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Selected work built to sell the next conversation.
            </h2>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/50">
            A compact view of brand, web, and motion work that shows how Trinity Pixel Hub moves from concept to launch-ready output.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project, index) => {
            const urlSlug = project.title.toLowerCase().replace(/\s+/g, '-')
            return (
              <motion.article
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -6, borderColor: 'rgba(0, 210, 255, 0.4)', boxShadow: '0 8px 30px rgba(0, 210, 255, 0.05)' }}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4.5 transition-all duration-300 backdrop-blur-sm ${
                  index === 0 ? 'md:col-span-2 xl:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-103 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-tph-dark/90 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-tph-cyan bg-tph-cyan/10 px-2.5 py-1 rounded-full border border-tph-cyan/10">
                      {project.category}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-white/60">{project.details}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-white/5 mt-4">
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tech.map((item) => (
                      <span key={item} className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[9px] font-semibold text-white/50">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex justify-end">
                    <RouterLink
                      href={`/projects/${urlSlug}`}
                      className="text-xs font-bold text-tph-cyan hover:underline inline-flex items-center gap-1"
                    >
                      View Case Study →
                    </RouterLink>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
