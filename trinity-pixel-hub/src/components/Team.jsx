import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg'
import designLeadPhotoA from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg'
import designLeadPhotoB from '../WhatsApp Image 2026-06-20 at 4.35.38 PM.jpeg'
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg'
import { designLeadHighlights, teamHighlights, webLeadHighlights } from '../data/siteData'
import BrandLogo from './BrandLogo'
import SectionKicker from './SectionKicker'
import { X, Sparkles, Award, UserCheck, ShieldCheck } from 'lucide-react'

const rotatingDesignPhotos = [designLeadPhotoA, designLeadPhotoB]
const rotatingDataPhotos = [dataLeadPhoto, designLeadPhotoB]

// Full Bios data structure
const fullBios = {
  design: {
    name: 'Yusuf Ibrahim Khalilullah',
    role: 'Graphic Design & Brand Systems Lead',
    image: designLeadPhotoA,
    tagline: 'Transforming ideas into visually compelling designs that inspire, communicate, and leave lasting impressions.',
    paragraphs: [
      'Yusuf Ibrahim Khalilullah is a highly skilled and creative professional graphic designer. With a strong understanding of modern design principles, branding strategies, and visual storytelling, he specializes in creating high-quality graphics that help businesses, organizations, entrepreneurs, and individuals establish a strong and memorable brand identity.',
      'Over the years, Yusuf has developed expertise in designing professional logos, business branding materials, promotional banners, flyers, brochures, posters, social media advertisements, business cards, product packaging, presentation graphics, and other digital and print marketing materials. His ability to combine creativity with strategic thinking allows him to produce designs that are not only aesthetically appealing but also purposeful, functional, and aligned with each client\'s vision and business objectives.',
      'Yusuf believes that every successful brand begins with a powerful visual identity. For this reason, he works closely with clients to understand their goals, target audience, brand values, and market positioning before beginning any design project. By carefully analyzing each client\'s needs, he creates customized design solutions that effectively communicate their message, strengthen brand recognition, and build trust with customers.',
      'His logo designs are crafted to reflect originality, simplicity, and timelessness, ensuring that each logo remains relevant and memorable across different platforms and industries. Whether developing a logo for a startup, redesigning an existing brand identity, or creating complete branding packages, Yusuf focuses on producing designs that accurately represent the personality and vision of the business.',
      'In addition to branding, Yusuf is experienced in creating engaging marketing materials that help businesses promote their products and services more effectively. His promotional banners, social media graphics, advertisements, and campaign visuals are carefully designed to attract attention, increase customer engagement, and improve overall marketing performance. He understands the importance of creating content that performs well across various digital platforms while maintaining consistency in brand identity.',
      'Yusuf is passionate about helping businesses grow through effective visual communication. He understands that good design is much more than attractive colors and layouts—it is a powerful communication tool that influences customer perception, builds credibility, and drives business success. Every project he undertakes is approached with creativity, precision, attention to detail, and a commitment to delivering exceptional quality.',
      'His design process emphasizes collaboration, innovation, and continuous improvement. From the initial consultation and concept development to revisions and final delivery, Yusuf ensures that clients remain involved throughout every stage of the creative process. This collaborative approach enables him to consistently deliver results that exceed expectations while building long-lasting professional relationships based on trust, reliability, and mutual respect.',
      'As a designer who values innovation, Yusuf continually expands his knowledge by staying up to date with emerging design trends, industry standards, and the latest creative technologies. His willingness to learn and adapt enables him to provide fresh, modern, and competitive design solutions that meet the evolving needs of today\'s digital world.',
      'Whether working with small businesses, established companies, entrepreneurs, nonprofit organizations, or personal brands, Yusuf approaches every project with professionalism, dedication, and a genuine desire to help his clients succeed. His work reflects creativity, originality, strategic thinking, and a commitment to excellence, making him a trusted partner for individuals and organizations seeking impactful visual communication.',
      'Beyond creating beautiful graphics, Yusuf aims to build meaningful brand experiences that connect businesses with their audiences. His designs are created not only to capture attention but also to communicate value, tell compelling stories, and establish strong emotional connections between brands and their customers.'
    ]
  },
  web: {
    name: 'Moshood Abdubasit',
    role: 'Head of Website Development',
    image: webLeadPhoto,
    tagline: 'Dedicated to building modern, user-friendly, and high-performance web applications with frontend clean code.',
    paragraphs: [
      'Moshood Abdubasit is a passionate and innovative Frontend Developer and Software Engineer dedicated to building modern, user-friendly, and high-performance web applications. With a strong foundation in contemporary web technologies, he specializes in creating responsive, visually appealing, and interactive digital experiences that solve real-world problems and improve the way people interact with technology.',
      'His expertise includes developing websites and web applications using React.js, JavaScript, Tailwind CSS, HTML5, CSS3, and Firebase, enabling him to build scalable, secure, and dynamic applications with clean, maintainable code. He is passionate about writing efficient code, creating intuitive user interfaces, and delivering seamless user experiences across desktops, tablets, and mobile devices.',
      'Moshood believes that great software combines functionality with outstanding design. Every project he develops is carefully planned to ensure it is visually attractive, responsive, accessible, and optimized for performance. He pays close attention to user experience (UX), ensuring that every interface is easy to navigate, engaging, and tailored to meet users\' needs while maintaining modern design standards.',
      'Throughout his development journey, Moshood has worked on a variety of innovative projects across different industries. His portfolio includes school management systems, AI-powered educational platforms, laundry service management systems, catering service booking platforms, business websites, e-commerce applications, portfolio websites, and intelligent web solutions that integrate modern technologies to improve efficiency and productivity.',
      'One of his strengths is transforming complex ideas into practical digital solutions. He enjoys analyzing real-world challenges and designing applications that simplify tasks, automate workflows, and provide users with intuitive and reliable experiences. His problem-solving mindset enables him to create software that is both technically sound and user-focused.',
      'In addition to frontend development, Moshood has developed experience in integrating cloud-based services such as Firebase Authentication, Firestore Database, Cloud Storage, and Firebase Hosting. These technologies allow him to create secure applications with real-time data synchronization, authentication systems, and scalable cloud infrastructure that support modern web applications.',
      'As a developer, Moshood continuously improves his skills by staying current with emerging technologies, modern frameworks, industry best practices, and design trends. He is committed to lifelong learning and consistently explores new tools, programming techniques, and software development methodologies to deliver solutions that remain innovative and competitive in the ever-evolving technology landscape.',
      'Beyond writing code, Moshood is passionate about creating products that have a meaningful impact. His vision extends beyond building websites—he aims to develop digital platforms that improve education, support businesses, empower entrepreneurs, and make technology more accessible to people and organizations. His long-term goal is to create intelligent, scalable, and globally recognized software solutions that address real challenges and contribute to digital transformation.',
      'Moshood values professionalism, collaboration, creativity, and continuous improvement. He believes successful projects are built on effective communication, careful planning, and close collaboration with clients and team members. By understanding each project\'s objectives and target audience, he develops customized solutions that align with business goals while delivering measurable value.',
      'His dedication to quality, innovation, and excellence is reflected in every project he undertakes. Whether developing a business website, an administrative dashboard, an educational platform, or a complex web application, Moshood approaches every task with enthusiasm, precision, and a commitment to delivering exceptional results.'
    ]
  },
  data: {
    name: 'Yusuf Fuhad',
    role: 'Head of Data Analysis',
    image: dataLeadPhoto,
    tagline: 'Transforming raw data into meaningful and strategic business intelligence dashboards.',
    paragraphs: [
      'Yusuf Fuhad is a dedicated and results-driven Data Analyst with a passion for transforming raw data into meaningful insights that support informed decision-making and business growth. He specializes in collecting, cleaning, analyzing, and interpreting complex datasets to uncover trends, identify opportunities, and solve real-world business challenges through data-driven strategies.',
      'With a strong analytical mindset and attention to detail, Yusuf helps businesses, organizations, and institutions make smarter decisions by converting data into clear, actionable information. He believes that every dataset tells a story, and his goal is to uncover that story to help clients improve efficiency, optimize performance, and achieve their objectives.',
      'Yusuf is skilled in working with spreadsheets, databases, statistical methods, and data visualization tools to organize and analyze information effectively. He develops interactive dashboards, detailed reports, and visual presentations that make complex data easy to understand for both technical and non-technical audiences. His ability to communicate findings clearly enables organizations to make confident, evidence-based decisions.',
      'His expertise includes data collection, data cleaning, data validation, exploratory data analysis (EDA), statistical analysis, dashboard development, business intelligence reporting, performance monitoring, and trend forecasting. Whether analyzing sales performance, customer behavior, financial records, operational efficiency, or market trends, Yusuf delivers accurate insights that help organizations identify strengths, address weaknesses, and discover new opportunities for growth.',
      'Yusuf understands that data is one of the most valuable assets in today\'s digital world. For this reason, he follows industry best practices to ensure the accuracy, consistency, and integrity of every dataset he works with. His systematic approach to data analysis allows him to identify patterns, detect anomalies, and generate reliable recommendations that support strategic planning and operational improvements.',
      'In addition to technical analysis, Yusuf enjoys solving complex business problems through critical thinking and logical reasoning. He works closely with stakeholders to understand their goals, define key performance indicators (KPIs), and deliver customized analytical solutions that align with organizational objectives. His collaborative approach ensures that every project produces practical value and measurable results.',
      'Committed to continuous learning, Yusuf stays up to date with the latest developments in data analytics, business intelligence, visualization techniques, and analytical technologies. He continually enhances his knowledge and skills to provide modern, innovative, and efficient solutions in an ever-evolving data landscape.',
      'Yusuf\'s professional values include accuracy, integrity, curiosity, and excellence. He approaches every project with professionalism, confidentiality, and a commitment to delivering high-quality work within agreed timelines. His focus is not only on analyzing data but also on helping organizations understand the meaning behind the numbers and use those insights to make informed, strategic decisions.',
      'Whether supporting startups, established businesses, government agencies, educational institutions, or nonprofit organizations, Yusuf is committed to delivering data analysis services that drive performance, improve decision-making, and contribute to long-term success. His ability to combine technical expertise with business understanding makes him a trusted partner for organizations seeking to unlock the full potential of their data.'
    ]
  }
}

function RotatingImage({ photos, interval = 3000, alt = 'Rotating team photo' }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!photos || photos.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length)
    }, interval)

    return () => window.clearInterval(timer)
  }, [photos, interval])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={photos[activeIndex]}
          alt={alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.85, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
        />
      </AnimatePresence>
      <div className="absolute bottom-4 right-4 flex gap-1 z-10">
        {photos.map((_, index) => (
          <span
            key={index}
            className={`h-1 rounded-full transition-all duration-300 ${activeIndex === index ? 'w-4 bg-white' : 'w-1 bg-white/40'}`}
          />
        ))}
      </div>
    </>
  )
}

function TeamCard({
  title,
  accent,
  image,
  imageAlt,
  highlights,
  stats,
  bio,
  onOpenBio,
  rotatingPhotos = null,
  rotatingInterval = 3000,
  imagePosition = 'object-[50%_18%]',
  index
}) {
  const accentBorderColor = {
    cyan: 'hover:border-tph-cyan/40 hover:shadow-[0_8px_32px_rgba(0,210,255,0.08)]',
    pink: 'hover:border-tph-pink/40 hover:shadow-[0_8px_32px_rgba(255,0,127,0.08)]',
    orange: 'hover:border-tph-orange/40 hover:shadow-[0_8px_32px_rgba(255,153,0,0.08)]',
  }[accent]

  const accentBadgeColor = {
    cyan: 'text-tph-cyan bg-tph-cyan/10 border-tph-cyan/20',
    pink: 'text-tph-pink bg-tph-pink/10 border-tph-pink/20',
    orange: 'text-tph-orange bg-tph-orange/10 border-tph-orange/20',
  }[accent]

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15, delay: index * 0.1 },
    },
  }

  return (
    <motion.article 
      onClick={onOpenBio}
      variants={revealVariants}
      whileHover={{ y: -5 }}
      className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 cursor-pointer ${accentBorderColor}`}
    >
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black">
          {rotatingPhotos && rotatingPhotos.length > 1 ? (
            <RotatingImage photos={rotatingPhotos} interval={rotatingInterval} alt={imageAlt} />
          ) : (
            <img
              src={image}
              alt={imageAlt}
              className={`h-full w-full object-cover ${imagePosition} opacity-85 transition duration-700 group-hover:scale-103 group-hover:opacity-100`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-tph-dark/90 via-tph-dark/20 to-transparent pointer-events-none" />
          <BrandLogo className="absolute left-4 top-4 h-9 w-9 border-white/10" />
        </div>

        <div className="pt-6">
          <span className={`inline-block text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${accentBadgeColor}`}>
            Department Lead
          </span>
          <h3 className="mt-4 text-xl font-bold leading-tight text-white">{title}</h3>

          <div className="mt-5 grid gap-2">
            {highlights.slice(0, 3).map((item) => (
              <div key={item} className="rounded-lg border border-white/5 bg-white/[0.015] px-3.5 py-2">
                <p className="text-[11px] font-medium leading-relaxed text-white/50">{item}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-relaxed text-white/60">{bio}</p>
        </div>
      </div>

      <div>
        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/5 pt-5">
          {stats.map(([value, label]) => (
            <div key={value} className="rounded-lg border border-white/5 bg-white/[0.015] p-2.5 text-center">
              <p className="bg-tph-gradient bg-clip-text text-sm font-extrabold text-transparent">{value}</p>
              <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/30">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <button
            onClick={onOpenBio}
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 hover:text-white transition-colors duration-300 focus:outline-none"
          >
            More bio
            <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function Team() {
  const [selectedBio, setSelectedBio] = useState(null)

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <section id="team" className="relative overflow-hidden bg-[#08080c] px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="team-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,210,255,0.08),transparent_30%),radial-gradient(circle_at_82%_50%,rgba(255,0,127,0.08),transparent_34%)] pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <SectionKicker label="Our Team" color="text-tph-cyan" />
            <h2 id="team-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Department heads aligned behind one creative delivery system.
            </h2>
            <motion.div 
              animate={{ 
                y: [0, -6, 0],
                boxShadow: [
                  '0 4px 20px rgba(0, 210, 255, 0.1)',
                  '0 8px 30px rgba(0, 210, 255, 0.25)',
                  '0 4px 20px rgba(0, 210, 255, 0.1)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.5, 
                ease: "easeInOut" 
              }}
              className="mt-6 inline-flex items-center gap-3.5 rounded-full bg-gradient-to-r from-tph-cyan/15 to-tph-purple/15 border border-tph-cyan/30 px-5 py-2.5 backdrop-blur-md select-none cursor-pointer"
              onClick={() => {
                const target = document.getElementById('team-grid');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-tph-cyan/60"
                />
                <Sparkles className="h-4 w-4 text-tph-cyan relative z-10 animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-tph-gradient bg-clip-text text-transparent">
                Click a card below to view our team ideas
              </span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-tph-cyan text-xs font-bold"
              >
                ↓
              </motion.span>
            </motion.div>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-white/50">
            Data, design, and web leadership sit together so strategy, visuals, and implementation stay connected from the first brief.
          </p>
        </div>

        <motion.div 
          id="team-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-6 lg:grid-cols-3"
        >
          <TeamCard
            index={0}
            title="Head of Data Analysis"
            accent="orange"
            image={dataLeadPhoto}
            imageAlt="Head of Data Analysis department"
            highlights={teamHighlights}
            bio="Focused on dashboards, reporting, and insight structures that make business decisions easier to read."
            onOpenBio={() => {
              window.history.pushState({}, '', '/team/data-analysis');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            stats={[
              ['BI', 'Reporting'],
              ['KPI', 'Tracking'],
              ['ROI', 'Insight'],
            ]}
          />

          <TeamCard
            index={1}
            title="Graphic Design & Brand Systems Lead"
            accent="pink"
            image={designLeadPhotoA}
            imageAlt="Graphic Design & Brand Systems Lead"
            highlights={designLeadHighlights}
            bio="Builds identity systems, campaign visuals, and logo direction that hold up across social, print, and launch assets."
            onOpenBio={() => {
              window.history.pushState({}, '', '/team/graphic-design');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            rotatingPhotos={rotatingDesignPhotos}
            rotatingInterval={3000}
            stats={[
              ['Logo', 'Systems'],
              ['Flyer', 'Campaigns'],
              ['Brand', 'Identity'],
            ]}
          />

          <TeamCard
            index={2}
            title="Head of Website Development"
            accent="cyan"
            image={webLeadPhoto}
            imageAlt="Head of Website Development department"
            imagePosition="object-[50%_12%]"
            highlights={webLeadHighlights}
            bio="Turns design intent into responsive React interfaces with a focus on speed, structure, and conversion."
            onOpenBio={() => {
              window.history.pushState({}, '', '/team/web-development');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            stats={[
              ['React', 'UI'],
              ['Vite', 'Speed'],
              ['UX', 'Flow'],
            ]}
          />
        </motion.div>
      </div>

      {/* Professional Bio Details Modal Overlay */}
      <AnimatePresence>
        {selectedBio && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBio(null)}
              className="absolute inset-0 bg-tph-dark/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-tph-dark/95 border border-white/10 rounded-2xl shadow-purple-glow/10 overflow-hidden flex flex-col max-h-[85vh] backdrop-blur-xl"
            >
              {/* Header Info */}
              <div className="p-6 border-b border-white/5 flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={selectedBio.image} 
                    alt={selectedBio.name} 
                    className="h-12 w-12 rounded-full object-cover border border-white/10 object-[50%_18%]"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">{selectedBio.name}</h3>
                    <p className="text-[10px] text-tph-pink font-bold uppercase tracking-wider mt-0.5">{selectedBio.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBio(null)}
                  className="text-white/40 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Bio Scrolling Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex gap-3 items-start">
                  <Sparkles className="h-5 w-5 text-tph-cyan shrink-0 mt-0.5" />
                  <p className="text-xs font-semibold italic text-white/80 leading-relaxed">
                    "{selectedBio.tagline}"
                  </p>
                </div>

                <div className="space-y-4 text-white/60 text-xs leading-relaxed font-semibold">
                  {selectedBio.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/5 bg-black/10 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-white/40">
                <div className="flex items-center gap-1.5 text-tph-cyan">
                  <UserCheck className="h-4 w-4" />
                  <span>Verified Department Lead</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400">
                  <Award className="h-4 w-4" />
                  <span>Trinity Studio Coordinator</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
