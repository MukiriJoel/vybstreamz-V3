"use client";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import React from "react";
import CarouselDots from "./CarouselDots";
import { useRouter } from "next/navigation";

export interface ICarousel {
  id: number;
  title: string;
  description?: string;
  category?: string;
  ageRating?: string;
  streamingPlatform?: string;
  platformLogo?: string;
  backgroundImage?: string;
  backgroundVideo?: string; // now expects iframe embed URLs
  backgroundType?: "image" | "video";
}

interface BillBoardV3Props {
  slides?: ICarousel[];
  delay?: number;
  autoplay?: boolean;
  transitionSpeed?: number;
}

const BillBoardV3 = ({
  slides = [],
  delay = 8000,
  autoplay = true,
  transitionSpeed = 1000,
}: BillBoardV3Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const onSubscribeClick = () => {
    router.push(`/planselection/`);
  };

  // Default slides data
  const defaultSlides: ICarousel[] = [
    {
      id: 1,
      title: "Squid Game 3",
      description:
        "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal.",
      category: "Game",
      ageRating: "16 Yrs +",
      backgroundVideo:
        "https://youtube.com/embed/vfYBFhunfsY?autoplay=1&mute=1&controls=0&loop=1&playlist=vfYBFhunfsY",
      backgroundImage: "/images/netflixGames.png",
      backgroundType: "video",
      streamingPlatform: "Netflix",
      platformLogo: "/logos/netflix.png",
    },
    {
      id: 2,
      title: "Mofaya",
      description:
        "A gritty drama set in modern Kenya, where every choice sparks more fire.",
      category: "Movie",
      ageRating: "16 Yrs +",
      backgroundVideo:
        "https://www.youtube.com/embed/RARtsWwvxAk?autoplay=1&mute=1&controls=0&loop=1&playlist=RARtsWwvxAk",
      backgroundImage: "/images/mofaya.png",
      backgroundType: "video",
      streamingPlatform: "Baze",
      platformLogo: "/logos/bazeLg.png",
    },
    {
      id: 3,
      title: "Dora",
      description: "A modern-day tale of discovery and danger.",
      category: "Movie",
      ageRating: "16 Yrs +",
      backgroundVideo:"https://youtube.com/embed/gUTtJjV852c?autoplay=1&mute=1&controls=0&loop=1&playlist=gUTtJjV852c",
      backgroundImage: "/images/dora.png",
      backgroundType: "video",
      streamingPlatform: "Baze",
      platformLogo: "/logos/bazeLg.png",
    },
  ];

  const slidesToRender = slides.length > 0 ? slides : defaultSlides;

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay || isPaused || slidesToRender.length <= 1) return;

    autoplayTimerRef.current = setTimeout(() => {
      goToNext();
    }, delay);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [activeIndex, isPaused, autoplay, delay, slidesToRender.length]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);

    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);

    setTimeout(() => setIsTransitioning(false), transitionSpeed);
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % slidesToRender.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex =
      activeIndex === 0 ? slidesToRender.length - 1 : activeIndex - 1;
    goToSlide(prevIndex);
  };

  const handleMouseEnter = () => {
    if (autoplay) {
      setIsPaused(true);
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay) setIsPaused(false);
  };

  const toggleAutoplay = () => setIsPaused(!isPaused);

  // Navigation Arrows
  const PrevArrow = () => (
    <button
      onClick={goToPrev}
      disabled={isTransitioning}
      className="hidden cursor-pointer md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-[#C62676] disabled:opacity-50 transition-colors duration-200"
    >
      <MdChevronLeft className="w-6 h-6 text-white" />
    </button>
  );

  const NextArrow = () => (
    <button
      onClick={goToNext}
      disabled={isTransitioning}
      className="hidden cursor-pointer md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-[#C62676] disabled:opacity-50 transition-colors duration-200"
    >
      <MdChevronRight className="w-6 h-6 text-white" />
    </button>
  );

  // Background renderer (iframe or image)
  const renderBackground = (slide: ICarousel, index: number) => {
    const isVideo = slide.backgroundType === "video" && slide.backgroundVideo;

    if (isVideo) {
      return (
        <div className="absolute inset-0 overflow-hidden">
            <iframe
            src={slide.backgroundVideo}
            className="!absolute !top-1/2 !left-1/2 w-[250vw] h-[100vh] !min-h-screen  md:h-[56.25vw] lg:h-[56.25vw]"
            style={{
                transform: "translate(-50%, -50%)",
            }}
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
        
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40" />
        </div>

      );
    }

    return (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${slide.backgroundImage})`,
            transform: index === activeIndex ? "scale(1)" : "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  };

  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slidesToRender.map((slide, index) => (
          <div
            key={`slide-${slide.id}`}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              transitionDuration: `${transitionSpeed}ms`,
            }}
          >
            {renderBackground(slide, index)}

            {/* Overlay Content */}
            <div className="relative pb-9 md:pb-15 z-20 h-full flex flex-col justify-end px-8">
              <div className="flex flex-wrap items-end gap-6 mb-4">
                <div className="flex-1 min-w-[150px]">
                  <h1
                    className={`text-[28px] font-extrabold text-white capitalize transition-all ease-out ${
                      index === activeIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDuration: `${Math.min(
                        transitionSpeed * 0.7,
                        700
                      )}ms`,
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className={`text-white text-[14px] font-semibold mt-2 transition-all ease-out ${
                      index === activeIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDuration: `${Math.min(
                        transitionSpeed * 0.7,
                        700
                      )}ms`,
                      transitionDelay: `${Math.min(
                        transitionSpeed * 0.1,
                        100
                      )}ms`,
                    }}
                  >
                    {slide.category} | {slide.ageRating}
                  </p>
                  <p
                    className={`text-white text-[12px] max-w-md pt-1 transition-all ease-out ${
                      index === activeIndex
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDuration: `${Math.min(
                        transitionSpeed * 0.7,
                        700
                      )}ms`,
                      transitionDelay: `${Math.min(
                        transitionSpeed * 0.2,
                        200
                      )}ms`,
                    }}
                  >
                    {slide.description}
                  </p>
                </div>

                <div
                  className={`flex pt-10 items-center pr-10 cursor-pointer transition-all ease-out ${
                    index === activeIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDuration: `${Math.min(
                      transitionSpeed * 0.7,
                      700
                    )}ms`,
                    transitionDelay: `${Math.min(
                      transitionSpeed * 0.3,
                      300
                    )}ms`,
                  }}
                >
                  <p className="text-white/70 text-[14px] uppercase tracking-wide">
                    stream on:
                  </p>
                  {slide.platformLogo && (
                    <img
                      src={slide.platformLogo}
                      className="w-[45px] h-[45px] ml-2"
                      alt={`${slide.streamingPlatform} logo`}
                    />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className={`flex gap-4 justify-between flex-wrap transition-all ease-out ${
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDuration: `${Math.min(
                    transitionSpeed * 0.7,
                    700
                  )}ms`,
                  transitionDelay: `${Math.min(
                    transitionSpeed * 0.4,
                    400
                  )}ms`,
                }}
              >
                <div className="flex gap-4 mx-auto !sm:ml-0 md:mx-0">
                  <Button
                    onClick={onSubscribeClick}
                    className="bg-[#C62676] text-xs hover:bg-[#e91e63]/90 text-white px-8 h-10 rounded-full font-semibold w-40 cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  >
                    Subscribe
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-xs text-white hover:bg-white dark:bg-[#2C2C2C] hover:text-white px-6 h-10 rounded-full bg-[#2C2C2C] backdrop-blur-sm w-40 cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>

                <div className="flex items-center gap-4 mx-auto md:mx-0 md:pr-10">
                  <CarouselDots
                    slides={slidesToRender}
                    goToSlide={goToSlide}
                    activeIndex={activeIndex}
                  />
                  {/* {autoplay && (
                    <Button
                      onClick={toggleAutoplay}
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-white border border-white/20 rounded-full cursor-pointer transition-colors duration-200"
                      title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    >
                      {isPaused ? (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      )}
                    </Button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <PrevArrow />
      <NextArrow />


      <style jsx global>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default BillBoardV3;
