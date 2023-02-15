import { Button, Modal, Text } from "@mantine/core";
import React from "react";
import { useGlobalModal } from "../../hooks/useGlobalModal";
// import { useNotes } from "../../hooks/useNotes";
import { api } from "../../utils/api";

interface Props {
  deleteNoteId: string;
}

const DeleteNoteModal: React.FC<Props> = ({ deleteNoteId }) => {
  const { closeAllModals } = useGlobalModal();
  // const { deleteNote } = useNotes();
  const utilsTrpc = api.useContext();
  const deleteNoteMutation = api.notes.deleteNote.useMutation({
    // When mutate is called:
    onMutate: async (deleteNoteId) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utilsTrpc.notes.getNotes.cancel();

      // Snapshot the previous value
      const previousNotes = utilsTrpc.notes.getNotes.getData();

      // Optimistically update to the new value
      utilsTrpc.notes.getNotes.setData(undefined, (prev) => {
        if (!prev) return previousNotes;
        return prev.filter((el) => el.id !== deleteNoteId.id);
      });

      // Return a context object with the snapshotted value
      return { previousNotes };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, deleteNoteId, context) => {
      if (!context) return;
      utilsTrpc.notes.getNotes.setData(undefined, () => context.previousNotes);
    },

    // Always refetch after error or success:
    onSettled: async () => {
      await utilsTrpc.notes.getNotes.invalidate();
      closeAllModals();
    },
  });

  const handleDeleteNote = () => {
    deleteNoteMutation.mutate({ id: deleteNoteId });
  };
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
        <Button
          onClick={() => {
            // deleteNote(deleteNoteId);
            handleDeleteNote();
          }}
          size="xs"
          variant="outline"
          color="red"
        >
          Delete
        </Button>
        <Button onClick={closeAllModals} size="xs" variant="outline">
          No, don&apos;t delete it
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteNoteModal;
