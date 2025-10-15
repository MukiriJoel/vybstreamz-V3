"use client";
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
  const [videoHomeContent, setVideVideoHomeContent] = useState<any>();
  const [topBarContent, setTopBarContent] = useState<any>(null);
  const [sliderContent, setSliderContent] = useState<any>(null);
  const [actionContent, setActionContent] = useState<any>(null);
  const [kidsContent, setKidsContent] = useState<any>(null);
  const [PartnersContent, setPartnersContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  const fetchVideoHome = async () => {
    try {
      setLoading(true);
      const res = await dispatch(getVideoHome()).unwrap();
      console.log("videohomeres", res);
      setVideVideoHomeContent(res?.body);
    } catch (error) {
      console.error("Failed to fetch genres", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideoHome();
  }, []);

  useEffect(() => {
    if (!videoHomeContent) return;

    const sliders = videoHomeContent?.find(
      (content: any) => content.slug === "slider"
    );
    setSliderContent(sliders);
    console.log("sliders", sliderContent);

    const action = videoHomeContent?.find(
      (content: any) => content.slug === "action"
    );
    setActionContent(action);
    console.log("action", actionContent);

    const kids = videoHomeContent?.find(
      (content: any) => content.slug === "kids-animation"
    );
    setKidsContent(kids);
    console.log("kids", kidsContent);

    const partners = videoHomeContent?.find(
      (content: any) => content.slug === "partners"
    );
    setPartnersContent(partners);
    console.log("partners", PartnersContent);
  }, [videoHomeContent]);

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
          <VybzCarouselMain slides={sliderContent?.items ?? []} />
          {/* <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">

            <section className="">
                <SectionHeader  viewButton={true} title={PartnersContent?.title} route="/partners"/>
              <PartnersSlider slides={PartnersContent?.items ?? []}/>
            </section>


            
            <section className="">
                <SectionHeader  viewButton={true} title={actionContent?.title}  route="/videos"/>
               
                  <VideoSlider title={actionContent?.title} slides={actionContent?.items ?? []} />
               
         
            </section>

           
            <section className="">
                <SectionHeader  viewButton={true} title={kidsContent?.title}  route="/videos"/>
              <VideoSlider title={kidsContent?.title} slides={kidsContent?.items ?? []} />
            </section>

           
          </div> */}
          <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            {videoHomeContent?.map((section: any) => {
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
                    <VideoSlider title={section.title} slides={section.items} />
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
