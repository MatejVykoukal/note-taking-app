import { atom } from "jotai";
import type { ModalStoreTypes } from "../types/modals";

export const modalAtom = atom<ModalStoreTypes | null>(null);
