// import Image from "next/image";
import Navbar from "../../parts/Navbar";
import { FaChevronDown } from "react-icons/fa";
import {
  Search,
  ShoppingBag,
  Bell,
  ChevronLeft,
  ChevronRight,
  Play,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "../../parts/footer";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import PartnersSlider from "@/components/PartnersSlider";
import { MdArrowForward } from "react-icons/md";
import EducationSlider from "@/components/EducationSlider";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const contentTabs = ["E-Book", "Audio Book"];
  return (
    <>
      <div className="bg-[#f2f2f2]">
        {/* Main Content */}
        <main className="">
          {/* Hero Section */}
          <VybzCarouselMain />

          <div className="p-8 max-w-8xl mx-auto">
            {/* Partners Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Partners</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium"
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <PartnersSlider />
            </div>

            {/* Best Deals Section */}

            {/* Trending Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black capitalize">
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
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Kids</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium"
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Trending Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">Business</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium"
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">
                  Digital Skills
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

            {/* Trending Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-black">Trending</h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium"
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black">
                  Recommended For You
                </h3>
                <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium"
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
