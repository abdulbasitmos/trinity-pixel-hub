import About from '../components/About'
import AboutExtra from '../components/AboutExtra'
import PageMediaBanner from '../components/PageMediaBanner'
import PageHeading from '../components/PageHeading'

// Team Headshots
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg'
import designLeadPhotoA from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg'

// Looping Videos
import collaborationVideo from '../istockphoto-2210801206-640_adpp_is.mp4'
import designVideo from '../istockphoto-1087806292-640_adpp_is.mp4'
import studioVideo from '../istockphoto-2226650668-640_adpp_is.mp4'

export default function AboutPage() {
  return (
    <main className="bg-tph-dark px-5 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeading
          kicker="About"
          color="text-tph-cyan"
          title="The studio, the system, and the people behind the work."
          description="A focused look at how Trinity Pixel Hub combines brand design, motion, web engineering, and analytics into one delivery model."
        />
      </div>
      <PageMediaBanner
        title="The studio in motion"
        text="The about page now combines team, brand, and output imagery so visitors understand the studio faster."
        frames={[
          { title: 'Creative planning', video: collaborationVideo },
          { title: 'Design systems', video: designVideo },
          { title: 'Web engineering', image: webLeadPhoto },
          { title: 'Creative studio focus', video: studioVideo },
        ]}
      />
      <About />
      <AboutExtra />
    </main>
  )
}
