import { dbContext } from "../db/DbContext.js"

class TrackBugsService {
    async deleteTrackedBug(trackBugId) {
        const BugToDelete = await dbContext.TrackBugs.findById(trackBugId)
        await BugToDelete.deleteOne()

        return BugToDelete
    }

    async getTrackedBug() {
        const trackedBug = await dbContext.TrackBugs.find()
            .populate('tracker')
            .populate('bug')
        return trackedBug
    }

    async getTrackedBugByBugId(bugId) {
        const trackedBug = await dbContext.TrackBugs.find({ bugId: bugId })
            .populate('tracker')
            .populate('bug')

        return trackedBug
    }

    async createTrackedBug(trackBugData) {
        const trackedBug = await dbContext.TrackBugs.create(trackBugData)
        await trackedBug.populate('tracker')
        await trackedBug.populate('bug')

        return trackedBug
    }
}
export const trackBugsService = new TrackBugsService()