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
import SectionHeader from "@/components/SectionHeader";
import VybzVideoPlayer from "@/components/VybzVideoPlayer";

export default function MovieView(){
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };
  return (
    <>
      <VybzVideoPlayer videoSrc = "/videos/MofayaTrailer.mp4"/>
      {/* Trending Section */}
      <main className="bg-[#F2F2F2] dark:bg-[#141414] px-2 md:px-4 lg:px-6">
        <section className="pb-3 pt-8 ">
           <SectionHeader  viewButton={true} title="similar videos" route="/videos"/>
          <VideoSlider />
        </section>
        <section>
          <RatingsComponent />
        </section>
        <section>
          <ReviewsSection />
        </section>
      </main>
    </>
  );
}
