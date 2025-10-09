import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IPartnerItem } from "./PartnersSlider";

export interface IPartnerHighlightItem{
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
interface PartnerBannerProps{
   banner:IPartnerHighlightItem[];
}

const PartnerBanner = ({banner=[]}:PartnerBannerProps) =>{
  const router=useRouter();

  const onVisitSiteClick = (url:string) =>{
       window.open(url, '_blank');
  }

    return(
        <div>
          <div>
                <h2 className="capitalize text-xl md:text-2xl lg:text-2xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] leading-[100%] ">
                    {banner?.[0]?.partner}
                  </h2>
              </div>
            <div className="flex justify-between items-end h-14 mt-4">
              
                <div className="flex pt-1 h-14 items-center">
                  
                  <div className="w-14 h-14 rounded-2xl bg-transparent shadow-lg flex justify-center overflow-hidden">
                    <img
                      src={banner?.[0]?.logoUrl}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="ml-4 capitalize text-xl md:text-2xl lg:text-2xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] leading-[100%] ">
                    {}
                  </h2>
                </div>
                <div className="flex items-center mt-10">
                  <Button onClick={()=>onVisitSiteClick(banner?.[0]?.contentUrl)} className="cursor-pointer bg-[#c62676] hover:bg-[#a91e63] text-white text-lg lg:text-xl px-12 py-6 rounded-full font-medium capitalize">
                    Visit Site
                  </Button>
                </div>
            </div>
          <div className="relative mt-4 w-full aspect-video rounded-lg overflow-hidden shadow-2xl">
  <img
    src={banner?.[0]?.logoUrl}
    alt="Netflix comedies showcase"
    className="w-full h-full object-cover cursor-pointer"
  />
</div>

        </div>
        
    )
}
export default PartnerBanner;