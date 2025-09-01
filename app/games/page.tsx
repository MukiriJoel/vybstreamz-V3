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
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineSpeakerXMark,
} from "react-icons/hi2";
import {
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineVideocam,
} from "react-icons/md";
import GamesSlider from "@/components/GamesSlider";
import VybzCarouselMusic from "@/components/VybzCarouselMusic";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import SectionHeader from "@/components/SectionHeader";
import { useRouter } from "next/navigation";
import PartnersSlider from "@/components/PartnersSlider";

export default function GamesPage() {
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="">
        <VybzCarouselMain />

        <div className="p-8 max-w-8xl mx-auto">
          {/* Partners Section */}
          <div className="mb-8">
            <SectionHeader title="partners" onViewMoreClick={onViewMoreClick} />
            <PartnersSlider />
          </div>

          {/* top ranked Section */}
          <div className="mb-8">
            <SectionHeader
              title="top ranked games"
              onViewMoreClick={onViewMoreClick}
            />
            <GamesSlider></GamesSlider>
          </div>

          {/* trending Section */}
          <div className="mb-8 pt-1">
            <SectionHeader title="trending" onViewMoreClick={onViewMoreClick} />
            <GamesSlider></GamesSlider>
          </div>

          {/* trending Section */}
          <div className="mb-8 pt-1">
            <SectionHeader
              title="engaging games"
              onViewMoreClick={onViewMoreClick}
            />
            <div className="overflow-x-auto scrollbar-hide">
              <GamesSlider></GamesSlider>
            </div>
          </div>

          {/* recent Section */}
          <div className="mb-8 pt-1">
            <SectionHeader
              title="recently updated"
              onViewMoreClick={onViewMoreClick}
            />
            <GamesSlider></GamesSlider>
          </div>
        </div>
      </main>
    </div>
  );
}
