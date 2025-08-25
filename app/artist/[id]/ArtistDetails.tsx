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
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { MdArrowForward, MdOutlineVideocam } from "react-icons/md";
import VybzCarouselMusic from "@/components/VybzCarouselMusic";
import PartnersSlider from "@/components/PartnersSlider";
import MusicSlider from "@/components/MusicSlider"; 
import { useState } from "react";
import { useMusic } from "@/hooks/useMusic";

interface Artist {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  partner: string;
}

const defaultArtist: Artist = {
  id: 0,
  title: 'Unknown Artist',
  subtitle: 'Unknown',
  description: 'No description available',
  image: '/default-image.png',
  partner: '/logos/default.png'
};

export default function ArtistDetails({id}:{id:number}) {

const  music  = useMusic();

let artistDetails:Artist=defaultArtist;

if(music){

  const musicArr=music.music;
  

  const findById=(id:number, array: Artist[])=> {
     return array.find((item: Artist) =>item && item.id == id);
  }

  (artistDetails as any)=findById(id,musicArr)

}


  return (
    <div className="bg-[#f2f2f2]">
      {/* Main Content */}
      <main className="pt-12">
          {/* Hero Section */}
        {artistDetails && (
          <div className="px-8 pt-8 mt-10">
            <div className="flex rounded-4xl h-[70vh] p-0">
              <img src={artistDetails?.image} className="w-full rounded-4xl object-cover" alt=''/>
            </div>

            <h2 className="text-4xl font-semibold text-[#2C2C2C] mb-3 mt-4">{artistDetails?.title}</h2>
            <p className="text-[#2C2C2C] max-w-md max-h-[72px] text-[20px] tracking-normal leading-none">
            {artistDetails?.description}
            </p>

          </div>
        )}
        
        
        <div className="p-8 max-w-8xl mx-auto">
          {/* Episodes Section */}
          {/* Partners Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] text-[#1A1A1A] font-bold">Partners</h3>
              <Button
                variant="ghost"
                className="text-[#1A1A1A] text-[16px] !font-medium"
              >
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]" />
              </Button>
            </div>

            {/* Horizontal scrollable container */}
            <PartnersSlider></PartnersSlider>
          </div>

          {/* top ranked Section */}
          <div className="mb-8 pt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                Top ranked Music
              </h3>
              <Button
                variant="ghost"
                className="text-[#1A1A1A] text-[16px] !font-medium"
              >
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]" />
              </Button>
            </div>
            <MusicSlider></MusicSlider>
          </div>

          {/* albums Section */}
          <div className="mb-8 pt-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[24px] text-[#1A1A1A] font-bold">Albums</h3>
              <Button
                variant="ghost"
                className="text-[#1A1A1A] text-[16px] !font-medium"
              >
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]" />
              </Button>
            </div>
            <MusicSlider></MusicSlider>
          </div>
        </div>
      </main>
    </div>
  );
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

