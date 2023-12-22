"use client"
import { ReactNode } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { usePathname, useRouter } from 'next/navigation';
import '@/assets/css/navigation.css';
import Link from 'next/link';

interface NavbarProps {
    children: ReactNode;
}
export default function Navbar({ children }: NavbarProps): JSX.Element {
    const router = useRouter()

    function logout() {
        document.cookie = "access_token=; max-age=0; path=/";
        router.push('/login');
    }

    const currentPath = usePathname();
    if (currentPath === '/login' || currentPath === '/register') {
        return <>{children}</>;
    }
    return (
        <main className='flex min-h-screen flex-col'>
            <nav className='flex justify-between px-4 h-14 items-center bg-slate-900 text-white'>
                <Link href={'/'}><b>GitHub</b> Jobs</Link>
                <button onClick={logout} className='hover:bg-slate-700   0 p-1 rounded'><LogoutIcon /></button>
            </nav>
            {children}
        </main>
    );
}
