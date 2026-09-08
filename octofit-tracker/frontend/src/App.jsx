import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL } from './lib/api.js'
import './App.css'

const navigation = [
  { to: '/users', label: 'Members', icon: '01' },
  { to: '/activities', label: 'Activity', icon: '02' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '03' },
  { to: '/teams', label: 'Teams', icon: '04' },
  { to: '/workouts', label: 'Workouts', icon: '05' },
]

function Dashboard() {
  return (
    <section className="dashboard-hero">
      <p className="eyebrow">Your movement, in focus</p>
      <h1>Small steps.<br /><em>Strong momentum.</em></h1>
      <p className="hero-copy">Track the work that makes you feel better, find your people, and keep the next good choice close.</p>
      <NavLink className="primary-action" to="/activities">View recent activity <span aria-hidden="true">↗</span></NavLink>
      <div className="hero-note"><span className="live-dot" /> Connected to {API_BASE_URL.replace('/api', '')}</div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <img src={logo} alt="OctoFit" />
          <span>OctoFit <small>TRACKER</small></span>
        </NavLink>
        <span className="status-pill"><span className="live-dot" /> API online</span>
      </header>
      <div className="app-layout">
        <aside className="sidebar" aria-label="Main navigation">
          <p className="sidebar-label">Explore</p>
          <nav>{navigation.map((item) => <NavLink className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'} key={item.to} to={item.to}><span>{item.icon}</span>{item.label}</NavLink>)}</nav>
          <div className="sidebar-footer"><span className="sun-mark">✳</span><p>Consistency<br /><strong>beats intensity.</strong></p></div>
        </aside>
        <main><Routes><Route path="/" element={<Dashboard />} /><Route path="/users" element={<Users />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes></main>
      </div>
    </div>
  )
}

export default App
