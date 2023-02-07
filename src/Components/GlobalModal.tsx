import { useAtom } from "jotai";
import { modalAtom } from "../store/modalStore";
import { ModalTypes } from "../types/modals";
import CreateNoteModal from "./CreateNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";
import EditNoteModal from "./EditNoteModal";

const GlobalModal = () => {
  const [modalState] = useAtom(modalAtom);

  if (!modalState?.modalType) return null;

  // TODO: Implement real modals
  const renderDesiredModalComponent = () => {
    switch (modalState?.modalType) {
      case ModalTypes.CREATE_NOTE:
        return <CreateNoteModal />;
      case ModalTypes.DELETE_NOTE:
        const { deleteNoteId } = modalState.payload;
        return <DeleteNoteModal deleteNoteId={deleteNoteId} />;
      case ModalTypes.EDIT_NOTE:
        const { title, notes} = modalState.payload;
        return <EditNoteModal {...modalState.payload} />;
      default:
        return null;
    }
  };

  return <>{renderDesiredModalComponent()}</>;
};

export default GlobalModal;
