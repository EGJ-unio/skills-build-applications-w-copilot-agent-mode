import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(apiEndpoint)
      .then((items) => {
        setEntries(items)
        setStatus({ loading: false, error: '' })
      })
      .catch((error) => setStatus({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">September 2026</p><h1>Leaderboard</h1></div><span className="count-badge">Top performers</span></div>
      {status.loading && <p className="feedback">Loading rankings...</p>}
      {status.error && <p className="feedback feedback-error">{status.error}</p>}
      {!status.loading && !status.error && (
        <div className="ranking-list">
          {entries.map((entry) => (
            <article className="ranking-row" key={entry._id || entry.id}>
              <span className="rank">{String(entry.rank).padStart(2, '0')}</span>
              <div className="avatar avatar-small">{(entry.user?.profile?.displayName || entry.user?.username || 'U').slice(0, 1).toUpperCase()}</div>
              <div className="ranking-name"><strong>{entry.user?.profile?.displayName || entry.user?.username || 'Member'}</strong><span>{entry.team?.name || 'Independent'}</span></div>
              <strong className="points">{entry.points} pts</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard
