import { Modal, TextInput, Textarea, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useGlobalModal } from "../../hooks/useGlobalModal";
import { useNotes } from "../../hooks/useNotes";
import { isStringEmpty } from "../../utils/string";

const CreateNoteModal = () => {
  const { closeAllModals } = useGlobalModal();
  const { createNewNote } = useNotes();

  const [title, setTitle] = useState({ value: "", validationError: "" });
  const [note, setNote] = useState({ value: "", validationError: "" });

  const handleValidationErrors = () => {
    let shouldSave = true;

    if (isStringEmpty(title.value)) {
      setTitle({
        ...title,
        validationError: "Please enter title before save",
      });
      shouldSave = false;
    }

    if (isStringEmpty(note.value)) {
      setNote({
        ...note,
        validationError: "Please enter note before save",
      });
      shouldSave = false;
    }

    return shouldSave;
  };

  const handleSaveNote = () => {
    const shouldSave = handleValidationErrors();

    if (!shouldSave) return;

    createNewNote({ note: note.value, title: title.value });
    closeAllModals();
  };

  useEffect(() => {
    // Clear previous errors when user types into fields
    if (!isStringEmpty(title.value) && title.validationError) {
      setTitle({ ...title, validationError: "" });
    }

    if (!isStringEmpty(note.value) && note.validationError) {
      setNote({ ...note, validationError: "" });
    }
  }, [title, note]);

  return (
    <Modal
      centered
      opened={true}
      overlayBlur={3}
      onClose={closeAllModals}
      title="Create new note"
    >
      <div className="flex flex-col gap-5">
        <TextInput
          placeholder="Add title here"
          value={title.value}
          error={title.validationError}
          onChange={(e) => setTitle({ ...title, value: e.target.value })}
          label="Title"
          withAsterisk
        />
        <Textarea
          placeholder="Add note here"
          value={note.value}
          onChange={(e) => setNote({ ...note, value: e.target.value })}
          label="Note"
          error={note.validationError}
          withAsterisk
          autosize
          minRows={3}
          maxRows={10}
        />
        <div className="flex justify-end gap-5">
          <Button onClick={handleSaveNote} size="xs" variant="outline">
            Save
          </Button>
          <Button
            onClick={closeAllModals}
            size="xs"
            variant="outline"
            color="red"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNoteModal;
