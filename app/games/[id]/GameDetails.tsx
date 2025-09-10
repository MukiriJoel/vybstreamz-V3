import {
  Pause,
  Play,
  SkipForward,
  Maximize,
  Minimize,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/slider";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Search,
  ShoppingBag,
  Bell,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import RatingsComponent from "@/components/ratings-section";
import VideoSlider from "@/components/VideoSlider";
import { MdArrowForward, MdPlayArrow } from "react-icons/md";
import { useRouter } from "next/navigation";
import ReviewsSection from "@/components/reviews-section";
import GamesSlider from "@/components/GamesSlider";
import SectionHeader from "@/components/SectionHeader";
import VybzVideoPlayer from "@/components/VybzVideoPlayer";

export default function Gamedetails(){
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };
return(
    <>
      <VybzVideoPlayer videoSrc = "/videos/MofayaTrailer.mp4"/>
      {/* Trending Section */}
      <main className="bg-[#F2F2F2] dark:bg-[#141414]">
        <section className="px-6 pb-3 pt-8 px-8">
          <SectionHeader
            title="top ranked games"
            onViewMoreClick={onViewMoreClick}
          />

          <GamesSlider />
        </section>
        <section className=" px-2">
          <SectionHeader
            title="top ranked games"
            onViewMoreClick={onViewMoreClick}
          />
          <GamesSlider />
        </section>
      </main>
    </>
  );
}
