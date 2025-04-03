'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AccountPage() {
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
            <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

            {user ? (
                <>
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-xl font-semibold mb-4">Account Information</h2>

                        <div className="mb-4">
                            <p className="text-gray-700 mb-1">Email:</p>
                            <p className="font-medium">{user.email}</p>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-700 mb-1">Account created:</p>
                            <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Account Management</h2>

                        <div className="space-y-4">
                            <div className="border-t pt-4">
                                <h3 className="text-lg font-medium mb-2 text-red-600">Danger Zone</h3>
                                <p className="text-gray-600 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <Link
                                    href="/account/delete"
                                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 inline-block"
                                >
                                    Delete Account
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-md">
                    <p>You are not logged in. Please <Link href="/auth/login" className="text-blue-500 hover:underline">login</Link> to view your account settings.</p>
                </div>
            )}
        </div>
    );
}