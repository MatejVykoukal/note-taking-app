import { Modal, TextInput, Textarea, Button } from "@mantine/core";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  NOTE_CONTENT_LENGHT_LIMIT,
  NOTE_TITLE_LENGHT_LIMIT,
} from "../../constants/notes";
import { IconLoader2 } from "@tabler/icons";

import { useGlobalModal } from "../../hooks/useGlobalModal";
import { api } from "../../utils/api";
import { isStringEmpty } from "../../utils/string";
import type { Note } from "../../types/notes";

const CreateNoteModal = () => {
  const { closeAllModals } = useGlobalModal();

  const [title, setTitle] = useState({ value: "", validationError: "" });
  const [note, setNote] = useState({ value: "", validationError: "" });
  const utilsTrpc = api.useContext();

  const createNoteMutation = api.notes.createNote.useMutation({
    onMutate: async ({ title, note }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await utilsTrpc.notes.getNotes.cancel();

      // Snapshot the previous value
      const previousNotes = utilsTrpc.notes.getNotes.getData();

      // Optimistically update to the new value
      utilsTrpc.notes.getNotes.setData(undefined, (prev) => {
        const optimisticNote: Note = {
          id: "opt-note-id",
          title: title,
          note: note,
          userId: "opt-user-id",
        };
        if (!prev) return [optimisticNote];
        return [...prev, optimisticNote];
      });

      // Reset state
      setNote({ value: "", validationError: "" });
      setTitle({ value: "", validationError: "" });

      // Return a context object with the snapshotted value
      return { previousNotes };
    },

    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, { title, note }, context) => {
      // Reset state
      setNote({ value: note, validationError: "" });
      setTitle({ value: title, validationError: "" });

      if (!context) return;
      utilsTrpc.notes.getNotes.setData(undefined, () => context.previousNotes);
    },

    // Always refetch after error or success:
    onSettled: async () => {
      await utilsTrpc.notes.getNotes.invalidate();
      closeAllModals();
    },
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

    createNoteMutation.mutate({ title: title.value, note: note.value });
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
            {createNoteMutation.isLoading && <IconLoader2 height={12} />}
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
