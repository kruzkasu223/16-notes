import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useState } from "react"
import type { NoteType } from "./types"

const notesAtom = atomWithStorage<NoteType[]>("notes", [])

export const useNotes = () => {
  const [notes, setNotes] = useAtom(notesAtom)
  const [isCreateNew, setIsCreateNew] = useState(false)

  const onCreateNoteClick = () => {
    setIsCreateNew(true)
  }

  const onCloseCreateNoteClick = () => {
    setIsCreateNew(false)
  }

  const handleCreateNote = (note: string) => {
    setNotes((notes) => [
      {
        note: note,
        createdAt: new Date().toLocaleString(),
        id: String(Math.random()),
      },
      ...notes,
    ])
    onCloseCreateNoteClick()
  }

  const handleEditNote = (noteId: string, noteText: string) => {
    setNotes((notes) =>
      notes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            note: noteText,
          }
        }
        return note
      })
    )
  }

  const handleDeleteNote = (noteId: string) => {
    console.log("handleDelete", noteId)
    setNotes((notes) => notes.filter((note) => note.id !== noteId))
  }

  return {
    notes,
    onCreateNoteClick,
    onCloseCreateNoteClick,
    isCreateNew,
    handleCreateNote,
    handleDeleteNote,
    handleEditNote,
  }
}
