import { Schema } from "mongoose"

export const TrackBugSchema = new Schema(
    {
        accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' }
    },

    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

TrackBugSchema.virtual('tracker', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TrackBugSchema.virtual('bug', {
    localField: 'bugId',
    ref: 'Bug',
    foreignField: '_id',
    justOne: true
})

