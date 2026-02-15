import { createNotificationCloudFunction } from "@adapter/cloud/serverless.notification";
import { createFileSystemNoteRepository } from "@adapter/file-system/note.file-repository";
import { createFastifyServer, SERVER_PORT } from "@adapter/http/web-server";
import { createNote as createNoteUseCase } from "@domain/note/create";

const notificationService = createNotificationCloudFunction();

const noteRepository = await createFileSystemNoteRepository();
const createNote = createNoteUseCase(noteRepository, notificationService);

const useCases = { createNote };
const app = createFastifyServer(useCases);

try {
  await app.listen({ port: SERVER_PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
