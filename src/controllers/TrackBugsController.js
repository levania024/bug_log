import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackBugsService } from "../services/TrackBugsService.js";

export class TrackBugsController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTrackedBug)
            .delete('/:trackedBugId', this.deleteTrackedBug)
    }

    async deleteTrackedBug(request, response, next) {
        try {
            const trackBugId = request.params.trackedBugId
            const trackedBug = await trackBugsService.deleteTrackedBug(trackBugId)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }

    async createTrackedBug(request, response, next) {
        try {
            const trackBugData = request.body
            const user = request.userInfo
            trackBugData.creatorId = user.id
            const trackedBug = await trackBugsService.createTrackedBug(trackBugData)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }
}