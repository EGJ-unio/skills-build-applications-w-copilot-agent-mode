import { Router } from 'express'
import { LeaderboardModel } from '../models/leaderboard.js'

const leaderboardRouter = Router()

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const entries = await LeaderboardModel.find().populate('user', '-password').populate('team').sort({ points: -1, rank: 1 })
    response.json(entries)
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

export default leaderboardRouter
