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
import ReviewTop from "@/components/ReviewTop";

interface MusicDetailsProps {
  audioSrc: string;
  bannerImage: string;
  albumImage:string;
  title:string;
  subtitle:string;
  albumInfo:string;
  platformLogo:string
}

export default function MusicView({ audioSrc, bannerImage,albumImage,title,subtitle,albumInfo,platformLogo }: MusicDetailsProps) {
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
          <section className="pb-3 pt-8 px-2">
            <SectionHeader  viewButton={true} title="similar music" route=""/>

            <MusicSlider />
          </section>
          <section className="px-2">
            <ReviewTop/>
          </section>
          <section className="px-2">
            <ReviewsSection />
          </section>
        </main>
      </div>
    </>
  );
}
