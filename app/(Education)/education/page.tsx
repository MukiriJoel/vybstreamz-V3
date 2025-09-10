"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import PartnersSlider from "@/components/PartnersSlider";
import { MdArrowForward } from "react-icons/md";
import EducationSlider from "@/components/EducationSlider";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const contentTabs = ["E-Book", "Audio Book"];
  const Router=useRouter();
  
  const onViewMoreClick = () =>{
   
    Router.push(`/viewMore/`)
  }

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Main Content */}
        <main className="">
          {/* Hero Section */}
          <VybzCarouselMain />

          <div className="p-2 md:p-4 lg:p-4 max-w-8xl mx-auto">
            {/* Partners Section */}
            <div className="">
              <SectionHeader title="partners" onViewMoreClick={onViewMoreClick}/>
              <PartnersSlider />
            </div>

            {/* Best Deals Section */}

            {/* Trending Section */}
            <div className="">
              <SectionHeader title="recently updated" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="">
              <SectionHeader title="kids" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider/>
            </div>

            {/* Trending Section */}
            <div className="">
              <SectionHeader title="business" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="">
             <SectionHeader title="digital skills" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider></EducationSlider>
            </div>

            {/* Trending Section */}
            <div className="">
             <SectionHeader title="trending" onViewMoreClick={onViewMoreClick}/>
              <EducationSlider/>
            </div>

           
          </div>
        </main>
      </div>
    </>
  );
}
