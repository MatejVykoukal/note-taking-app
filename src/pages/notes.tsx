import { Button, Paper, Title, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import type { FC } from "react";
import CommonLayout from "../Components/CommonLayout";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { useNotes } from "../hooks/useNotes";

const Notes: FC = () => {
  const { openModal } = useGlobalModal();
  const { notes } = useNotes();

  return (
    <CommonLayout>
      <section className="container mx-auto mt-5">
        <Title className="mb-5" order={2}>
          All notes
        </Title>
        {notes.length ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map(({ note, title, id }) => (
              <Paper
                key={id}
                className="max-h-max overflow-hidden"
                shadow="lg"
                p="md"
                withBorder
              >
                <Title order={3}>{title}</Title>
                <Text>{note}</Text>
              </Paper>
            ))}
          </div>
        ) : (
          <Text c="dimmed">
            No notes yet.
            <Button
              compact
              onClick={() => openModal("CREATE_NOTE")}
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
