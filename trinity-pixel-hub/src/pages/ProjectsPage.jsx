import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, testimonials } from '../data/siteData';
import { Search, ChevronRight, ArrowLeft, Layers, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import PageHeading from '../components/PageHeading';
import AnimatedCounter from '../components/AnimatedCounter';

// Team Lead Photo Imports
import designLeadPhoto from '../WhatsApp Image 2026-06-20 at 5.35.55 PM.jpeg';
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg';
import webLeadPhoto from '../WhatsApp Image 2026-06-22 at 3.12.50 PM (1).jpeg';

// Video imports for live studio reels (using distinct development screen recordings)
import webVideo1 from '../web/man/Screen Recording 2026-06-29 001352.mp4';
import webVideo2 from '../web/man/Screen Recording 2026-07-03 142626.mp4';
import webVideo3 from '../web/man/Screen Recording 2026-07-03 141014.mp4';

const departments = [
  {
    name: 'Yusuf Ibrahim Khalilullah',
    role: 'Graphic Design & Brand Systems Lead',
    image: designLeadPhoto,
    imagePosition: 'object-[50%_18%]',
    bio: 'Transforms complex ideas into clean visual language. Yusuf works with clients to build distinct brand identities, responsive logo suites, and cross-channel campaign flyers.',
    services: ['Brand Identity Systems', 'Logo Design Suite (SVG)', 'Creative Campaign Layouts', 'Flyer & Promotional Design'],
    link: '/team/graphic-design',
    badgeColor: 'text-tph-pink bg-tph-pink/10 border-tph-pink/20',
    accent: 'hover:border-tph-pink/40 hover:shadow-[0_8px_32px_rgba(255,0,127,0.08)]'
  },
  {
    name: 'Moshood Abdubasit',
    role: 'Head of Website Development',
    image: webLeadPhoto,
    imagePosition: 'object-[50%_12%]',
    bio: 'Dedicated frontend engineer focused on high-performance React builds, custom UI structures, and conversion-guided user flows that make products interactive.',
    services: ['React Frontend Architecture', 'Vite & Tailwind Workflows', 'Interactive Application UI', 'Firebase Cloud Database Integrations'],
    link: '/team/web-development',
    badgeColor: 'text-tph-cyan bg-tph-cyan/10 border-tph-cyan/20',
    accent: 'hover:border-tph-cyan/40 hover:shadow-[0_8px_32px_rgba(0,210,255,0.08)]'
  },
  {
    name: 'Yusuf Fuhad',
    role: 'Head of Data Analysis',
    image: dataLeadPhoto,
    imagePosition: 'object-[50%_18%]',
    bio: 'Specializes in uncovering patterns and converting raw datasets into readable dashboard summaries that guide business decision making.',
    services: ['Interactive Dashboards', 'KPI & Metrics Tracking', 'Data Storytelling Models', 'Performance Reporting Systems'],
    link: '/team/data-analysis',
    badgeColor: 'text-tph-orange bg-tph-orange/10 border-tph-orange/20',
    accent: 'hover:border-tph-orange/40 hover:shadow-[0_8px_32px_rgba(255,153,0,0.08)]'
  }
];

export default function ProjectsPage() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Before-and-after slider state
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine if viewing single project case study
  const projectId = useMemo(() => {
    if (pathname.startsWith('/projects/')) {
      return pathname.replace('/projects/', '');
    }
    return null;
  }, [pathname]);

  const activeProject = useMemo(() => {
    if (!projectId) return null;
    return projects.find((p, idx) => String(idx) === projectId || p.title.toLowerCase().replace(/\s+/g, '-') === activeProjectSlug(p.title));
  }, [projectId]);

  function activeProjectSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-');
  }

  // Categories list
  const categories = ['All', 'Branding', 'Web', 'Graphic', 'Data Analysis'];

  // Filtered listing
  const filteredProjects = useMemo(() => {
    let result = [...projects];
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Graphic') {
        result = result.filter(p => p.category === 'Graphic Design' || p.category === 'Digital Media');
      } else if (selectedCategory === 'Web') {
        result = result.filter(p => p.category === 'Web');
      } else if (selectedCategory === 'Data Analysis') {
        result = result.filter(p => p.category === 'Data Analysis');
      } else {
        result = result.filter(p => p.category === selectedCategory);
      }
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.details.toLowerCase().includes(q) ||
        p.tech.some(t => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [selectedCategory, searchQuery]);

  // Project mock statistics & before/after data seeds
  const projectDetailsMap = {
    'NovaEdge Identity System': {
      speed: '98%',
      metrics: '+45% User Engagement',
      time: '14 Days Delivery',
      testimonial: testimonials[0],
      beforeImg: 'https://images.unsplash.com/photo-1541462608141-2f58c87a921b?auto=format&fit=crop&w=1200&q=50',
      afterImg: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85',
      breakdown: [
        'Responsive Logo Suite (SVG vectors optimized for mobile headers)',
        'Full brand typography scales & variables guidelines',
        'Cohesive digital campaign templates & social banners'
      ]
    },
    'PulseGrid Analytics Portal': {
      speed: '99%',
      metrics: '3.2s Speed Increase',
      time: '28 Days Delivery',
      testimonial: testimonials[1],
      beforeImg: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=50',
      afterImg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
      breakdown: [
        'React SPA workspace integration with mock firestore real-time hooks',
        'Lucide analytics indicator tiles & customizable dashboards layout',
        'Responsive sidebar navigation supporting mobile collapsability'
      ]
    },
    'Chromatic Motion Reel': {
      speed: '95%',
      metrics: '+85% Click-through Rate',
      time: '6 Days Delivery',
      testimonial: testimonials[2],
      beforeImg: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=50',
      afterImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
      breakdown: [
        'Kinetic title overlays & animated SVG intro marks',
        'Clean multi-track editing optimized for TikTok/Instagram contrast ratios',
        'Immersive ambient audio layering & high fidelity export'
      ]
    }
  };

  const projectExtraInfo = useMemo(() => {
    if (!activeProject) return null;
    return projectDetailsMap[activeProject.title] || {
      speed: '97%',
      metrics: '+30% Conversions Boost',
      time: '10 Days Turnaround',
      testimonial: testimonials[0],
      beforeImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=50',
      afterImg: activeProject.image,
      breakdown: [
        'Visual layouts built with high fidelity responsive asset scales',
        'Structured tailwind design patterns optimized for quick rendering speeds',
        'Production ready deployment build checklist verification'
      ]
    };
  }, [activeProject]);

  // Before/after slider controls
  const handleMove = (clientX) => {
    const container = document.getElementById('before-after-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Render Detailed Case Study view
  if (activeProject && projectExtraInfo) {
    return (
      <main className="bg-tph-dark min-h-screen px-5 pt-32 pb-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,210,255,0.06),transparent_35%)] pointer-events-none" />
        <div className="mx-auto max-w-4xl space-y-12 relative">
          
          {/* Back Link */}
          <button
            onClick={() => navigateTo('/projects')}
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-white transition-colors duration-300"
          >
            <ArrowLeft className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-x-1" /> 
            Back to Case Studies
          </button>

          <div>
            <span className="inline-block text-[9px] font-bold uppercase tracking-widest text-tph-cyan bg-tph-cyan/10 border border-tph-cyan/20 px-3.5 py-1 rounded-full">
              Case Study: {activeProject.category}
            </span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight mt-4">
              {activeProject.title}
            </h1>
            <p className="text-white/60 text-sm leading-relaxed mt-3">{activeProject.details}</p>
          </div>

          {/* Interactive Before & After Slider */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-tph-cyan" />
              Before & After Showcase
            </h3>
            
            <div 
              id="before-after-container"
              onMouseMove={(e) => isResizing && handleMove(e.clientX)}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsResizing(true)}
              onTouchStart={() => setIsResizing(true)}
              onMouseUp={() => setIsResizing(false)}
              onTouchEnd={() => setIsResizing(false)}
              onMouseLeave={() => setIsResizing(false)}
              className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-purple-glow/10 select-none cursor-ew-resize"
            >
              {/* After Media */}
              {activeProject.video ? (
                <video 
                  src={activeProject.video} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
                />
              ) : (
                <img 
                  src={projectExtraInfo.afterImg} 
                  alt="After" 
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
                />
              )}
              <div className="absolute right-4 bottom-4 bg-tph-dark/80 text-white border border-white/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                Trinity Hub Output
              </div>

              {/* Before Image */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none border-r border-white/30"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={projectExtraInfo.beforeImg} 
                  alt="Before" 
                  className="absolute inset-0 h-full w-full object-cover max-w-none pointer-events-none opacity-80"
                  style={{ width: '100vw', height: '100%' }}
                />
                <div className="absolute left-4 bottom-4 bg-tph-pink/80 text-white border border-white/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md">
                  Original Brief
                </div>
              </div>

              {/* Handlebar Line */}
              <div 
                className="absolute inset-y-0 w-px bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="h-8 w-8 bg-tph-dark text-white rounded-full border border-white/20 shadow-purple-glow/20 flex items-center justify-center font-bold text-xs backdrop-blur-md">
                  ↔
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] text-white/40 font-semibold">
              Drag or swipe the center divider to compare starting briefs against final deliveries.
            </p>
          </div>

          {/* Metrics Stats banner */}
          <div className="grid grid-cols-3 gap-4 bg-white/[0.02] p-6 rounded-2xl border border-white/10 text-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">PageSpeed Performance</p>
              <p className="text-xl font-extrabold text-emerald-400 mt-1">
                <AnimatedCounter value={projectExtraInfo.speed} />
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">Campaign Success</p>
              <p className="text-xl font-extrabold text-tph-cyan mt-1">
                <AnimatedCounter value={projectExtraInfo.metrics} />
              </p>
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/40">Sprint Delivery</p>
              <p className="text-xl font-extrabold text-tph-orange mt-1">
                <AnimatedCounter value={projectExtraInfo.time} />
              </p>
            </div>
          </div>

          {/* Technology breakdown & Milestones */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="h-4.5 w-4.5 text-tph-cyan" />
                Technology & Execution Integration
              </h4>
              <ul className="space-y-3">
                {projectExtraInfo.breakdown.map((item, idx) => (
                  <li key={idx} className="text-xs leading-relaxed text-white/60 font-semibold flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-tph-cyan" />
                Integrated Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.tech.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 text-white/80 px-3.5 py-1.5 text-xs font-semibold border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quote recommendation and Client testimonials */}
          {projectExtraInfo.testimonial && (
            <div className="bg-gradient-to-r from-tph-cyan/15 to-tph-purple/15 p-8 rounded-2xl text-white space-y-4 border border-white/10 shadow-purple-glow/5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-tph-cyan">Client Feedback</span>
              <p className="text-base font-medium italic leading-relaxed text-white/90">
                "{projectExtraInfo.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs font-bold text-white">{projectExtraInfo.testimonial.name}</p>
                  <p className="text-[10px] text-white/50 font-semibold">{projectExtraInfo.testimonial.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-bold text-white">Like this output style?</h4>
              <p className="text-white/50 text-xs mt-1">Submit a booking briefing requesting configurations similar to this system.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigateTo('/contact')}
              className="rounded-full bg-tph-gradient hover:shadow-pink-glow px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 whitespace-nowrap"
            >
              Start Project Flow
            </motion.button>
          </div>
        </div>
      </main>
    );
  }

  // Render Listing Category grids
  return (
    <main className="bg-tph-dark min-h-screen px-5 pt-32 pb-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,0,127,0.06),transparent_35%)] pointer-events-none" />
      <div className="mx-auto max-w-7xl space-y-12 relative">
        
        {/* Page Heading */}
        <PageHeading 
          kicker="Case Logs"
          title="Engineered visual and development deliverables."
          description="A complete directory of digital agency campaigns spanning conversion setups, kinetic branding systems, and data analytics dashboards."
          color="text-white"
        />

        {/* Search bar & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/10 backdrop-blur-md">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-white/40" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies by category, language, tag..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan text-sm font-medium text-white placeholder-white/30 transition-colors duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-white text-tph-dark shadow-cyan-glow/30' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white bg-white/[0.03] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Attribution Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center p-4 bg-gradient-to-r from-tph-cyan/10 to-tph-purple/10 rounded-2xl border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-tph-cyan animate-pulse" />
            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">
              Graphic Design Portfolio Curated by <span className="font-extrabold text-white">Yusuf Ibrahim Khalilullah</span> — Design Lead
            </p>
          </div>
        </motion.div>

        {/* Live Motion Reels Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-tph-pink animate-ping" />
              Live Studio Motion Reels
            </h3>
            <span className="text-[9px] text-white/40 font-bold uppercase">3 Loops Running</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { title: 'ClassSphere Dashboard', video: webVideo1, desc: 'Interactive school management and virtual classroom admin portal walkthrough.' },
              { title: 'Portfolio Showcase', video: webVideo2, desc: 'Creative frontend developer portfolio showing modern responsive layout animations.' },
              { title: 'Operations Panel Build', video: webVideo3, desc: 'Real-time dry cleaning laundry tracking dashboard workflow.' }
            ].map((reel) => (
              <div key={reel.title} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <video
                  src={reel.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-60 group-hover:scale-103 group-hover:opacity-85 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
                <div className="absolute left-3 bottom-3 right-3 text-left">
                  <h4 className="text-xs font-bold text-white leading-none">{reel.title}</h4>
                  <p className="text-[9px] text-white/50 mt-1 leading-tight">{reel.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-white/40 text-xs bg-white/[0.02] border border-white/10 rounded-2xl"
            >
              No project files match search criteria.
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((proj) => {
                const urlSlug = activeProjectSlug(proj.title);
                return (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    key={proj.title} 
                    className="bg-white/[0.02] rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-tph-cyan/60 hover:shadow-[0_0_20px_rgba(0,210,255,0.15)] transition-all duration-300 backdrop-blur-sm"
                  >
                    <div>
                      {proj.video ? (
                        <div className="aspect-video w-full overflow-hidden bg-black/40 relative">
                          <video 
                            src={proj.video} 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                      ) : proj.image ? (
                        <div className="aspect-video w-full overflow-hidden bg-black/40 relative">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        </div>
                      ) : null}
                      <div className="p-6 space-y-3 relative z-10 -mt-8">
                        <span className="inline-block text-[9px] uppercase font-bold text-tph-cyan bg-tph-dark border border-tph-cyan/30 px-3 py-1.5 rounded-full shadow-md">{proj.category}</span>
                        <h4 className="text-base font-bold text-white mt-2">{proj.title}</h4>
                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2">{proj.details}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                        {proj.tech.slice(0, 2).map(t => (
                          <span key={t} className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-white/50 font-semibold">{t}</span>
                        ))}
                      </div>
                      <button
                        onClick={() => navigateTo(`/projects/${urlSlug}`)}
                        className="text-xs font-bold text-tph-cyan hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                      >
                        Case Study <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
