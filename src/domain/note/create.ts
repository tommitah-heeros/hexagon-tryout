import type { Note, NoteCreateParams } from "./Note";
import type { NotificationService } from "@port/notification.service";
import type { NoteRepository } from "@port/note.repository";

export function createNote(
  repository: NoteRepository,
  notificationService: NotificationService,
) {
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

      await notificationService.send({
        channel: "work-slack-channel",
        message: "Note was created!",
      });

      return note;
    },
  };
}

export type CreateNote = ReturnType<typeof createNote>;
