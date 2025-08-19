"use client";
import React, {ReactNode} from 'react';
import Head from 'next/head';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
    children: ReactNode;
}


const ProfileLayout = ({children}: AuthLayoutProps) => {
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-[#121212]">
            <Head>
                <title>Partners</title>
                <meta name="description" content="Authentication page"/>
            </Head>
            <header className="w-full">
                <NavBar/>
            </header>
            <main className="w-full max-w-8xl mx-auto px-6 sm:px-6 lg:px-8 py-8 bg-[#f2f2f2] min-h-[100vh]">
                {children}
            </main>
       
            <Footer/>
        </div>
    );
};

export default ProfileLayout;
