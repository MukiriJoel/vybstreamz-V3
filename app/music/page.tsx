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
import { useCallback, useEffect, useState } from "react";
import { getMusicHome, getTopBarContent, useDataGetMusic } from "@/store/thunks/catalogThunks";
import { useAppDispatch } from "@/hooks/redux";
import HomePageLoading from "../home/loading";

export default function MusicPage() {
  const dispatch = useAppDispatch();
  // const [MusicHomeContent, setMusicHomeContent] = useState<any>();
  // const [sliderContent, setSliderContent] = useState<any>(null);
  // const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

    const {
      data: MusicHomeContent,
      isLoading: loading,
      isError,
    } = useDataGetMusic();

     const getContentBySlug = useCallback(
        (slug: string) => {
          return MusicHomeContent?.find((content: any) => content.slug === slug);
        },
        [MusicHomeContent]
      );

        const sliderContent = getContentBySlug("slider");
     

   if (loading) {
      return (
        <div className="">
          <HomePageLoading />
        </div>
      );
    }

  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="">
        {/* Podcast Player Section */}
        <VybzCarouselMusic slides={sliderContent?.items ?? []} />

        <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
          {MusicHomeContent?.filter(
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
                    route={section.slug === "partners" ? "/partners" : "/music"}
                  />

                  {section.slug === "partners" ? (
                    <PartnersSlider slides={section.items} />
                  ) : (
                    <MusicSlider title={section.title} slug={section.slug} slides={section.items} />
                  )}
                </section>
              );
            })}
        </div>
      </main>
    </div>
  );
}


