import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Header } from '@/components/shared/Header';
import { styled } from '@mui/system';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PageWrapper>
        <Header />
        <Component {...pageProps} />
      </PageWrapper>
    </>
  );
}

export const PageWrapper = styled('div')`
  min-height: 100vh;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    opacity: 0.3;
    z-index: -1;

    background-image: url('/back.png');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
