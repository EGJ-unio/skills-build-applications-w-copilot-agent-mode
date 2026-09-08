import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const workoutSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    exercises: [
      {
        name: { type: String, required: true, trim: true },
        sets: { type: Number, required: true, min: 1 },
        repetitions: { type: Number, required: true, min: 1 },
      },
    ],
    scheduledFor: { type: Date, required: true },
  },
  { timestamps: true },
)

export type Workout = InferSchemaType<typeof workoutSchema>
export const WorkoutModel = mongoose.model('Workout', workoutSchema)
