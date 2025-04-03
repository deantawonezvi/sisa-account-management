'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {user ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>

                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                        <h3 className="text-lg font-medium mb-2">Your account information:</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Account created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>

                    <div className="flex space-x-4">
                        <Link
                            href="/account"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                        >
                            Account Settings
                        </Link>
                        <Link
                            href="/account/delete"
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                        >
                            Delete Account
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md">
                    <p>You are not logged in. Please <Link href="/auth/login" className="text-blue-500 hover:underline">login</Link> to view your dashboard.</p>
                </div>
            )}
        </div>
    );
}