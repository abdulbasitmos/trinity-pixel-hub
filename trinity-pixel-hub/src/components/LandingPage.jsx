import Hero from './Hero'
import Team from './Team'
import HomeTeamIntro from './HomeTeamIntro'
import About from './About'
import Services from './Services'
import Process from './Process'
import Portfolio from './Portfolio'
import VideoShowcase from './VideoShowcase'
import Testimonials from './Testimonials'
import Contact from './Contact'

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Team />
      <HomeTeamIntro />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <VideoShowcase />
      <Testimonials />
      <Contact />
    </main>
  )
}
