import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BugsService {
    async deleteBug(bugId) {
        const BugToDelete = await dbContext.Bugs.findById(bugId)
        await BugToDelete.deleteOne()
        return BugToDelete
    }

    async updateBug(bugId, bugData) {
        const bugToDate = await dbContext.Bugs.findById(bugId)

        bugToDate.title = bugData.title ?? bugToDate.title
        bugToDate.description = bugData.description ?? bugToDate.description

        await bugToDate.save()
        return bugToDate
    }

    async getBugById(bugId, userId) {
        const bug = await dbContext.Bugs.findById(bugId).populate('creator')
        if (bug == null) {
            throw new BadRequest('invalid')
        }
        return bug
    }
    async getBug() {
        const bug = await dbContext.Bugs.find().populate('creator')
        return bug
    }

    async createBug(bugData) {
        const bug = await dbContext.Bugs.create(bugData)

        await bug.populate('creator')
        return bug
    }

}
export const bugsService = new BugsService()