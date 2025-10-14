"use client";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { getHomePage } from "@/store/thunks/catalogThunks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

export interface IDealsItem{
  productId:string,
  productName:string,
  productPrice:number,
  autoRenewal:boolean,
  resourceAmount:number,
  duration:string,
  contentUrl:string,
  bestDeal:boolean,
  dealValue:number
}

export default function DealsPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [dealsContent, setDealsContent] = useState<any>(null);
  const [homeContent, setHomeContent] = useState<any>(null);

  const onSubscribeClick = () => {
    router.push(`/payment/`);
  };

  const fetchHomePage = async () =>{
        try{
           setLoading(true);
            const res = await dispatch(getHomePage()).unwrap();
  
            setHomeContent(res?.body)
        }catch(error) {
          console.error('Failed to fetch genres', error);
        }finally {
            setLoading(false);
        }
  }
      
    useEffect(() => {
    fetchHomePage();
    }, []);

    useEffect(()=>{
  
      const deals = homeContent?.find(
        (content: any) => content.slug === "best_deals"
      );
      setDealsContent(deals?.items);
     
    },[homeContent]);

  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="mt-12 pt-10">
        <div className="p-2 md:p-4 lg:p-6 xl:p-6 max-w-8xl mx-auto">
          <div className="pt-2 px-0">
            <div className="flex justify-start mb-3">
                  <MdArrowBack className="mt-3 mr-4 h-7 w-7 cursor-pointer" onClick={()=>router.back()}/>
                 <SectionHeader viewButton={false} title="Best Deals🔥" route="/home" />
                 
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {dealsContent?.map((item:any, index:number) => (
                <div
                  key={item?.productId}
                  className="bg-white dark:bg-[#2C2C2C] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                      <img
                        src={item?.contentUrl}
                        alt={item?.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-lg rounded-lg flex-shrink-0"
                      />
                      <span className="font-extrabold text-black dark:text-white capitalize text-sm sm:text-base md:text-lg truncate">
                        {item?.productId}
                      </span>
                    </div>
                    <span className="bg-[#3bad49] text-white text-xs px-2 py-1 rounded-md whitespace-nowrap ml-2">
                      {item?.productPrice}% OFF
                    </span>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg py-2 border-t-2 border-b-2 border-gray-300 font-normal text-[#2C2C2C] dark:text-[#FFFFFF] text-left mb-3 capitalize line-clamp-2 flex-grow">
                    {item?.productName}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-sm sm:text-base md:text-lg line-through font-normal text-[#2C2C2C] dark:text-[#FFFFFF]">
                        Ksh {item?.productPrice}
                      </span>
                      <span className="text-lg sm:text-xl md:text-2xl text-[#2C2C2C] dark:text-[#FFFFFF] font-extrabold mb-2">
                        Ksh {item?.productPrice}
                      </span>
                    </div>

                    <Button
                      onClick={() => onSubscribeClick()}
                      className="cursor-pointer w-full bg-[#C62676] hover:bg-[#a91e62] text-sm sm:text-base md:text-lg font-semibold text-white rounded-full capitalize py-4 sm:py-5 md:py-6 transition-colors"
                    >
                      {item?.autoRenewal?`subscribe`:`visit site`}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
