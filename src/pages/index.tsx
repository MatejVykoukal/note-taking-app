import { Button } from "@mantine/core";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Note taking app</title>
      </Head>
      <main className="min-h-screen bg-gray-900 p-5 text-gray-200">
        <h1 className="text-2xl">Note taking app</h1>
        <Button className="mt-5" variant="outline">
          Add a note
        </Button>
      </main>
    </>
  );
};

export default Home;
