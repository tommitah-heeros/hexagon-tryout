import { createFileSystemNoteRepository } from "@adapter/file-system/note.file-repository";
import { createFastifyServer, SERVER_PORT } from "@adapter/http/web-server";
import { createNote as createNoteUseCase } from "@domain/note/create";

const noteRepository = await createFileSystemNoteRepository();
const createNote = createNoteUseCase(noteRepository);

const app = createFastifyServer(createNote);

try {
  await app.listen({ port: SERVER_PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
