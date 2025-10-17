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
import { useState, useEffect, useRef, useCallback } from "react";
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
import TrackList from "@/components/TrackList";
import PartnersSlider from "@/components/PartnersSlider";
import ReviewSlider from "@/components/ReviewSlider";
import { useDataGetMusic } from "@/store/thunks/catalogThunks";
import HomePageLoading from "@/app/home/loading";

interface MusicDetailsProps {
  urlParams: string;
}

export default function MusicView({ urlParams }: MusicDetailsProps) {
  const router = useRouter();
  const [musicItem, setMusicItem] = useState<any>(null);
  const [genre, setGenre] = useState<any>(null);
  const [musicId, setMusicId] = useState<any>(null);

  const onViewMoreClick = () => {
    router.push("/viewMore");
  };

  useEffect(() => {
    if (!urlParams) return;

    const decoded = decodeURIComponent(urlParams as string); // "id=1&genre=action"

    // Get genre
    const lastItem = decoded.split("&").pop(); // "genre=action"
    const slug = lastItem?.split("=")[1];
    console.log("slugval", slug);
    setGenre(slug);

    // Get id
    const firstItem = decoded.split("&")[0]; // "id=1"
    const idValue = firstItem.split("=")[1];
    console.log("idval", idValue);
    setMusicId(idValue);
  }, [urlParams]);

  const {
    data: musicHomeContent,
    isLoading: loading,
    isError,
  } = useDataGetMusic();

  const getContentBySlugId = useCallback(
    (slug: string, itemId?: number) => {
      const content = musicHomeContent?.find(
        (content: any) => content.slug === slug
      );
      console.log("cont", content);
      if (!content) return undefined;

      // If itemId is provided, find the specific item
      if (itemId !== undefined) {
        // Convert itemId to a number for comparison
        const numericId = Number(itemId);
        const item = content.items?.find((item: any) => item.id === numericId);
        console.log("item", item);
        return item;
      }

      // Otherwise return the entire content object
      return content;
    },
    [musicHomeContent]
  );

  useEffect(() => {
    if (genre && musicId && musicHomeContent) {
      const music = getContentBySlugId(genre, musicId);
      console.log("slugmusic", music);
      setMusicItem(music); // Store in state
    }
  }, [genre, musicId, musicHomeContent, getContentBySlugId]);

  console.log("current videoItem:", musicItem);

  if (loading) {
    return (
      <div className="">
        <HomePageLoading />
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        <VybzMusicPlayer
         musicItem={musicItem}
        />
        {/* Trending Section */}
        <main className="bg-[#F2F2F2] dark:bg-[#141414] py-2 px-2 md:px-4 lg:px-6 xl:px-6">
          <div className="pt-6 pb-2">
            <TrackList heading="tracklist" title="Way Up" subtitle="Savara" />
          </div>

          <section className="">
            <SectionHeader
              viewButton={true}
              title="similar albums"
              route="/music"
            />
            {/* <MusicSlider /> */}
          </section>
          <section>
            <RatingsComponent />
          </section>
          <section>
            <SectionHeader
              viewButton={true}
              title="user reviews"
              route={"/viewMore/ContentReview"}
            />
            <ReviewSlider />
          </section>
        </main>
      </div>
    </>
  );
}
