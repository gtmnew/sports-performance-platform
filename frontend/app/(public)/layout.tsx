import { ThemeProvider } from 'next-themes';

export default async function PublicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <div className="px-4">{children}</div>
    </main>
  );
}
