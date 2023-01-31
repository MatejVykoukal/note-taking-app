import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, useEffect, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      void router.push("/signin");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
