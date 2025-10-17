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
import { useState, useEffect, useRef,useCallback } from "react";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ReviewsSection from "@/components/reviews-section";
import SectionHeader from "@/components/SectionHeader";
import VybzVideoPlayer from "@/components/VybzVideoPlayer";
import ReviewSlider from "@/components/ReviewSlider";
import { useDataGetVideo } from "@/store/thunks/catalogThunks";
import HomePageLoading from "@/app/home/loading";

interface MovieDetailsProps {
  urlParams:string;
}

export default function MovieView({urlParams}:MovieDetailsProps){
      
  const Router = useRouter();
  const [videoItem, setVideoItem] = useState<any>(null);
  const [genre, setGenre] = useState<any>(null);
  const [vid, setVid] = useState<any>(null);
  // const params = useParams();
  //  console.log("params",params.id)
  //  const urlParams=params.id;
  // const slug = params.genre;
  // const [loading, setLoading] = useState(false);
  
    useEffect(() => {
    if (!urlParams) return;
    
    const decoded = decodeURIComponent(urlParams as string); // "id=1&genre=action"
 
    // Get genre
    const lastItem = decoded.split('&').pop(); // "genre=action"
    const slug = lastItem?.split('=')[1];
    console.log("slugval",slug);
    setGenre(slug);
   
    // Get id
    const firstItem = decoded.split('&')[0]; // "id=1"
    const idValue = firstItem.split('=')[1];
    console.log("idval",idValue);
    setVid(idValue);
  }, [urlParams]);

  
  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  const {
      data: videoHomeContent,
      isLoading: loading,
      isError,
    } = useDataGetVideo();
    
  const getContentBySlugId = useCallback(
  (slug: string, itemId?: number) => {
     
    const content = videoHomeContent?.find((content: any) => content.slug === slug);
    console.log("cont",content)
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
  [videoHomeContent]
);

useEffect(() => {
    if (genre && vid && videoHomeContent) {
      const video = getContentBySlugId(genre, vid);
      console.log("slugvid", video);
      setVideoItem(video); // Store in state
    }
  }, [genre, vid, videoHomeContent, getContentBySlugId]);

   console.log("current videoItem:", videoItem);
       
  
    if (loading) {
      return (
        <div className="">
          <HomePageLoading />
        </div>
      );
    }
    
  return (
    <>
      <VybzVideoPlayer videoItem={videoItem}
      />
      {/* Trending Section */}
      <main className="bg-[#F2F2F2] dark:bg-[#141414] px-2 md:px-4 lg:px-6">
        <section className="pb-3 pt-8 ">
           <SectionHeader  viewButton={true} title="similar videos" route="/videos"/>
          {/* <VideoSlider /> */}
        </section>
        <section>
          <RatingsComponent />
        </section>
         <section>
                <SectionHeader  viewButton={true} title="user reviews" route={"/viewMore/ContentReview"}/>
                <ReviewSlider/>
            </section>
      </main>
    </>
  );
}
