import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectTypes } from '../data/siteData'
import SectionKicker from './SectionKicker'
import { CheckCircle2, Loader2 } from 'lucide-react'
import studioVideo from '../istockphoto-2226650668-640_adpp_is.mp4'

const budgetChips = ['Starter', 'Growth', 'Premium', 'Enterprise']

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState(['Web Development'])
  const [selectedBudget, setSelectedBudget] = useState('Growth')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    projectType: '',
    brief: '',
    timeline: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Service configuration definitions for real-time estimates
  const serviceDetails = {
    'Graphic Design': { baseCost: 400, days: 3 },
    'Logo Design': { baseCost: 600, days: 4 },
    'Banner & Flyer Design': { baseCost: 300, days: 3 },
    'Video Editing': { baseCost: 500, days: 4 },
    'Web Development': { baseCost: 1500, days: 10 },
    'Data Analysis': { baseCost: 1200, days: 7 },
    'Branding & Identity': { baseCost: 1000, days: 6 },
  };

  const budgetMultipliers = {
    'Starter': 0.8,
    'Growth': 1.2,
    'Premium': 2.0,
    'Enterprise': 4.0,
  };

  const calculateEstimate = () => {
    let totalCost = 0;
    let totalDays = 0;

    selectedServices.forEach(service => {
      const config = serviceDetails[service] || { baseCost: 500, days: 5 };
      totalCost += config.baseCost;
      totalDays += config.days;
    });

    const mult = budgetMultipliers[selectedBudget] || 1.2;
    totalCost = Math.round(totalCost * mult);

    // Overlap efficiency discount
    if (selectedServices.length > 1) {
      totalCost = Math.round(totalCost * 0.85);
      totalDays = Math.round(totalDays * 0.75);
    }

    if (totalCost === 0) return { costRange: '$0', daysRange: '0 business days' };
    return {
      costRange: `$${(totalCost * 0.95).toLocaleString(undefined, { maximumFractionDigits: 0 })} - $${(totalCost * 1.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      daysRange: `${Math.max(2, Math.round(totalDays * 0.8))} - ${Math.round(totalDays * 1.2)} business days`
    };
  };

  const estimate = calculateEstimate();

  const toggleService = (service) => {
    setSelectedServices((current) =>
      current.includes(service) ? current.filter((item) => item !== service) : [...current, service],
    )
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1800)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-tph-dark px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="contact-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,0,127,0.1),transparent_32%),radial-gradient(circle_at_82%_40%,rgba(0,210,255,0.08),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,153,0,0.06),transparent_36%)] pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        
        {/* Left Column */}
        <div className="space-y-8 lg:sticky lg:top-32">
          <div>
            <SectionKicker label="Lead Intake" color="text-tph-orange" />
            <h2 id="contact-title" className="mt-4 text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              Bring the brief. We will shape the digital experience.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Share the project type, goals, timeline, and scope. The studio turns that into a focused creative proposal with clear milestones.
            </p>
          </div>

          {/* Interactive Mock Studio Reel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40"
          >
            <video
              src={studioVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-70 group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tph-dark via-transparent to-transparent" />
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-tph-orange backdrop-blur-md flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-tph-orange animate-ping" />
              Creative Reel
            </div>
            <div className="absolute left-4 bottom-4 right-4 text-left">
              <h4 className="text-sm font-bold text-white leading-none">TPH Production Showcase</h4>
              <p className="text-[10px] text-white/50 mt-1 leading-normal">Interactive campaign outputs, web engines, and brand marks.</p>
            </div>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { title: 'Strategy call', desc: '15-min discovery' },
              { title: 'Scoped proposal', desc: '48h turnaround' },
              { title: 'Launch assets', desc: '100% vector SVGs' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center backdrop-blur-sm hover:border-tph-orange/30 transition-all duration-300">
                <p className="text-xs font-bold text-white/80">{item.title}</p>
                <p className="text-[9px] font-semibold text-white/40 mt-1 uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-white/5 bg-white/[0.01] p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60">Office Hours & Remote Status</h4>
            <div className="text-xs text-white/50 space-y-1.5">
              <p>📍 Operations: Remote production studio</p>
              <p>📅 Schedule: Mon - Fri (09:00 - 18:00 UTC+1)</p>
              <p>⚡ Response: Scoped plans ready in less than 2 business days</p>
            </div>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-purple-glow/5 backdrop-blur-xl sm:p-8">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Project Configurator Chips */}
                <div className="rounded-xl border border-white/5 bg-black/40 p-5 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-tph-cyan">Project Services</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {projectTypes.map((type) => {
                        const active = selectedServices.includes(type)
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleService(type)}
                            className={`rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none active:scale-95 cursor-pointer ${
                              active
                                ? 'border-transparent bg-tph-gradient text-white shadow-pink-glow'
                                : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-tph-cyan hover:text-white'
                            }`}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-tph-pink">Scale Tier</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {budgetChips.map((budget) => (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setSelectedBudget(budget)}
                          className={`rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 focus:outline-none active:scale-95 cursor-pointer ${
                            selectedBudget === budget
                              ? 'border-tph-pink bg-tph-pink/20 text-white shadow-pink-glow'
                              : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-tph-pink hover:text-white'
                          }`}
                        >
                          {budget}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Real-time Project Estimate Summary */}
                  <div className="mt-6 pt-5 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Real-Time Intake Estimate</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-left">
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Estimated Budget</p>
                        <p className="text-base font-extrabold text-tph-cyan mt-1">{estimate.costRange}</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 text-left">
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-wider">Estimated Delivery</p>
                        <p className="text-base font-extrabold text-tph-orange mt-1">{estimate.daysRange}</p>
                      </div>
                    </div>
                    <p className="text-[9px] text-white/30 leading-relaxed italic">
                      *Estimates are calculated live based on current studio bandwidth and chosen scale multipliers. Actual scope verified upon review.
                    </p>
                  </div>
                </div>

                {/* Floating Inputs */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="relative">
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                    />
                    <label
                      htmlFor="fullName"
                      className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                    >
                      Full Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=" "
                      className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                {/* Dropdown selects */}
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-xs font-bold text-white/50">Primary Project Need</label>
                  <select 
                    id="projectType"
                    name="projectType" 
                    required 
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 color-scheme-dark"
                  >
                    <option value="" disabled className="bg-tph-dark text-white/50">Select a service</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="bg-tph-dark text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brief Textarea */}
                <div className="relative">
                  <textarea
                    id="brief"
                    name="brief"
                    required
                    rows="5"
                    value={formData.brief}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 resize-none"
                  />
                  <label
                    htmlFor="brief"
                    className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-xs text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                  >
                    Project Brief Details
                  </label>
                </div>

                {/* Timeline and Budget range selects */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="timeline" className="text-xs font-bold text-white/50">Target Timeline</label>
                    <select 
                      id="timeline"
                      name="timeline" 
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 color-scheme-dark"
                    >
                      <option value="" disabled className="bg-tph-dark text-white/50">Select timeline</option>
                      <option value="asap" className="bg-tph-dark text-white">As soon as possible</option>
                      <option value="2-4-weeks" className="bg-tph-dark text-white">2-4 weeks</option>
                      <option value="1-2-months" className="bg-tph-dark text-white">1-2 months</option>
                      <option value="flexible" className="bg-tph-dark text-white">Flexible</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-xs font-bold text-white/50">Budget Range</label>
                    <select 
                      id="budget"
                      name="budget" 
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-sm text-white focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300 color-scheme-dark"
                    >
                      <option value="" disabled className="bg-tph-dark text-white/50">Select budget</option>
                      <option value="starter" className="bg-tph-dark text-white">Starter ($1k - $5k)</option>
                      <option value="growth" className="bg-tph-dark text-white">Growth ($5k - $15k)</option>
                      <option value="premium" className="bg-tph-dark text-white">Premium ($15k - $50k)</option>
                      <option value="enterprise" className="bg-tph-dark text-white">Enterprise ($50k+)</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full relative flex items-center justify-center rounded-full bg-tph-gradient py-4 text-xs font-bold uppercase tracking-wider text-white shadow-pink-glow transition hover:shadow-cyan-glow focus:outline-none disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Send Project Brief'
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                  className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">Brief Received successfully!</h3>
                <p className="mx-auto max-w-sm text-xs leading-relaxed text-white/50">
                  Thanks for reaching out! Yusuf, Fuhad, or Moshood will review your project requirements and follow up with a scoped proposal within 48 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({
                      fullName: '',
                      email: '',
                      projectType: '',
                      brief: '',
                      timeline: '',
                      budget: ''
                    })
                  }}
                  className="text-xs font-bold text-tph-cyan hover:underline uppercase tracking-wider"
                >
                  Submit another brief
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
