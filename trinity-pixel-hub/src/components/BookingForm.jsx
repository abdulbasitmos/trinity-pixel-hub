import { useMemo, useState } from 'react'
import { projectTypes } from '../data/siteData'

const emptyForm = {
  category: '',
  title: '',
  description: '',
  deadline: '',
  assets: null,
}

export default function BookingForm({ onBookingCreated }) {
  const [form, setForm] = useState(emptyForm)
  const [toast, setToast] = useState('')
  const [errors, setErrors] = useState({})

  const isValid = useMemo(() => {
    return Boolean(form.category && form.title.trim() && form.description.trim() && form.deadline)
  }, [form])

  const updateField = (field, value) => {
    setErrors((current) => ({ ...current, [field]: undefined }))
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!form.category) nextErrors.category = 'Choose a project category.'
    if (!form.title.trim()) nextErrors.title = 'Project title is required.'
    if (!form.description.trim()) nextErrors.description = 'Add a detailed description.'
    if (!form.deadline) nextErrors.deadline = 'Select a preferred deadline.'

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const newBooking = {
      id: `booking-${Date.now()}`,
      category: form.category,
      title: form.title.trim(),
      description: form.description.trim(),
      deadline: form.deadline,
      assets: form.assets ? form.assets.name : null,
      status: 'In Review',
      createdAt: new Date().toISOString(),
    }

    onBookingCreated(newBooking)
    setForm(emptyForm)
    setToast('Booking submitted successfully. Your project has been added to the dashboard.')
    window.setTimeout(() => setToast(''), 3500)
  }

  return (
    <section className="rounded-[24px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_60px_rgba(255,0,127,0.12)] backdrop-blur-xl sm:p-8">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-tph-pink">Booking Engine</p>
        <h3 className="mt-2 text-2xl font-black text-white">Hire the studio</h3>
        <p className="mt-2 text-sm leading-7 text-white/62">
          Submit a project request with a category, deadline, and supporting files. The new booking appears instantly in your dashboard.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-bold text-white/76">Project Category</span>
          <select value={form.category} onChange={(event) => updateField('category', event.target.value)} className="field-control">
            <option value="">Select a service</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.category ? <p className="text-xs font-bold text-tph-orange">{errors.category}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-white/76">Project Title</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            className="field-control"
            placeholder="Launch campaign, landing page, logo suite..."
          />
          {errors.title ? <p className="text-xs font-bold text-tph-orange">{errors.title}</p> : null}
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-bold text-white/76">Detailed Description</span>
          <textarea
            rows="6"
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            className="field-control resize-y"
            placeholder="Outline goals, audience, timeline, references, and what success should look like."
          />
          {errors.description ? <p className="text-xs font-bold text-tph-orange">{errors.description}</p> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-sm font-bold text-white/76">Preferred Delivery Deadline</span>
            <input
              type="date"
              value={form.deadline}
              onChange={(event) => updateField('deadline', event.target.value)}
              className="field-control"
            />
            {errors.deadline ? <p className="text-xs font-bold text-tph-orange">{errors.deadline}</p> : null}
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-bold text-white/76">Project Assets / Briefs</span>
            <label className="flex cursor-pointer flex-col gap-2 rounded-[16px] border border-dashed border-white/15 bg-black/20 px-4 py-3 text-sm text-white/68 transition hover:border-tph-cyan hover:bg-white/[0.05]">
              <span className="font-bold text-white">Upload file</span>
              <span>{form.assets ? form.assets.name : 'PNG, PDF, DOCX, ZIP'}</span>
              <input
                type="file"
                className="sr-only"
                onChange={(event) => updateField('assets', event.target.files?.[0] || null)}
              />
            </label>
          </label>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="mt-2 w-full rounded-full bg-tph-gradient px-7 py-4 text-base font-black text-white shadow-pink-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Submit Booking
        </button>
      </form>

      {toast ? (
        <div className="mt-4 rounded-[18px] border border-tph-cyan/30 bg-tph-cyan/10 px-4 py-3 text-sm leading-7 text-white">
          {toast}
        </div>
      ) : null}
    </section>
  )
}
