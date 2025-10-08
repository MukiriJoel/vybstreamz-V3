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
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { MdArrowForward, MdOutlineVideocam } from "react-icons/md";
import VybzCarouselMusic from "@/components/VybzCarouselMusic";
import PartnersSlider from "@/components/PartnersSlider";
import MusicSlider from "@/components/MusicSlider";
import SectionHeader from "@/components/SectionHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMusicHome, getTopBarContent } from "@/store/thunks/catalogThunks";
import { useAppDispatch } from "@/hooks/redux";


export default function MusicPage() {
      const dispatch = useAppDispatch();
    const [MusicHomeContent, setMusicHomeContent] = useState<any>();
    const [topBarContent, setTopBarContent] = useState<any>(null);
      const [loading, setLoading] = useState(false);
  const Router=useRouter();
      
  const onViewMoreClick = () =>{
    Router.push(`/viewMore/`)
  }

  useEffect(()=>{
          const fetchMusicHome = async () =>{
            try{
              setLoading(true);
              const res = await dispatch(getMusicHome()).unwrap();
            console.log("musichomeres",res)
              setMusicHomeContent(res?.body?.music);
            }catch (error) {
              console.error('Failed to fetch genres', error);
            } finally {
                setLoading(false);
            }
          }
  
        const fetchTopBar = async () =>{
          try{
            setLoading(true);
            const res = await dispatch(getTopBarContent()).unwrap();
              console.log("topbarRes",res?.body);
              setTopBarContent(res?.body)
          }catch (error) {
            console.error('Failed to fetch genres', error);
          } finally {
              setLoading(false);
          }
        }
  
          fetchTopBar();
          fetchMusicHome();
        },[dispatch]);

  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="">
        {/* Podcast Player Section */}
        <VybzCarouselMusic slides={topBarContent ?? []}/>

        <div className="p-2 md:p-4 lg:p-6 xl:p-6  max-w-8xl mx-auto">
        

          {/* Partners Section */}
          <div className="">
            <SectionHeader  viewButton={true} title="partners" route="/partners"/>

            {/* Horizontal scrollable container */}
            {/* <PartnersSlider></PartnersSlider> */}
          </div>

          {/* top ranked Section */}
          <div className="">
              <SectionHeader  viewButton={true} title="top ranked music" route="/music"/>
            <MusicSlider slides={MusicHomeContent ?? []}></MusicSlider>
          </div>

          {/* albums Section */}
          <div className="">
              <SectionHeader  viewButton={true} title="albums" route="/music"/>
            <MusicSlider slides={MusicHomeContent ?? []}></MusicSlider>
          </div>
        </div>
      </main>
    </div>
  );
}
