import { Schema } from "mongoose"

export const NoteSchema = new Schema(
    {
        body: { type: String, minlength: 5, maxlength: 500, require: true },
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
        bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

NoteSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
