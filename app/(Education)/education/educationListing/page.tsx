"use client";
import { useState } from "react";
import VybzCarouselEducation from "@/components/VybzCarouselEducation";
import EducationSlider from "@/components/EducationSlider";
import { MdArrowForward } from "react-icons/md";
import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EducationListing() {
  const [activeTab, setActiveTab] = useState("E-Book");
  const tabs = ["E-Book", "Audio Book"];

  return (
    <>
      <div className="bg-[#f2f2f2]">
        {/* Main Content */}
        <main className="">
          <VybzCarouselEducation tabs={tabs} activeTab={activeTab} />
          {/* Content Navigation */}
          {/* TABS */}
          <div className="bg-[#f2f2f2] mb-8 pt-8  ">
            <nav className="flex space-x-8 overflow-x-auto justify-center scrollbar-hide">
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
          {activeTab === "E-Book" ? (
            <div className="p-8">
              {/* top ranked Section */}
              

              {/* trending Section */}
              <div className="mb-8 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Trending 
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>
                <EducationSlider></EducationSlider>
              </div>

              {/* trending Section */}
              <div className="mb-8 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Engaging 
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                  <EducationSlider></EducationSlider>
                </div>
              </div>

              {/* recent Section */}
              <div className="mb-8 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Recently Updated
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>
                <EducationSlider></EducationSlider>
              </div>
            </div>
          ) : (
            <div className="p-8">
              {/* top ranked Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Top ranked 
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>

                <EducationSlider></EducationSlider>
              </div>

              {/* trending Section */}
              <div className="mb-8 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Trending 
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>
                <EducationSlider></EducationSlider>
              </div>

              {/* trending Section */}
              <div className="mb-8 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Engaging 
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                  <EducationSlider></EducationSlider>
                </div>
              </div>

              {/* recent Section */}
              <div className="mb-8 pt-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[24px] text-[#1A1A1A] font-bold">
                    Recently Updated
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#1A1A1A] text-[16px] !font-medium"
                  >
                    View More
                    <MdArrowForward className="!w-[36px] !h-[36px]" />
                  </Button>
                </div>
                <EducationSlider></EducationSlider>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
