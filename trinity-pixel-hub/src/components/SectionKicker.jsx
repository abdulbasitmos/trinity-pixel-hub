import BrandLogo from './BrandLogo'

export default function SectionKicker({ label, color = 'text-tph-cyan' }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <BrandLogo className="h-10 w-10 shrink-0" />
      <p className={`text-sm font-black uppercase tracking-[0.22em] ${color}`}>{label}</p>
    </div>
  )
}
