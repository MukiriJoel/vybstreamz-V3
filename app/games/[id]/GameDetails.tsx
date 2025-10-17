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
import VideoSlider from "@/components/VideoSlider";
import { MdArrowForward, MdPlayArrow } from "react-icons/md";
import { useRouter } from "next/navigation";
import ReviewsSection from "@/components/reviews-section";
import GamesSlider from "@/components/GamesSlider";
import SectionHeader from "@/components/SectionHeader";
import VybzVideoPlayer from "@/components/VybzVideoPlayer";
import ReviewSlider from "@/components/ReviewSlider";
import { useDataGetGames } from "@/store/thunks/catalogThunks";
import HomePageLoading from "@/app/home/loading";

interface GameDetailsProps {
    urlParams:string;
}

export default function Gamedetails({ urlParams }: GameDetailsProps) {
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  const [gameItem, setGameItem] = useState<any>(null);
  const [genre, setGenre] = useState<any>(null);
  const [gameId, setGameId] = useState<any>(null);
    
  useEffect(() => {
    if (!urlParams) return;
    
    const decoded = decodeURIComponent(urlParams as string); // "id=1&genre=action"
 
    // Get genre
    const lastItem = decoded.split('&').pop(); // "genre=action"
    const slug = lastItem?.split('=')[1];
   
    setGenre(slug);
   
    // Get id
    const firstItem = decoded.split('&')[0]; // "id=1"
    const idValue = firstItem.split('=')[1];

    setGameId(idValue);
  }, [urlParams]);

    const {
        data: gamesHomeContent,
        isLoading: loading,
        isError,
      } = useDataGetGames();
      
    const getContentBySlugId = useCallback(
    (slug: string, itemId?: number) => {
       
      const content = gamesHomeContent?.find((content: any) => content.slug === slug);
      console.log("cont",content)
      if (!content) return undefined;
      
      // If itemId is provided, find the specific item
      if (itemId !== undefined) {
        // Convert itemId to a number for comparison
        const numericId = Number(itemId);
        console.log("numer", numericId);
        const item = content.items?.find((item: any) => item.id === numericId);
       
        return item;
      }
      
      // Otherwise return the entire content object
      return content;
    },
    [gamesHomeContent]
  );

  useEffect(() => {
    if (genre && gameId && gamesHomeContent) {
       
      const game = getContentBySlugId(genre, gameId);
    
      setGameItem(game); // Store in state
    }
  }, [genre, gameId, gamesHomeContent, getContentBySlugId]);

   console.log("current game:", gameItem);

  if (loading) {
    return (
      <div className="">
        <HomePageLoading />
      </div>
    );
  }

  return (
    <>
      <VybzVideoPlayer
        videoItem={gameItem}
      />
      {/* Trending Section */}
      <main className="bg-[#F2F2F2] pt-4 dark:bg-[#141414] px-2 md:px-4 lg:px-6 xl:px-6">
        <section className="pb-3 pt-8">
          <SectionHeader
            viewButton={true}
            title="similar games"
            route="/games"
          />

          {/* <GamesSlider /> */}
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
    </>
  );
}
