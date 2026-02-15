import type { Note } from "@domain/note/Note";

// re-export type as part of the contract
export type { Note } from "@domain/note/Note";

// common interface between `domain` and `adapter`
export type NoteRepository = {
  save: (data: Note) => Promise<void>;
  get: (id: string) => Promise<Note | null>;
};
