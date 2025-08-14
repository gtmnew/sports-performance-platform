import { QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { queryClient } from '@/lib/react-query/react-query';
import { ReactQueryProvider } from './providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'SportsFisio Pro',
  description: 'Sports software',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark" style={{ colorScheme: 'dark' }}>
      <body>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
