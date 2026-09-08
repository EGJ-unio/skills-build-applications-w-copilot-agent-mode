import { Router } from 'express'
import { UserModel } from '../models/user.js'

const usersRouter = Router()

usersRouter.get('/', async (_request, response) => {
  try {
    const users = await UserModel.find().select('-password').sort({ createdAt: -1 })
    response.json(users)
  } catch (error) {
    response.status(500).json({ error: 'Unable to load users', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

usersRouter.post('/', async (request, response) => {
  try {
    const user = await UserModel.create(request.body)
    const { password: _password, ...userResponse } = user.toObject()
    response.status(201).json(userResponse)
  } catch (error) {
    response.status(400).json({ error: 'Unable to create user', details: error instanceof Error ? error.message : 'Unknown error' })
  }
})

export default usersRouter
