import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Mail, Play, Code, Monitor, Cpu, Layers, Zap, Database } from 'lucide-react';

// Web Dev Lead Photo
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg';

// Import project screen recordings
import video1 from '../web/man/Screen Recording 2026-06-29 001352.mp4';
import video2 from '../web/man/Screen Recording 2026-07-03 142626.mp4';
import video3 from '../web/man/Screen Recording 2026-07-03 141014.mp4';
import video4 from '../web/man/Screen Recording 2026-07-03 141419.mp4';
import video5 from '../web/man/Screen Recording 2026-07-03 140751.mp4';

function WebRadarShowcase() {
  const [activeSkill, setActiveSkill] = useState(0);

  const skills = [
    { name: 'React SPA Frontend', value: '99%', desc: 'Structuring responsive SPA component layouts, custom hooks, and state context management.', icon: Code },
    { name: 'Tailwind Design Systems', value: '97%', desc: 'Building customized typography frameworks, responsive spacing scales, and premium CSS animations.', icon: Layers },
    { name: 'Vite Speed Sprints', value: '98%', desc: 'Configuring optimized bundle splitters and fast dev-reloads to accelerate production deployment.', icon: Zap },
    { name: 'Firebase Integrations', value: '95%', desc: 'Connecting real-time Firestore database endpoints, auth scopes, and hosting structures.', icon: Database }
  ];

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl grid md:grid-cols-2 gap-12 items-center relative overflow-hidden group">
      {/* Background glowing radar ring */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-tph-cyan/5 blur-3xl pointer-events-none" />
      
      {/* Left Column: Interactive Radar Animation */}
      <div className="relative flex justify-center items-center h-80 w-full select-none">
        {/* Concentric circles */}
        <div className="absolute h-72 w-72 rounded-full border border-white/5" />
        <div className="absolute h-52 w-52 rounded-full border border-white/10" />
        <div className="absolute h-32 w-32 rounded-full border border-tph-cyan/20 animate-[pulse_3s_infinite]" />

        {/* Radar Sweeper Line (Rotating Animation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute h-72 w-72 rounded-full border-r border-tph-cyan/40 pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent 50%, rgba(0, 210, 255, 0.1) 100%)',
          }}
        />

        {/* Orbiting Skill Nodes */}
        {skills.map((skill, index) => {
          const angle = (index * 360) / skills.length;
          const radius = 110; // px
          const radians = (angle * Math.PI) / 180;
          const x = radius * Math.cos(radians);
          const y = radius * Math.sin(radians);
          const Icon = skill.icon;
          const isActive = activeSkill === index;

          return (
            <motion.button
              key={skill.name}
              onClick={() => setActiveSkill(index)}
              whileHover={{ scale: 1.1 }}
              className={`absolute h-12 w-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isActive 
                  ? 'bg-tph-cyan border-tph-cyan text-tph-dark shadow-[0_0_20px_rgba(0,210,255,0.4)]' 
                  : 'bg-tph-dark/95 border-white/10 text-white/60 hover:text-white hover:border-tph-cyan/40'
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              <Icon className="h-5 w-5" />
            </motion.button>
          );
        })}

        {/* Central Core */}
        <div className="absolute h-20 w-20 rounded-full bg-tph-dark border border-white/10 flex flex-col items-center justify-center text-center p-2 shadow-2xl relative z-10">
          <p className="text-[14px] font-black text-white leading-none">
            {skills[activeSkill].value}
          </p>
          <p className="text-[8px] font-bold text-tph-cyan uppercase tracking-wider mt-1">
            Success
          </p>
        </div>
      </div>

      {/* Right Column: Skill Detail Presentation */}
      <div className="space-y-6 flex flex-col justify-center">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-tph-cyan bg-tph-cyan/10 px-3 py-1 rounded-full border border-tph-cyan/20">
            Interactive Skill Radar
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-4 leading-tight">
            Web development, architecture, and coding.
          </h3>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkill}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-tph-cyan animate-pulse" />
              <h4 className="text-base font-extrabold text-white">
                {skills[activeSkill].name}
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-white/60 font-medium">
              {skills[activeSkill].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Indicator Bars */}
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-white/5">
          {skills.map((skill, index) => (
            <button
              key={skill.name}
              onClick={() => setActiveSkill(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSkill === index ? 'bg-tph-cyan w-full' : 'bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const webDemos = [
  {
    title: 'ClassSphere - School Management System',
    description: 'An all-in-one educational platform for classroom administration, virtual learning, assignments, and real-time student performance tracking.',
    src: video1,
    tech: ['React', 'Tailwind CSS', 'Firebase Database', 'ApexCharts'],
    metric: 'ClassSphere',
    link: 'https://classsphere10.vercel.app/'
  },
  {
    title: 'Abdul-Basit - Creative Developer Portfolio',
    description: 'Personal software engineering portfolio showcasing interactive frontend designs, modern web animations, and clean code layout systems.',
    src: video2,
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    metric: 'Portfolio Showcase',
    link: 'https://abdul-basit-bevv.vercel.app'
  },
  {
    title: 'BashCare Hub - Hospital Management System',
    description: 'A comprehensive healthcare administration system tracking patient admissions, doctor schedules, and clinical operations.',
    src: video5,
    tech: ['React', 'Tailwind CSS', 'Firebase Database', 'ApexCharts'],
    metric: 'Healthcare Admin',
    link: 'https://bashcare-hub-frontend.vercel.app/'
  },
  {
    title: 'Laundry & Dry Cleaning Operations Panel',
    description: 'Real-time booking tracking, active orders management, automated status workflows, and interactive customer scheduling.',
    src: video3,
    tech: ['Vite', 'React', 'Context API', 'Local Storage'],
    metric: 'Operations Flow'
  },
  {
    title: 'Catering Service Booking & Client Portal',
    description: 'Interactive custom menu builder, automated price calculations, customer checkout flow, and booking status monitoring.',
    src: video4,
    tech: ['React', 'Tailwind', 'Firebase Auth', 'Stripe UI'],
    metric: 'Client Conversion'
  }
];

export default function WebDevLeadPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="bg-tph-dark min-h-screen px-5 pt-32 pb-24 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,210,255,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,153,0,0.08),transparent_40%)] pointer-events-none" />
      
      <div className="mx-auto max-w-6xl relative">
        <button
          onClick={() => navigateTo('/')}
          className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="h-4.5 w-4.5" /> 
          Back to Studio
        </button>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Photo & Quick Info */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(0,210,255,0.15)]">
              <img 
                src={webLeadPhoto} 
                alt="Moshood Abdubasit" 
                className="h-full w-full object-cover object-[50%_12%] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-transparent to-transparent" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold text-white leading-tight">Moshood <br />Abdubasit</h1>
              <p className="text-sm font-bold uppercase tracking-widest text-tph-cyan">Head of Website Development</p>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <button onClick={() => navigateTo('/projects')} className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-tph-pink transition-colors">
                  <Briefcase className="h-4 w-4" /> View Department Portfolio
                </button>
                <button onClick={() => navigateTo('/contact')} className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-tph-orange transition-colors">
                  <Mail className="h-4 w-4" /> Book a Web Project
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Full Biography */}
          <div className="space-y-6 text-sm leading-relaxed text-white/70 font-medium">
            <p>
              <strong className="text-white text-lg">Moshood Abdubasit is a passionate and innovative Frontend Developer and Software Engineer</strong> dedicated to building modern, user-friendly, and high-performance web applications. With a strong foundation in contemporary web technologies, he specializes in creating responsive, visually appealing, and interactive digital experiences that solve real-world problems and improve the way people interact with technology.
            </p>
            <p>
              His expertise includes developing websites and web applications using React.js, JavaScript, Tailwind CSS, HTML5, CSS3, and Firebase, enabling him to build scalable, secure, and dynamic applications with clean, maintainable code. He is passionate about writing efficient code, creating intuitive user interfaces, and delivering seamless user experiences across desktops, tablets, and mobile devices.
            </p>
            <p>
              Moshood believes that great software combines functionality with outstanding design. Every project he develops is carefully planned to ensure it is visually attractive, responsive, accessible, and optimized for performance. He pays close attention to user experience (UX), ensuring that every interface is easy to navigate, engaging, and tailored to meet users' needs while maintaining modern design standards.
            </p>
            <p>
              Throughout his development journey, Moshood has worked on a variety of innovative projects across different industries. His portfolio includes school management systems, AI-powered educational platforms, laundry service management systems, catering service booking platforms, business websites, e-commerce applications, portfolio websites, and intelligent web solutions that integrate modern technologies to improve efficiency and productivity.
            </p>
            <p>
              One of his strengths is transforming complex ideas into practical digital solutions. He enjoys analyzing real-world challenges and designing applications that simplify tasks, automate workflows, and provide users with intuitive and reliable experiences. His problem-solving mindset enables him to create software that is both technically sound and user-focused.
            </p>
            <p>
              In addition to frontend development, Moshood has developed experience in integrating cloud-based services such as Firebase Authentication, Firestore Database, Cloud Storage, and Firebase Hosting. These technologies allow him to create secure applications with real-time data synchronization, authentication systems, and scalable cloud infrastructure that support modern web applications.
            </p>
            <p>
              As a developer, Moshood continuously improves his skills by staying current with emerging technologies, modern frameworks, industry best practices, and design trends. He is committed to lifelong learning and consistently explores new tools, programming techniques, and software development methodologies to deliver solutions that remain innovative and competitive in the ever-evolving technology landscape.
            </p>
            <p>
              Beyond writing code, Moshood is passionate about creating products that have a meaningful impact. His vision extends beyond building websites—he aims to develop digital platforms that improve education, support businesses, empower entrepreneurs, and make technology more accessible to people and organizations. His long-term goal is to create intelligent, scalable, and globally recognized software solutions that address real challenges and contribute to digital transformation.
            </p>
            <p>
              Moshood values professionalism, collaboration, creativity, and continuous improvement. He believes successful projects are built on effective communication, careful planning, and close collaboration with clients and team members. By understanding each project's objectives and target audience, he develops customized solutions that align with business goals while delivering measurable value.
            </p>
            <p>
              His dedication to quality, innovation, and excellence is reflected in every project he undertakes. Whether developing a business website, an administrative dashboard, an educational platform, or a complex web application, Moshood approaches every task with enthusiasm, precision, and a commitment to delivering exceptional results.
            </p>
          </div>
        </div>

        {/* Dynamic Skill Showcase with Web Radar Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <WebRadarShowcase />
        </motion.div>

        {/* His Web Work Videos Gallery */}
        <div className="mt-32 border-t border-white/10 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">His Development Work</h2>
            <p className="text-white/50 text-sm mt-3 uppercase tracking-widest font-bold">Interactive application walkthroughs & system demos</p>
          </div>

          {/* Clean Premium Video Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {webDemos.map((demo, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  {/* Premium video player card */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-black group">
                    {demo.link ? (
                      <a href={demo.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                        <video
                          src={demo.src}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                          <span className="rounded-full bg-tph-cyan text-tph-dark px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-cyan-glow flex items-center gap-1.5">
                            Launch Project <Play className="h-3 w-3 fill-tph-dark" />
                          </span>
                        </div>
                      </a>
                    ) : (
                      <video
                        src={demo.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-cover opacity-90"
                      />
                    )}
                    <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-tph-cyan backdrop-blur-md flex items-center gap-1.5 pointer-events-none">
                      <Monitor className="h-3 w-3" />
                      <span>{demo.metric}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {demo.link ? (
                        <a href={demo.link} target="_blank" rel="noopener noreferrer" className="hover:text-tph-cyan transition-colors">
                          {demo.title}
                        </a>
                      ) : (
                        demo.title
                      )}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/50">{demo.description}</p>
                    {demo.link && (
                      <div className="pt-1">
                        <a
                          href={demo.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-tph-cyan hover:text-white transition-colors duration-200"
                        >
                          Visit Live Project →
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                  {demo.tech.map((tag) => (
                    <span key={tag} className="rounded bg-white/5 border border-white/5 px-2.5 py-1 text-[9px] font-semibold text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
