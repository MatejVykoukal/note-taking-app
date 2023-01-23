import { Title, Button, Header as HeaderManite } from "@mantine/core";
import { IconPencil, IconPencilPlus } from "@tabler/icons";
import Link from "next/link";
import { useGlobalModal } from "../hooks/useGlobalModal";
import { ModalTypes } from "../types/modals";

const Header: React.FC = () => {
  const { openModal } = useGlobalModal();

  return (
    <HeaderManite p="md" height={69}>
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Title className="flex items-center gap-1" order={1} size="h2">
            <IconPencil /> Note.it
          </Title>
        </Link>
        <Button
          onClick={() => openModal({ modalType: ModalTypes.CREATE_NOTE })}
          variant="outline"
        >
          Add a note
          <IconPencilPlus height={16} />
        </Button>
      </div>
    </HeaderManite>
  );
};

export default Header;
