"use client"
import { Button } from "@/components/ui/button";
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
import SectionHeader from "@/components/SectionHeader";

export default function viewMore(){
  const Router=useRouter();
      
       const onViewMoreClick = () =>{
       
        Router.push(`/viewMore/`)
  }
  
    return(
        <>
        <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
    
          <div className="p-8 max-w-8xl mx-auto">
            <section className="!mt-10 !pt-8">
                  <PartnerHighlight/>
            </section>
        
           

            {/* Trending Section */}
            <section className="mt-6">
              <SectionHeader title="trending" onViewMoreClick={onViewMoreClick}/>
               
                  <VideoSlider />
               
         
            </section>

            {/* Recommended For You Section */}
            <section className="">
               <SectionHeader title="videos" onViewMoreClick={onViewMoreClick}/>
              <VideoSlider />
            </section>

          
            {/* Recommended For You Section */}
            <section className=" py-4  ">
               <SectionHeader title="music" onViewMoreClick={onViewMoreClick}/>
              <MusicSlider />
            </section>

          
            {/* Recommended For You Section */}
            <section className=" py-4  ">
              <SectionHeader title="podcasts" onViewMoreClick={onViewMoreClick}/>
              <PodcastSlider />
            </section>

             <section className=" py-4  ">
              <SectionHeader title="education" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider />
            </section>
          </div>
        </main>
      </div>
        </>
    )
}