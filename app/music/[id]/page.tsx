"use client";
import React from 'react';
import {useParams, useSearchParams} from 'next/navigation';
import MusicPlayer from './music-view';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import MusicView from './music-view';

const Page = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    // const id: any = searchParams.get('id');
    const id: any = params.id;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F2] dark:bg-[#141414] dark:bg-[#121212]">
            <header className="w-full">
                <NavBar/>
            </header>
            <main className="w-full min-h-screen">
                <MusicView id={id} bannerImage='/images/sandwich2.jpg'  albumImage="/images/kodong.png" title = "Disko" subtitle = "Kodong Klan"   albumInfo = "Album • 1hr 45min • 10 Songs • Hiphop" audioSrc={"/audio/podcast.mp3"}   platformLogo="/logos/bazeLg.png"/>
            </main>
            {/* <Footer/> */}
        </div>
        
    );
};

export default Page;