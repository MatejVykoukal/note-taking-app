import { Paper, Title, ActionIcon, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import type { FC } from "react";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { ModalTypes } from "../types/modals";

interface Props {
  title: string;
  note: string;
  id: string;
}

const NoteCard: FC<Props> = ({ title, note, id }) => {
  const { openModal } = useGlobalModal();

  return (
    <Paper
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
  );
};

export default NoteCard;
