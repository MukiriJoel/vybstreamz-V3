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
  backgroundVideo?: string;
  backgroundType?: 'image' | 'video';
}

interface BillBoardV2Props {
  slides?: ICarousel[];
  delay?: number;
  autoplay?: boolean;
  transitionSpeed?: number; // Duration of slide transitions in milliseconds
}

const BillBoardV2 = ({
  slides = [],
  delay = 20000,
  autoplay = true, // Default to true for backward compatibility
  transitionSpeed = 1000, // Default transition speed in milliseconds
}: BillBoardV2Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState<{[key: number]: boolean}>({});
  const [videoError, setVideoError] = useState<{[key: number]: boolean}>({});
  const [autoplayEnabled, setAutoplayEnabled] = useState(autoplay); // Use prop value
  const [isPaused, setIsPaused] = useState(false); // For manual pause control
  const [userInteracted, setUserInteracted] = useState(false); // Track user interaction
  
  const videoRefs = useRef<{[key: number]: HTMLVideoElement}>({});
  const autoplayTimerRef =  useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();
    
  const onSubscribeClick = () => {
    router.push(`/planselection/`);
  }

  // Default slides data
  const defaultSlides: ICarousel[] = [
    {
      id: 1,
      title: "Squid Game 3",
      description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
      category: "Game",
      ageRating: "16 Yrs +",
      backgroundVideo:  "/videos/squid_game.mp4",
      backgroundImage: "/images/netflixGames.png", // Fallback
      backgroundType: "video",
      streamingPlatform: "Netflix",
      platformLogo: "/logos/netflix.png"
    },
    {
      id: 2,
      title: "Mofaya",
      description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
      category: "Movie",
      ageRating: "16 Yrs +",
      backgroundVideo: "/videos/MofayaTrailer.mp4",
      backgroundImage: "/images/mofaya.png",
      backgroundType: "video",
      streamingPlatform: "Baze",
      platformLogo: "/logos/bazeLg.png"
    },
    {
      id: 3,
      title: "Dora",
      description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
      category: "Movie",
      ageRating: "16 Yrs +",
      backgroundVideo: "/videos/MofayaTrailer.mp4",
      backgroundImage: "/images/dora.png", // Fallback
      backgroundType: "video",
      streamingPlatform: "Baze",
      platformLogo: "/logos/bazeLg.png"
    }
  ];
 const slidesToRender = slides.length > 0 ? slides : defaultSlides;"use client";
  // Track user interaction for autoplay policy compliance
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true);
      // Try to play the current video after user interaction
      const currentSlide = slidesToRender[activeIndex];
      if (currentSlide?.backgroundType === 'video') {
        const currentVideo = videoRefs.current[activeIndex];
        if (currentVideo && videoLoaded[activeIndex] && !videoError[activeIndex]) {
          currentVideo.play().catch(() => {
            console.warn('Video play failed even after user interaction');
          });
        }
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [activeIndex, videoLoaded, videoError, slidesToRender]);

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay || !autoplayEnabled || isPaused || slidesToRender.length <= 1) return;

    const startAutoplay = () => {
      autoplayTimerRef.current = setTimeout(() => {
        goToNext();
      }, delay);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [activeIndex, autoplayEnabled, isPaused, autoplay, delay, slidesToRender.length]);


    // Initial video play for first slide - enhanced for larger screens
  useEffect(() => {
    const firstSlide = slidesToRender[0];
    if (firstSlide?.backgroundType === 'video' && activeIndex === 0) {
      // Increase delay for larger screens where rendering takes longer
      const delay = window.innerWidth > 1024 ? 800 : 500;
      
      const timer = setTimeout(() => {
        const firstVideo = videoRefs.current[0];
        if (firstVideo && videoLoaded[0] && !videoError[0]) {
          // Ensure video is ready state
          if (firstVideo.readyState >= 3) { // HAVE_FUTURE_DATA or higher
            firstVideo.currentTime = 0;
            const playPromise = firstVideo.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                if (error.name === 'AbortError') {
                  console.log('First video play aborted - will retry after user interaction');
                } else {
                  console.warn('Failed to play first video on mount:', error.name);
                }
              });
            }
          } else {
            // If not ready, wait for canplaythrough event
            const handleCanPlay = () => {
              firstVideo.currentTime = 0;
              const playPromise = firstVideo.play();
              if (playPromise !== undefined) {
                playPromise.catch((error) => {
                  if (error.name === 'AbortError') {
                    console.log('First video play aborted after canplaythrough - will retry after user interaction');
                  } else {
                    console.warn('Failed to play first video after canplaythrough:', error.name);
                  }
                });
              }
              firstVideo.removeEventListener('canplaythrough', handleCanPlay);
            };
            firstVideo.addEventListener('canplaythrough', handleCanPlay);
          }
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [videoLoaded, videoError, activeIndex]); // Added activeIndex dependency

  // Handle video management
  useEffect(() => {
    const currentSlide = slidesToRender[activeIndex];
    
    // Pause all videos
    // Object.values(videoRefs.current).forEach(video => {
    //   if (video && !video.paused) {
    //     video.pause();
    //   }
    // });

    // Play current video if it exists and is loaded
    if (currentSlide?.backgroundType === 'video' && currentSlide.backgroundVideo) {
      const currentVideo = videoRefs.current[activeIndex];
      if (currentVideo && videoLoaded[activeIndex] && !videoError[activeIndex]) {
        // Add a small delay to ensure video is ready on larger screens
        setTimeout(() => {
          if (currentVideo) {
            currentVideo.currentTime = 0;
            // Enhanced play with better error handling
            const playPromise = currentVideo.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                // Handle specific autoplay policy errors
                if (error.name === 'AbortError') {
                  console.log('Video play was aborted - likely due to power saving. Will retry on user interaction.');
                } else if (error.name === 'NotAllowedError') {
                  console.log('Video autoplay not allowed - user interaction required');
                } else {
                  console.warn(`Failed to play video for slide ${activeIndex}:`, error.name);
                }
              });
            }
          }
        }, 150);
      }
    }
  }, [activeIndex, videoLoaded, videoError, slidesToRender]);




// useEffect(() => {
//     const currentSlide = slidesToRender[activeIndex];
//     // Play current video if it exists and is loaded
//     if (currentSlide?.backgroundType === 'video' && currentSlide.backgroundVideo) {
//       const currentVideo = videoRefs.current[activeIndex];
//       if (currentVideo && videoLoaded[activeIndex] && !videoError[activeIndex]) {
//         currentVideo.currentTime = 0;
//         currentVideo.play().catch(() => {
//           console.warn(`Failed to play video for slide ${activeIndex}`);
//         });
//       }
//     }
//   }, [activeIndex, videoLoaded, videoError, slidesToRender]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsTransitioning(true);
    setActiveIndex(index);
    
    // Clear autoplay timer
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    setTimeout(() => setIsTransitioning(false), transitionSpeed);
  };

  const goToNext = () => {
    const nextIndex = (activeIndex + 1) % slidesToRender.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = activeIndex === 0 ? slidesToRender.length - 1 : activeIndex - 1;
    goToSlide(prevIndex);
  };

  const handleVideoLoad = (index: number) => {
    setVideoLoaded(prev => ({
      ...prev,
      [index]: true
    }));

    // Auto-play first video if it's the active slide
    if (index === 0 && activeIndex === 0) {
      setTimeout(() => {
        const firstVideo = videoRefs.current[0];
        if (firstVideo) {
          firstVideo.currentTime = 0;
          firstVideo.play().catch(() => {
            console.warn('Failed to auto-play first video');
          });
        }
      }, 100);
    }
  };

  const handleVideoError = (index: number) => {
    setVideoError(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const handleMouseEnter = () => {
    if (autoplay) {
      setIsPaused(true);
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    }
  };

  const handleMouseLeave = () => {
    if (autoplay) {
      setIsPaused(false);
    }
  };

  // Toggle autoplay function for external control
  const toggleAutoplay = () => {
    setIsPaused(!isPaused);
  };

  // Navigation Arrows
  const PrevArrow = () => (
    <button
      onClick={goToPrev}
      disabled={isTransitioning}
      className="hidden cursor-pointer md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-[#C62676] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <MdChevronLeft className="w-6 h-6 text-white" />
    </button>
  );

  const NextArrow = () => (
    <button
      onClick={goToNext}
      disabled={isTransitioning}
      className="hidden cursor-pointer md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-[#C62676] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <MdChevronRight className="w-6 h-6 text-white" />
    </button>
  );

   const onSaveClick = () =>{
    router.push('/profile?tab=My Favorites');
  }


  // Background renderer
  const renderBackground = (slide: ICarousel, index: number) => {
    const isVideo = slide.backgroundType === 'video' && slide.backgroundVideo;
    const hasVideoError = videoError[index];
    const isVideoLoaded = videoLoaded[index];

    if (isVideo && !hasVideoError) {
      return (
        <div className="absolute inset-0">
          <video
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            onLoadedData={() => handleVideoLoad(index)}
            onError={() => handleVideoError(index)}
            onCanPlayThrough={() => {
              // Additional ready state for larger screens
              if (index === activeIndex && !videoError[index]) {
                const video = videoRefs.current[index];
                if (video && video.paused) {
                  setTimeout(() => {
                    video.currentTime = 0;
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                      playPromise.catch((error) => {
                        if (error.name !== 'AbortError') {
                          console.warn('Video play failed on canPlayThrough:', error.name);
                        }
                      });
                    }
                  }, 100);
                }
              }
            }}
            style={{ 
              opacity: isVideoLoaded ? 1 : 0.3,
              transition: 'opacity 0.5s ease'
            }}
          >
            <source src={slide.backgroundVideo} type="video/mp4" />
          </video>
          
          {/* Fallback image while video loads */}
          {!isVideoLoaded && slide.backgroundImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            />
          )}
          
          <div className="absolute inset-0 bg-black/40" />
        </div>
      );
    }

    // Image background (default or fallback)
    return (
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url(${slide.backgroundImage || slide.backgroundVideo})`,
            transform: index === activeIndex ? 'scale(1)' : 'scale(1.1)'
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
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slidesToRender.map((slide, index) => (
          <div
            key={`slide-${slide.id}`}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              transitionDuration: `${transitionSpeed}ms`
            }}
          >
            {/* Background */}
            {renderBackground(slide, index)}

            {/* Content Overlay */}
            <div className="relative pb-9 md:pb-15 z-20 h-full flex flex-col justify-end px-8">
              <div className="flex flex-wrap items-end gap-6 mb-4">
                <div className="flex-1 min-w-[150px]">
                  <h1 className={`text-[28px] font-extrabold text-white capitalize transition-all ease-out ${
                    index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    transitionDuration: `${Math.min(transitionSpeed * 0.7, 700)}ms`
                  }}>
                    {slide.title}
                  </h1>
                  <p className={`text-white text-[14px] font-semibold mt-2 transition-all ease-out ${
                    index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    transitionDuration: `${Math.min(transitionSpeed * 0.7, 700)}ms`,
                    transitionDelay: `${Math.min(transitionSpeed * 0.1, 100)}ms`
                  }}>
                    {slide.category} | {slide.ageRating}
                  </p>
                  <p className={`text-white text-[12px] max-w-md pt-1 transition-all ease-out ${
                    index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                  style={{
                    transitionDuration: `${Math.min(transitionSpeed * 0.7, 700)}ms`,
                    transitionDelay: `${Math.min(transitionSpeed * 0.2, 200)}ms`
                  }}>
                    {slide.description}
                  </p>
                </div>

                <div className={`flex pt-10 items-center pr-10 cursor-pointer transition-all ease-out ${
                  index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDuration: `${Math.min(transitionSpeed * 0.7, 700)}ms`,
                  transitionDelay: `${Math.min(transitionSpeed * 0.3, 300)}ms`
                }}>
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
              <div className={`flex gap-4 justify-between flex-wrap transition-all ease-out ${
                index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDuration: `${Math.min(transitionSpeed * 0.7, 700)}ms`,
                transitionDelay: `${Math.min(transitionSpeed * 0.4, 400)}ms`
              }}>
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
                    onClick={()=>onSaveClick()}
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
                  {/* Autoplay Toggle Button (only show if autoplay is enabled via props) */}
                  {autoplay && (
                    <Button
                      onClick={toggleAutoplay}
                      variant="ghost"
                      size="icon"
                      className="text-white/70 hover:text-white border border-white/20 rounded-full cursor-pointer transition-colors duration-200"
                      title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    >
                      {isPaused ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <PrevArrow />
      <NextArrow />

      {/* Progress Bar - only show if autoplay is enabled */}
      {autoplay && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
          <div 
            className="h-full bg-[#C62676] transition-all duration-100 ease-linear"
            style={{ 
              width: (autoplayEnabled && !isPaused) ? '100%' : '0%',
              animation: (autoplayEnabled && !isPaused) ? `progress ${delay}ms linear infinite` : 'none'
            }}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .dot {
          transition: all 0.3s ease-in-out;
        }
        
        .dot:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default BillBoardV2;