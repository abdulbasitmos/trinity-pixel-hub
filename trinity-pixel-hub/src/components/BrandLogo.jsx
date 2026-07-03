import logoImage from '../WhatsApp Image 2026-06-20 at 10.34.24 AM.jpeg'

export default function BrandLogo({ variant = 'mark', className = '' }) {
  if (variant === 'full') {
    return (
      <img
        src={logoImage}
        alt="Trinity Pixel Hub logo"
        className={`object-contain ${className}`}
      />
    )
  }

  return (
    <span
      className={`relative inline-grid place-items-center overflow-hidden rounded-[8px] border border-white/15 bg-black shadow-cyan-glow ${className}`}
    >
      <img
        src={logoImage}
        alt="Trinity Pixel Hub logo"
        className="h-full w-full scale-[2.85] object-contain"
      />
    </span>
  )
}
