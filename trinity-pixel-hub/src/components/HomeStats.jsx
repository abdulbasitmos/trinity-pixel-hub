import { motion } from 'framer-motion'

const stats = [
  ['01', 'Brand systems built to scale'],
  ['02', 'Motion and video integrated early'],
  ['03', 'Web pages designed for conversion'],
  ['04', 'Analytics-ready creative delivery'],
]

export default function HomeStats() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  return (
    <section className="bg-[#08080c] px-5 py-16 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {stats.map(([number, label]) => (
          <motion.div
            key={label}
            variants={cardVariants}
            whileHover={{ y: -5, borderColor: 'rgba(0, 210, 255, 0.4)', boxShadow: '0 10px 30px -10px rgba(0, 210, 255, 0.15)' }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 backdrop-blur-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/30 transition-colors duration-300 group-hover:text-tph-cyan/60">
              Studio signal
            </p>
            <p className="mt-4 bg-tph-gradient bg-clip-text text-4xl font-extrabold text-transparent">
              {number}
            </p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300">
              {label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
