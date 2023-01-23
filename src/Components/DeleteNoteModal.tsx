import { Button, Modal, Text } from "@mantine/core";
import React from "react";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { useNotes } from "../hooks/useNotes";

interface Props {
  deleteNoteId: string;
}

const DeleteNoteModal: React.FC<Props> = ({ deleteNoteId }) => {
  const { closeAllModals } = useGlobalModal();
  const { deleteNote } = useNotes();

  return (
    <Modal
      centered
      opened={true}
      overlayBlur={3}
      onClose={closeAllModals}
      title="Delete this note"
    >
      <Text>Are you sure you want to delete this note?</Text>
      <div className="mt-5 flex justify-end gap-5">
        <Button onClick={closeAllModals} size="xs" variant="outline">
          No, don&apos;t delete it
        </Button>
        <Button
          onClick={() => {
            deleteNote(deleteNoteId);
            closeAllModals();
          }}
          size="xs"
          variant="outline"
          color="red"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
