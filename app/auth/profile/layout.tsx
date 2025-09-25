"use client";
import React, {ReactNode} from 'react';
import Head from 'next/head';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import NavBarMini from '@/components/NavBarMini';
import { withAuth } from '@/lib/helpers/withAuth';

interface AuthLayoutProps {
    children: ReactNode;
}


const ProfileLayout = ({children}: AuthLayoutProps) => {
    

    return (
        <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#F2F2F2] dark:bg-[#141414] dark:bg-[#121212]">
            <Head>
                <title>Profile</title>
                <meta name="description" content="Authentication page"/>
            </Head>
            <header className="w-full flex justify-end">
                <NavBarMini/>
            </header>
            <main className="w-full max-w-full mx-auto bg-[#F2F2F2] dark:bg-[#141414] min-h-[100vh]">
                {children}
                  
            </main>
            <div className='w-screen lg:w-[calc(98vw-256px)] mx-auto bg-[#F2F2F2] dark:bg-[#141414] flex-1 lg:ml-64 pt-5 lg:pt-19.5"'>
               <Footer/>
            </div>
    
        </div>
    );
};

export default withAuth(ProfileLayout) ;
