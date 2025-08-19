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

const VybzCarouselMusic = () =>{
    return(
        <>
                <div className="relative h-[80vh] w-full overflow-hidden">
          {/* Background Cover Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/podcastLg.png')",
            }}
          >
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Content Overlay */}
         <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="p-8 pb-6">
            <div className="flex flex-wrap items-end gap-6 mb-8">
              {/* Album Cover */}
              <div className="flex-shrink-0">
                <img
                  src="/images/podcastThumb.png"
                  alt="DISKO Cover"
                  className="w-30 h-40 rounded-lg object-cover shadow-lg"
                />
              </div>

              {/* Album Info Container */}
              <div className="flex-1 min-w-[150px] flex flex-col justify-end">
                {/* Main Album Info */}
                <div className="mb-0">
                  <h1 className="text-[28px] font-extrabold text-white capitalize leading-tight">
                    sandwich podcast
                  </h1>
                  <p className="text-white text-[22px] !font-normal leading-tight">
                     sandwich podcast
                  </p>
                  <p className="text-white text-[12px] mt-1">
                    Podcast | 1hr 45min | 10 Songs | Hiphop
                  </p>
                </div>

                {/* Stream On and Controls Row */}
                <div className="flex sm:flex-wrap justify-between items-end w-full">
                  {/* Stream On Section */}
                  <div className="flex items-center mb-2">
                    <p className="text-white text-[14px] uppercase tracking-wide mr-3">
                      stream on:
                    </p>
                    <img
                      src="/logos/spotify.png"
                      className="w-[45px] h-[45px]"
                      alt="Baze logo"
                    />
                  </div>

                  {/* Right Side Controls */}
                  <div className="flex flex-col items-end gap-4">
                    {/* Audio/Video Controls */}
                    <div className="flex items-center gap-3">
                      <Button className="bg-[#2C2C2C] hover:bg-white/20 text-white px-4 py-2 rounded-[5px] text-xs backdrop-blur-sm border border-white/10 cursor-pointer">
                        <MdOutlineVideocam className="mr-1" />
                        Switch To Video
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white border-2 rounded-full cursor-pointer w-10 h-10"
                      >
                        <HiOutlineSpeakerXMark />
                      </Button>
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-gray-300 hover:bg-[#C62676] rounded-full cursor-pointer transition-colors"></div>
                      <div className="w-3 h-3 bg-gray-300 hover:bg-[#C62676] rounded-full cursor-pointer transition-colors"></div>
                      <div className="w-3 h-3 bg-gray-300 hover:bg-[#C62676] rounded-full cursor-pointer transition-colors"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-7">
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

            {/* Progress Bar */}
            <div className="flex items-center gap-4 mt-3 mb-4">
              <span className="text-white text-sm font-medium">1:25</span>
              <div className="flex-1 bg-white/20 rounded-full h-1.5 relative cursor-pointer">
                <div className="bg-[#C62676] h-1.5 rounded-full w-1/3 relative">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              <span className="text-white text-sm font-medium">2:45</span>
            </div>
          </div>
        </div>
        </div>
        </>
    )
}

export default VybzCarouselMusic;