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
import { usePartners } from "@/hooks/usePartners";
import PlansSlider from "@/components/PlansSlider";
import VideoSlider from "@/components/VideoSlider";
import GamesSlider from "@/components/GamesSlider";
import EducationSlider from "@/components/EducationSlider";
import PodcastSlider from "@/components/PodcastSlider";

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  image: string;
 
}

const defaultPartner: Partner = {
  id: 0,
  name: 'Unknown Partner',
  logo:"/logos/bazeLg.png",
  description: 'No description available',
  image: '/default-image.png',
  
};

export default function PartnerDetails({id}:{id:number}) {

    const [activeTab, setActiveTab] = useState("Videos");
    const [isSubscribed, setIsSubscribed] = useState(true)
    const tabs = ["Videos", "Music", "Games", "Education", "Podcast"]

    const  partners  = usePartners();

    let partnerDetails:Partner=defaultPartner;

    if(partners){

        const partnersArr=partners.partners;
        

        const findById=(id:number, array: Partner[])=> {
            return array.find((item: Partner) =>item && item.id == id);
        }

        (partnerDetails as any)=findById(id,partnersArr)

    }


  return (
    <div className="bg-[#f2f2f2]">
      {/* Main Content */}
      <main className="pt-12">
          {/* Hero Section */}
        {partnerDetails && (
          <div className="px-8 pt-8 mt-10">
            <div className="flex rounded-4xl h-57vh md:h-[65vh] p-0">
              <img src={partnerDetails?.image} className="w-full rounded-4xl object-cover" alt=''/>
            </div>
            {isSubscribed?
                <div className="flex mt-10 items-center">
                    <div className="w-14 h-14 rounded-2xl shadow-lg flex justify-center overflow-hidden">
                        <img
                            src={partnerDetails?.logo}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="ml-8 text-2xl md:text-4xl font-semibold text-[#2C2C2C] leading-[100%] ">{partnerDetails?.name}</h2>
                </div>
            :
            <div className="flex justify-between">
                <div className="flex mt-10 items-center">
                    <div className="w-14 h-14 rounded-2xl shadow-lg flex justify-center overflow-hidden">
                        <img
                            src={partnerDetails?.logo}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <h2 className="ml-8 text-2xl md:text-4xl font-semibold text-[#2C2C2C] leading-[100%] ">{partnerDetails?.name}</h2>
                </div>
                <div className="flex items-center mt-10">
                    <Button className="cursor-pointer bg-[#c62676] hover:bg-[#a91e63] text-white text-xl px-12 py-6 rounded-full font-medium">
                    Visit Site
                    </Button>
                </div>

            </div>

        }
            
         

          </div>
        )}
        
        {isSubscribed ?
            <div className="p-8 max-w-8xl mx-auto">
            {/* Episodes Section */}
            {/* Partners Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                <h3 className="text-[24px] text-[#1A1A1A] font-bold capitalize">explore plans</h3>
                <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
                </div>

                {/* Horizontal scrollable container */}
                <PlansSlider/>
            </div>

                {/* TABS */}
                <div className="bg-[#f2f2f2] mb-8 pt-8">
                        <nav className="flex space-x-8 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                py-3 px-1 border-b-3 cursor-pointer font-semibold text-lg md:text-xl lg:text-xl whitespace-nowrap transition-colors
                                ${
                                activeTab === tab
                                    ? "border-[#c62676] text-[#c62676]"
                                    : "border-transparent text-[#000000 ] hover:text-[#2c2c2c] hover:border-[#cccccc]"
                                }
                            `}
                            >
                            {tab}
                            </button>
                        ))}
                        </nav>
                </div>
                {activeTab === "Videos" && (
                    <div className="p-0">
                        <VideoSlider/>
                        <VideoSlider/>
                    </div>
                )}
                {activeTab === "Music" && (
                    <div className="p-0">
                        <MusicSlider/>
                        <MusicSlider/>
                    </div>
                )}
                {activeTab === "Games" && (
                    <div className="p-0">
                        <GamesSlider/>
                        <GamesSlider/>
                    </div>
                )}
                {activeTab === "Education" && (
                    <div className="p-0">
                        <EducationSlider/>
                        <EducationSlider/>
                    </div>
                )}
                {activeTab === "Podcast" && (
                    <div className="p-0">
                        <PodcastSlider/>
                        <PodcastSlider/>
                    </div>
                )}
            
            </div>
        :
            <div className="p-8 max-w-8xl mx-auto">
                <VideoSlider/>
            </div>
    }
       
      </main>
    </div>
  );
}


