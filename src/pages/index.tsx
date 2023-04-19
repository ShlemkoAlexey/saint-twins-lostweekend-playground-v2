import Head from 'next/head';
import { MainPage } from '@/components/pages/MainPage/MainPage';

export default function Home() {
  return (
    <>
      <Head>
        <title>Lost weekend</title>
      </Head>
      <MainPage />
    </>
  );
}
