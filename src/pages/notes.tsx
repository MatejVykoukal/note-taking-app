import { Button, Paper, Title, Text } from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons";
import type { FC } from "react";
import CommonLayout from "../Components/CommonLayout";
import { useNotes } from "../hooks/useNotes";

const Notes: FC = () => {
  const { notes, createNewNote } = useNotes();

  return (
    <CommonLayout>
      <section className="container mx-auto mt-5">
        <Title className="mb-5" order={2}>
          All notes
        </Title>
        {notes.length ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <Paper
                key={index}
                className="max-h-max overflow-hidden"
                shadow="lg"
                p="md"
                withBorder
              >
                <Text>{note}</Text>
              </Paper>
            ))}
          </div>
        ) : (
          <Text c="dimmed">
            No notes yet.
            <Button compact onClick={createNewNote} variant="white">
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
