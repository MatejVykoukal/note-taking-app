import { Button, Title, Text, Loader } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import { type FC } from "react";
import CommonLayout from "../Components/Layouts/CommonLayout";
import NotesListLayout from "../Components/Layouts/NotesListLayout";
import NoteCard from "../Components/NoteCard";
import ProtectedRoute from "../Components/ProtectedRoute";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { ModalTypes } from "../types/modals";
import { api } from "../utils/api";

const Notes: FC = () => {
  // const { notesState, setAllNotes } = useNotes();
  const { openModal } = useGlobalModal();

  const { data, status } = api.notes.getNotes.useQuery();

  if (status === "loading") {
    <>
      <Loader color="gray" />
    </>;
  }

  if (status === "error") {
    <>
      <span>Something went wrong</span>
    </>;
  }
  // useEffect(() => {
  //   const notesFromLocaleStorage = getAllNotesFromLocalStorage();
  //   if (areObjectEqual(notesFromLocaleStorage, notesState)) return;

  //   setAllNotes(notesFromLocaleStorage);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ProtectedRoute>
      <CommonLayout>
        <section className="container mx-auto mt-5">
          <Title className="mb-5" order={2}>
            All notes
          </Title>
          {data?.length ? (
            <NotesListLayout>
              {data.map(({ note, title, id }) => (
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
    </ProtectedRoute>
  );
};

export default Notes;
