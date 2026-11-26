import { Activity, ArrowUpRight, BookOpen, CalendarCheck, GraduationCap, IndianRupee, Menu, School, Settings2, ShieldCheck, Users, Wifi, WifiOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { firebaseConfigured } from '../services/firebase/client'

const stats = [
  { label: 'Total students', value: '—', note: 'Connect your school to get started', icon: GraduationCap },
  { label: 'Attendance today', value: '—', note: 'Attendance module is planned', icon: CalendarCheck },
  { label: 'Fee collection', value: '—', note: 'Finance module is planned', icon: IndianRupee },
  { label: 'Active classes', value: '—', note: 'Academic setup is planned', icon: BookOpen },
]

export default function App() {
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const onOnline = () => setOnline(true)
    const onOffline = () => setOnline(false)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><School size={23} /></div>
          <div><strong>Taleemi Duniya</strong><span>PRO · SCHOOL ERP</span></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list">
          <a className="nav-item active" href="#"><Activity size={18}/> Overview</a>
          <a className="nav-item" href="#schools"><School size={18}/> Schools</a>
          <a className="nav-item" href="#students"><Users size={18}/> Students</a>
          <a className="nav-item" href="#academics"><BookOpen size={18}/> Academics</a>
          <a className="nav-item" href="#finance"><IndianRupee size={18}/> Finance</a>
          <a className="nav-item" href="#settings"><Settings2 size={18}/> Settings</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="secure-note"><ShieldCheck size={17}/><span>Tenant isolation and role-based security are part of the platform foundation.</span></div>
          <div className="profile"><div className="avatar">TD</div><div><strong>Workspace preview</strong><span>Phase 1 starter</span></div></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open menu"><Menu size={20}/></button>
          <div className="breadcrumbs">Workspace <span>/</span> Overview</div>
          <div className={`connection ${online ? 'is-online' : 'is-offline'}`}>
            {online ? <Wifi size={15}/> : <WifiOff size={15}/>}
            {online ? 'Online' : 'Offline'}
          </div>
        </header>

        <section className="welcome">
          <div>
            <div className="eyebrow">SCHOOL MANAGEMENT PLATFORM</div>
            <h1>Good day. Welcome to <em>Taleemi Duniya Pro.</em></h1>
            <p>Your school operations, brought together in one secure workspace.</p>
          </div>
          <div className="welcome-icon"><GraduationCap size={38}/></div>
        </section>

        <div className={`setup-banner ${firebaseConfigured ? 'configured' : ''}`}>
          <div className="setup-icon"><ShieldCheck size={20}/></div>
          <div className="setup-copy">
            <strong>{firebaseConfigured ? 'Firebase configuration detected' : 'Your workspace is ready for setup'}</strong>
            <span>{firebaseConfigured ? 'Firebase web configuration values are present. Authentication and data modules will be added in upcoming phases.' : 'Add your Firebase Web App settings to frontend/.env.local to connect this frontend to your Firebase project.'}</span>
          </div>
          <span className="setup-tag">{firebaseConfigured ? 'CONFIGURED' : 'ACTION REQUIRED'}</span>
        </div>

        <section className="section-heading">
          <div><h2>Platform overview</h2><p>Live school metrics will appear here when modules are connected.</p></div>
          <button className="period-button">All schools <ArrowUpRight size={15}/></button>
        </section>

        <section className="stats-grid">
          {stats.map(({label, value, note, icon: Icon}) => (
            <article className="stat-card" key={label}>
              <div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={18}/></div></div>
              <strong className="stat-value">{value}</strong>
              <span className="stat-note">{note}</span>
            </article>
          ))}
        </section>

        <section className="lower-grid">
          <article className="panel roadmap-panel">
            <div className="panel-heading"><div><h2>Implementation roadmap</h2><p>Foundation milestones</p></div><span className="phase-pill">PHASE 1</span></div>
            {['Project foundation','Firebase project connection','Authentication and school onboarding','Tenant security and subscriptions'].map((item, i) => (
              <div className="roadmap-row" key={item}><span className={`roadmap-number ${i === 0 ? 'done' : ''}`}>{i === 0 ? '✓' : `0${i+1}`}</span><span>{item}</span><small>{i === 0 ? 'STARTER' : 'PLANNED'}</small></div>
            ))}
          </article>
          <article className="panel status-panel">
            <div className="panel-heading"><div><h2>System status</h2><p>Environment checks</p></div><span className="status-dot"/></div>
            <div className="status-row"><span>Frontend</span><strong className="good">Ready</strong></div>
            <div className="status-row"><span>Network</span><strong className={online ? 'good' : 'warn'}>{online ? 'Connected' : 'Offline'}</strong></div>
            <div className="status-row"><span>Firebase config</span><strong className={firebaseConfigured ? 'good' : 'warn'}>{firebaseConfigured ? 'Detected' : 'Not configured'}</strong></div>
            <div className="status-row"><span>Authentication</span><strong className="muted">Next phase</strong></div>
            <div className="status-footer"><ShieldCheck size={16}/> Secure-by-default starter foundation</div>
          </article>
        </section>
        <footer>© {new Date().getFullYear()} Taleemi Duniya Pro <span>Built for modern schools</span></footer>
      </main>
    </div>
  )
}
