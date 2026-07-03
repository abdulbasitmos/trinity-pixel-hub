import Hero from '../components/Hero'
import HomeIntroduction from '../components/HomeIntroduction'
import HomeStats from '../components/HomeStats'
import HomeSpotlight from '../components/HomeSpotlight'
import HomeMediaStrip from '../components/HomeMediaStrip'
import HomeImageMarquee from '../components/HomeImageMarquee'
import HomeTeamIntro from '../components/HomeTeamIntro'
import Team from '../components/Team'
import Process from '../components/Process'
import Portfolio from '../components/Portfolio'
import VideoShowcase from '../components/VideoShowcase'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import HomeCTA from '../components/HomeCTA'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Team />
      <HomeTeamIntro />
      <HomeIntroduction />
      <HomeStats />
      <HomeSpotlight />
      <HomeMediaStrip />
      <HomeImageMarquee />
      <Process />
      <Portfolio />
      <VideoShowcase />
      <Testimonials />
      <FAQ />
      <HomeCTA />
    </main>
  )
}
