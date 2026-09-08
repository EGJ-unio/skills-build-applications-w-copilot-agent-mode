import { Router } from 'express'
import { WorkoutModel } from '../models/workout.js'

const workoutsRouter = Router()

workoutsRouter.get('/', async (_request, response) => {
  try {
    const workouts = await WorkoutModel.find().populate('user', '-password').sort({ scheduledFor: 1 })
    response.json(workouts)
  } catch (error) {
    response.status(500).json({ error: 'Unable to load workouts', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

export default workoutsRouter
