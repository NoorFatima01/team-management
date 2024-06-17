import * as React from 'react';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

import ReactQueryProviders from '@/components/react-query-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ReactQueryProviders>
          <TooltipProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
              {children}
              <Toaster />
              <TailwindIndicator />
            </ThemeProvider>
          </TooltipProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
