import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import PageShell from './PageShell'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProjectsPage from '../pages/ProjectsPage'
import ServicesPage from '../pages/ServicesPage'
import ContactPage from '../pages/ContactPage'
import GraphicDesignLeadPage from '../pages/GraphicDesignLeadPage'
import WebDevLeadPage from '../pages/WebDevLeadPage'
import DataAnalysisLeadPage from '../pages/DataAnalysisLeadPage'

import NotFoundPage from '../pages/NotFoundPage'

function resolvePage(pathname) {
  if (pathname === '/' || pathname === '/home') {
    return HomePage
  }
  if (pathname === '/about') {
    return AboutPage
  }
  if (pathname === '/projects' || pathname.startsWith('/projects/') || pathname === '/portfolio') {
    return ProjectsPage
  }
  if (pathname === '/services') {
    return ServicesPage
  }
  if (pathname === '/contact' || pathname === '/start-with-us') {
    return ContactPage
  }
  if (pathname === '/team/graphic-design') {
    return GraphicDesignLeadPage
  }
  if (pathname === '/team/web-development') {
    return WebDevLeadPage
  }
  if (pathname === '/team/data-analysis') {
    return DataAnalysisLeadPage
  }
  return NotFoundPage
}

export default function AppRouter() {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const ActivePage = resolvePage(pathname)

  return (
    <PageShell>
      <ActivePage />
    </PageShell>
  )
}
