import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class NotesService {
    async deleteNote(noteId) {
        const NoteToDelete = await dbContext.Notes.findById(noteId)
        await NoteToDelete.deleteOne()

        return NoteToDelete
    }

    async getNoteByBugId(bugId) {
        const notes = await dbContext.Notes.find({ bugId: bugId }).populate('creator')

        return notes
    }

    async createNote(noteData) {
        const note = await dbContext.Notes.create(noteData)
        await note.populate('creator')

        return note
    }
}
export const notesService = new NotesService()