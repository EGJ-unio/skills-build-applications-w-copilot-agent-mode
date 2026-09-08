import { Router } from 'express'
import { ActivityModel } from '../models/activity.js'

const activitiesRouter = Router()

activitiesRouter.get('/', async (_request, response) => {
  try {
    const activities = await ActivityModel.find().populate('user', '-password').populate('team').sort({ completedAt: -1 })
    response.json(activities)
  } catch (error) {
    response.status(500).json({ error: 'Unable to load activities', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

export default activitiesRouter
