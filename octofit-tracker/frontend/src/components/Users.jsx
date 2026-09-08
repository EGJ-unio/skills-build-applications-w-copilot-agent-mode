import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection(apiEndpoint)
      .then((items) => {
        setUsers(items)
        setStatus({ loading: false, error: '' })
      })
      .catch((error) => setStatus({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Community</p>
          <h1>Members</h1>
        </div>
        <span className="count-badge">{users.length} profiles</span>
      </div>
      {status.loading && <p className="feedback">Loading members...</p>}
      {status.error && <p className="feedback feedback-error">{status.error}</p>}
      {!status.loading && !status.error && (
        <div className="data-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id || user.id || user.email}>
              <div className="avatar">{(user.profile?.displayName || user.username || 'U').slice(0, 1).toUpperCase()}</div>
              <div>
                <h2>{user.profile?.displayName || user.username || 'Unnamed member'}</h2>
                <p>{user.email}</p>
                <span className="muted">@{user.username}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users
