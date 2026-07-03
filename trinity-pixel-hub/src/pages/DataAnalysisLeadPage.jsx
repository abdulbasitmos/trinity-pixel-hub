import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, Mail, BarChart3, Database, TrendingUp, Activity, Sparkles, Paintbrush, RotateCcw, Zap } from 'lucide-react';

// Data Lead Photo
import dataLeadPhoto from '../WhatsApp Image 2026-06-22 at 2.16.30 PM.jpeg';

// Import the projects array
import { projects } from '../data/siteData';

// Filter only for data analysis category to keep it on the data analysis side
const dataProjects = projects.filter(p => p.category === 'Data Analysis');

// Duplicate for infinite marquee (duplicate enough times to scroll smoothly)
const marqueeItems = [];
for (let i = 0; i < 12; i++) {
  marqueeItems.push(...dataProjects);
}

// New crazy radar component for Data Analysis
function DataCrazyRadarShowcase() {
  const [activeSkill, setActiveSkill] = useState(0);
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [anomalyScore, setAnomalyScore] = useState(48.2);
  const [sysLog, setSysLog] = useState('SYSTEMS NOMINAL - SCANNING');
  const [tick, setTick] = useState(0);

  const skills = [
    { name: 'Statistical Modeling', value: '97%', desc: 'Advanced regression, clustering, and predictive analytics pipelines.', icon: Zap },
    { name: 'Data Visualization', value: '95%', desc: 'Dynamic dashboards, interactive charts, and storytelling visual tools.', icon: RotateCcw },
    { name: 'ETL Pipelines', value: '96%', desc: 'Robust data ingestion, transformation, and loading across sources.', icon: Sparkles },
    { name: "AI/ML Ops", value: '94%', desc: 'Deployable models, automated training, and model monitoring pipelines.', icon: Paintbrush }
  ];

  // Dynamic ticking simulation data
  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
      if (isChaosMode) {
        setAnomalyScore(parseFloat((80 + Math.random() * 19.9).toFixed(1)));
        const logs = [
          'CRITICAL OVERLOAD IN PIPELINE_04',
          'DB RETRIEVAL FLOOD DETECTED',
          'AI INSTANCE CORRELATION BURST',
          'MODEL RETRAINING CONVERGENCE: 99.8%',
          'WARNING: METRICS EXCEED THRESHOLD',
          'QUANTUM GRADIENT DESCENT OPTIMIZED'
        ];
        setSysLog(logs[Math.floor(Math.random() * logs.length)]);
      } else {
        setAnomalyScore(parseFloat((30 + Math.random() * 20).toFixed(1)));
        const logs = [
          'SYSTEM STATUS: ACTIVE',
          'SCANNING DATABASE INDEXES...',
          'EXPLORATORY DESCENT: 45%',
          'REGRESSION VECTOR CALIBRATED',
          'COHORT CLUSTERING IDLE'
        ];
        setSysLog(logs[Math.floor(Math.random() * logs.length)]);
      }
    }, isChaosMode ? 250 : 1500);

    return () => clearInterval(timer);
  }, [isChaosMode]);

  // Skill node coordinates
  const radius = 110;
  const nodes = skills.map((skill, index) => {
    const angle = (index * 360) / skills.length - 90; // offset so top is 1st node
    const radians = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return { ...skill, x, y };
  });

  return (
    <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
      <style>{`
        @keyframes morphBlob {
          0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          25% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
          50% { border-radius: 50% 50% 30% 70% / 40% 60% 40% 60%; }
          75% { border-radius: 30% 70% 60% 40% / 50% 50% 50% 50%; }
          100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
        }
        @keyframes lineDash {
          to { stroke-dashoffset: -40; }
        }
      `}</style>

      {/* Dynamic colorful background blast */}
      <div className={`absolute -right-32 -top-32 h-96 w-96 rounded-full blur-[80px] opacity-25 pointer-events-none transition-all duration-1000 ${
        isChaosMode 
          ? 'bg-gradient-to-tr from-red-600 via-tph-pink to-tph-orange scale-125' 
          : 'bg-gradient-to-tr from-tph-pink via-tph-purple to-tph-cyan'
      }`} />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Interactive Crazy Orbit */}
        <div className="relative flex justify-center items-center h-88 w-full select-none">
          {/* Animated Matrix Stream Overlay inside Radar */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none overflow-hidden rounded-full">
            <div className="text-[9px] font-mono text-white leading-none tracking-widest break-all w-72 text-center h-72 flex items-center justify-center">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex flex-col h-full justify-between" style={{
                  animation: `matrixRain ${1 + Math.random() * 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Concentric rings rotating in alternate directions */}
          {/* Outer Ring 1: Tech border dash */}
          <motion.div
            animate={{ rotate: isChaosMode ? 720 : 360 }}
            transition={{ repeat: Infinity, duration: isChaosMode ? 3 : 20, ease: 'linear' }}
            className={`absolute h-76 w-76 rounded-full border border-dashed border-white/10 pointer-events-none`}
          />

          {/* Ring 2: Core speed ring */}
          <motion.div
            animate={{ rotate: isChaosMode ? -1080 : -360 }}
            transition={{ repeat: Infinity, duration: isChaosMode ? 4 : 15, ease: 'linear' }}
            className={`absolute h-64 w-64 rounded-full border-2 border-dotted pointer-events-none transition-colors duration-500 ${
              isChaosMode ? 'border-tph-pink/40' : 'border-tph-cyan/20'
            }`}
          />

          {/* Ring 3: Glitchy sweep line ring */}
          <motion.div
            animate={{ rotate: isChaosMode ? 1440 : 360 }}
            transition={{ repeat: Infinity, duration: isChaosMode ? 1.5 : 8, ease: 'linear' }}
            className="absolute h-52 w-52 rounded-full border border-tph-orange/20 pointer-events-none"
            style={{
              background: isChaosMode 
                ? 'conic-gradient(from 0deg, transparent 40%, rgba(255, 0, 127, 0.25) 80%, rgba(255, 153, 0, 0.4) 100%)'
                : 'conic-gradient(from 0deg, transparent 50%, rgba(0, 210, 255, 0.15) 85%, rgba(138, 43, 226, 0.25) 100%)'
            }}
          />

          {/* SVG Web Lines Connecting Center Core to Skill Nodes */}
          <svg className="absolute w-80 h-80 pointer-events-none" viewBox="0 0 320 320">
            <defs>
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff007f" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#8a2be2" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {nodes.map((node, index) => {
              const isActive = activeSkill === index;
              return (
                <g key={index}>
                  {/* Connecting background vector line */}
                  <line 
                    x1={160} 
                    y1={160} 
                    x2={160 + node.x} 
                    y2={160 + node.y} 
                    stroke={isActive ? 'url(#glowGrad)' : 'rgba(255, 255, 255, 0.05)'} 
                    strokeWidth={isActive ? '2.5' : '1'} 
                    strokeDasharray={isActive ? 'none' : '4 6'}
                    className="transition-all duration-300"
                  />
                  {/* Streaming packets */}
                  {isActive && (
                    <line 
                      x1={160} 
                      y1={160} 
                      x2={160 + node.x} 
                      y2={160 + node.y} 
                      stroke="white" 
                      strokeWidth="2.5" 
                      strokeDasharray="8 20"
                      style={{
                        animation: `lineDash ${isChaosMode ? 0.3 : 1.2}s linear infinite`
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating chaotic sparks/spikes in background */}
          {Array.from({ length: isChaosMode ? 12 : 6 }).map((_, i) => {
            const delay = i * 0.4;
            const size = Math.random() * 4 + 2;
            const r = 50 + Math.random() * 80;
            const a = Math.random() * 360;
            const radVal = (a * Math.PI) / 180;
            const px = r * Math.cos(radVal);
            const py = r * Math.sin(radVal);
            return (
              <motion.div
                key={i}
                animate={{
                  x: [px, px + (Math.random() - 0.5) * 40, px],
                  y: [py, py + (Math.random() - 0.5) * 40, py],
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0.1, 0.7, 0.1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: isChaosMode ? 1.5 : 4,
                  delay: delay,
                  ease: 'easeInOut'
                }}
                className={`absolute rounded-full pointer-events-none ${
                  i % 3 === 0 ? 'bg-tph-pink' : i % 3 === 1 ? 'bg-tph-cyan' : 'bg-tph-orange'
                }`}
                style={{
                  width: size,
                  height: size,
                  filter: 'blur(1px)'
                }}
              />
            );
          })}

          {/* Orbiting Interactive Skill Nodes */}
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeSkill === index;
            return (
              <motion.button
                key={node.name}
                onClick={() => setActiveSkill(index)}
                whileHover={{ scale: 1.25, zIndex: 30 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute h-13 w-13 rounded-full flex items-center justify-center transition-all duration-300 border backdrop-blur-md ${
                  isActive
                    ? isChaosMode
                      ? 'bg-tph-pink border-tph-pink text-white shadow-pink-glow scale-110 z-20'
                      : 'bg-tph-orange border-tph-orange text-tph-dark shadow-orange-glow scale-110 z-20'
                    : 'bg-tph-dark/90 border-white/10 text-white/60 hover:text-white hover:border-white/30 z-10'
                }`}
                style={{
                  transform: `translate(${node.x}px, ${node.y}px)`,
                }}
              >
                <Icon className="h-5.5 w-5.5" />
              </motion.button>
            );
          })}

          {/* Morphing Glowing Central Core */}
          <motion.div
            animate={{
              scale: isChaosMode ? [1, 1.12, 0.94, 1.08, 1] : [1, 1.04, 1],
              rotate: isChaosMode ? -360 : 0
            }}
            transition={{
              repeat: Infinity,
              duration: isChaosMode ? 1.5 : 6,
              ease: 'easeInOut'
            }}
            onClick={() => setIsChaosMode(!isChaosMode)}
            className={`absolute h-26 w-26 flex flex-col items-center justify-center text-center p-3 cursor-pointer select-none transition-all duration-500 shadow-2xl relative z-10`}
            style={{
              animation: 'morphBlob 8s ease-in-out infinite',
              background: isChaosMode
                ? 'linear-gradient(135deg, #ff007f 0%, #ff9900 100%)'
                : 'linear-gradient(135deg, #ff9900 0%, #8a2be2 100%)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            {/* Soft inner radial glow */}
            <div className="absolute inset-0 bg-white/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest leading-none">
              {isChaosMode ? 'ANOMALY' : 'THROUGHPUT'}
            </span>
            <p className="text-[17px] font-black text-white leading-none tracking-tighter mt-1">
              {isChaosMode ? `${anomalyScore}%` : skills[activeSkill].value}
            </p>
            <span className="text-[7px] font-extrabold text-white bg-black/30 px-2 py-0.5 rounded-full mt-1.5 uppercase tracking-wider animate-pulse">
              {isChaosMode ? 'OVERLOAD' : 'CALIBRATED'}
            </span>
          </motion.div>
        </div>

        {/* Right Column: Custom Info Card & Chaos Engine Activator */}
        <div className="space-y-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-500 ${
                isChaosMode 
                  ? 'text-tph-pink bg-tph-pink/10 border-tph-pink/30 animate-pulse' 
                  : 'text-tph-orange bg-tph-orange/10 border-tph-orange/20'
              }`}>
                {isChaosMode ? '🚨 QUANTUM CHAOS ORB' : '📊 HYPER DATA ORB'}
              </span>
              <span className="text-[9px] font-mono text-white/40 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                ACTIVE_CORE: Yusuf Fuhad
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight leading-tight transition-colors duration-500">
                {isChaosMode ? 'Dynamic Chaotic Analytics Stream' : 'High-Performance Operations Radar'}
              </h3>
              <p className="text-white/40 text-xs font-semibold leading-relaxed">
                Click the core or toggle the simulation engine below to experience extreme real-time anomaly analysis rendering speeds.
              </p>
            </div>

            {/* Display Active Skill Profile */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill + (isChaosMode ? '_chaos' : '_nominal')}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-5 rounded-2xl border transition-all duration-500 backdrop-blur-md ${
                  isChaosMode 
                    ? 'bg-tph-pink/5 border-tph-pink/20 shadow-[0_8px_32px_rgba(255,0,127,0.05)]' 
                    : 'bg-white/[0.02] border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full animate-ping ${isChaosMode ? 'bg-tph-pink' : 'bg-tph-orange'}`} />
                  <h4 className="text-base font-extrabold text-white">
                    {skills[activeSkill].name}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed text-white/60 font-semibold mt-3">
                  {skills[activeSkill].desc}
                </p>
                {isChaosMode && (
                  <div className="text-[10px] font-mono text-tph-pink/80 font-bold uppercase tracking-wider mt-3 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-tph-pink shrink-0" />
                    SIMULATION STATUS: erratic latency oscillation
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive controls panel */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <button
              onClick={() => setIsChaosMode(!isChaosMode)}
              className={`w-full py-4.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all duration-500 shadow-lg ${
                isChaosMode
                  ? 'bg-tph-pink text-white border-tph-pink hover:bg-tph-pink/80 shadow-pink-glow'
                  : 'bg-transparent text-tph-orange border-tph-orange/40 hover:bg-tph-orange/10 hover:border-tph-orange/80 shadow-[0_4px_20px_rgba(255,153,0,0.05)]'
              }`}
            >
              {isChaosMode ? '❄️ COOL DOWN ANALYSIS PROCESSOR' : '🔥 INITIALIZE HYPER CHAOS'}
            </button>

            {/* Readout log bar */}
            <div className="bg-black/40 border border-white/5 rounded-lg px-3 py-2 flex items-center justify-between font-mono text-[9px] font-semibold text-white/50">
              <span className={`w-2 h-2 rounded-full shrink-0 ${isChaosMode ? 'bg-tph-pink animate-pulse' : 'bg-emerald-500 animate-pulse'}`} />
              <span className="truncate max-w-[80%] uppercase tracking-wider">{sysLog}</span>
              <span className="text-[8px] opacity-40">TICK: #{tick}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataRadarShowcase() {
  const [activeSkill, setActiveSkill] = useState(0);

  const skills = [
    { name: 'Business Intelligence', value: '96%', desc: 'Transforming raw databases into high-level dashboard summaries.', icon: BarChart3 },
    { name: 'Data Pipeline Design', value: '94%', desc: 'Building secure ETL pipelines and cloud storage synchronization.', icon: Database },
    { name: 'Predictive Modeling', value: '90%', desc: 'Applying regression and forecasting models to guide growth sprints.', icon: TrendingUp },
    { name: 'KPI Metric Frameworks', value: '98%', desc: 'Configuring precise operational KPI funnels and retention models.', icon: Activity }
  ];

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl grid md:grid-cols-2 gap-12 items-center relative overflow-hidden group">
      {/* Background glowing radar ring */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-tph-orange/5 blur-3xl pointer-events-none" />
      
      {/* Left Column: Interactive Radar Animation */}
      <div className="relative flex justify-center items-center h-80 w-full select-none">
        {/* Concentric circles */}
        <div className="absolute h-72 w-72 rounded-full border border-white/5" />
        <div className="absolute h-52 w-52 rounded-full border border-white/10" />
        <div className="absolute h-32 w-32 rounded-full border border-tph-orange/20 animate-[pulse_3s_infinite]" />

        {/* Radar Sweeper Line (Rotating Animation) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute h-72 w-72 rounded-full border-r border-tph-orange/40 pointer-events-none"
          style={{
            background: 'conic-gradient(from 0deg, transparent 50%, rgba(255, 153, 0, 0.1) 100%)',
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
                  ? 'bg-tph-orange border-tph-orange text-tph-dark shadow-[0_0_20px_rgba(255,153,0,0.4)]' 
                  : 'bg-tph-dark/95 border-white/10 text-white/60 hover:text-white hover:border-tph-orange/40'
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
          <p className="text-[8px] font-bold text-tph-orange uppercase tracking-wider mt-1">
            Success
          </p>
        </div>
      </div>

      {/* Right Column: Skill Detail Presentation */}
      <div className="space-y-6 flex flex-col justify-center">
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-tph-orange bg-tph-orange/10 px-3 py-1 rounded-full border border-tph-orange/20">
            Interactive Skill Radar
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight mt-4 leading-tight">
            Data insights, metrics, and models.
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
              <div className="h-2 w-2 rounded-full bg-tph-orange animate-pulse" />
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
                activeSkill === index ? 'bg-tph-orange w-full' : 'bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DataAnalysisLeadPage() {
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,153,0,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,0,127,0.08),transparent_40%)] pointer-events-none" />
      
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
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_0_40px_rgba(255,153,0,0.15)]">
              <img 
                src={dataLeadPhoto} 
                alt="Yusuf Fuhad" 
                className="h-full w-full object-cover object-[50%_18%] opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-transparent to-transparent" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold text-white leading-tight">Yusuf <br />Fuhad</h1>
              <p className="text-sm font-bold uppercase tracking-widest text-tph-orange">Head of Data Analysis</p>
              
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <button onClick={() => navigateTo('/projects')} className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-tph-cyan transition-colors">
                  <Briefcase className="h-4 w-4" /> View Department Portfolio
                </button>
                <button onClick={() => navigateTo('/contact')} className="flex items-center gap-3 text-xs font-semibold text-white/70 hover:text-tph-pink transition-colors">
                  <Mail className="h-4 w-4" /> Book a Data Project
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
              <strong className="text-white text-lg">Yusuf Fuhad is a dedicated and results-driven Data Analyst</strong> with a passion for transforming raw data into meaningful insights that support informed decision-making and business growth. He specializes in collecting, cleaning, analyzing, and interpreting complex datasets to uncover trends, identify opportunities, and solve real-world business challenges through data-driven strategies.
            </p>
            <p>
              With a strong analytical mindset and attention to detail, Yusuf helps businesses, organizations, and institutions make smarter decisions by converting data into clear, actionable information. He believes that every dataset tells a story, and his goal is to uncover that story to help clients improve efficiency, optimize performance, and achieve their objectives.
            </p>
            <p>
              Yusuf is skilled in working with spreadsheets, databases, statistical methods, and data visualization tools to organize and analyze information effectively. He develops interactive dashboards, detailed reports, and visual presentations that make complex data easy to understand for both technical and non-technical audiences. His ability to communicate findings clearly enables organizations to make confident, evidence-based decisions.
            </p>
            <p>
              His expertise includes data collection, data cleaning, data validation, exploratory data analysis (EDA), statistical analysis, dashboard development, business intelligence reporting, performance monitoring, and trend forecasting. Whether analyzing sales performance, customer behavior, financial records, operational efficiency, or market trends, Yusuf delivers accurate insights that help organizations identify strengths, address weaknesses, and discover new opportunities for growth.
            </p>
            <p>
              Yusuf understands that data is one of the most valuable assets in today's digital world. For this reason, he follows industry best practices to ensure the accuracy, consistency, and integrity of every dataset he works with. His systematic approach to data analysis allows him to identify patterns, detect anomalies, and generate reliable recommendations that support strategic planning and operational improvements.
            </p>
            <p>
              In addition to technical analysis, Yusuf enjoys solving complex business problems through critical thinking and logical reasoning. He works closely with stakeholders to understand their goals, define key performance indicators (KPIs), and deliver customized analytical solutions that align with organizational objectives. His collaborative approach ensures that every project produces practical value and measurable results.
            </p>
            <p>
              Committed to continuous learning, Yusuf stays up to date with the latest developments in data analytics, business intelligence, visualization techniques, and analytical technologies. He continually enhances his knowledge and skills to provide modern, innovative, and efficient solutions in an ever-evolving data landscape.
            </p>
            <p>
              Yusuf's professional values include accuracy, integrity, curiosity, and excellence. He approaches every project with professionalism, confidentiality, and a commitment to delivering high-quality work within agreed timelines. His focus is not only on analyzing data but also on helping organizations understand the meaning behind the numbers and use those insights to make informed, strategic decisions.
            </p>
            <p>
              Whether supporting startups, established businesses, government agencies, educational institutions, or nonprofit organizations, Yusuf is committed to delivering data analysis services that drive performance, improve decision-making, and contribute to long-term success. His ability to combine technical expertise with business understanding makes him a trusted partner for organizations seeking to unlock the full potential of their data.
            </p>
          </motion.div>
        </div>

        {/* Data Radar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <DataRadarShowcase />
        </motion.div>

        {/* Crazy Data Radar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <DataCrazyRadarShowcase />
        </motion.div>

        {/* His Projects Marquee */}
        <div className="mt-32 border-t border-white/10 pt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">His Projects</h2>
            <p className="text-white/50 text-sm mt-3 uppercase tracking-widest font-bold">A gallery of data-driven insights</p>
          </div>
          
          {/* Marquee Row 1 (Moving Left) */}
          <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-6 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-tph-dark before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-tph-dark after:to-transparent">
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="flex gap-6 pr-6 items-center"
            >
              {marqueeItems.map((proj, idx) => (
                <div key={`row1-${idx}`} className="relative h-64 w-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 text-left whitespace-normal">
                    <p className="text-white font-bold text-sm leading-tight">{proj.title}</p>
                    <p className="text-tph-orange text-[10px] font-bold uppercase tracking-widest mt-1">{proj.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Marquee Row 2 (Moving Right) */}
          <div className="relative w-full overflow-hidden flex whitespace-nowrap before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-32 before:bg-gradient-to-r before:from-tph-dark before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-32 after:bg-gradient-to-l after:from-tph-dark after:to-transparent">
            <motion.div
              animate={{ x: [-1920, 0] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-6 pr-6 items-center"
            >
              {[...marqueeItems].reverse().map((proj, idx) => (
                <div key={`row2-${idx}`} className="relative h-64 w-80 shrink-0 rounded-2xl overflow-hidden border border-white/10 group bg-white/[0.02]">
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
        </div>

      </div>
    </main>
  );
}
