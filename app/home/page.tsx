"use client";
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
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getHomePage, getTopBarContent, useDataGetHome } from "@/store/thunks/catalogThunks";
import HomePageLoading from "./loading";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const Router = useRouter();
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(false);
  // const [homeContent, setHomeContent] = useState<any>(null);
  // const [sliderContent, setSliderContent] = useState<any>(null);
  // const [videoContent, setVideoContent] = useState<any>(null);
  // const [musicContent, setMusicContent] = useState<any>(null);
  // const [gamesContent, setGamesContent] = useState<any>(null);
  // const [eduContent, setEduContent] = useState<any>(null);
  // const [dealsContent, setDealsContent] = useState<any>(null);
  // const [partnerHighlightContent, setPartnerHighlightContent] =
  //   useState<any>(null);
  // const [partnersContent, setPartnersContent] =
  //   useState<any>(null);

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

  const { data: homeContent, isLoading: loading, isError } = useDataGetHome();
  console.log("homeContent", homeContent);

  // useEffect(() => {
  //    if (!homeContent) return; 
  //   // const fetchTopBar = async () =>{
  //   //   try{
  //   //     setLoading(true);
  //   //     const res = await dispatch(getTopBarContent()).unwrap();
  //   //      console.log("topbarRes",res?.body);
  //   //      setTopBarContent(res?.body)
  //   //   }catch (error) {
  //   //     console.error('Failed to fetch genres', error);
  //   //   } finally {
  //   //       setLoading(false);
  //   //   }
  //   // }

    

  //   // fetchTopBar();
  //   // fetchHomePage();
  //   const sliders = homeContent?.find(
  //     (content: any) => content.slug === "slider"
  //   );
  //   setSliderContent(sliders)
  //   console.log("sliders", sliderContent);

  //   const partners = homeContent?.find(
  //     (content: any) => content.slug === "partners"
  //   );
  //   setPartnersContent(partners)
  //   console.log("partners", partnersContent);

  //   const deals = homeContent?.find(
  //     (content: any) => content.slug === "best_deals"
  //   );
  //   setDealsContent(deals);
  //   console.log("deals", dealsContent);

  //   const music = homeContent?.find((content: any) => content.slug === "listen");

  //   setMusicContent(music);
  //   console.log("music", musicContent);

  //   const videos = homeContent?.find((content: any) => content.slug === "watch");

  //   setVideoContent(videos);
  //   console.log("videos", videoContent);

  //   const education = homeContent?.find(
  //     (content: any) => content.slug === "learn"
  //   );

  //   setEduContent(education);
  //   console.log("education", eduContent);

  //   const games = homeContent?.find((content: any) => content.slug === "games");

  //   setGamesContent(games);
  //   console.log("games", gamesContent);

  //   const partnerHighlight = homeContent?.find(
  //     (content: any) => content.slug === "partner-highlight"
  //   );

  //   setPartnerHighlightContent(partnerHighlight);
  //   console.log("partnerHigh", partnerHighlightContent);

  // }, []);

const getContentBySlug = useCallback((slug: string) => {
  return homeContent?.find((content: any) => content.slug === slug);
}, [homeContent]);

const sliderContent = getContentBySlug("slider");
const videoContent = getContentBySlug("watch");
const partnersContent = getContentBySlug("partners");
const dealsContent = getContentBySlug("best_deals");  
const partnerHighlightContent = getContentBySlug("partner-highlight");
const musicContent = getContentBySlug("listen");
const eduContent = getContentBySlug("learn");
const gamesContent = getContentBySlug("games");

   if (loading) {
        return (
            <div className=""><HomePageLoading/></div>
        )
  }

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
          {/* {topBarContent && <BillBoardV3 slides={topBarContent} />} */}
          <BillBoardV3 slides={sliderContent?.items ?? []} />
          {/* <VybzCarouselMain/> */}
          <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            {/* Partners Section */}
            <section className="">
              <SectionHeader
                viewButton={true}
                title="partners"
                route="/partners"
              />
              <PartnersSlider slides={partnersContent?.items ?? []} />
            </section>

            {/* Best Deals Section */}
            <section className="">
              <SectionHeader
                viewButton={true}
                title="best deals 🔥"
                route="/deals"
              />
              <DealsSlider slides={dealsContent?.items ?? []} />
            </section>

            {/* Trending Section */}
            <section className="">
              <SectionHeader viewButton={true} title={videoContent?.title} route="/videos" />
              <VideoSlider
              slug={videoContent?.slug}
                title={videoContent?.title}
                slides={videoContent?.items ?? []}
              />
            </section>

            {/* Recommended For You Section */}
            {/* <section className="">
               <SectionHeader  viewButton={true} title="recommended for you" route=""/>
              <VideoSlider />
            </section> */}

            {/* partner highligh Section */}

            {/* Netflix Content Banner */}
            <section>
              <PartnerBanner
                banner={partnerHighlightContent?.items}
              />
            </section>

            {/* Recommended For You Section */}
            <section className=" ">
              <SectionHeader viewButton={true} title={musicContent?.title} route="/music" />
              <MusicSlider slides={musicContent?.items ?? []} />
            </section>

            {/* Trending Section */}
            <section className="">
              <SectionHeader viewButton={true} title={gamesContent?.title} route="/games" />
              {/* <GamesSlider slides={gamesContent?.items ?? []} /> */}
            </section>

            {/*AD slider */}
            <section>
              <SectionHeader
                viewButton={false}
                title="amazing deals for you"
                route=""
              />
              <AdSlider slides={adSlides} />
            </section>

            {/* Recommended For You Section */}
            <section className=" ">
              <SectionHeader
                viewButton={true}
                title={eduContent?.title}
                route="education"
              />
              <EducationSlider slides={eduContent?.items ?? []} />
            </section>
            {/* Recommended For You Section */}
            <section className="  ">
              <SectionHeader
                viewButton={true}
                title="tune in"
                route="/podcasts"
              />
              <PodcastSlider />
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
