import { useAtom } from "jotai";
import { notesList } from "../store/notesStore";
import { nanoid } from "nanoid";
import {
  saveAllNotesToLocalStorage,
  saveNoteToLocalStorage,
} from "../services/notesLocalStorage";

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

  const deleteNote = (deleteNoteId: string) => {
    const newNotesState = notesState.filter((note) => note.id !== deleteNoteId);

    setNotesState(newNotesState);
    saveAllNotesToLocalStorage(newNotesState);
  };

  return {
    notesState,
    setAllNotes: setNotesState,
    createNewNote,
    deleteNote,
  };
};
