import { Button, Paper, Title, Text, ActionIcon } from "@mantine/core";
import { IconPencilPlus, IconEdit, IconTrash } from "@tabler/icons";
import { type FC, useEffect } from "react";
import CommonLayout from "../Components/Layouts/CommonLayout";
import NotesListLayout from "../Components/Layouts/NotesListLayout";
import NoteCard from "../Components/NoteCard";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { useNotes } from "../hooks/useNotes";
import { getAllNotesFromLocalStorage } from "../services/notesLocalStorage";
import { ModalTypes } from "../types/modals";
import { areObjectEqual } from "../utils/comparsion";

const Notes: FC = () => {
  const { notesState, setAllNotes } = useNotes();
  const { openModal } = useGlobalModal();

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
              <NoteCard note={note} title={title} key={id} id={id} />
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
