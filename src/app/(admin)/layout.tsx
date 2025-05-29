import type { Metadata } from 'next';
import '../globals.scss';
import AuthProvider from '@/src/app/providers/auth';
import { cn } from '@/src/app/lib/utils';

// export const metadata: Metadata = {
//   title:
//     'ADMIN ~ Penetration Testing | Security Testing | Pen Testing | Sxipher',
//   description:
//     'Trust Sxipher with penetration testing, security testing, ransomware protection, and more. Learn more now!',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="">
    <AuthProvider>
    {children}
    </AuthProvider>
    </div>
  );
}