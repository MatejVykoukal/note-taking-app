import { useAtom } from "jotai";
import { notesList } from "../store/notesStore";
import { nanoid } from "nanoid";

interface NoteInput {
  title: string;
  note: string;
}

export const useNotes = () => {
  const [notes, setNotes] = useAtom(notesList);

  const createNewNote = (newNoteInput: NoteInput) => {
    const newNoteId = nanoid();

    setNotes([...notes, { ...newNoteInput, id: newNoteId }]);
  };

  return { notes, createNewNote };
};
