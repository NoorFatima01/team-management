import * as React from 'react';

import '@/styles/globals.css';

import { cn } from '@/lib/utils';

import { ProgressBar } from '@/components/progress-bar';
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
      <head>
        <title>TeamManager</title>
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ProgressBar className='fixed top-4 h-3 bg-yellow-300 z-1000'>
          <ReactQueryProviders>
            <TooltipProvider>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
              >
                {children}
                <Toaster />
                <TailwindIndicator />
              </ThemeProvider>
            </TooltipProvider>
          </ReactQueryProviders>
        </ProgressBar>
      </body>
    </html>
  );
}
