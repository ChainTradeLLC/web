import '../globals.scss';
import AuthProvider from '@/app/providers/auth';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'authenticated') {
//       router.push('/dashboard');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

  return <div className="min-h-screen flex items-center justify-center">
    <AuthProvider>
    {children}
    </AuthProvider>
    </div>;
}