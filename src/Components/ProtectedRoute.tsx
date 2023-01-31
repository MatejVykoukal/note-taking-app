import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { Loader } from "@mantine/core";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      void router.push("/signin");
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    }
  }, [status]);

  const renderProtectedPage = () => {
    if (isLoading) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader color="gray" />
        </div>
      );
    } else {
      return children;
    }
  };

  return <>{renderProtectedPage()}</>;
};

export default ProtectedRoute;
