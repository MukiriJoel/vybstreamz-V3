"use client"
import PartnersSlider from "@/components/PartnersSlider";
import SearchDropdown from "@/components/SearchDropdown";
import { Button } from "@/components/ui/button";
import VideoSlider from "@/components/VideoSlider";
import { Input } from "@mui/material";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdArrowForward } from "react-icons/md";

export default function SearchPage(){

     const Router=useRouter();
        
         const onHandleClick = () =>{
         
          Router.push(`/viewMore/`)
        }
        
    return(
        <>
        <div className="bg-[#F2F2F2] dark:bg-[#141414]">
        {/* Hero Section */}
        <main className="">
         
          <div className="px-2 pt-12 mt-12 max-w-8xl mx-auto">
            {/* search */}
            <div className="py-3">
                <SearchDropdown/>
            </div>
       
            {/* Partners Section */}
            <section className="">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-black dark:text-white">Partners</h3>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <PartnersSlider />
            </section>


            {/* Trending Section */}
            <section className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">Trending</h3>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
               
                  <VideoSlider />
               
         
            </section>

            {/* Recommended For You Section */}
            <section className="">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">
                  Recommended For You
                </h3>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>


            {/* Recommended For You Section */}
            <section className=" py-4  ">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">Listen</h3>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>


            {/* Recommended For You Section */}
            <section className=" py-4  ">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-black dark:text-white">Comedy</h3>
                <Button
                  variant="ghost"
                  className="cursor-pointer text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
                >
                  View More
                  <MdArrowForward className="!w-[36px] !h-[36px]" />
                </Button>
              </div>
              <VideoSlider />
            </section>
           
          </div>
        </main>
      </div>
        </>
    )
}