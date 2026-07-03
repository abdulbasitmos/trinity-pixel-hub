import SectionKicker from './SectionKicker'

export default function PageHeading({ kicker, title, description, color = 'text-tph-cyan' }) {
  return (
    <div className="max-w-3xl">
      <SectionKicker label={kicker} color={color} />
      <h1 className="mt-4 text-4xl font-black text-white sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">{description}</p>
    </div>
  )
}
