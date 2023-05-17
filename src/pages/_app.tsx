import { UserProvider } from '@auth0/nextjs-auth0/client';
import { type AppType } from 'next/dist/shared/lib/utils';

import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Layout from '../components/Layout';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(fas);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default MyApp;
