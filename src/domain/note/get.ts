import type { Note, NoteGetParams } from './Note'
import type { NoteRepository } from '@port/note.repository'

export type GetNote = {
  execute: (params: NoteGetParams) => Promise<Note | null>
}
export function getNote({
  repository,
}: {
  repository: NoteRepository
}): GetNote {
  return {
    async execute({ id }: NoteGetParams): Promise<Note | null> {
      const note = await repository.get(id)

      return note
    },
  }
}
