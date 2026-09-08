import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
)

export type Activity = InferSchemaType<typeof activitySchema>
export const ActivityModel = mongoose.model('Activity', activitySchema)
