import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import BlockMain from "../components/Blocks/BlockMain";
import { signIn, useSession } from "next-auth/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Loch</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session ? (
        <button onClick={() => signIn}>Sign In</button>
      ) : (
        <Layout>
          <BlockMain />
        </Layout>
      )}
    </>
  );
};

export default Home;
