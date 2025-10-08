"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import { MdArrowForward } from "react-icons/md";
import PartnersSlider from "@/components/PartnersSlider";
import VideoSlider from "@/components/VideoSlider";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getTopBarContent, getVideoHome } from "@/store/thunks/catalogThunks";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
    const dispatch = useAppDispatch();
  const [videHomeContent, setVideHomeContent] = useState<any>();
  const [topBarContent, setTopBarContent] = useState<any>(null);
    const [loading, setLoading] = useState(false);
  const Router=useRouter();
    
     const onViewMoreClick = () =>{
     
      Router.push(`/viewMore/`)
    }

      useEffect(()=>{
        const fetchVideoHome = async () =>{
          try{
            setLoading(true);
            const res = await dispatch(getVideoHome()).unwrap();
          console.log("videohomeres",res)
            setVideHomeContent(res?.body?.video);
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
        fetchVideoHome();
      },[dispatch]);
    
  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
          <VybzCarouselMain slides={topBarContent ?? []}/>
          <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            {/* Partners Section */}
            <section className="">
                <SectionHeader  viewButton={true} title="partners" route="/partners"/>
              {/* <PartnersSlider /> */}
            </section>


            {/* Trending Section */}
            <section className="">
                <SectionHeader  viewButton={true} title="trending" route="/videos"/>
               
                  <VideoSlider title="" slides={videHomeContent.items ?? []} />
               
         
            </section>

            {/* Recommended For You Section */}
            <section className="">
                <SectionHeader  viewButton={true} title="recommended for you" route="/videos"/>
              <VideoSlider title={videHomeContent.title} slides={videHomeContent ?? []} />
            </section>


            {/* Recommended For You Section */}
            <section className="   ">
                <SectionHeader  viewButton={true} title="drama" route="/videos"/>
              <VideoSlider title={videHomeContent.title} slides={videHomeContent ?? []} />
            </section>


            {/* Recommended For You Section */}
            <section className=" ">
                <SectionHeader  viewButton={true} title="comedy" route="/videos"/>
              <VideoSlider title={videHomeContent.title} slides={videHomeContent ?? []} />
            </section>
           
          </div>
        </main>
      </div>
    </>
  );
}
