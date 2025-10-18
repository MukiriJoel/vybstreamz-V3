"use client";
import { useCallback, useEffect, useState } from "react";
import VybzCarouselEducation from "@/components/VybzCarouselEducation";
import EducationSlider from "@/components/EducationSlider";
import { MdArrowForward } from "react-icons/md";
import { Button } from "@/components/ui/button";
import VybzMusicPlayer from "@/components/VybzMusicPlayer";
import SectionHeader from "@/components/SectionHeader";
import ReviewSlider from "@/components/ReviewSlider";
import RatingsComponent from "@/components/ratings-section";
import { useDataGetEducation } from "@/store/thunks/catalogThunks";
import HomePageLoading from "@/app/home/loading";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BookDetailsProps{
urlParams:string;
}

export default function BookDetails({urlParams}:BookDetailsProps) {
  const [activeTab, setActiveTab] = useState("E-Book");
  const tabs = ["E-Book", "Audio Book"];

  const [EduItem, setEduItem] = useState<any>(null);
  const [genre, setGenre] = useState<any>(null);
  const [eduId, setEduId] = useState<any>(null);
  
  useEffect(() => {
      if (!urlParams) return;
      
      const decoded = decodeURIComponent(urlParams as string); // "id=1&genre=action"
   
      // Get genre
      const lastItem = decoded.split('&').pop(); // "genre=action"
      const slug = lastItem?.split('=')[1];
      
      setGenre(slug);
     
      // Get id
      const firstItem = decoded.split('&')[0]; // "id=1"
      const idValue = firstItem.split('=')[1];
  
      setEduId(idValue);
  }, [urlParams]);

  const {
        data: eduHomeContent,
        isLoading: loading,
        isError,
      } = useDataGetEducation();
      
    const getContentBySlugId = useCallback(
    (slug: string, itemId?: number) => {
       
      const content = eduHomeContent?.find((content: any) => content.slug === slug);
      console.log("cont",content)
      if (!content) return undefined;
      
      // If itemId is provided, find the specific item
      if (itemId !== undefined) {
        // Convert itemId to a number for comparison
        const numericId = Number(itemId);
        const item = content.items?.find((item: any) => item.id === numericId);
        console.log("item", item);
        return item;
      }
      
      // Otherwise return the entire content object
      return content;
    },
    [eduHomeContent]
  );

  useEffect(() => {
    if (genre && eduId && eduHomeContent) {
      const edu = getContentBySlugId(genre, eduId);
      console.log("slugedu", edu);
      setEduItem(edu); // Store in state
    }
  }, [genre, eduId, eduHomeContent, getContentBySlugId]);

   console.log("current videoItem:", EduItem);

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
        {/* Main Content */}
        <main className="">
          {/* <VybzCarouselEducation tabs={tabs} activeTab={activeTab} /> */}
          <VybzMusicPlayer
            musicItem={EduItem}
          />
          {/* Content Navigation */}
          {/* TABS */}
          <div className="bg-[#F2F2F2] dark:bg-[#141414] mb-8 pt-8  ">
            <nav className="flex space-x-8 overflow-x-auto justify-center scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                                py-3 px-1 border-b-3 cursor-pointer font-semibold text-lg md:text-xl lg:text-xl whitespace-nowrap transition-colors
                                ${
                                  activeTab === tab
                                    ? "border-[#c62676] text-[#c62676]"
                                    : "border-transparent text-[#000000 ] hover:text-[#2C2C2C] dark:text-[#FFFFFF] hover:border-[#cccccc]"
                                }
                            `}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          {activeTab === "E-Book" ? (
            <div className="py-2 px-2 md:px-4 lg:px-6 xl:px-6">
              {/* top ranked Section */}

              {/* trending Section */}
              <div className="">
                <SectionHeader
                  title="similar E-Books"
                  viewButton={true}
                  route="/education"
                />
                {/* <EducationSlider></EducationSlider> */}
              </div>
              <section>
                <RatingsComponent />
              </section>
              <section>
                <SectionHeader
                  viewButton={true}
                  title="user reviews"
                  route={"/viewMore/ContentReview"}
                />
                <ReviewSlider />
              </section>
            </div>
          ) : (
            <div className="py-2 px-2 md:px-4 lg:px-6 xl:px-6">
              {/* top ranked Section */}
              <div className="">
                <SectionHeader
                  title="similar Audio Books"
                  viewButton={true}
                  route="/education"
                />

                {/* <EducationSlider></EducationSlider> */}
              </div>
              <section>
                <RatingsComponent />
              </section>
              <section>
                <SectionHeader
                  viewButton={true}
                  title="user reviews"
                  route={"/viewMore/ContentReview"}
                />
                <ReviewSlider />
              </section>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
