import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Mail, Sparkles, Paintbrush, Type, Image } from 'lucide-react';

// Design Lead Photo
import designLeadPhotoA from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg';

// Import the projects array (or graphic images specifically)
import { projects } from '../data/siteData';

// We filter or just use all graphic design projects from our siteData
const graphicProjects = projects.filter(p => p.category === 'Graphic Design' || p.category === 'Branding' || p.category === 'Digital Media');

// Duplicate for infinite marquee
const marqueeItems = [...graphicProjects, ...graphicProjects];

function DesignRadarShowcase() {
  const [activeSkill, setActiveSkill] = useState(0);

  const skills = [
    { name: 'Brand Systems', value: '98%', desc: 'Building full identity guidelines, dynamic typography scales, and modular color palettes.', icon: Sparkles },
    { name: 'Logo Design Suite', value: '96%', desc: 'Designing responsive primary marks, secondary badges, and vector layouts optimized for modern web headers.', icon: Paintbrush },
    { name: 'Typography Systems', value: '95%', desc: 'Structuring scale ratios, pairing variables, and fine-tuning spacing guidelines for digital and print systems.', icon: Type },
    { name: 'Creative Layouts', value: '97%', desc: 'Designing high-impact flyers, promotional banners, and campaign activations optimized for conversion.', icon: Image }
  ];

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl grid md:grid-cols-2 gap-12 items-center relative overflow-hidden group">
      {/* Background glowing radar ring */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-tph-pink/5 blur-3xl pointer-events-none" />
      
      {/* Left Column: Interactive Radar Animation */}
      <div className="relative flex justify-center items-center h-80 w-full select-none">
        {/* Concentric circles */}
        <div className="absolute h-72 w-72 rounded-full border border-white/5" />
        <div className="absolute h-52 w-52 rounded-full border border-white/10" />
        <div className="absolute h-32 w-32 rounded-full border border-tph-pink/20 animate-[pulse_3s_infinite]" />

        {/* Radar Sweeper Line (Rotating Animation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute h-72 w-72 rounded-full border-r border-tph-pink/40 pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent 50%, rgba(255, 0, 127, 0.1) 100%)',
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
                  ? 'bg-tph-pink border-tph-pink text-white shadow-[0_0_20px_rgba(255,0,127,0.4)]' 
                  : 'bg-tph-dark/95 border-white/10 text-white/60 hover:text-white hover:border-tph-pink/40'
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
          <p className="text-[8px] font-bold text-tph-pink uppercase tracking-wider mt-1">
            Success
          </p>
        </div>
      </div>

      {/* Right Column: Skill Detail Presentation */}
      <div className="space-y-6 flex flex-col justify-center">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-tph-pink bg-tph-pink/10 px-3 py-1 rounded-full border border-tph-pink/20">
            Interactive Skill Radar
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-4 leading-tight">
            Visual identity, brand systems, and designs.
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
              <div className="h-2 w-2 rounded-full bg-tph-pink animate-pulse" />
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
                activeSkill === index ? 'bg-tph-pink w-full' : 'bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GraphicDesignLeadPage() {
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,0,127,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,210,255,0.08),transparent_40%)] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl relative">
        <button
          onClick={() => navigateTo('/')}
          className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" /> 
          Back to Studio
        </button>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left Column: Photo & Quick Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-32 space-y-6"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(255,0,127,0.15)]">
              <img 
                src={designLeadPhotoA} 
                alt="Yusuf Ibrahim Khalilullah" 
                className="h-full w-full object-cover object-[50%_18%] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-transparent to-transparent" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold text-white leading-tight">Yusuf Ibrahim <br />Khalilullah</h1>
              <p className="text-sm font-bold uppercase tracking-widest text-tph-pink">Professional Graphic Designer</p>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <button onClick={() => navigateTo('/projects')} className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-tph-cyan transition-colors">
                  <Briefcase className="h-4 w-4" /> View Department Portfolio
                </button>
                <button onClick={() => navigateTo('/contact')} className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-tph-orange transition-colors">
                  <Mail className="h-4 w-4" /> Book a Design Project
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Full Biography */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-sm leading-relaxed text-white/70 font-medium"
          >
            <p>
              <strong className="text-white text-lg">Yusuf Ibrahim Khalilullah is a highly skilled and creative professional graphic designer</strong> with a deep passion for transforming ideas into visually compelling designs that inspire, communicate, and leave lasting impressions. With a strong understanding of modern design principles, branding strategies, and visual storytelling, he specializes in creating high-quality graphics that help businesses, organizations, entrepreneurs, and individuals establish a strong and memorable brand identity.
            </p>
            <p>
              Over the years, Yusuf has developed expertise in designing professional logos, business branding materials, promotional banners, flyers, brochures, posters, social media advertisements, business cards, product packaging, presentation graphics, and other digital and print marketing materials. His ability to combine creativity with strategic thinking allows him to produce designs that are not only aesthetically appealing but also purposeful, functional, and aligned with each client's vision and business objectives.
            </p>
            <p>
              Yusuf believes that every successful brand begins with a powerful visual identity. For this reason, he works closely with clients to understand their goals, target audience, brand values, and market positioning before beginning any design project. By carefully analyzing each client's needs, he creates customized design solutions that effectively communicate their message, strengthen brand recognition, and build trust with customers.
            </p>
            <p>
              His logo designs are crafted to reflect originality, simplicity, and timelessness, ensuring that each logo remains relevant and memorable across different platforms and industries. Whether developing a logo for a startup, redesigning an existing brand identity, or creating complete branding packages, Yusuf focuses on producing designs that accurately represent the personality and vision of the business.
            </p>
            <p>
              In addition to branding, Yusuf is experienced in creating engaging marketing materials that help businesses promote their products and services more effectively. His promotional banners, social media graphics, advertisements, and campaign visuals are carefully designed to attract attention, increase customer engagement, and improve overall marketing performance. He understands the importance of creating content that performs well across various digital platforms while maintaining consistency in brand identity.
            </p>
            <p>
              Yusuf is passionate about helping businesses grow through effective visual communication. He understands that good design is much more than attractive colors and layouts—it is a powerful communication tool that influences customer perception, builds credibility, and drives business success. Every project he undertakes is approached with creativity, precision, attention to detail, and a commitment to delivering exceptional quality.
            </p>
            <p>
              His design process emphasizes collaboration, innovation, and continuous improvement. From the initial consultation and concept development to revisions and final delivery, Yusuf ensures that clients remain involved throughout every stage of the creative process. This collaborative approach enables him to consistently deliver results that exceed expectations while building long-lasting professional relationships based on trust, reliability, and mutual respect.
            </p>
            <p>
              As a designer who values innovation, Yusuf continually expands his knowledge by staying up to date with emerging design trends, industry standards, and the latest creative technologies. His willingness to learn and adapt enables him to provide fresh, modern, and competitive design solutions that meet the evolving needs of today's digital world.
            </p>
            <p>
              Whether working with small businesses, established companies, entrepreneurs, nonprofit organizations, or personal brands, Yusuf approaches every project with professionalism, dedication, and a genuine desire to help his clients succeed. His work reflects creativity, originality, strategic thinking, and a commitment to excellence, making him a trusted partner for individuals and organizations seeking impactful visual communication.
            </p>
            <p>
              Beyond creating beautiful graphics, Yusuf aims to build meaningful brand experiences that connect businesses with their audiences. His designs are created not only to capture attention but also to communicate value, tell compelling stories, and establish strong emotional connections between brands and their customers.
            </p>
            <p>
              Driven by passion, creativity, and a commitment to excellence, Yusuf Ibrahim Khalilullah continues to empower businesses and individuals through innovative graphic design solutions that enhance brand identity, increase audience engagement, and contribute to long-term business growth. Through every project he undertakes, he remains committed to delivering designs that combine artistic creativity with strategic purpose, helping clients bring their ideas to life and transform their vision into reality.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Skill Showcase with Design Radar Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <DesignRadarShowcase />
        </motion.div>

        {/* His Projects Marquee */}
        <div className="mt-32 border-t border-white/10 pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">His Projects</h2>
            <p className="text-white/50 text-sm mt-3 uppercase tracking-widest font-bold">A gallery of visual executions</p>
          </div>

          {/* Marquee Row 1 (Moving Left) */}
          <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-6 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-tph-dark before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-tph-dark after:to-transparent">
            <motion.div
              animate={{ x: [0, -1920] }} // Adjust based on content width roughly
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-6 pr-6 items-center"
            >
              {marqueeItems.map((proj, idx) => (
                <div key={`row1-${idx}`} className="relative h-64 w-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 text-left whitespace-normal">
                    <p className="text-white font-bold text-sm leading-tight">{proj.title}</p>
                    <p className="text-tph-cyan text-[10px] font-bold uppercase tracking-widest mt-1">{proj.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Marquee Row 2 (Moving Right) */}
          <div className="relative w-full overflow-hidden flex whitespace-nowrap before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-tph-dark before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-tph-dark after:to-transparent">
            <motion.div
              animate={{ x: [-1920, 0] }} // Moving right
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-6 pr-6 items-center"
            >
              {marqueeItems.reverse().map((proj, idx) => (
                <div key={`row2-${idx}`} className="relative h-64 w-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 text-left whitespace-normal">
                    <p className="text-white font-bold text-sm leading-tight">{proj.title}</p>
                    <p className="text-tph-pink text-[10px] font-bold uppercase tracking-widest mt-1">{proj.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
