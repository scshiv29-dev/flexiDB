import { Header } from "@flexidb/ui";
import "./globals.css";
import { AuthProvider } from "@flexidb/ui";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>FlexiDB</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <AuthProvider>
        <body>
          <Header />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
