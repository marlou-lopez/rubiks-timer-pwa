import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import { ThemeProvider } from 'next-themes';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>solb</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" forcedTheme="dark">
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
