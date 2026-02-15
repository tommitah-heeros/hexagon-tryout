import { createNotificationCloudService } from "@adapter/cloud/serverless/notification.service";
import { createFileSystemNoteRepository } from "@adapter/file-system/note.file-repository";
import {
  createWebServer,
  getLogger,
  SERVER_PORT,
} from "@adapter/http/web-server";
import { createNote as createNoteUseCase } from "@domain/note/create";
import { getNote as getNoteUseCase } from "@domain/note/get";

const notificationService = createNotificationCloudService();

const noteRepository = await createFileSystemNoteRepository();
const createNote = createNoteUseCase({
  repository: noteRepository,
  notificationService,
  logger: getLogger(),
});
const getNote = getNoteUseCase({
  repository: noteRepository,
});

const useCases = { createNote, getNote };
const server = createWebServer(useCases);

try {
  await server.listen({ port: SERVER_PORT });
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
