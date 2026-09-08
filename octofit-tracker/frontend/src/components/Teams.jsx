import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('teams')
      .then((items) => {
        setTeams(items)
        setStatus({ loading: false, error: '' })
      })
      .catch((error) => setStatus({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Find your pace</p><h1>Teams</h1></div><span className="count-badge">{teams.length} teams</span></div>
      {status.loading && <p className="feedback">Loading teams...</p>}
      {status.error && <p className="feedback feedback-error">{status.error}</p>}
      {!status.loading && !status.error && <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id || team.id}><div className="team-mark">{team.name?.slice(0, 1).toUpperCase()}</div><h2>{team.name}</h2><p>{team.description || 'No description yet.'}</p><footer><span>{team.members?.length || 0} members</span><span>Captain: {team.captain?.profile?.displayName || team.captain?.username || '—'}</span></footer></article>)}</div>}
    </section>
  )
}

export default Teams
