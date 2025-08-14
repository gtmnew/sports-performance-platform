import { Toaster } from 'sonner';
import ClientSidebarProvider from '../providers/SiderBarProvider';
import AppSidebar from '../components/AppSideBar';
import Navbar from '../components/Navbar';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <ClientSidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <Navbar />
          <div className="p-4">{children}</div>
        </main>
      </ClientSidebarProvider>
      <Toaster richColors position="top-right" theme="dark" closeButton />
    </div>
  );
}
