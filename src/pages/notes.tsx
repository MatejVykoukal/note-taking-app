import { Button, Paper, Title, Text, ActionIcon } from "@mantine/core";
import { IconPencilPlus, IconEdit, IconTrash } from "@tabler/icons";
import { type FC, useEffect } from "react";
import CommonLayout from "../Components/CommonLayout";
import NotesListLayout from "../Components/NotesListLayout";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { useNotes } from "../hooks/useNotes";
import { getAllNotesFromLocalStorage } from "../services/notesLocalStorage";
import { ModalTypes } from "../types/modals";
import { areObjectEqual } from "../utils/comparsion";

const Notes: FC = () => {
  const { openModal } = useGlobalModal();
  const { notesState, setAllNotes } = useNotes();

  useEffect(() => {
    const notesFromLocaleStorage = getAllNotesFromLocalStorage();
    if (areObjectEqual(notesFromLocaleStorage, notesState)) return;

    setAllNotes(notesFromLocaleStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommonLayout>
      <section className="container mx-auto mt-5">
        <Title className="mb-5" order={2}>
          All notes
        </Title>
        {notesState.length ? (
          <NotesListLayout>
            {notesState.map(({ note, title, id }) => (
              <Paper
                key={id}
                className="max-h-[300px] overflow-hidden"
                shadow="lg"
                p="md"
                withBorder
              >
                <div className="flex justify-between gap-10">
                  <Title order={3}>{title}</Title>
                  <div className="flex gap-2">
                    <ActionIcon aria-label="Edit note">
                      <IconEdit size={20} stroke={1} />
                    </ActionIcon>
                    <ActionIcon
                      aria-label="Delete note"
                      onClick={() =>
                        openModal({
                          modalType: ModalTypes.DELETE_NOTE,
                          payload: { deleteNoteId: id },
                        })
                      }
                    >
                      <IconTrash size={20} stroke={1} />
                    </ActionIcon>
                  </div>
                </div>
                <Text>{note}</Text>
              </Paper>
            ))}
          </NotesListLayout>
        ) : (
          <Text c="dimmed">
            No notes yet.
            <Button
              compact
              onClick={() => openModal({ modalType: ModalTypes.CREATE_NOTE })}
              variant="white"
            >
              Create your first note
              <IconPencilPlus height={16} />
            </Button>
          </Text>
        )}
      </section>
    </CommonLayout>
  );
};

export default Notes;
