import Head from "next/head";
import React, { FC, ReactNode } from "react";
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
      <main>{children}</main>
    </>
  );
};

export default CommonLayout;
