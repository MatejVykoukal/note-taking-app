import { atom } from "jotai";

interface Note {
  note: string;
  title: string;
  id: string;
}

export const notesList = atom<Note[]>([]);
