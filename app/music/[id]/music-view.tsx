import { Pause, Play, SkipForward, Maximize, Minimize, Volume1, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/slider"
import { useState, useEffect, useRef } from "react"
import { FaChevronDown } from "react-icons/fa"
import { Search, ShoppingBag, Bell, ChevronLeft, ChevronRight, Bookmark } from "lucide-react"
import RatingsComponent from "@/components/ratings-section"
import { MdArrowForward, MdOutlineVideocam } from "react-icons/md"
import ReviewsSection from "@/components/reviews-section"
import MusicSlider from "@/components/MusicSlider"
import { useRouter } from "next/navigation"


export default function MusicPlayer({ 
  audioSrc = "/audio/podcast.mp3", 
  bannerImage = "/images/sandwich2.jpg",
  albumImage = "/images/sandwich.jpeg",
  title = "Disko",
  artist = "Kodong Klan",
  albumInfo = "Album • 1hr 45min • 10 Songs • Hiphop",
  description = "Join us for an insightful discussion about the latest trends in technology, innovation, and digital transformation. This episode explores how emerging technologies are reshaping industries and creating new opportunities for growth and development.",
  id=""
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [showContent, setShowContent] = useState(true)
  const [showPosterOverlay, setShowPosterOverlay] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouseMove, setLastMouseMove] = useState(Date.now())
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contentHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const volumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  // Hide controls after 3 seconds when playing or when mouse is stationary
  useEffect(() => {
    const hideControlsTimer = () => {
      if (isHovered && !isDragging) {
        const timeSinceLastMove = Date.now() - lastMouseMove
        if (timeSinceLastMove >= 3000) {
          setShowControls(false)
          if (isPlaying) {
            setShowContent(false)
          }
        } else {
          controlsTimeoutRef.current = setTimeout(hideControlsTimer, 3000 - timeSinceLastMove)
        }
      } else if (isPlaying && !isHovered && !isDragging) {
        controlsTimeoutRef.current = setTimeout(() => {
          setShowControls(false)
        }, 3000)
      } else if (!isPlaying || isHovered || isDragging) {
        setShowControls(true)
        if (!isPlaying) {
          setShowContent(true)
        }
      }
    }

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    hideControlsTimer()

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying, isHovered, isDragging, lastMouseMove])

  // Handle content hiding when audio starts playing
  useEffect(() => {
    if (isPlaying) {
      // Hide content after 300ms when audio starts
      contentHideTimeoutRef.current = setTimeout(() => {
        setShowContent(false)
        setShowPosterOverlay(false)
      }, 300)
    } else {
      // Show content immediately when audio is paused
      setShowContent(true)
      // Clear any existing timeouts
      if (contentHideTimeoutRef.current) {
        clearTimeout(contentHideTimeoutRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
      
      // Show poster overlay after 4 seconds of being paused
      pauseTimeoutRef.current = setTimeout(() => {
        setShowPosterOverlay(true)
      }, 4000)
    }

    return () => {
      if (contentHideTimeoutRef.current) {
        clearTimeout(contentHideTimeoutRef.current)
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current)
      }
    }
  }, [isPlaying])

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e:any) => {
      if (isDragging) {
        const seekBar = document.querySelector('.seek-bar')
        if (seekBar) {
          const rect = seekBar.getBoundingClientRect()
          const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
          const newTime = percent * duration
          if (audioRef.current) {
            audioRef.current.currentTime = newTime
            setCurrentTime(newTime)
          }
        }
      }
    }

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
      }
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, duration])

  //Handle Volume Control
    useEffect(() => {
      if (audioRef.current) {
        audioRef.current.volume = volume
        audioRef.current.muted = isMuted
      }
      }, [volume, isMuted])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(error => {
          console.error("Audio play failed:", error)
        })
        setIsPlaying(true)
      }
    }
  }

  const handleSkip = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration)
      audioRef.current.currentTime = newTime
    }
  }

  const handleBannerClick = () => {
    handlePlayPause()
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setShowControls(true)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeekClick = (e:any) => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - rect.left) / rect.width
      const newTime = percent * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleSeekMouseDown = (e:any) => {
    setIsDragging(true)
    handleSeekClick(e)
  }

  const handleSeekMouseMove = (e:any) => {
    if (isDragging) {
      handleSeekClick(e)
    }
  }

  const handleSeekMouseUp = () => {
    setIsDragging(false)
  }

  const formatTime = (time:any) => {
    if (isNaN(time) || time === 0) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setLastMouseMove(Date.now())
    setShowControls(true)
    if (!isPlaying) {
      setShowContent(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setLastMouseMove(Date.now())
  }

  const handleMouseMove = () => {
    setLastMouseMove(Date.now())
    if (isHovered) {
      setShowControls(true)
      if (!isPlaying) {
        setShowContent(true)
      }
    }
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const showVolume = () => {
    if (volumeTimeoutRef.current) clearTimeout(volumeTimeoutRef.current)
    setShowVolumeSlider(true)
  }

  const hideVolume = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false)
    }, 300)
  }

  const Router=useRouter();
  
    const onHandleClick = () =>{
       
        Router.push(`/viewMore/`)
    }

  return (
    <>
    <div 
      ref={containerRef}
      className={`relative bg-black overflow-hidden cursor-pointer ${
        isFullscreen ? 'fixed inset-0 z-50 w-screen h-screen' : 'w-full h-[80vh]'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      >
        <source src={audioSrc} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Banner Image (Background) */}
      <img 
        src={bannerImage} 
        alt="Album/Podcast Banner" 
        className={`object-cover ${
          isFullscreen ? 'w-screen h-screen' : 'w-full h-full'
        }`}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Left Side Content - Album Info */}
      <div 
        className={`absolute left-4 md:left-16 top-1/2 transform -translate-y-1/2 flex items-center space-x-6 transition-opacity duration-300 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Album Cover Image */}
        <div className="flex-shrink-0">
          <img 
            src={albumImage} 
            alt="Album Cover" 
            className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Album Details */}
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-xl">
            {title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-gray-200 drop-shadow-lg">
            {artist}
          </h2>
          <p className="text-sm md:text-base text-gray-300 mb-4 drop-shadow-lg">
            {albumInfo}
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-4">
            <Button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded-full font-medium">
              Subscribe
            </Button>
            <Button variant="outline" className="bg-gray-800/80 hover:bg-gray-700 border-gray-600 text-white px-6 py-2 rounded-full">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>

          {/* Stream Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>STREAM ON:</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                VLC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Switch to Video Button */}
      <div 
        className={`absolute right-4 md:right-16 top-1/2 transition-opacity duration-300 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* <Button className="bg-gray-800/80 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <div className="w-4 h-4 border border-white"></div>
          <span>Switch To Video</span>
        </Button> */}
        <Button className="bg-[#2C2C2C] hover:bg-white dark:bg-[#2C2C2C]/20 text-white px-4 py-2 rounded-[5px] text-xs backdrop-blur-sm border border-white/10 cursor-pointer">
                              <MdOutlineVideocam className="mr-1" />
                              Switch To Video
                            </Button>
      </div>

      {/* Music/Podcast Player Controls */}
      <div className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
        (showControls && isHovered) || isDragging ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="seek-bar w-full h-2 bg-white dark:bg-[#2C2C2C]/30 rounded-full cursor-pointer relative group"
            onMouseDown={handleSeekMouseDown}
            onMouseMove={handleSeekMouseMove}
            onMouseUp={handleSeekMouseUp}
          >
            <div 
              className="h-full bg-pink-500 rounded-full relative"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2C]/20 backdrop-blur-sm hover:bg-white dark:bg-[#2C2C2C]/30"
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
                <div className={`transition-all duration-200 ${
                showVolumeSlider ? 'opacity-100 w-24' : 'opacity-0 w-0'
              } overflow-hidden`}>
                <div className="bg-white dark:bg-[#2C2C2C]/20 backdrop-blur-sm rounded-md p-2">
                  <Slider
                    orientation="horizontal"
                    className="w-20 h-4"
                    value={[volume * 100]}
                    onValueChange={([val]) => {
                      setVolume(val / 100)
                      if (val > 0) setIsMuted(false)
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
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="w-12 h-12 rounded-full bg-white dark:bg-[#2C2C2C]/20 backdrop-blur-sm hover:bg-white dark:bg-[#2C2C2C]/30"
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
              className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2C]/20 backdrop-blur-sm hover:bg-white dark:bg-[#2C2C2C]/30"
            >
              <SkipForward className="h-5 w-5 text-white" />
            </Button>
          </div>

          {/* Fullscreen Button */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2C]/20 backdrop-blur-sm hover:bg-white dark:bg-[#2C2C2C]/30"
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
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white dark:bg-[#2C2C2C]/20 backdrop-blur-sm hover:bg-white dark:bg-[#2C2C2C]/30 transition-all duration-300 ${
          (isHovered && showControls) || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } z-20`}
      >
        {isPlaying ? (
          <Pause className="h-8 w-8 text-white" />
        ) : (
          <Play className="h-8 w-8 text-white ml-1" />
        )}
      </Button>
    </div>

       {/* Trending Section */}
        <main className="bg-[#F2F2F2] dark:bg-[#141414]">
          <section className="px-6 pb-3 pt-8 px-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-black dark:text-white">Similar Videos</h3>
              <Button
                variant="ghost"
                className="text-[#333333] dark:text-white text-[16px] !font-medium" onClick={()=>onHandleClick()}
              >
                View More
                <MdArrowForward className="!w-[36px] !h-[36px]" />
              </Button>
            </div>
            {/* <div className="flex space-x-4 overflow-x-auto pb-4 gap-0 scrollbar-hide">
              {[
                { title: "Jacob's Daughter", category: "Drama" },
                { title: "Kaka Chainizee", category: "Comedy" },
                { title: "Msingi Pack", category: "Action" },
                { title: "Alusa why are ...", category: "Comedy" },
                { title: "Asphalt 9", category: "Gaming" },
                { title: "Awinja's Perfect ...", category: "Comedy" },
                { title: "Awinja's Perfect ...", category: "Comedy" },
                { title: "Awinja's Perfect ...", category: "Comedy" },
              ].map((item, index) => (
                <div key={index} className="flex-shrink-0 w-60 bg-white dark:bg-[#2C2C2C] rounded-lg overflow-hidden shadow-sm">
                  <div className="relative">
                    <img
                      src={`/young-people-steps.png`}
                      alt={item.title}
                      className="w-full h-50 object-cover"
                    />
                    <div className="absolute bottom-2 left-2">
                      <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-black dark:text-white text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-[#696969]">{item.category}</p>
                  </div>
                </div>
              ))}
            </div> */}
            <MusicSlider/>
          </section>
          <section>
              <RatingsComponent />
          </section>
          <section>
            <ReviewsSection/>
          </section>
        </main>
    </>
  )
}