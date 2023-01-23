import { atom } from "jotai";
import type { ModalTypes } from "../types/modals";

interface ModalStore {
  modalType: ModalTypes;
}

export const modalAtom = atom<Partial<ModalStore>>({});
