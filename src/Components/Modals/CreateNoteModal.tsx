import { Modal, TextInput, Textarea, Button } from "@mantine/core";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  NOTE_CONTENT_LENGHT_LIMIT,
  NOTE_TITLE_LENGHT_LIMIT,
} from "../../constants/notes";
import { IconLoader2 } from "@tabler/icons";

import { useGlobalModal } from "../../hooks/useGlobalModal";
// import { useNotes } from "../../hooks/useNotes";
import { api } from "../../utils/api";
import { isStringEmpty } from "../../utils/string";

const CreateNoteModal = () => {
  const { closeAllModals } = useGlobalModal();
  // const { createNewNote } = useNotes();

  const [title, setTitle] = useState({ value: "", validationError: "" });
  const [note, setNote] = useState({ value: "", validationError: "" });
  const utilsTrpc = api.useContext()

  const { data: session } = useSession();
  const userId: string = session?.user?.id || "";

  const createNoteMutation = api.notes.createNote.useMutation({
    onSuccess: () => {
      void utilsTrpc.invalidate(["notes", "getNotes"]);
    }
  });

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

    if (note.validationError || title.validationError) shouldSave = false;

    return shouldSave;
  };

  const handleSaveNote = () => {
    const shouldSave = handleValidationErrors();

    if (!shouldSave) return;

    createNoteMutation.mutate({ title: title.value, note: note.value, userId });
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

    if (title.value.length >= NOTE_TITLE_LENGHT_LIMIT) {
      setTitle({
        ...title,
        validationError: `You exceeded the title lenght limit of ${NOTE_TITLE_LENGHT_LIMIT} characters. Please make the title shorter :)`,
      });
    }

    if (note.value.length >= NOTE_CONTENT_LENGHT_LIMIT) {
      setNote({
        ...note,
        validationError: `You exceeded the note lenght limit of ${NOTE_CONTENT_LENGHT_LIMIT} characters. Please make the note content shorter :)`,
      });
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
          rightSection={
            <span
              className={classNames(
                "absolute right-1 min-w-max text-xs text-gray-400",
                {
                  "text-red-400": title.value.length >= NOTE_TITLE_LENGHT_LIMIT,
                }
              )}
            >
              {`${title.value.length}/${NOTE_TITLE_LENGHT_LIMIT}`}
            </span>
          }
        />
        <div className="relative">
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
          <span
            className={classNames(
              "absolute right-1 bottom-1 min-w-max bg-[#25262b] p-1 text-xs text-gray-400",
              {
                "text-red-400": note.value.length >= NOTE_CONTENT_LENGHT_LIMIT,
              }
            )}
          >
            {`${note.value.length}/${NOTE_CONTENT_LENGHT_LIMIT}`}
          </span>
        </div>
        <div className="flex justify-end gap-5">
          <Button onClick={handleSaveNote} size="xs" variant="outline">
              {
                createNoteMutation.isLoading && <IconLoader2 height={12} />
              }
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
