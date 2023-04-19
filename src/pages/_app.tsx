import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Header } from '@/components/shared/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Header />
    <Component {...pageProps} />
  </>);
}
