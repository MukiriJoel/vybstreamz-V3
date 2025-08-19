"use client";
import {
  Search,
  ShoppingCart,
  Bell,
  MoreHorizontal,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HiArrowLeft, HiArrowRight, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { MdArrowForward, MdChevronLeft, MdChevronRight, MdOutlineVideocam } from "react-icons/md";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import GamesSlider from "@/components/GamesSlider";

export default function GamesPage() {

  return (
    <div className="bg-[#f2f2f2]">
      {/* Main Content */}
      <main className="">
        <VybzCarouselMain/>

        <div className="p-8 max-w-8xl mx-auto">

          {/* Partners Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-[24px] text-[#1A1A1A] font-bold">Partners</h3>
                <Button variant="ghost" className="text-[#1A1A1A] text-[16px] !font-medium">
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]"/>
                </Button>
            </div>
            
            {/* Horizontal scrollable container */}
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                {[
                    { name: "Baze", logo: "/logos/bazeLg.png" },
                    { name: "Netflix", logo: "/logos/netflixLg.png" },
                    { name: "EA Sports", logo: "/logos/eaSports.png" },
                    { name: "GOG", logo: "/logos/gog.png" },
                    { name: "Epic Games", logo: "/logos/epic.png" },
                ].map((partner, index) => (
                    <div 
                    key={index} 
                    className="p-0 flex flex-col items-center justify-center flex-shrink-0 w-[200px] min-h-[200px]"
                    >
                    <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={partner.name}
                        className="h-[150px] w-[150px] object-contain mb-2 rounded-4xl"
                    />
                    <span className="text-xl font-semibold text-[#2C2C2C]">{partner.name}</span>
                    </div>
                ))}
                </div>
            </div>
           </div>

          {/* top ranked Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                Top ranked Games
              </h3>
              <Button
                variant="ghost"
                className="text-[#1A1A1A] text-[16px] !font-medium"
              >
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]" />
              </Button>
            </div>
            
            <GamesSlider></GamesSlider>
          </div>

          {/* trending Section */}
          <div className="mb-8 pt-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[24px] text-[#1A1A1A] font-bold">Trending Games</h3>
             <Button variant="ghost" className="text-[#1A1A1A] text-[16px] !font-medium">
              View More
              <MdArrowForward className="!w-[36px] !h-[36px]"/> 
            </Button>
          </div>
          <GamesSlider></GamesSlider>
        
          </div>

          {/* trending Section */}
          <div className="mb-8 pt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] text-[#1A1A1A] font-bold">Engaging Games</h3>
              <Button variant="ghost" className="text-[#1A1A1A] text-[16px] !font-medium">
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]"/> 
              </Button>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <GamesSlider></GamesSlider>
            </div>
          </div>

          {/* recent Section */}
          <div className="mb-8 pt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] text-[#1A1A1A] font-bold">Recently Updated</h3>
              <Button variant="ghost" className="text-[#1A1A1A] text-[16px] !font-medium">
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]"/> 
              </Button>
            </div>
                <GamesSlider></GamesSlider>
          </div>
        </div>
      </main>
    </div>
  );
}
