"use client"
import { useRouter } from "next/navigation";

export interface IPartnerItem{
  partner:string,
  category:string,
  cspId:number,
  onAggregator:boolean,
  active:boolean,
  callbackUrl:string,
  logoUrl:string,
  contentUrl:string,
  highlighted:boolean,
  banner:string | null

}

interface PartnerProps{
  slides:IPartnerItem[]
}

const PartnersSlider =({slides=[]}:PartnerProps)=>{
   const Router=useRouter();
  
    const onHandleClick=(partner:any)=>{
      Router.push(`/partners/${partner.csId}`)
    }
    
    return (
        <>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 md:gap-4 sm:gap-3 min-w-max pb-5">
                {slides.map((partner, index) => (
                  <div
                    key={partner.cspId}
                    className="cursor-pointer pt-6 flex flex-col items-center justify-center flex-shrink-0 lg:h-[200px] w-28 xs:h-24 xs:w-24 sm:h-40 sm:w-36 md:h-40 md:w-38 lg:h-40 lg:w-40 xl:h-48 xl:w-44 2xl:h-48 2xl:w-48"
                    onClick={()=>onHandleClick(partner)}
                  >
                    <div className="bg-[#F2F2F2] dark:bg-[#141414] mb-2 !min-h-28 !min-w-28 xs:h-25 xs:w-25 sm:h-28 sm:w-28 md:h-36 md:w-28 lg:h-35 lg:w-35 xl:h-40 xl:w-33 rounded-4xl shadow-sm dark:shadow-sm overflow-hidden">
                      <img
                      src={partner.logoUrl || "/placeholder.svg"}
                      alt={partner.partner}
                      className="w-full h-full object-contain"
                      />
                    </div>
                   
                    <span className="text-lg text-wrap line-clamp-1 font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] capitalize">
                      {partner.partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        </>
    )
}

export default PartnersSlider;