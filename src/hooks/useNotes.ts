import { useAtom } from "jotai";
import { notesList } from "../store/notesStore";
import { nanoid } from "nanoid";
import { saveNoteToLocalStorage } from "../services/notesLocalStorage";
import { Note } from "../types/notes";

interface NoteInput {
  title: string;
  note: string;
}

export const useNotes = () => {
  const [notesState, setNotesState] = useAtom(notesList);

  const createNewNote = (newNoteInput: NoteInput) => {
    const newNote = { ...newNoteInput, id: nanoid() };

    setNotesState([...notesState, newNote]);
    saveNoteToLocalStorage(newNote);
  };

  const setAllNotes = (notes: Note[]) => {
    setNotesState(notes);
  };

  return { notesState, setAllNotes, createNewNote };
};
