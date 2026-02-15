import type { Note, NoteCreateParams } from "./Note";
import type { NoteRepository } from "@port/note.repository";

export function createNote(repository: NoteRepository) {
  return {
    async execute({ title, content }: NoteCreateParams) {
      const note: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        createdAt: new Date(),
        updatedAt: null,
      };

      const metadata = { foo: "bar" };

      await repository.save({ ...note, meta: metadata });

      return note;
    },
  };
}

export type CreateNote = ReturnType<typeof createNote>;
