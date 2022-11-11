/* eslint-disable @next/next/no-head-element */
import '$styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>Kudoku Layout</h1>
      <main>{children}</main>
    </>
  );
}
