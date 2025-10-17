"use client";
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import { MdArrowForward } from "react-icons/md";
import PartnersSlider from "@/components/PartnersSlider";
import VideoSlider from "@/components/VideoSlider";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import {
  getTopBarContent,
  useDataGetVideo,
} from "@/store/thunks/catalogThunks";
import HomePageLoading from "../home/loading";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const dispatch = useAppDispatch();
  // const [videoHomeContent, setVideVideoHomeContent] = useState<any>();
  const [topBarContent, setTopBarContent] = useState<any>(null);
  // const [sliderContent, setSliderContent] = useState<any>(null);
  const [actionContent, setActionContent] = useState<any>(null);
  const [kidsContent, setKidsContent] = useState<any>(null);
  const [PartnersContent, setPartnersContent] = useState<any>(null);
  // const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  const {
    data: videoHomeContent,
    isLoading: loading,
    isError,
  } = useDataGetVideo();
  
  const getContentBySlug = useCallback(
    (slug: string) => {
      return videoHomeContent?.find((content: any) => content.slug === slug);
    },
    [videoHomeContent]
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
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
          <VybzCarouselMain slides={sliderContent?.items ?? []} />
          <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            {videoHomeContent
              ?.filter(
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
                // console.log("section",section)
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
                        section.slug === "partners" ? "/partners" : "/videos"
                      }
                    />

                    {section.slug === "partners" ? (
                      <PartnersSlider slides={section.items} />
                    ) : (
                      <VideoSlider
                        title={section.title}
                        slug={section.slug}
                        slides={section.items}
                      />
                    )}
                  </section>
                );
              })}
          </div>
        </main>
      </div>
    </>
  );
}
