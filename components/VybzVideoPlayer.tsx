import {
  Pause,
  Play,
  SkipForward,
  Maximize,
  Minimize,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/slider";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Search,
  ShoppingBag,
  Bell,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import RatingsComponent from "@/components/ratings-section";
import VideoSlider from "@/components/VideoSlider";
import { MdArrowForward, MdClose, MdPlayArrow } from "react-icons/md";
import { useRouter } from "next/navigation";
import ReviewsSection from "@/components/reviews-section";
import SectionHeader from "@/components/SectionHeader";
import CastDisplay from "./CastDisplay";


interface VybzVideoPlayerProps {
  videoSrc?: string;
  hasCast?:boolean;
  bannerImage?: string;
   title?: string;
    description?: string;
     platformLogo?: string;
     metadata?: string;
}

export default function VybzVideoPlayer({ videoSrc,hasCast,bannerImage,title,description,platformLogo,metadata }: VybzVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showContent, setShowContent] = useState(true); // For hiding/showing trailers and description
  const [showPosterOverlay, setShowPosterOverlay] = useState(false); // For showing poster after pause
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseMove, setLastMouseMove] = useState(Date.now());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const contentHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const volumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Autoplay effect - runs once when component mounts
  useEffect(() => {
    const handleAutoplay = async () => {
      if (videoRef.current && videoSrc) {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          // Autoplay failed (probably due to browser policy)
          console.log("Autoplay failed:", error);
          // Keep isPlaying as false so user can manually start
        }
      }
    };

    // Small delay to ensure video is loaded
    const autoplayTimeout = setTimeout(handleAutoplay, 100);
    
    return () => clearTimeout(autoplayTimeout);
  }, [videoSrc]);

  // Hide controls after 3 seconds when playing or when mouse is stationary
  useEffect(() => {
    const hideControlsTimer = () => {
      if (isHovered && !isDragging) {
        const timeSinceLastMove = Date.now() - lastMouseMove;
        if (timeSinceLastMove >= 3000) {
          setShowControls(false);
          if (isPlaying) {
            setShowContent(false);
          }
        } else {
          controlsTimeoutRef.current = setTimeout(
            hideControlsTimer,
            3000 - timeSinceLastMove
          );
        }
      } else if (isPlaying && !isHovered && !isDragging) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false);
        }, 3000);
      } else if (!isPlaying || isHovered || isDragging) {
        setShowControls(true);
        if (!isPlaying) {
          setShowContent(true);
        }
      }
    };

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    hideControlsTimer();

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, isHovered, isDragging, lastMouseMove]);

  // Handle content hiding when video starts playing
  useEffect(() => {
    if (isPlaying) {
      // Hide content after 300ms when video starts
      contentHideTimeoutRef.current = setTimeout(() => {
        setShowContent(false);
        setShowPosterOverlay(false);
      }, 300);
    } else {
      // Show content immediately when video is paused
      setShowContent(true);
      // Clear any existing timeouts
      if (contentHideTimeoutRef.current) {
        clearTimeout(contentHideTimeoutRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      // Show poster overlay after 4 seconds of being paused
      pauseTimeoutRef.current = setTimeout(() => {
        setShowPosterOverlay(true);
      }, 4000);
    }

    return () => {
      if (contentHideTimeoutRef.current) {
        clearTimeout(contentHideTimeoutRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      if (isDragging) {
        const seekBar = document.querySelector(".seek-bar");
        if (seekBar) {
          const rect = seekBar.getBoundingClientRect();
          const percent = Math.max(
            0,
            Math.min(1, (e.clientX - rect.left) / rect.width)
          );
          const newTime = percent * duration;
          if (videoRef.current) {
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, duration]);

  //Handle Volume Control
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSkip = () => {
    if (videoRef.current) {
      const newTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeekClick = (e: any) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = percent * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeekMouseDown = (e: any) => {
    setIsDragging(true);
    handleSeekClick(e);
  };

  const handleSeekMouseMove = (e: any) => {
    if (isDragging) {
      handleSeekClick(e);
    }
  };

  const handleSeekMouseUp = () => {
    setIsDragging(false);
  };

  const formatTime = (time: any) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleTrailerClick = (trailerNumber: any) => {
    console.log(`Clicked trailer ${trailerNumber}`);
    // You can implement trailer switching logic here
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setLastMouseMove(Date.now());
    setShowControls(true);
    if (!isPlaying) {
      setShowContent(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setLastMouseMove(Date.now());
  };

  const handleMouseMove = () => {
    setLastMouseMove(Date.now());
    if (isHovered) {
      setShowControls(true);
      if (!isPlaying) {
        setShowContent(true);
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const showVolume = () => {
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current);
    setShowVolumeSlider(true);
  };

  const hideVolume = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 300);
  };

  const Router = useRouter();

  const onViewMoreClick = () => {
    Router.push(`/viewMore/`);
  };

  const onSaveClick = () => {
    Router.push("/profile?tab=My Favorites");
  };

 
  return (
    <>
      <div
        ref={containerRef}
        className={`relative bg-black overflow-hidden cursor-pointer ${
          isFullscreen
            ? "fixed inset-0 z-50 w-screen h-screen"
            : "w-full h-[95vh]"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Video element */}
       <video
            ref={videoRef}
            data-testid="video-player" // ✅ added for tests
            className={`object-contain ${
              isFullscreen ? "w-screen h-screen" : "w-full h-full"
            }`}
            onClick={handleVideoClick}
            onEnded={handleVideoEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            playsInline
            muted={false}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Poster overlay when paused for 4 seconds */}
        {showPosterOverlay && !isPlaying && (
          <div className="absolute inset-0 transition-opacity duration-500">
            <img
              src={bannerImage}
              alt="Movie Poster"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        {/* Video Title & Description */}
        <div
          className={`absolute pt-2 mb-25  md:w-full top-[19%] sm:top-[22%] md:top-[30%] lg:!top-[30%] ml-4 md:ml-8 transition-opacity duration-300 ${
            showContent
              ? isFullscreen
                ? "opacity-100 top-[33%] md:!top-[43%] lg:!top-[43%]" // Different positioning when fullscreen
                : "opacity-100 top-[10%] md:top-[15%] lg:top-[32%]" // Normal positioning
              : "opacity-0"
          }`}
        >
          <div className="flex-1 pb-5 md:pb-1 w-[50%]">
            <h1 className="text-[28px] font-extrabold text-white capitalize">
              {title}
            </h1>
            <p className="text-white text-[14px] font-semibold mt-2">
              {metadata}
            </p>
            <p className="text-white !line-clamp-3 text-[12px] max-w-md pt-1">
              {description}
            </p>
          </div>
          {/* cast */}
          {hasCast ?
            <CastDisplay/>
            :
            <div className="py-9"></div>
          }
          
          <div className="flex pt-1 items-center pr-10 cursor-pointer">
            <p className="text-white text-lg uppercase tracking-wide">
              stream on:
            </p>

            <img src={platformLogo} className="w-[45px] h-[45px] ml-2" />
          </div>

          <div className=" gap-4 justify-between flex-wrap pt-4 mb-6 md:pb-1 md:mb-0">
            <div className="flex gap-4 mx-auto !sm:ml-0 md:mx-0">
              <Button className="bg-[#C62676] text-xs hover:bg-[#e91e63]/90 text-white px-8 h-10 rounded-full font-semibold w-40 cursor-pointer">
                Subscribe
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-xs text-white !bg-[#2C2C2C] hover:!bg-[#333333] hover:text-white px-6 h-10 rounded-full bg-[#2C2C2C]  w-40 cursor-pointer"
                onClick={() => onSaveClick()}
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

      
       
        {/* Video Player Controls */}
        <div
          className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            (showControls && isHovered) || isDragging
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Progress Bar */}
          <div className="mb-4">
            <div
              className="seek-bar w-full h-2 bg-white/30  rounded-full cursor-pointer relative group"
              onMouseDown={handleSeekMouseDown}
              onMouseMove={handleSeekMouseMove}
              onMouseUp={handleSeekMouseUp}
            >
              <div
                className="h-full bg-[#C62676] rounded-full relative"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-[#C62676] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex justify-between text-white text-sm mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center space-x-4">
            {/* Volume Control */}
            <div
              className="relative flex items-center space-x-2"
              onMouseEnter={showVolume}
              onMouseLeave={hideVolume}
            >
              <Button
                  aria-label="Volume" // ✅ added for tests
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="cursor-pointer w-10 h-10 rounded-full bg-[#2C2C2C] hover:!bg-[#333333]"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </Button>
              {showVolumeSlider && (
                <div
                  className={`transition-all duration-200 ${
                    showVolumeSlider ? "opacity-100 w-24" : "opacity-0 w-0"
                  } overflow-hidden`}
                >
                  <div className="bg-[#2C2C2C]  rounded-md p-2">
                    <Slider
                      orientation="horizontal"
                      className="w-20 h-4"
                      value={[volume * 100]}
                      onValueChange={([val]) => {
                        setVolume(val / 100);
                        if (val > 0) setIsMuted(false);
                      }}
                      min={0}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 ml-4">
              {/* Play/Pause Button */}
              <Button
                  aria-label={isPlaying ? "Pause" : "Play"} // ✅ added for tests
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="cursor-pointer w-12 h-12 rounded-full bg-[#2C2C2C] hover:!bg-[#333333]"
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white ml-1" />
                  )}
                </Button>

              {/* Skip Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkip}
                className="cursor-pointer w-10 h-10 rounded-full bg-[#2C2C2C]  hover:!bg-[#333333] "
              >
                <SkipForward className="h-5 w-5 text-white" />
              </Button>
            </div>

            {/* Fullscreen Button */}
            {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-full dark:bg-[#2C2C2C]  hover:bg-[#333333] "
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5 text-white" />
            ) : (
              <Maximize className="h-5 w-5 text-white" />
            )}
          </Button> */}
          </div>
        </div>

        {/* Main play/pause button (center) - show on hover or when paused */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayPause}
          className={`cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#2C2C2C]  hover:!bg-[#333333]  transition-all duration-300 ${
            (isHovered && showControls) || !isPlaying
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } z-20`}
        >
          {isPlaying ? (
            <Pause className="h-8 w-8 text-white" />
          ) : (
            <Play className="h-8 w-8 text-white ml-1" />
          )}
        </Button>

        {/* Fullscreen toggle button - only show when not in fullscreen and content is visible */}

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className={`cursor-pointer absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#2C2C2C]  hover:!bg-[#333333]  transition-all duration-300 ${
            (showControls && isHovered) || isDragging || showContent
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5 text-white" />
          ) : (
            <Maximize className="h-5 w-5 text-white" />
          )}
        </Button>

        <div
          className={`absolute bottom-67 sm:bottom-35 md:bottom-12 lg:bottom-32 xl:bottom-36 right-2 sm:right-4 
    flex flex-col sm:flex-col md:flex-col lg:flex-row space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 lg:space-x-6 
    transition-all duration-300 ${
      showContent
        ? "opacity-100 pointer-events-auto  md:bottom-32 lg:bottom-30"
        : "opacity-0 pointer-events-none"
    }`}
        >
          {[1, 2, 3].map((trailer) => (
            <div key={trailer} className="flex flex-col items-center">
              <div className="text-white text-center text-xs sm:text-sm md:text-base mb-1">
                Trailer {trailer}
              </div>
              <div
                onClick={() => handleTrailerClick(trailer)}
                className="w-24 h-18 sm:w-40 sm:h-24 md:w-32 md:h-24 lg:w-40 lg:h-28 
          bg-[url('/images/mofaya.png')] bg-cover bg-center 
          rounded-lg sm:rounded-xl 
          border-2 sm:border-3 lg:border-4 border-white 
          flex items-center justify-center 
          cursor-pointer hover:border-[#C62676] 
          transition-colors duration-200
          group"
              >
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 
          flex items-center justify-center 
          bg-black/20 rounded-full 
          group-hover:bg-[#C62676]/80 
          transition-all duration-200"
                >
                  <MdPlayArrow className="text-white w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}