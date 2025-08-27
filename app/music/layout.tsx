"use client";
import React, {ReactNode} from 'react';
import Head from 'next/head';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
    children: ReactNode;
}

const MusicLayout = ({children}: AuthLayoutProps) => {
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F2] dark:bg-[#141414] dark:bg-[#121212]">
            <Head>
                <title>Music</title>
                <meta name="description" content="music page"/>
            </Head>
            <header className="w-full">
                <NavBar/>
            </header>
            <main className="w-full mx-auto bg-[#F2F2F2] dark:bg-[#141414] min-h-[100vh]">
                {children}
            </main>
       
            <Footer/>
        </div>
    );
};

export default MusicLayout;
