import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('activities')
      .then((items) => {
        setActivities(items)
        setStatus({ loading: false, error: '' })
      })
      .catch((error) => setStatus({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading">
        <div><p className="eyebrow">Movement log</p><h1>Recent activity</h1></div>
        <span className="count-badge">{activities.length} sessions</span>
      </div>
      {status.loading && <p className="feedback">Loading activity...</p>}
      {status.error && <p className="feedback feedback-error">{status.error}</p>}
      {!status.loading && !status.error && (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Athlete</th><th>Session</th><th>Duration</th><th>Energy</th></tr></thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td><strong>{activity.user?.profile?.displayName || activity.user?.username || 'Member'}</strong></td>
                  <td>{activity.type}<small>{activity.distanceKm ? ` · ${activity.distanceKm} km` : ''}</small></td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.calories ? `${activity.calories} kcal` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
