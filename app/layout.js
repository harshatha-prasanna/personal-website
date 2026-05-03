import './globals.css';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Harshatha Prasanna',
  description: 'Data Science student at UC San Diego. Interested in explainable AI, GTM, and AI automations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-background text-ink font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
