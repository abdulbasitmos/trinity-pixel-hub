import { motion } from 'framer-motion'
import heroVideoSrc from '../istockphoto-1087806292-640_adpp_is.mp4'
import HeroActionButtons from './HeroActionButtons'
import HeroBannerBadge from './HeroBannerBadge'
import HeroStats from './HeroStats'
import HeroShowcase from './HeroShowcase'
import HeroText from './HeroText'

const heroFallbackImage =
  'https://images.unsplash.com/photo-1635776062043-223faf322554?auto=format&fit=crop&w=2400&q=90'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[85vh] flex items-center overflow-hidden bg-tph-dark pt-28 pb-16"
      aria-labelledby="hero-title"
    >
      {/* Background Image/Video */}
      <div 
        className="absolute inset-0 -z-30 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url(${heroFallbackImage})` }}
      />
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-50 saturate-[1.25] blur-[1px]"
        src={heroVideoSrc}
        poster={heroFallbackImage}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      
      {/* Gradients overlay */}
      <div className="absolute inset-0 -z-10 bg-hero-glow opacity-80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-tph-dark/20 via-tph-dark/80 to-tph-dark" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(0,210,255,0.12),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,0,127,0.12),transparent_40%)]" />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.8fr] lg:items-center">
          <div className="flex flex-col items-start text-left">
            <HeroBannerBadge />
            <HeroText />
            <HeroActionButtons />
            <HeroStats />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 text-xs leading-relaxed text-white/50 backdrop-blur-md"
            >
              Start with us to sign in and book a design, web, or content session without moving through a separate contact workflow.
            </motion.div>
          </div>

          <div className="hidden lg:block">
            <HeroShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}
