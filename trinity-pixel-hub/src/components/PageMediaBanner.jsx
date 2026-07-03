import { motion } from 'framer-motion'

export default function PageMediaBanner({ title, text, frames = [] }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 85, damping: 15 },
    },
  }

  return (
    <section className="bg-[#08080c] px-5 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Visual context</span>
          <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl leading-tight">{title}</h2>
          <p className="mt-4 text-xs leading-relaxed text-white/50">{text}</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 gap-4"
        >
          {frames.map((frame, index) => (
            <motion.div
              key={`${frame.title}-${index}`}
              variants={cardVariants}
              whileHover={{ y: -4, borderColor: 'rgba(0, 210, 255, 0.3)', boxShadow: '0 8px 30px rgba(0, 210, 255, 0.05)' }}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 backdrop-blur-sm"
            >
              <div className="overflow-hidden bg-black aspect-[4/3] relative">
                {'video' in frame ? (
                  <video
                    className="h-full w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    src={frame.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                  />
                ) : (
                  <img 
                    src={frame.image} 
                    alt={frame.title} 
                    className="h-full w-full object-cover opacity-85 hover:opacity-100 transition-all duration-300 hover:scale-103" 
                  />
                )}
              </div>
              <div className="p-4 border-t border-white/5 bg-[#09090e]/40">
                <p className="text-xs font-bold text-white/80">{frame.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
