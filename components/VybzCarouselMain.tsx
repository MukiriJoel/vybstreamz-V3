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

const VybzCarouselMain = () => {

     const NextArrow = () => {
        return (
            <button
                className="hidden md:block absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            >
                <MdChevronRight className="w-6 h-6 text-white"/>
            </button>
        );
  };

  const PrevArrow = () => {
        return (
            <button
                className="hidden md:block absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
            >
                <MdChevronLeft className="w-6 h-6 text-white"/>
            </button>
        );
    };

    return(
        <>
                 {/* Podcast Player Section */}
                <div className="relative h-[80vh] w-full overflow-hidden">
                  {/* Background Cover Image with Overlay */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/images/netflixGames.png')",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/60"></div>
                  </div>
        
                  {/* Content Overlay */}
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <div className="p-8 pb-6">
                      <div className="flex flex-wrap items-end gap-6 mb-8">
                        {/* Album Cover */}
                        {/* <div className="flex-shrink-0">
                          <img
                            src="/images/albumCover.png"
                            alt="DISKO Cover"
                            className="w-30 h-35 rounded-lg object-cover shadow-lg"
                          />
                        </div> */}
        
                        {/* Game Info */}
                        <div className="flex-1 min-w-[150px]">
                          <h1 className="text-[28px] font-extrabold text-white capitalize">
                            Squid game 3
                          </h1>
                          <p className="text-white text-[14px] !font-semibold mt-2">
                            Game | 16 Yrs +
                          </p>
                          <p className="text-white text-[12px] max-w-md pt-1">
                            A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.
                          </p>
                        
                        </div>
        
                        {/* Audio Controls */}
                        <div className="flex items-center gap-3 mb-6 w-full sm:w-auto justify-start sm:justify-start ">
                           {/* Stream On Text */}
                          <div className="flex pt-10 items-center pr-10 cursor-pointer">
                            <p className="text-white/70 text-[14px] uppercase tracking-wide">
                              stream on:
                            </p>
                            <img
                              src="/logos/netflix.png"
                              className="w-[45px] h-[45px] ml-2"
                            />
                          </div>
                          
                        </div>
                     
                      </div>
        
                      {/* Action Buttons */}
                      <div className="flex gap-4 justify-between flex-wrap">
                        <div className="flex justify-between gap-4">
                          <Button className="bg-[#C62676] text-xs hover:bg-[#e91e63]/90 text-white px-8 h-10 rounded-full font-semibold w-40 cursor-pointer">
                            Subscribe
                          </Button>
                          <Button
                            variant="outline"
                            className="border-white/20 text-xs text-white hover:bg-white/20 hover:text-white px-6 h-10 rounded-full bg-[#2C2C2C] backdrop-blur-sm w-40 cursor-pointer"
                          >
                            <Bookmark className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                        </div>
                        <div className="flex pr-10 justify-center sm:flex-row">
                            <div className="flex items-center justify-end mb-4">
                              <div className="flex space-x-2 mt-5 pr-10">
                                <div className="w-3 h-3 bg-gray-300 hover:bg-[#C62676] rounded-full"></div>
                                <div className="w-3 h-3 bg-gray-300 hover:bg-[#C62676] rounded-full"></div>
                                <div className="w-3 h-3 bg-gray-300 hover:bg-[#C62676] rounded-full"></div>
                              </div>
                            </div>
                            <Button
                            variant="ghost"
                            size="icon"
                            className="text-white border-2 rounded-full mt-2 cursor-pointer"
                            >
                              <HiOutlineSpeakerXMark />
                            </Button>
                        </div>
                       
                      </div>
                      
        
                      {/* Progress Bar */}
                      {/* <div className="flex items-center gap-4 mt-3 mb-4">
                        <span className="text-white text-sm font-medium">1:25</span>
                        <div className="flex-1 bg-white/20 rounded-full h-1.5 relative">
                          <div className="bg-[#C62676] h-1.5 rounded-full w-1/3 relative">
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                          </div>
                        </div>
                        <span className="text-white text-sm font-medium">2:45</span>
                      </div> */}
                    </div>
                    <PrevArrow/>
                    <NextArrow/>
                  </div>
                </div>
        </>
    )
};

export default VybzCarouselMain;