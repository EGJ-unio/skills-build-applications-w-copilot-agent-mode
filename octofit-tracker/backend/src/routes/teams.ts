import { Router } from 'express'
import { TeamModel } from '../models/team.js'

const teamsRouter = Router()

teamsRouter.get('/', async (_request, response) => {
  try {
    const teams = await TeamModel.find().populate('captain members', '-password').sort({ name: 1 })
    response.json(teams)
  } catch (error) {
    response.status(500).json({ error: 'Unable to load teams', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

export default teamsRouter
