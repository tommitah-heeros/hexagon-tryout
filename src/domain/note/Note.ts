export type Note = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date | null
  meta?: MetaData
}

export type MetaData = Record<string, string>

export type NoteCreateParams = Pick<Note, 'title' | 'content'>
export type NoteUpdateParams = Partial<Note>
export type NoteDeleteParams = Pick<Note, 'id'>
export type NoteGetParams = Pick<Note, 'id'>
export type NoteGetListParams = null // todo: how are multiple notes accessed?
