import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Flame, Star, Zap } from 'lucide-react'
import SectionKicker from './SectionKicker'

// Import videos for backgrounds on hover
import designVideo from '../istockphoto-1087806292-640_adpp_is.mp4'
import collaborationVideo from '../istockphoto-2210801206-640_adpp_is.mp4'
import studioVideo from '../istockphoto-2226650668-640_adpp_is.mp4'

const packages = [
  {
    icon: Zap,
    title: 'Brand Launch Pack',
    description: 'Perfect for startups and creators looking to establish a high-impact, professional brand presence quickly.',
    deliverables: [
      'Responsive Logo Suite (SVG)',
      'Brand Typography & Color Guide',
      'Social Media Kit (10 Templates)',
      '1x Cinematic Brand Video (15s)',
      'Business Card & Identity Mockups',
    ],
    priceMonthly: '$1,250',
    priceAnnual: '$950',
    accent: 'cyan',
    badge: 'Popular',
    video: designVideo,
  },
  {
    icon: Flame,
    title: 'Vite Frontend Build',
    description: 'A production-ready responsive single page application engineered for ultimate load speed and conversion.',
    deliverables: [
      'React + Vite Frontend Architecture',
      'Tailwind CSS Responsive Layouts',
      'Firebase Auth & Firestore Prep',
      'Integrated Client Admin Dashboard',
      'SEO & Performance Optimization',
    ],
    priceMonthly: '$2,800',
    priceAnnual: '$2,200',
    accent: 'pink',
    badge: 'Pro Tier',
    video: collaborationVideo,
  },
  {
    icon: Star,
    title: 'Complete Studio Rollout',
    description: 'The ultimate package combining branding, full stack web development, cinematic motion, and data analytics.',
    deliverables: [
      'Full Identity Strategy & Guidelines',
      'Multi-Page React Portal Integration',
      'Cinematic Promos & Reels (3 cuts)',
      'Custom Analytics & Insight Panels',
      'Priority 30-Day Launch Support',
    ],
    priceMonthly: '$4,500',
    priceAnnual: '$3,600',
    accent: 'orange',
    badge: 'Enterprise',
    video: studioVideo,
  },
]

export default function ServicesExtra() {
  const [isAnnual, setIsAnnual] = useState(true)

  const cardContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 75, damping: 15 },
    },
  }

  return (
    <section className="bg-tph-dark py-24 px-5 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <SectionKicker label="Service Packages" color="text-tph-cyan" />
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">
            Productized packages built for speed and impact.
          </h2>
          <p className="text-xs text-white/50">
            Choose a delivery tier that fits your project phase. We operate with flat rates and clear scope timelines.
          </p>

          {/* Pricing Toggle */}
          <div className="pt-6 flex justify-center items-center gap-3">
            <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${!isAnnual ? 'text-white' : 'text-white/40'}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-white/10 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-tph-cyan"
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5 bg-tph-gradient' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 flex items-center gap-1.5 ${isAnnual ? 'text-white' : 'text-white/40'}`}>
              Annual billing
              <span className="text-[9px] font-bold text-tph-cyan bg-tph-cyan/10 border border-tph-cyan/20 px-2 py-0.5 rounded-full uppercase">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Packages Grid */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-3 items-stretch"
        >
          {packages.map((pkg) => {
            const Icon = pkg.icon
            const accentGlow = {
              cyan: 'group-hover:border-tph-cyan/40 group-hover:shadow-[0_8px_32px_rgba(0,210,255,0.06)]',
              pink: 'group-hover:border-tph-pink/40 group-hover:shadow-[0_8px_32px_rgba(255,0,127,0.06)]',
              orange: 'group-hover:border-tph-orange/40 group-hover:shadow-[0_8px_32px_rgba(255,153,0,0.06)]',
            }[pkg.accent]

            const accentColor = {
              cyan: 'text-tph-cyan bg-tph-cyan/10 border-tph-cyan/20',
              pink: 'text-tph-pink bg-tph-pink/10 border-tph-pink/20',
              orange: 'text-tph-orange bg-tph-orange/10 border-tph-orange/20',
            }[pkg.accent]

            return (
              <motion.article
                key={pkg.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-sm ${accentGlow}`}
              >
                {/* Background Video Hover */}
                <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-10">
                  <video 
                    src={pkg.video} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-tph-dark/90" />
                </div>

                <div className="space-y-6">
                  {/* Top Badge */}
                  <div className="flex justify-between items-center">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl border ${accentColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${accentColor}`}>
                      {pkg.badge}
                    </span>
                  </div>

                  {/* Header info */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-tph-cyan transition-colors duration-300">
                      {pkg.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/50">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing dynamic */}
                  <div className="pt-2 border-t border-white/5">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isAnnual ? 'annual' : 'monthly'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline gap-1"
                      >
                        <span className="text-3xl font-black text-white">
                          {isAnnual ? pkg.priceAnnual : pkg.priceMonthly}
                        </span>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-wider">
                          / project
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Deliverables Checklist */}
                  <ul className="space-y-3 pt-4 border-t border-white/5">
                    {pkg.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-white/70">
                        <Check className={`h-4 w-4 shrink-0 mt-0.5 ${pkg.accent === 'cyan' ? 'text-tph-cyan' : pkg.accent === 'pink' ? 'text-tph-pink' : 'text-tph-orange'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
