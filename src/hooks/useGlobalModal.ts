import { useAtom } from "jotai";
import { modalAtom } from "../store/modalStore";
import { type ModalStoreTypes } from "../types/modals";

export const useGlobalModal = () => {
  const [, setModalStore] = useAtom(modalAtom);

  const openModal = (modalState: ModalStoreTypes) => {
    setModalStore(modalState);
  };

  const closeAllModals = () => {
    setModalStore(null);
  };

  return { openModal, closeAllModals };
};
