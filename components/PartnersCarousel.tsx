"use client"
import Slider from "react-slick";
import { SlickSettings } from "@/types/slick";

// ✅ Required slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import CarouselDots from "./CarouselDots";
import { IPartnerItem } from "./PartnersSlider";
import { getPreviouslyCachedImageOrNull } from "next/dist/server/image-optimizer";


interface PartnersCarouselProps {
  slides?: IPartnerItem[];
  delay?: number;
}


const PartnersCarousel = ({
  slides = [],
  delay = 4000,
}:PartnersCarouselProps) =>{

    const sliderRef = useRef<Slider>(null);
    const [activeIndex, setActiveIndex] = useState(0);

     // Default slide if no slides provided
    const defaultSlide: IPartnerItem = {
    partner: "default",
    category: "Education",
    cspId: 7126,
    onAggregator: true,
    active:true,
    callbackUrl:"https://webhook.site/1abda4d9-24dc-488d-9e10-710ba6d94718",
    logoUrl:"https://d2xbsd6elv8h3x.cloudfront.net/provider/inua/images/inua_logo.png",
    contentUrl:"https://app.inua.io/",
    highlighted:false,
    banner:null
    };


    const slidesToRender = slides.length > 0 ? slides : [defaultSlide];

    const settings: SlickSettings = {
        dots: false,
        fade: true,
        infinite: true,
        autoplay: slidesToRender.length > 1,
        autoplaySpeed: delay,
        pauseOnHover: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // afterChange: (i: number) => setActiveIndex(i),
    };

    const goToSlide = (i: number) => {
        console.log("slide", i);
        sliderRef.current?.slickGoTo(i);
    };

    return(
        <>
            
                <Slider  {...settings}
                    ref={sliderRef}
                    beforeChange={(_, next) => setActiveIndex(next)}
                    className="adSlider pt-3 bg-[#F2F2F2] dark:bg-[#141414]"
                    >
                    
                    {slidesToRender.map((slide, index) => (
                        <div className="relative pb-6" key={slide?.cspId}>
                            <div className="bg-[#F2F2F2] dark:bg-[#141414] h-60 sm:h-45 md:h-100 lg:h-120 xl:h-120 rounded-4xl overflow-hidden">
                                {/* Image Container */}
                                
                                    <img
                                    src={slide?.logoUrl}
                                    alt="Advertisement"
                                    className="w-full h-full rounded-4xl object-contain"
                                    />
                                
                            </div>
                            <div className="flex justify-end mt-4 pr-12">
                                <CarouselDots slides={slides} goToSlide={goToSlide} activeIndex={activeIndex}/>
                            </div>
                        
                              <div className="text-left w-full">
                                     <h2 className="text-4xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-3 mt-4">{slide?.partner}</h2>
                                      <p className="text-[#2C2C2C] dark:text-[#FFFFFF] !font-normal text-[12px] tracking-normal leading-none">
                                      {slide?.callbackUrl}
                                      </p>
                              </div>
                              
                            
                            
                        </div>
                    ))}
                    
                </Slider>  

                <style jsx global>{`

                  @media(max-width:768px){
                    .adSlider .slick-list{
                      height:auto
                    }
                    .adSlider .slick-track{
                        height:auto
                    }
                  }

                  @media(min-width:768px) and (max-width:1280px){
                    .adSlider .slick-list{
                      height:auto
                    }
                    .adSlider .slick-track{
                        height:auto
                    }
                  }
                
                .dot {
                  transition: background-color 0.2s ease-in-out;
                }
          
          `}</style>
           
        </>
    )
}

export default PartnersCarousel;