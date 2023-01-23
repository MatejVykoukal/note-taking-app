import { useAtom } from "jotai";
import { modalAtom } from "../store/modalStore";
import CreateNoteModal from "./CreateNoteModal";

const GlobalModal = () => {
  const [{ modalType }] = useAtom(modalAtom);

  if (!modalType) return null;

  // TODO: Implement real modals
  const renderDesiredModalComponent = () => {
    switch (modalType) {
      case "CREATE_NOTE":
        return <CreateNoteModal />;
      case "DELETE_NOTE":
        return modalType;
      case "EDIT_NOTE":
        return modalType;
    }
  };

  return <>{renderDesiredModalComponent()}</>;
};

export default GlobalModal;
