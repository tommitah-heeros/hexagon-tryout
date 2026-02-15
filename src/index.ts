import { createNotificationCloudFunction } from "@adapter/cloud/serverless.notification";
import { createFileSystemNoteRepository } from "@adapter/file-system/note.file-repository";
import { createFastifyServer, SERVER_PORT } from "@adapter/http/web-server";
import { createNote as createNoteUseCase } from "@domain/note/create";
import { createNotification as createNotificationUseCase } from "@domain/notification/create";

const noteRepository = await createFileSystemNoteRepository();
const createNote = createNoteUseCase(noteRepository);

const notificationService = createNotificationCloudFunction();
const createNotification = createNotificationUseCase(notificationService);

const useCases = { createNote };
const app = createFastifyServer(useCases);

try {
  await app.listen({ port: SERVER_PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
