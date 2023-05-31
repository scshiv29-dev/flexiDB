import { Header } from '@flexidb/ui';
import './globals.css';
import {AuthProvider} from "@flexidb/ui"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     <AuthProvider>
      <body>
      <Header  />
        {children}
        </body>
        </AuthProvider>
    </html>
  );
}
