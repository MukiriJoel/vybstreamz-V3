"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import { MdArrowForward } from "react-icons/md";
import PartnersSlider from "@/components/PartnersSlider";
import GamesSlider from "@/components/GamesSlider";
import PodcastSlider from "@/components/PodcastSlider";
import EducationSlider from "@/components/EducationSlider";
import MusicSlider from "@/components/MusicSlider";
import VideoSlider from "@/components/VideoSlider";
import { title } from "process";
import DealsSlider from "@/components/DealsSlider";
import AdSlider from "@/components/AdSlider";
import { useRouter } from "next/navigation";
import PartnerHighlight from "@/components/PartnerHighlight";
import Billboard from "@/components/billboard";
import SectionHeader from "@/components/SectionHeader";
import BillboardV2 from "@/components/BillBoardV2";
import BillBoardV3 from "@/components/BillBoardV3";
import PartnerBanner from "@/components/PartnerBanner";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getCatalog, getTopBarContent } from "@/store/thunks/catalogThunks";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
   const Router=useRouter();
     const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [topBarContent, setTopBarContent] = useState<any>(null);
    const [catalog, setCatalog] = useState<any>(null);

     const onViewMoreClick = () =>{
      Router.push(`/partners`)

    }

     const adSlides = [
    {
      id: 1,
      image: "/images/safAd.png",
    },
    {
      id: 2,
      image: "/images/safAd2.png",
    },
    {
      id: 3,
      image: "/images/safAd3.png",
    },
  ];

  useEffect(()=>{
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

    const fetchCatalog = async () =>{
      try{
         setLoading(true);
          const res = await dispatch(getCatalog()).unwrap();
         
          setCatalog(res?.body)
      }catch(error) {
        console.error('Failed to fetch genres', error);
      }finally {
          setLoading(false);
      }
    }

    fetchTopBar();
    fetchCatalog();
  },[])

 
const videoData = catalog?.video;
console.log("catalog",catalog)

const musicData= catalog?.music;

const gameData= catalog?.games;

const educationData= catalog?.education;

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
          {/* {topBarContent && <BillBoardV3 slides={topBarContent} />} */}
          <BillBoardV3 slides={topBarContent ?? []} />
          {/* <VybzCarouselMain/> */}
          <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            {/* Partners Section */}
            <section className="">
                <SectionHeader  viewButton={true} title="partners" route='/partners'/>
              <PartnersSlider />
            </section>

            {/* Best Deals Section */}
            <section className="">
               <SectionHeader  viewButton={true} title="best deals 🔥" route='/deals'/>
              <DealsSlider/>
            </section>

            {/* Trending Section */}
            <section className="">
               <SectionHeader  viewButton={true} title="watch" route='/videos'/>
                  <VideoSlider  slides={videoData ?? []}  />
            </section>

            {/* Recommended For You Section */}
            {/* <section className="">
               <SectionHeader  viewButton={true} title="recommended for you" route=""/>
              <VideoSlider />
            </section> */}

            {/* partner highligh Section */}
            
            

            {/* Netflix Content Banner */}
            <section>
              <PartnerBanner header="partner highlight" title="netflix" logo="/logos/netflix.png" button="visit site" image="/images/bestNetflix.png"/>
            </section>

            {/* Recommended For You Section */}
            <section className=" ">
              <SectionHeader  viewButton={true} title="listen" route='/music'/>
              <MusicSlider  slides={musicData ?? []} />
            </section>

            {/* Trending Section */}
            <section className="">
                <SectionHeader  viewButton={true} title="games" route='/games'/>
              <GamesSlider slides={gameData ?? []} />
            </section>

            {/*AD slider */}
            <section>
              <SectionHeader  viewButton={false} title="amazing deals for you" route=''/>
              <AdSlider slides={adSlides}/>
            </section>
              

            {/* Recommended For You Section */}
            <section className=" ">
                <SectionHeader  viewButton={true} title="learn" route='education'/>
              <EducationSlider slides={educationData ?? []}  />
            </section>
            {/* Recommended For You Section */}
            <section className="  ">
                <SectionHeader  viewButton={true} title="tune in" route='/podcasts'/>
              <PodcastSlider />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
