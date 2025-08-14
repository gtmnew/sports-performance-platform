export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-green-400 to-orange-400">
      <div className="w-full">{children}</div>
    </main>
  );
}
