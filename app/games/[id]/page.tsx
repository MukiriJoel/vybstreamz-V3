"use client";
import React from 'react';
import {useParams, useSearchParams} from 'next/navigation';
import Gamedetails from './GameDetails';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    // const id: any = searchParams.get('id');
    const id: any = params.id;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f2f2f2] dark:bg-[#121212]">
            <header className="w-full">
                <NavBar/>
            </header>
            <main className="w-full min-h-screen">
                <Gamedetails videoSrc={'/videos/squid_game.mp4'} id={id}/>
            </main>
            {/* <Footer/> */}
        </div>
        
    );
};

export default Page;