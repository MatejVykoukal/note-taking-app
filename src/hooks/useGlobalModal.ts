import { useAtom } from "jotai";
import { modalAtom } from "../store/modalStore";
import type { ModalTypes } from "../types/modals";

export const useGlobalModal = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setModalStore] = useAtom(modalAtom);

  const openModal = (modalType: ModalTypes) => {
    setModalStore({ modalType });
  };

  const closeAllModals = () => {
    setModalStore({});
  };

  return { openModal, closeAllModals };
};
