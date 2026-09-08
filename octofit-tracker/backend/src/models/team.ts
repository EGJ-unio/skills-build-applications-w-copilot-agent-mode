import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

export type Team = InferSchemaType<typeof teamSchema>
export const TeamModel = mongoose.model('Team', teamSchema)
