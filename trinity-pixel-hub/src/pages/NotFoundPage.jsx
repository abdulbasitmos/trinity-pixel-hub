import { motion } from 'framer-motion'
import RouterLink from '../components/RouterLink'

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5 pt-28 text-center sm:px-6 lg:px-8">
      <motion.p 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-xs font-bold uppercase tracking-[0.25em] text-tph-cyan"
      >
        404
      </motion.p>
      
      <motion.h1 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-4 text-3xl font-extrabold text-white"
      >
        This page does not exist.
      </motion.h1>
      
      <motion.p 
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 text-sm leading-relaxed text-white/50"
      >
        Return to the homepage or choose another section from the navigation.
      </motion.p>
      
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mx-auto mt-8"
      >
        <RouterLink
          href="/"
          className="inline-flex rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-tph-dark shadow-pink-glow"
        >
          Back Home
        </RouterLink>
      </motion.div>
    </main>
  )
}
