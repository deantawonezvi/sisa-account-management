import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from "@/components/Navbar";
import './globals.css';
import ThemeProvider from "@/app/theme/ThemeProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Sisa@Law',
    description: 'Sisa@Law',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ThemeProvider>
            <Navbar />
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}