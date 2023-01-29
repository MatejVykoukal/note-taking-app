import Head from "next/head";
import type { FC, ReactNode } from "react";
import GlobalModal from "../Modals/GlobalModal";
import Header from "../Navbar";

interface Props {
  children: ReactNode;
}

const CommonLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Note taking app</title>
      </Head>
      <Header />
      <main className="p-4">
        {children}
        <GlobalModal />
      </main>
    </>
  );
};

export default CommonLayout;
