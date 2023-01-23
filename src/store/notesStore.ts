import { atom } from "jotai";
import type { Note } from "../types/notes";

export const notesList = atom<Note[]>([]);
