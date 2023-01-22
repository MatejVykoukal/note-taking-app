import { Title, Button, Header } from "@mantine/core";
import { IconPencil, IconPencilPlus } from "@tabler/icons";
import Link from "next/link";
import React from "react";
import { useNotes } from "../hooks/useNotes";

const Navbar: React.FC = () => {
  const { createNewNote } = useNotes();

  return (
    <Header p="md" height={69}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Title className="flex items-center gap-1" order={1} size="h2">
            <IconPencil /> Note.it
          </Title>
        </Link>
        <Button onClick={createNewNote} variant="outline">
          Add a note
          <IconPencilPlus height={16} />
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
