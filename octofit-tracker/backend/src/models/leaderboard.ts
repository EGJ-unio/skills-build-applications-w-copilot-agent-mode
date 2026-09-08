import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>
export const LeaderboardModel = mongoose.model('Leaderboard', leaderboardSchema)
