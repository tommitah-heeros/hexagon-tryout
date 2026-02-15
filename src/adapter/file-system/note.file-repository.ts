import type { NoteRepository, Note } from "@port/note.repository";

const REPO_FILE_PATH = "./note-repository.json";
export async function createFileSystemNoteRepository(): Promise<NoteRepository> {
  const file = Bun.file(REPO_FILE_PATH, { type: "application/json" });

  if (!file.exists()) {
    console.error("no file at location!");
    throw Error("No file at location, create file `note-repository.json`");
  }

  const collection: Note[] = await file.json();

  return {
    async save(data: Note): Promise<void> {
      collection.push(data);
      await Bun.write(file, JSON.stringify(collection));
    },

    async get(id: string): Promise<Note | null> {
      const note = collection.find((note) => note.id === id) ?? null;
      return note;
    },
  };
}
