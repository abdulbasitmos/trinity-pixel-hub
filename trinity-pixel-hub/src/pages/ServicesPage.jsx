import Services from '../components/Services'
import ServicesExtra from '../components/ServicesExtra'
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

export default function ServicesPage() {
  return (
    <main className="bg-tph-dark px-5 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeading
          kicker="Services"
          color="text-tph-cyan"
          title="Seven creative pillars, one integrated delivery system."
          description="We combine design, development, brand strategy, and analytics to build high-performance products."
        />
      </div>
      <PageMediaBanner
        title="Our creative execution"
        text="A visual overview of our capability spectrum, ranging from aesthetic design to production-grade engineering."
        frames={[
          { title: 'Brand systems', video: designVideo },
          { title: 'Web engineering', image: webLeadPhoto },
          { title: 'Interactive data', image: dataLeadPhoto },
          { title: 'Studio operations', video: studioVideo },
        ]}
      />
      <Services />
      <ServicesExtra />
    </main>
  )
}
