import * as React from 'react';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
