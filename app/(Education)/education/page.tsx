"use client"
import { Button } from "@/components/ui/button";
import VybzCarouselMain from "@/components/VybzCarouselMain";
import PartnersSlider from "@/components/PartnersSlider";
import { MdArrowForward } from "react-icons/md";
import EducationSlider from "@/components/EducationSlider";
import { useRouter } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {
  const contentTabs = ["E-Book", "Audio Book"];
  const Router=useRouter();
  
   const onHandleClick = () =>{
   
    Router.push(`/viewMore/`)
  }
  return (
    <>
      <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Main Content */}
        <main className="">
          {/* Hero Section */}
          <VybzCarouselMain />

          <div className="p-8 max-w-8xl mx-auto">
            {/* Partners Section */}
            <div className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">Partners</h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <PartnersSlider />
            </div>

            {/* Best Deals Section */}

            {/* Trending Section */}
            <div className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white capitalize">
                  Recently Updated
                </h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">Kids</h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Trending Section */}
            <div className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">Business</h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Digital Skills
                </h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider></EducationSlider>
            </div>

            {/* Trending Section */}
            <div className="">
              <div className="flex items-center justify-between ">
                <h3 className="text-2xl font-bold text-black dark:text-white">Trending</h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>

            {/* Recommended For You Section */}
            <div className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Recommended For You
                </h3>
                <Button
                  variant="ghost"
                  className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <EducationSlider/>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
