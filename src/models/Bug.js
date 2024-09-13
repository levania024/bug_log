import { Schema } from "mongoose";

export const BugSchema = new Schema(
    {
        title: { type: String, minlength: 10, maxlength: 50, require: true },
        description: { type: String, minlength: 10, maxlength: 500, require: true },
        priority: { type: Number, min: 1, max: 5, require: true },
        closed: { type: Boolean, required: true, default: false },
        closedDate: { type: Date },
        creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

BugSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})