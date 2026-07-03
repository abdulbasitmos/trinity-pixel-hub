import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '../data/siteData'
import SectionKicker from './SectionKicker'
import RouterLink from './RouterLink'

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section className="bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="proof-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <SectionKicker label="Client Signal" color="text-tph-orange" />
          <h2 id="proof-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
            Creative work that feels sharp before and after launch.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          {/* Active Highlight Card */}
          <motion.figure 
            whileHover={{ y: -4 }}
            className="flex flex-col justify-between rounded-2xl border border-tph-orange/30 bg-white/[0.03] p-7 transition-colors duration-300 backdrop-blur-sm shadow-[0_8px_32px_rgba(255,153,0,0.05)]"
          >
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-tph-cyan">Spotlight quote</span>
              <div className="mt-5 h-36 flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-medium leading-relaxed text-white/90"
                  >
                    “{activeTestimonial.quote}”
                  </motion.blockquote>
                </AnimatePresence>
              </div>
            </div>
            
            <div>
              <figcaption className="mt-6 border-t border-white/5 pt-5 flex items-center gap-3">
                <img 
                  src={activeTestimonial.image} 
                  alt={activeTestimonial.name} 
                  className="h-10 w-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-sm font-bold text-white">{activeTestimonial.name}</p>
                  <p className="mt-0.5 text-xs text-white/40">{activeTestimonial.role}</p>
                </div>
              </figcaption>
              
              <div className="mt-6 flex gap-2">
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="h-1.5 flex-1 rounded-full relative focus:outline-none"
                    aria-label={`Show testimonial from ${item.name}`}
                  >
                    <span className={`absolute inset-0 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-tph-gradient' : 'bg-white/10 hover:bg-white/20'}`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.figure>

          {/* Grid of testimonials */}
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(255, 153, 0, 0.4)', boxShadow: '0 8px 30px rgba(255, 153, 0, 0.05)' }}
              className={`flex flex-col justify-between rounded-2xl border bg-white/[0.02] p-7 transition-all duration-300 backdrop-blur-sm ${
                index === activeIndex ? 'border-tph-orange/40 bg-white/[0.04]' : 'border-white/10'
              }`}
            >
              <blockquote className="text-sm leading-relaxed text-white/70">“{item.quote}”</blockquote>
              <figcaption className="mt-8 border-t border-white/5 pt-5 flex items-center gap-3">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-9 w-9 rounded-full object-cover border border-white/10"
                />
                <div>
                  <p className="text-xs font-bold text-white">{item.name}</p>
                  <p className="mt-0.5 text-[10px] text-white/40">{item.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Start creative brief section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-tph-gradient p-[1px] shadow-[0_8px_32px_rgba(0,210,255,0.05)]"
        >
          <div className="rounded-[15px] bg-[#09090d] px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Ready for the next build?</p>
              <h3 className="mt-3 text-2xl font-bold text-white leading-tight">Start with a clear creative brief.</h3>
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
