import Head from 'next/head';
import NavBar from "@/components/NavBar"
import { ReactNode } from 'react';
import NavBarMini from '@/components/NavBarMini';
import Sidebar from '@/app/parts/sidebar';
import Footer from '@/components/Footer';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function HomePage({children}: AuthLayoutProps) {
  return (
     <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F2F2F2] dark:bg-[#141414] dark:bg-[#121212]">
            <Head>
                <title>Profile</title>
                <meta name="description" content="Authentication page"/>
            </Head>
            <header className="w-full flex justify-end">
                <NavBarMini/>
            </header>
             <Sidebar />
            <main className="mx-auto bg-[#F2F2F2] dark:bg-[#141414] min-h-[100vh] flex-1 lg:ml-64 pt-5 lg:pt-19.5">
                
                {children}
                {/* <Footer/> */}
            </main>
            
        </div>
  )
}
