"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import { MdArrowForward } from "react-icons/md";
import PartnersSlider from "@/components/PartnersSlider";
import GamesSlider from "@/components/GamesSlider";
import PodcastSlider from "@/components/PodcastSlider";
import EducationSlider from "@/components/EducationSlider";
import MusicSlider from "@/components/MusicSlider";
import VideoSlider from "@/components/VideoSlider";
import { title } from "process";
import DealsSlider from "@/components/DealsSlider";
import AdSlider from "@/components/AdSlider";
import { useRouter } from "next/navigation";
import PartnerHighlight from "@/components/PartnerHighlight";
import Billboard from "@/components/billboard";
import SectionHeader from "@/components/SectionHeader";
import BillboardV2 from "@/components/BillBoardV2";
import BillBoardV3 from "@/components/BillBoardV3";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
   const Router=useRouter();
    
     const onViewMoreClick = () =>{
      Router.push(`/viewMore/`)
    }

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
          <BillBoardV3/>
          {/* <VybzCarouselMain/> */}
          <div className="p-8 max-w-8xl mx-auto">
            {/* Partners Section */}
            <section className="">
                <SectionHeader title="partners" onViewMoreClick={onViewMoreClick}/>
              <PartnersSlider />
            </section>

            {/* Best Deals Section */}
            <section className=" py-4">
               <SectionHeader title="best deals 🔥" onViewMoreClick={onViewMoreClick}/>
              <DealsSlider/>
            </section>

            {/* Trending Section */}
            <section className="">
               <SectionHeader title="videos" onViewMoreClick={onViewMoreClick}/>
                  <VideoSlider />
            </section>

            {/* Recommended For You Section */}
            {/* <section className="">
               <SectionHeader title="recommended for you" onViewMoreClick={onViewMoreClick}/>
              <VideoSlider />
            </section> */}

            {/* partner highligh Section */}
            
            

            {/* Netflix Content Banner */}
            <div className="relative mt-4 w-full h-70 sm:h-70 md:h-100 lg:h-120 xl:h-120 rounded-lg overflow-hidden shadow-2xl">
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 rounded-xl shadow-2xl">
                <img
                  src="/images/bestNetflix.png"
                  alt="Netflix comedies showcase"
                  className="w-full h-full  object-fit"
                />
              </div>
            </div>

            {/* Recommended For You Section */}
            <section className=" py-4  ">
              <SectionHeader title="music" onViewMoreClick={onViewMoreClick}/>
              <MusicSlider />
            </section>

            {/* Trending Section */}
            <section className="py-4">
                <SectionHeader title="games" onViewMoreClick={onViewMoreClick}/>
              <GamesSlider />
            </section>

            {/*AD slider */}
           <AdSlider/>

            {/* Recommended For You Section */}
            <section className=" py-4  ">
                <SectionHeader title="education" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider />
            </section>
            {/* Recommended For You Section */}
            <section className=" py-4  ">
                <SectionHeader title="podcasts" onViewMoreClick={onViewMoreClick}/>
              <PodcastSlider />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
