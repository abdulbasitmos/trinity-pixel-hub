import { navLinks } from '../data/siteData'
import BrandLogo from './BrandLogo'
import RouterLink from './RouterLink'

const socials = [
  { name: 'Instagram', handle: '@trinitypixelhub-instagram', href: '#' },
  { name: 'Behance', handle: '@trinitypixelhub-behance', href: '#' },
  { name: 'LinkedIn', handle: '@trinitypixelhub-linkedin', href: '#' },
  { name: 'X', handle: '@trinitypixelhub', href: '#' },
  { 
    name: 'TikTok', 
    handle: '@trinity.pixel.hub', 
    href: 'https://www.tiktok.com/@trinity.pixel.hub?_r=1&_d=eld8577gda7ih4&sec_uid=MS4wLjABAAAAwfGmZ5SylFkD1-asUM-mYimwkZ3-F5yOi0ZCxLFd-MpR_13Ohjkm3oE8mD0JeLjT&share_author_id=7653404497650435080&sharer_language=en&source=h5_m&u_code=f45ac84kbag8k7&timestamp=1783088070&user_id=7653404497650435080&sec_user_id=MS4wLjABAAAAwfGmZ5SylFkD1-asUM-mYimwkZ3-F5yOi0ZCxLFd-MpR_13Ohjkm3oE8mD0JeLjT&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7651917220072163079&share_link_id=b44c502f-7b75-4c32-9ce9-a32117363b4f&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1' 
  }
]
const officeNotes = ['Remote production', 'Lagos orientation', 'Global client delivery']

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#07070b] px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-5">
          <div className="flex items-center gap-3">
            <BrandLogo className="h-10 w-10 border-white/10" />
            <span className="text-base font-bold tracking-tight text-white">Trinity Pixel Hub</span>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-white/50">
            A focused creative studio for brands that need design, web, video, and insight moving in one direction.
          </p>
          <p className="text-[10px] text-white/30">© 2026 Trinity Pixel Hub. All rights reserved.</p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <RouterLink 
                  className="text-xs text-white/50 transition-colors duration-300 hover:text-tph-cyan focus:outline-none focus-visible:text-tph-cyan" 
                  href={link.href}
                >
                  {link.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Social</h3>
          <ul className="mt-5 space-y-3">
            {socials.map((social) => (
              <li key={social.name}>
                <RouterLink 
                  className="text-xs text-white/50 transition-colors duration-300 hover:text-tph-pink focus:outline-none focus-visible:text-tph-pink" 
                  href={social.href}
                  target={social.href !== '#' ? '_blank' : undefined}
                  rel={social.href !== '#' ? 'noopener noreferrer' : undefined}
                >
                  {social.handle}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-4 border-t border-white/5 pt-8 text-[9px] font-semibold uppercase tracking-widest text-white/30 sm:flex-row sm:items-center sm:justify-between">
        <span>Office Orientation: Digital-first studio</span>
        <span>{officeNotes.join(' · ')}</span>
      </div>
    </footer>
  )
}
