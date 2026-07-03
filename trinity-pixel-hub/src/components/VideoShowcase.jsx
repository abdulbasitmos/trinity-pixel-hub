import { motion } from 'framer-motion'
import videoEditSrc from '../istockphoto-2210801206-640_adpp_is.mp4'
import webMotionSrc from '../istockphoto-2226650668-640_adpp_is.mp4'
import BrandLogo from './BrandLogo'
import SectionKicker from './SectionKicker'

const reels = [
  {
    title: 'Motion-led campaign energy',
    label: 'Video Editing',
    src: videoEditSrc,
    points: ['Short-form reels', 'Launch teasers', 'Event screen loops'],
  },
  {
    title: 'Digital product atmosphere',
    label: 'Web + Brand',
    src: webMotionSrc,
    points: ['Hero backgrounds', 'Brand films', 'Interactive visuals'],
  },
]

export default function VideoShowcase() {
  const mainReel = reels[0]

  return (
    <section id="reels" className="relative overflow-hidden bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="reels-title">
      <video className="absolute inset-0 h-full w-full scale-110 object-cover opacity-10 blur-2xl pointer-events-none" src={mainReel.src} autoPlay muted loop playsInline aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0f_0%,rgba(10,10,15,0.85)_45%,#0a0a0f_100%)]" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionKicker label="Video Reels" color="text-tph-orange" />
            <h2 id="reels-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              More motion, more depth, more brand atmosphere.
            </h2>
          </div>
          <p className="text-xs leading-relaxed text-white/50">
            These background clips support the visual language of the site and show how TPH can use motion as a premium design layer for campaigns, websites, and social content.
          </p>
        </div>

        {/* Large Featured Video */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-[0_8px_32px_rgba(255,0,127,0.05)] backdrop-blur-xl"
        >
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-black aspect-video">
            <video className="w-full h-full object-cover opacity-90" src={mainReel.src} autoPlay muted loop playsInline aria-label="Cinematic Trinity Pixel Hub video showreel" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6">
              <span className="text-[9px] font-bold uppercase tracking-widest text-tph-cyan">Cinematic Focal Point</span>
              <h3 className="mt-2 text-xl font-bold text-white max-w-3xl leading-tight">
                Premium motion graphics, video edits, and UI interaction energy.
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Staggered Sub-cards */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {reels.map((reel, index) => (
            <motion.article
              key={reel.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(0, 210, 255, 0.4)', boxShadow: '0 8px 30px rgba(0, 210, 255, 0.05)' }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                <video
                  className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-103 group-hover:opacity-100"
                  src={reel.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={`${reel.title} preview video`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-transparent to-transparent pointer-events-none" />
                <BrandLogo className="absolute left-5 top-5 h-9 w-9 border-white/10" />
              </div>
              <div className="p-5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-tph-pink">{reel.label}</span>
                <h3 className="mt-2 text-lg font-bold text-white group-hover:text-tph-pink transition-colors duration-300">{reel.title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {reel.points.map((point) => (
                    <span key={point} className="rounded bg-white/5 border border-white/5 px-2.5 py-1 text-[9px] font-semibold text-white/50">
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
