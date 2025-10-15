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
    const [sliderContent, setSliderContent] = useState<any>(null);
      const [loading, setLoading] = useState(false);
  const Router=useRouter();
      
  const onViewMoreClick = () =>{
    Router.push(`/viewMore/`)
  }

  const fetchMusicHome = async () =>{
    try{
      setLoading(true);
      const res = await dispatch(getMusicHome()).unwrap();
    console.log("musichomeres",res)
      setMusicHomeContent(res?.body);
    }catch (error) {
      console.error('Failed to fetch genres', error);
    } finally {
        setLoading(false);
    }
  }
  
  useEffect(()=>{      
    fetchMusicHome();
  },[]);

  useEffect(() => {
    if (!MusicHomeContent) return;
       const sliders = MusicHomeContent?.find(
      (content: any) => content.slug === "slider"
    );
    setSliderContent(sliders);
    console.log("sliders", sliderContent);

  },[MusicHomeContent])

  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="">
        {/* Podcast Player Section */}
        <VybzCarouselMusic slides={sliderContent?.items ?? []}/>

         <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
    {MusicHomeContent?.filter((section:any) => section.slug !== 'slider' && section.items?.length > 0)
    .sort((a:any, b:any) => {
      // Partners always first
      if (a.slug === 'partners') return -1;
      if (b.slug === 'partners') return 1;
      return 0; // Keep original order for others
    }).map((section: any) => {
                      // Skip sections with no items
                      if (
                        section.slug === "slider" ||
                        !section.items ||
                        section.items.length === 0
                      )
                        return null;
        
                      return (
                        <section key={section.slug} className="">
                          <SectionHeader
                            viewButton={true}
                            title={section.title}
                            route={
                              section.slug === "partners" ? "/partners" : "/music"
                            }
                          />
        
                          {section.slug === "partners" ? (
                            <PartnersSlider slides={section.items} />
                          ) : (
                            <MusicSlider slides={section.items} />
                          )}
                        </section>
                      );
                    })}
                  </div>
      </main>
    </div>
  );
}
