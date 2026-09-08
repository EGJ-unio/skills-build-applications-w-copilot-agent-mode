import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState({ loading: true, error: '' })

  useEffect(() => {
    fetchCollection('workouts')
      .then((items) => {
        setWorkouts(items)
        setStatus({ loading: false, error: '' })
      })
      .catch((error) => setStatus({ loading: false, error: error.message }))
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><div><p className="eyebrow">Personal training</p><h1>Workout plans</h1></div><span className="count-badge">{workouts.length} plans</span></div>
      {status.loading && <p className="feedback">Loading workouts...</p>}
      {status.error && <p className="feedback feedback-error">{status.error}</p>}
      {!status.loading && !status.error && <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id || workout.id}><div className="workout-meta"><span>{workout.difficulty}</span><span>{workout.scheduledFor ? new Date(workout.scheduledFor).toLocaleDateString() : 'Flexible'}</span></div><h2>{workout.title}</h2><p>{workout.goal}</p><ul>{(workout.exercises || []).map((exercise) => <li key={exercise._id || exercise.name}>{exercise.name}<span>{exercise.sets} × {exercise.repetitions}</span></li>)}</ul></article>)}</div>}
    </section>
  )
}

export default Workouts
