import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { Loader } from "@mantine/core";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      void router.push("/signin");
    }
  }, [status]);

  const renderProtectedPage = () => {
    if (status === "loading") {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader color="gray" />
        </div>
      );
    } 
    if(status === "authenticated") {
        return children;
    }
  };

  return <>{renderProtectedPage()}</>;
};

export default ProtectedRoute;
