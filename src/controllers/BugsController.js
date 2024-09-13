import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";
import { trackBugsService } from "../services/TrackBugsService.js";

export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBug)
            .get('', this.getBug)
            .get('/:bugId', this.getBugById)
            .get('/:bugId/notes', this.getNoteByBugId)
            .get('/:bugId/trackedbugs', this.getTrackedBugByBugId)
            .put('/:bugId', this.updateBug)
            .delete('/:bugId', this.deleteBug)
    }
    async getTrackedBugByBugId(request, response, next) {
        try {
            const bugId = request.params.bugId
            const trackedBug = await trackBugsService.getTrackedBugByBugId(bugId)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }
    async getNoteByBugId(request, response, next) {
        try {
            const bugId = request.params.bugId
            const notes = await notesService.getNoteByBugId(bugId)
            response.send(notes)
        } catch (error) {
            next(error)
        }

    }
    async deleteBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bug = await bugsService.deleteBug(bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
    async updateBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bugData = request.body
            const bug = await bugsService.updateBug(bugId, bugData)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getBugById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const userInfo = request.userInfo
            const bug = await bugsService.getBugById(bugId, userInfo.id)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }

    async getBug(request, response, next) {
        try {
            const bug = await bugsService.getBug()
            response.send(bug)
        } catch (error) {
            next(error)

        }
    }

    async createBug(request, response, next) {
        try {
            const bugData = request.body
            const user = request.userInfo
            bugData.creatorId = user.id
            const bug = await bugsService.createBug(bugData)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
}