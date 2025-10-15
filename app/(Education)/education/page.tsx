"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import PartnersSlider from "@/components/PartnersSlider";
import { MdArrowForward } from "react-icons/md";
import EducationSlider from "@/components/EducationSlider";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getEduHome } from "@/store/thunks/catalogThunks";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const contentTabs = ["E-Book", "Audio Book"];
  const Router=useRouter();
  const [sliderContent, setSliderContent] = useState<any>(null);
  const [gamesHomeContent, setGamesHomeContent] = useState<any>();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  
  const onViewMoreClick = () =>{
   
    Router.push(`/viewMore/`)
  }

  const fetchEduHome = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getEduHome()).unwrap();
        console.log("gameshomeres", res);
        setGamesHomeContent(res?.body);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchEduHome();
    }, []);
  
    useEffect(() => {
      if (!gamesHomeContent) return;
  
      const sliders = gamesHomeContent?.find(
        (content: any) => content.slug === "slider"
      );
      setSliderContent(sliders);
      console.log("sliders", sliderContent);
  
  
    }, [gamesHomeContent]);

  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Main Content */}
        <main className="">
          {/* Hero Section */}
          <VybzCarouselMain slides={sliderContent?.items ?? []}/>

          <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
            {gamesHomeContent?.map((section: any) => {
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
                      section.slug === "partners" ? "/partners" : "/education"
                    }
                  />

                  {section.slug === "partners" ? (
                    <PartnersSlider slides={section.items} />
                  ) : (
                    <EducationSlider slides={section.items} />
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
