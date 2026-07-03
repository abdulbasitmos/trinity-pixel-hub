export default function RouterLink({ href, className = '', children, onClick, ...props }) {
  const handleClick = (event) => {
    if (onClick) onClick(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }

    const url = new URL(href, window.location.origin)
    if (url.origin !== window.location.origin) return

    event.preventDefault()
    window.history.pushState({}, '', url.pathname)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
