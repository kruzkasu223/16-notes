import { useEffect, useState } from "react"
import { Icon } from "./icons"
import type { NoteType } from "./types"

type NoteProps = {
  note: NoteType | undefined
  isCreate?: boolean
  onCloseCreateNoteClick?: () => void
  handleCreateNote?: (note: string) => void
  handleDeleteNote?: (noteId: string) => void
  handleEditNote?: (noteId: string, note: string) => void
}

export const Note = ({
  note,
  isCreate = false,
  onCloseCreateNoteClick,
  handleCreateNote,
  handleEditNote,
  handleDeleteNote,
}: NoteProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const [noteText, setIsNoteText] = useState(note?.note || "")

  useEffect(() => {
    setIsNoteText(note?.note || "")
  }, [note?.note])

  const handleOnEdit = () => {
    setIsEdit((e) => !e)
    setIsNoteText(note?.note || "")
  }

  const handleOnEditDone = () => {
    handleOnEdit()
    note?.id && handleEditNote?.(note?.id, noteText)
  }

  const handleOnCreateDone = () => {
    handleCreateNote?.(noteText)
  }

  const handleOnDelete = () => {
    note?.id && handleDeleteNote?.(note?.id)
  }

  return (
    <div className="rounded-box min-h-[240px] w-[380px] bg-neutral py-4 px-6">
      {isCreate ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-4 text-secondary">
            <button
              onClick={handleOnCreateDone}
              className="btn-primary btn-sm btn"
            >
              <Icon.Check />
            </button>
            <button
              className="btn-primary btn-sm btn"
              onClick={onCloseCreateNoteClick}
            >
              <Icon.Close />
            </button>
          </div>
          <textarea
            className="textarea-primary textarea"
            placeholder="jot down an idea..."
            rows={5}
            onChange={(e) => setIsNoteText(e.target.value || "")}
            value={noteText}
          ></textarea>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-end gap-4 text-secondary">
            <span>{note?.createdAt}</span>
            <button
              onClick={isEdit ? handleOnEditDone : handleOnEdit}
              className="btn-secondary btn-sm btn"
            >
              {isEdit ? <Icon.Check /> : <Icon.Edit />}
            </button>
            {isEdit && (
              <button
                onClick={() => setIsEdit(false)}
                className="btn-secondary btn-sm btn"
              >
                <Icon.Close />
              </button>
            )}
            <button
              onClick={handleOnDelete}
              className="btn-outline btn-error btn-sm btn"
            >
              <Icon.Delete />
            </button>
          </div>
          {isEdit ? (
            <textarea
              className="textarea-secondary textarea"
              placeholder="jot down an idea..."
              rows={5}
              onChange={(e) => setIsNoteText(e.target.value || "")}
              value={noteText}
            ></textarea>
          ) : (
            <p className="whitespace-pre-wrap break-words text-justify">
              {note?.note}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
