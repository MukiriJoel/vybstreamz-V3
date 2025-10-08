import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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

interface DealsProps{
  slides:IDealsItem[]
}

const DealsSlider = ({slides=[]}:DealsProps) => {
  const router = useRouter();

const onSubscribeClick = () =>{
     router.push(`/auth/payment/`);
  }
  
  return (
    <>
      <div className="overflow-x-auto scrollbar-hide pt-4">
        <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 text-center min-w-max">
          {slides.map((slide, index) => (
            <div 
              key={slide.productId} 
              className="bg-white dark:bg-[#2C2C2C] rounded-lg sm:rounded-xl flex-shrink-0 w-43 sm:w-64 md:w-72 lg:w-80 p-3 sm:p-4 md:p-5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 min-w-0 flex-1">
                  <img
                    src={slide.contentUrl}
                    
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-lg rounded-lg flex-shrink-0"
                  />
                  <span className="font-extrabold text-black dark:text-white capitalize text-sm sm:text-base md:text-lg truncate">
                    {slide.productId}
                  </span>
                </div>
                <span className="bg-[#3bad49] text-white text-xs px-2 py-1 rounded-md whitespace-nowrap ml-2">
                  {slide.productPrice}% OFF
                </span>
              </div>
              
              <p className="text-sm sm:text-base md:text-lg py-2 border-t-2 border-b-2 border-gray-300 font-normal text-[#2C2C2C] dark:text-[#FFFFFF] text-left mb-3 capitalize line-clamp-2 flex-grow">
                {slide.productName}
              </p>
              
              <div className="mt-auto">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-sm sm:text-base md:text-lg line-through font-normal text-[#2C2C2C]  dark:text-[#FFFFFF]">
                    Ksh {slide.productPrice}
                  </span>
                  <span className="text-lg sm:text-xl md:text-2xl text-[#2C2C2C] dark:text-[#FFFFFF] font-extrabold mb-2">
                    Ksh {slide.productPrice}
                  </span>
                </div>
                
                <Button onClick={()=>onSubscribeClick()} className="text-capitalize cursor-pointer w-full bg-[#C62676] hover:bg-[#a91e62] text-sm sm:text-base md:text-lg font-semibold text-white rounded-full capitalize py-4 sm:py-5 md:py-6 transition-colors">
                  {slide.autoRenewal?`subscribe`:`visit site`}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DealsSlider;