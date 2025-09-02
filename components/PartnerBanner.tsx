import { Button } from "./ui/button";

interface PartnerBannerProps{
    title?: string;
    logo?: string;
    button?: string;
    image?: string
}

const PartnerBanner = ({title,logo,button,image}:PartnerBannerProps) =>{
    return(
        <div>
            <div className="flex justify-between">
                <div className="flex mt-10 items-center">
                  <div className="w-14 h-14 rounded-2xl shadow-lg flex justify-center overflow-hidden">
                    <img
                      src={logo}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="ml-4 capitalize text-xl md:text-2xl lg:text-2xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] leading-[100%] ">
                    {title}
                  </h2>
                </div>
                <div className="flex items-center mt-10">
                  <Button className="cursor-pointer bg-[#c62676] hover:bg-[#a91e63] text-white text-lg lg:text-xl px-12 py-6 rounded-full font-medium capitalize">
                    {button}
                  </Button>
                </div>
              </div>
            <div className="relative mt-4 w-full h-70 sm:h-70 md:h-100 lg:h-120 xl:h-120 rounded-lg overflow-hidden shadow-2xl">
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 rounded-xl shadow-2xl">
                <img
                  src={image}
                  alt="Netflix comedies showcase"
                  className="w-full h-full  object-fit"
                />
              </div>
            </div>
        </div>
        
    )
}
export default PartnerBanner;