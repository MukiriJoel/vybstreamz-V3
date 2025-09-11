"use client";
import Slider from "react-slick";
import { SlickSettings } from "@/types/slick";

// ✅ Required slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import CarouselDots from "./CarouselDots";

export interface ICarousel {
  id: number;
  image: string;
}

interface AdSliderProps {
  slides?: ICarousel[];
  delay?: number;
}

const AdSlider = ({ slides = [], delay = 4000 }: AdSliderProps) => {
  const sliderRef = useRef<Slider>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Default slide if no slides provided
  const defaultSlide: ICarousel = {
    id: 1,
    image: "/images/safAd.png",
  };

  slides = [
    {
      id: 1,
      image: "/images/safAd.png",
    },
    {
      id: 2,
      image: "/images/safAd2.png",
    },
    {
      id: 3,
      image: "/images/safAd3.png",
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

  return (
    <>
      <Slider
        {...settings}
        ref={sliderRef}
        beforeChange={(_, next) => setActiveIndex(next)}
        className="adSlider pt-3 px-2 "
      >
        {slidesToRender.map((slide, index) => (
          <div className="relative " key={slide.id}>
            <div className="w-full aspect-video bg-gradient-to-r rounded-2xl overflow-hidden ">
              <img
                src={slide.image}
                alt="Advertisement"
                className="w-full h-full object-cover cursor-pointer shadow-lg"
              />
            </div>
            <div className="flex items-center justify-center mt-1">
              <CarouselDots
                slides={slides}
                goToSlide={goToSlide}
                activeIndex={activeIndex}
              />
            </div>
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        @media (max-width: 768px) {
          .adSlider .slick-list {
            height: auto;
          }
          .adSlider .slick-track {
            height: auto;
          }
        }

        @media (min-width: 768px) and (max-width: 1280px) {
          .adSlider .slick-list {
            height: auto;
          }
          .adSlider .slick-track {
            height: auto;
          }
        }

        .dot {
          transition: background-color 0.2s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default AdSlider;
