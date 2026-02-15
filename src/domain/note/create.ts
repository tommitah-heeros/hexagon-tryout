import type { Note, NoteCreateParams } from './Note'
import type { NotificationService } from '@port/notification.service'
import type { NoteRepository } from '@port/note.repository'
import type { Logger } from '@port/logger'

export function createNote({
  repository,
  notificationService,
  logger,
}: {
  repository: NoteRepository
  notificationService: NotificationService
  logger: Logger
}) {
  return {
    async execute({ title, content }: NoteCreateParams) {
      logger.info('Creating note')
      const note: Note = {
        id: crypto.randomUUID(),
        title,
        content,
        createdAt: new Date(),
        updatedAt: null,
      }

      const metadata = { foo: 'bar' }

      await repository.save({ ...note, meta: metadata })

      await notificationService.send({
        channel: 'work-slack-channel',
        message: 'Note was created!',
      })

      logger.info('Note created.')
      return note
    },
  }
}

export type CreateNote = ReturnType<typeof createNote>
