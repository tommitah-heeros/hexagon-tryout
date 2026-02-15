import type { Note, NoteGetParams } from "./Note";
import type { NoteRepository } from "@port/note.repository";

export function getNote(repository: NoteRepository) {
  return {
    async execute({ id }: NoteGetParams): Promise<Note | null> {
      const note = await repository.get(id);

      return note;
    },
  };
}
