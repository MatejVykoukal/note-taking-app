import Head from "next/head";
import type { FC, ReactNode } from "react";
import GlobalModal from "./GlobalModal";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const CommonLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Note taking app</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>
        {children}
        <GlobalModal />
      </main>
    </>
  );
};

export default CommonLayout;
