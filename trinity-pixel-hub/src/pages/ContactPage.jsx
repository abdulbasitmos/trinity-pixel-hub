import Contact from '../components/Contact'
import PageMediaBanner from '../components/PageMediaBanner'
import PageHeading from '../components/PageHeading'

// Team Headshots
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg'
import designLeadPhotoA from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'

// Looping Videos
import collaborationVideo from '../istockphoto-2210801206-640_adpp_is.mp4'
import designVideo from '../istockphoto-1087806292-640_adpp_is.mp4'

export default function ContactPage() {
  return (
    <main className="bg-tph-dark px-5 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeading
          kicker="Contact Us"
          color="text-tph-orange"
          title="Get in touch to start your project."
          description="Use this page to brief the studio, scope the work, and start the project conversation."
        />
      </div>
      <PageMediaBanner
        title="Briefing visuals"
        text="The contact page now opens with a visual cue so the intake form feels like part of the studio journey."
        frames={[
          { title: 'Branding & Design', video: designVideo },
          { title: 'Collaboration workspace', video: collaborationVideo },
          { title: 'Creative planning', image: designLeadPhotoA },
          { title: 'Data operations', image: dataLeadPhoto },
        ]}
      />
      <Contact />
    </main>
  )
}
