import { useAtom } from "jotai";
import { notesList } from "../store/notesStore";

export const useNotes = () => {
  const [notes, setNotes] = useAtom(notesList);

  const createNewNote = () => {
    const noteInput = prompt("Enter note:");

    const newNote = (noteInput ?? "").trim();

    if (!noteInput || !newNote.length)
      return alert("You didn't write your note. Try again.");

    setNotes([...notes, newNote]);
  };

  return { notes, createNewNote };
};
