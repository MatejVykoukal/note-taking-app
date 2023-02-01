import { useEffect, type FC } from "react";
import { Title } from "@mantine/core";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IconUserPlus, IconBrandDiscord } from "@tabler/icons";
import { Loader } from "@mantine/core";

const SignIn: FC = () => {
  const { status } = useSession();
  const router = useRouter();

  const handleSignIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    void signIn("discord", {
      callbackUrl: "/notes",
    });
  };

  useEffect(() => {
    if (status == "authenticated") {
      void router.push("/notes");
    }
  }, [status]);

  const renderSignInPage = () => {
    if (status === "authenticated") {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader color="gray" />
        </div>
      );
    }
    if (status === "unauthenticated") {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="flex flex-1 flex-col items-center justify-center text-white">
            <IconUserPlus width={32} height={32} />
            <br />
            <Title order={1}>Sign in to your account</Title>
            <div className="mt-12">
              <button
                onClick={handleSignIn}
                className="flex h-8 w-72 items-center gap-6 border border-indigo-500 p-6 shadow-lg shadow-indigo-500/50"
              >
                <IconBrandDiscord
                  className="text-indigo-500"
                  width={24}
                  height={24}
                />
                <span className="font-medium">Continue with Discord</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{renderSignInPage()}</>;
};

export default SignIn;
