import { type FC } from "react";
import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons";

import { signOut } from "next-auth/react";

const SignOutButton: FC = () => {
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        signOut();
      }}
      variant="default"
    >
      Logout <IconLogout height={16} />
    </Button>
  );
};

export default SignOutButton;
