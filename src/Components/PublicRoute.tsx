import { type FC, type ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Loader } from "@mantine/core";

interface Props {
  children: ReactNode;
}
const PublicRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status == "authenticated") {
      void router.push("/notes");
    }
  }, [status, router]);

  const renderPublicRoute = () => {
    if (status === "loading") {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader color="gray" />
        </div>
      );
    }
    if (status === "unauthenticated") {
      return children;
    }
  };
  return <>{renderPublicRoute()}</>;
};

export default PublicRoute;
