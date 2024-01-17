import { ThemeProvider } from '@/components/ThemeProvider';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import React, { PropsWithChildren } from 'react';
import Head from 'next/head';

import Header from './Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <Head>
        <title>Finance Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative h-screen overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-col md:space-y-4">
            <Header />
            <div className="h-screen overflow-auto px-4 pb-24 md:px-6">{children}</div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default withPageAuthRequired(Layout);
