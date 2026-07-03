import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import SectionKicker from './SectionKicker'

const faqs = [
  {
    question: 'How does the discovery process work?',
    answer: 'We offer a 48h turnaround on discovery. We start by analyzing your brand brief, wireframing layouts, and aligning on design systems before coding a single line.',
  },
  {
    question: 'What is included in a branding package?',
    answer: 'A standard branding package includes logo suites (responsive SVG vectors), color guides, typography guidelines, presentation templates, and custom social media rollout banners.',
  },
  {
    question: 'How do you structure website development projects?',
    answer: 'All web projects are built on a fast Vite + React workflow. We utilize Tailwind CSS for precise, responsive styles and prepare frontend architectures for database integration (such as Firebase).',
  },
  {
    question: 'Can we track project milestones and reports?',
    answer: 'Yes! Once you start a project and sign in, you gain access to our custom client dashboard, where you can view live builds, interact with analytics reports, and request design sprints.',
  },
]

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left text-sm font-semibold text-white hover:text-tph-cyan transition-colors duration-300 focus:outline-none"
      >
        <span className="flex items-center gap-3">
          <HelpCircle className="h-4.5 w-4.5 text-tph-cyan shrink-0" />
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/40 group-hover:text-white"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-7.5 text-xs leading-relaxed text-white/50">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-[#08080c] px-5 py-24 sm:px-6 lg:px-8" aria-labelledby="faq-title">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <SectionKicker label="FAQ" color="text-tph-cyan" />
          <h2 id="faq-title" className="mt-4 text-3xl font-extrabold text-white leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs text-white/50">
            Answers to common questions about our discovery speed, creative process, and delivery options.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6.5 backdrop-blur-sm">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
