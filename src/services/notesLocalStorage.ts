import { useLocalStorage } from "@mantine/hooks";
import type { Note } from "../types/notes";

enum LocalStorageKey {
  NOTES = "notes",
}

export const saveNoteToLocalStorage = (note: Note) => {
  const notesFromLocalStorage = JSON.parse(
    localStorage.getItem(LocalStorageKey.NOTES) ?? "[]"
  ) as Note[];

  const updatedNotes = [...notesFromLocalStorage, note];

  localStorage.setItem(LocalStorageKey.NOTES, JSON.stringify(updatedNotes));
};

export const getAllNotesFromLocalStorage = () => {
  if (typeof window === "undefined") return [];

  return JSON.parse(
    localStorage.getItem(LocalStorageKey.NOTES) ?? "[]"
  ) as Note[];
};
