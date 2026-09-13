import './globals.css';
import './investigation.css';
import './chapter1.css';

export const metadata = {
  title: 'NULL//HOME Prototype',
  description: 'MIRAGE OS prototype',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
