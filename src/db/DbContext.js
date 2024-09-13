import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BugSchema } from '../models/Bug.js';
import { NoteSchema } from '../models/Note.js';
import { TrackBugSchema } from '../models/TrackBug.js';

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema)
  TrackBugs = mongoose.model('TrackBug', TrackBugSchema)
}

export const dbContext = new DbContext()
