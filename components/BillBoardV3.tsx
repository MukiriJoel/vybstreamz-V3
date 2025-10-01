"use client";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import React from "react";
import CarouselDots from "./CarouselDots";
import { useRouter } from "next/navigation";
import Hls from "hls.js";
import * as dashjs from "dashjs";

export interface ICarousel {
  id: number;
  title: string;
  provider:string;
  releaseDates:string;
  trending:boolean;
  cspid:string;
  contentCategory:string;
  comments:string;
  contentDetails:object;
  contentRating:object;
  contentWarning:[];
  description?: string;  
  platformLogo?: string;
  backgroundImage?: string;
  backgroundVideo?: string; // old YouTube iframe URL
  hlsUrl?: string; // HLS (.m3u8)
  dashUrl?: string; // DASH (.mpd)
  mp4Url?: string; // MP4 fallback
  backgroundType?: "image" | "video";
}

interface BillBoardV3Props {
  slides?: ICarousel[];
  delay?: number;
  autoplay?: boolean;
  transitionSpeed?: number;
}

const BillBoardV3 = ({
  slides=[],
  delay = 8000,
  autoplay = true,
  transitionSpeed = 1000,
}: BillBoardV3Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  // --- Video player refs ---
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  type DashFactory = ReturnType<typeof dashjs.MediaPlayer>;
  type DashPlayer = ReturnType<DashFactory["create"]>;
  const dashRef = useRef<DashPlayer | null>(null);

  const onSubscribeClick = () => router.push(`/planselection/`);
  const onSaveClick = () => router.push('/profile?tab=My Favorites');

  // Default slides with working HLS URLs
  const defaultSlides: ICarousel[] = [
    // {
    //   id: 1,
    //   title: "Squid Game 3",
    //   description:
    //     "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal.",
    //   contentCategory: "Game",
    //   ageRating: "16 Yrs +",
    //   hlsUrl: "https://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
    //   backgroundImage: "/images/netflixGames.png",
    //   backgroundType: "video",
    //   streamingPlatform: "Netflix",
    //   platformLogo: "/logos/netflix.png",
    // },
    // {
    //   id: 2,
    //   title: "Mofaya",
    //   description:
    //     "A gritty drama set in modern Kenya, where every choice sparks more fire.",
    //   category: "Movie",
    //   ageRating: "16 Yrs +",
    //   hlsUrl: "https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
    //   backgroundImage: "/images/mofaya.png",
    //   backgroundType: "video",
    //   streamingPlatform: "Baze",
    //   platformLogo: "/logos/bazeLg.png",
    // },
    // {
    //   id: 3,
    //   title: "Dora",
    //   description: "A modern-day tale of discovery and danger.",
    //   category: "Movie",
    //   ageRating: "16 Yrs +",
    //   hlsUrl: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    //   backgroundImage: "/images/dora.png",
    //   backgroundType: "video",
    //   streamingPlatform: "Baze",
    //   platformLogo: "/logos/bazeLg.png",
    // },
  ];

  const slidesToRender = slides.length > 0 ? slides : defaultSlides;

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay || isPaused || slidesToRender.length <= 1) return;

    autoplayTimerRef.current = setTimeout(goToNext, delay);

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

  const goToNext = () => goToSlide((activeIndex + 1) % slidesToRender.length);
  const goToPrev = () =>
    goToSlide(activeIndex === 0 ? slidesToRender.length - 1 : activeIndex - 1);

  const handleMouseEnter = () => {
    if (autoplay) {
      setIsPaused(true);
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoplay) setIsPaused(false);
  };

  // --- Fixed Video Player Logic ---
  useEffect(() => {
    const slide = slidesToRender[activeIndex];
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Cleanup previous player
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }
    if (dashRef.current) {
      dashRef.current.reset();
      dashRef.current = null;
    }

    // Reset video element
    videoEl.src = '';
    videoEl.load();

    if (slide.hlsUrl) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false, // Set to true for debugging
          enableWorker: true,
          lowLatencyMode: true,
          backBufferLength: 90
        });
        
        hls.loadSource(slide.hlsUrl);
        hls.attachMedia(videoEl);
        
        // Add error handling
        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS Error:', data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Network error encountered, trying to recover...');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Media error encountered, trying to recover...');
                hls.recoverMediaError();
                break;
              default:
                console.log('Fatal error, cannot recover');
                hls.destroy();
                // Fallback to native video
                if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
                  (videoEl as any).src = slide.hlsUrl;
                }
                break;
            }
          }
        });

        hls.on(Hls.Events.MANIFEST_LOADED, () => {
          console.log('HLS manifest loaded successfully');
        });

        hlsRef.current = hls;
      } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        videoEl.src = slide.hlsUrl;
      } else {
        console.error('HLS not supported in this browser');
      }
    } else if (slide.dashUrl) {
      if (typeof dashjs !== 'undefined') {
        const dashFactory = dashjs.MediaPlayer();
        const dashPlayer = dashFactory.create();
        dashPlayer.initialize(videoEl, slide.dashUrl, true);
        dashRef.current = dashPlayer;
      }
    } else if((slide?.contentDetails as any)?.contentType==="mp4") {
      console.log("slide has mp4")
      videoEl.src = (slide?.contentDetails as any)?.providerContentUrl+'/'+(slide?.contentDetails as any)?.trailers[0];
    }

    // Add video event listeners for debugging
    const handleCanPlay = () => console.log('Video can start playing');
    const handleError = (e: Event) => console.error('Video error:', e);
    const handleLoadStart = () => console.log('Video load started');
    
    videoEl.addEventListener('canplay', handleCanPlay);
    videoEl.addEventListener('error', handleError);
    videoEl.addEventListener('loadstart', handleLoadStart);

    // Cleanup listeners
    return () => {
      videoEl.removeEventListener('canplay', handleCanPlay);
      videoEl.removeEventListener('error', handleError);
      videoEl.removeEventListener('loadstart', handleLoadStart);
    };
  }, [activeIndex, slidesToRender]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (dashRef.current) {
        dashRef.current.reset();
      }
    };
  }, []);

  // FIXED: Background renderer without video element inside
  const renderBackground = (slide: ICarousel, index: number) => {
 
    const isVideo = (slide?.contentDetails as any)?.contentType === "mp4";

    if (isVideo) {
      return (
        <div
          className="absolute inset-0 overflow-hidden -top-[10vh]"
          style={{ height: "calc(100% + 10vh)" }}
        >
          {/* Video element moved outside - see below */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      );
    }

    return (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: `url(${(slide?.contentDetails as any)?.providerContentUrl+(slide?.contentDetails as any)?.images?.[0]?.url})`,
            transform: index === activeIndex ? "scale(1)" : "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
    );
  };

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

  // Check if current slide should show video
  const currentSlide = slidesToRender[activeIndex];
  const shouldShowVideo = (currentSlide?.contentDetails as any)?.contentType === "mp4";

  return (
    <div
      className="relative w-full h-[90vh] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        {/* FIXED: Single video element rendered outside the slides mapping */}
        {shouldShowVideo && (
          <div
            className="absolute inset-0 overflow-hidden -top-[10vh] z-5"
            style={{ height: "calc(100% + 10vh)" }}
          >
            <video
              ref={videoRef}
              className="!absolute pt-17 !top-1/2 !left-1/2 w-[490vw] h-full object-cover !min-h-screen md:h-[56.25vw] lg:h-[56.25vw]"
              style={{ transform: "translate(-50%, -50%)" }}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        )}

        {slidesToRender.map((slide, index) => (
          <div
            key={`slide-${slide.id}`}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ transitionDuration: `${transitionSpeed}ms` }}
          >
            {renderBackground(slide, index)}
            {/* Overlay Content */}
            <div className="relative pb-9 md:pb-15 z-20 h-full flex flex-col justify-end px-8">
              {/* Title & Meta */}
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
                    {slide?.contentCategory} | {(slide?.contentRating as any)?.kfcbRating}
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
                    {slide?.description}
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
                      alt={`${slide?.provider} logo`}
                    />
                  )}
                </div>
              </div>
              {/* Action Buttons */}
              <div
                className={`flex gap-4 justify-between flex-wrap transition-all ease-out`}
              >
                <div className={`flex gap-4 mx-auto !sm:ml-0 md:mx-0 ${
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`} style={{
                  transitionDuration: `${Math.min(
                    transitionSpeed * 0.7,
                    700
                  )}ms`,
                  transitionDelay: `${Math.min(
                    transitionSpeed * 0.4,
                    400
                  )}ms`,
                }}>
                  <Button
                    onClick={onSubscribeClick}
                    className="bg-[#C62676] text-xs hover:bg-[#e91e63]/90 text-white px-8 h-10 rounded-full font-semibold w-40 cursor-pointer transform hover:scale-105 transition-transform duration-200"
                  >
                    Subscribe
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-xs text-white hover:!bg-[#333333] dark:bg-[#2C2C2C] hover:text-white px-6 h-10 rounded-full bg-[#2C2C2C] backdrop-blur-sm w-40 cursor-pointer"
                    onClick={onSaveClick}
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PrevArrow />
      <NextArrow />
    </div>
  );
};

export default BillBoardV3;