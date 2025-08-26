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

export default function viewMore(){
  const Router=useRouter();
      
       const onHandleClick = () =>{
       
        Router.push(`/viewMore/`)
  }
  
    return(
        <>
        <div className="bg-[#f2f2f2]">
        {/* Hero Section */}
        <main className="">
    
          <div className="p-8 max-w-8xl mx-auto">
            <section className="!mt-10 !pt-8">
                  <PartnerHighlight/>
            </section>
        
           

            {/* Trending Section */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black">Trending</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
               
                  <VideoSlider />
               
         
            </section>

            {/* Recommended For You Section */}
            <section className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black">
                  Recommended For You
                </h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>

          
            {/* Recommended For You Section */}
            <section className=" py-4  ">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black">Listen</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>

          
            {/* Recommended For You Section */}
            <section className=" py-4  ">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black">Tune In</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>

             <section className=" py-4  ">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black">Tune In</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>
          </div>
        </main>
      </div>
        </>
    )
}