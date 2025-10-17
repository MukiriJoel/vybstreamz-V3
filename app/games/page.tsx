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
import {
  HiArrowLeft,
  HiArrowRight,
  HiOutlineSpeakerXMark,
} from "react-icons/hi2";
import {
  MdArrowForward,
  MdChevronLeft,
  MdChevronRight,
  MdOutlineVideocam,
} from "react-icons/md";
import GamesSlider from "@/components/GamesSlider";
import VybzCarouselMusic from "@/components/VybzCarouselMusic";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import SectionHeader from "@/components/SectionHeader";
import { useRouter } from "next/navigation";
import PartnersSlider from "@/components/PartnersSlider";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getGamesHome, useDataGetGames } from "@/store/thunks/catalogThunks";
import HomePageLoading from "../home/loading";

export default function GamesPage() {
  const Router = useRouter();
  // const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // const [GamesHomeContent, setGamesHomeContent] = useState<any>();
  // const [sliderContent, setSliderContent] = useState<any>(null);

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  // const fetchGamesHome = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await dispatch(getGamesHome()).unwrap();
  //       console.log("musichomeres", res);
  //       setGamesHomeContent(res?.body);
  //     } catch (error) {
  //       console.error("Failed to fetch genres", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   useEffect(() => {
  //     fetchGamesHome();
  //   }, []);
  
  //   useEffect(() => {
  //     if (!GamesHomeContent) return;
  //     const sliders = GamesHomeContent?.find(
  //       (content: any) => content.slug === "slider"
  //     );
  //     setSliderContent(sliders);
  //     console.log("sliders", sliderContent);
  //   }, [GamesHomeContent]);

  const {
      data: GamesHomeContent,
      isLoading: loading,
      isError,
    } = useDataGetGames();

   const getContentBySlug = useCallback(
      (slug: string) => {
        return GamesHomeContent?.find((content: any) => content.slug === slug);
      },
      [GamesHomeContent]
    );
  
    const sliderContent = getContentBySlug("slider");
  
    // setSliderContent(sliders);
    console.log("sliders", sliderContent);
  
    if (loading) {
      return (
        <div className="">
          <HomePageLoading />
        </div>
      );
    }
  

  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
     
      <main className="">
        <VybzCarouselMain slides={sliderContent?.items ?? []}/>

      <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            { GamesHomeContent?.filter(
                (section: any) =>
                  section.slug !== "slider" && section.items?.length > 0
              )
              .sort((a: any, b: any) => {
                // Partners always first
                if (a.slug === "partners") return -1;
                if (b.slug === "partners") return 1;
                return 0; // Keep original order for others
              })
              .map((section: any) => {
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
                      section.slug === "partners" ? "/partners" : "/games"
                    }
                  />

                  {section.slug === "partners" ? (
                    <PartnersSlider slides={section.items} />
                  ) : (
                    <GamesSlider title={section.title} slug={section.slug} slides={section.items} />
                  )}
                </section>
              );
            })}
          </div>

      </main>
    </div>
  );
}
