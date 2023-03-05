/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { SWRConfig } from 'swr';

import defaultSEOConfig from '../../next-seo.config';
import { Chakra } from '~/lib/components/Chakra';
import Layout from '~/lib/layout';

import '~/lib/styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Chakra>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <DefaultSeo {...defaultSEOConfig} />
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => {
              if (res.status >= 404) {
                throw new Error('An error occurred while fetching the data.');
              }
              return res.json();
            }),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Chakra>
  );
};

export default MyApp;
