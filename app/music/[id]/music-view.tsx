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
import { MdArrowForward, MdOutlineVideocam } from "react-icons/md";
import ReviewsSection from "@/components/reviews-section";
import MusicSlider from "@/components/MusicSlider";
import { useRouter } from "next/navigation";
import VybzMusicPlayer from "@/components/VybzMusicPlayer";
import SectionHeader from "@/components/SectionHeader";

export default function MusicView() {
  const router=useRouter();
  
  const onViewMoreClick = () =>{
      router.push('/viewMore');
  }

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        <VybzMusicPlayer
          audioSrc="/audio/podcast.mp3"
          bannerImage="/images/albumCover.png"
          albumImage="/images/kodong.png"
          title="Disko"
          subtitle="Kodong Klan"
          albumInfo="Album • 1hr 45min • 10 Songs • Hiphop"
          platformLogo="/logos/bazeLg.png"
        />
        {/* Trending Section */}
        <main className="bg-[#F2F2F2] dark:bg-[#141414]">
          <section className="px-6 pb-3 pt-8 px-8">
            <SectionHeader title="similar videos" onViewMoreClick={onViewMoreClick}/>

            <MusicSlider />
          </section>
          <section>
            <RatingsComponent />
          </section>
          <section>
            <ReviewsSection />
          </section>
        </main>
      </div>
    </>
  );
}
