'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session);
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setIsLoggedIn(!!session);
        });

        return () => {
            authListener?.subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/auth/login');
    };

    return (
        <nav className="bg-gray-800 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/" className="text-xl font-bold">
                        Account Manager
                    </Link>

                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className={`${pathname === '/dashboard' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/account"
                                    className={`${pathname === '/account' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                                >
                                    Account
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="text-gray-300 hover:text-white"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className={`${pathname === '/auth/login' ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}