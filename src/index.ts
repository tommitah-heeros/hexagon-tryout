import { createNotificationCloudService } from "@adapter/cloud/serverless/notification.service";
import { createFileSystemNoteRepository } from "@adapter/file-system/note.file-repository";
import {
  createFastifyServer,
  getLogger,
  SERVER_PORT,
} from "@adapter/http/web-server";
import { createNote as createNoteUseCase } from "@domain/note/create";

const notificationService = createNotificationCloudService();

const noteRepository = await createFileSystemNoteRepository();
const createNote = createNoteUseCase({
  repository: noteRepository,
  notificationService,
  logger: getLogger(),
});

const useCases = { createNote };
const app = createFastifyServer(useCases);

try {
  await app.listen({ port: SERVER_PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
