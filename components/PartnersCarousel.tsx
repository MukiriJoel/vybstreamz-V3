"use client"
import Slider from "react-slick";
import { SlickSettings } from "@/types/slick";

// ✅ Required slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import CarouselDots from "./CarouselDots";

export interface ICarousel {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface PartnersCarouselProps {
  slides?: ICarousel[];
  delay?: number;
}


const PartnersCarousel = ({
  slides = [],
  delay = 4000,
}:PartnersCarouselProps) =>{

    const sliderRef = useRef<Slider>(null);
    const [activeIndex, setActiveIndex] = useState(0);

     // Default slide if no slides provided
    const defaultSlide: ICarousel = {
    id: 1,
    name: "Baze",
    description: "The journey of a couple towards their wedding, in their planning they...",
    image: "/images/bazePoster.png",
    };

    slides = [
            {
              id:1,
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              image: "/images/bazePoster.png",
            },
            {
              id:2,
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              image: "/images/bazePoster.png",
            },
            {
              id:3,
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              image: "/images/netflixGames.png",
            },
            {
              id:4,
              name: "StarTimes",
              description: "The journey of a couple towards their wedding, in their planning they...",
              image: "/images/netflixGames.png",
            },
            {
              id:5,
              name: "YouTube",
              description: "The journey of a couple towards their wedding, in their planning they...",
              image: "/images/netflixGames.png",
            },
            {
              id:6,
              name: "GoTv",
              description: "Your account gives you access to live Gotv content and community",
              image: "/images/netflixGames.png",
            },
          ];

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
                        <div className="relative pb-6" key={slide.id}>
                            <div className="bg-[#F2F2F2] dark:bg-[#141414] h-60 sm:h-45 md:h-100 lg:h-120 xl:h-120 rounded-4xl overflow-hidden">
                                {/* Image Container */}
                                
                                    <img
                                    src={slide.image}
                                    alt="Advertisement"
                                    className="w-full h-full rounded-4xl object-cover"
                                    />
                                
                            </div>
                            <div className="flex justify-end mt-4 pr-12">
                                <CarouselDots slides={slides} goToSlide={goToSlide} activeIndex={activeIndex}/>
                            </div>
                        
                              <div className="text-left w-full">
                                     <h2 className="text-4xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-3 mt-4">{slide.name}</h2>
                                      <p className="text-[#2C2C2C] dark:text-[#FFFFFF] !font-normal text-[12px] tracking-normal leading-none">
                                      {slide.description}
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