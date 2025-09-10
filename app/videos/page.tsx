"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import { MdArrowForward } from "react-icons/md";
import PartnersSlider from "@/components/PartnersSlider";
import VideoSlider from "@/components/VideoSlider";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";

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
          <VybzCarouselMain />
          <div className="p-2 md:p-4 lg:p-4 max-w-8xl mx-auto">
            {/* Partners Section */}
            <section className="">
                <SectionHeader title="partners" onViewMoreClick={onViewMoreClick}/>
              <PartnersSlider />
            </section>


            {/* Trending Section */}
            <section className="">
                <SectionHeader title="trending" onViewMoreClick={onViewMoreClick}/>
               
                  <VideoSlider />
               
         
            </section>

            {/* Recommended For You Section */}
            <section className="">
                <SectionHeader title="recommended for you" onViewMoreClick={onViewMoreClick}/>
              <VideoSlider />
            </section>


            {/* Recommended For You Section */}
            <section className=" py-4  ">
                <SectionHeader title="drama" onViewMoreClick={onViewMoreClick}/>
              <VideoSlider />
            </section>


            {/* Recommended For You Section */}
            <section className=" py-4  ">
                <SectionHeader title="comedy" onViewMoreClick={onViewMoreClick}/>
              <VideoSlider />
            </section>
           
          </div>
        </main>
      </div>
    </>
  );
}
