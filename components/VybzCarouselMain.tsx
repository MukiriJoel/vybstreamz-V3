// "use client";
// import {
//   Search,
//   ShoppingCart,
//   Bell,
//   MoreHorizontal,
//   Bookmark,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { HiOutlineSpeakerXMark } from "react-icons/hi2";
// import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// import Slider from "react-slick";
// import { useRef } from "react";
// import {SlickSettings} from "@/types/slick";
// import React from "react";


// export interface ICarousel {
//   id: number;
//   title: string;
//   title_image?: string;
//   description?: string;
//   category?: string;
//   ageRating?: string;
//   streamingPlatform?: string;
//   platformLogo?: string;
//   backgroundImage?: string;
// }

// const VybzCarouselMain = ({ slides = [],
//   delay = 8000}: {
//   slides: ICarousel[];
//   delay?: number;
// }) => {

//     const sliderRef = useRef<Slider>(null);

//     const goToNext = () => {
//       if (sliderRef.current) {
//              console.log("nexting")
//         sliderRef.current.slickNext();
//       }
//     };

//     const goToPrev = () => {
//       if (sliderRef.current) {
//         console.log("preving")
//         sliderRef.current.slickPrev();
//       }
//     };

//      const NextArrow = () => {
//         return (
//             <button
//             onClick={goToNext}
//                 className="hidden cursor-pointer md:block absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-gray-600 focus:outline-none"
//             >
//                 <MdChevronRight className="w-6 h-6 text-white"/>
//             </button>
//         );
//      };

//       const PrevArrow = () => {
//           return (
//               <button
//               onClick={goToPrev}
//                   className="hidden cursor-pointer md:block absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-gray-600 focus:outline-none"
//               >
//                   <MdChevronLeft className="w-6 h-6 text-white"/>
//               </button>
//           );
//       };

//       const defaultSlide: ICarousel = {
//         id: 1,
//         title: "Squid Game 3",
//         description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
//         category: "Game",
//         ageRating: "16 Yrs +",
//         streamingPlatform: "Netflix",
//         platformLogo: "/logos/netflix.png",
//         backgroundImage: "/images/netflixGames.png"
//       };

//       slides=[{
//         id: 1,
//         title: "Squid Game 3",
//         description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
//         category: "Game",
//         ageRating: "16 Yrs +",
//         streamingPlatform: "Netflix",
//         platformLogo: "/logos/netflix.png",
//         backgroundImage: "/images/netflixGames.png"
//       },{
//         id: 2,
//         title: "Mofaya",
//         description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
//         category: "Game",
//         ageRating: "16 Yrs +",
//         streamingPlatform: "Netflix",
//         platformLogo: "/logos/bazeLg.png",
//         backgroundImage: "/images/mofaya.png"
//       },{
//         id: 3,
//         title: "Dora",
//         description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
//         category: "movie",
//         ageRating: "16 Yrs +",
//         streamingPlatform: "Netflix",
//         platformLogo: "/logos/netflix.png",
//         backgroundImage: "/images/dora.png"
//       }]


//       const settings: SlickSettings = {
//       dots: true,
//       fade: true,
//       lazyLoad: 'progressive',
//       infinite: true,
//       autoplay: slides.length > 1,
//       autoplaySpeed: delay,
//       pauseOnHover: true,
//       speed: 1000,
//       slidesToShow: 1,
//       slidesToScroll: 1,
//       arrows: false, // We're using custom arrows
//       dotsClass: 'custom-fullScreen-carousel-dots-container',
//       beforeChange: (current: number, next: number) => {
//         // Optional: Add any logic before slide change
//       },
//       afterChange: (current: number) => {
//         // Optional: Add any logic after slide change
//       }
//     };

//     return(
//         <>
//           <div className="w-[100vw] !h-[80vh]">
//                   <Slider {...settings} ref={sliderRef} className="w-[100vw] !h-[80vh] !relative ">
//                     {slides.map((slide,index)=>(
//                        <div key={index} className="h-[80vh] !w-screen ">
//                           {/* Background Cover Image with Overlay */}
//                             <div
//                               className="absolute inset-0 bg-cover bg-center z-1"
//                               style={{
//                                 backgroundImage: `url(${slide.backgroundImage})`,
//                               }}
//                             >
//                               <div className="absolute inset-0 bg-black/60"></div>
//                             </div>

//                              {/* Content Overlay */}
//                               <div className="relative z-1 h-full flex flex-col justify-end">
//                                 <div className="p-8 pb-6">
//                                   <div className="flex flex-wrap items-end gap-6 mb-8">
//                                     {/* Album Cover */}
                                
//                                     {/* Game Info */}
//                                     <div className="flex-1 min-w-[150px]">
//                                       <h1 className="text-[28px] font-extrabold text-white capitalize">
//                                         {slide.title}
//                                       </h1>
//                                       <p className="text-white text-[14px] !font-semibold mt-2">
//                                         {slide.category} | {slide.ageRating}
//                                       </p>
//                                       <p className="text-white text-[12px] max-w-md pt-1">
//                                         {slide.description}
//                                       </p>
                                    
//                                     </div>
                    
//                                     {/* Audio Controls */}
//                                     <div className="flex items-center gap-3 mb-6 w-screen sm:w-auto justify-start sm:justify-start ">
//                                       {/* Stream On Text */}
//                                       <div className="flex pt-10 items-center pr-10 cursor-pointer">
//                                         <p className="text-white/70 text-[14px] uppercase tracking-wide">
//                                           stream on:
//                                         </p>
//                                         <img
//                                           src={slide.platformLogo}
//                                           className="w-[45px] h-[45px] ml-2"
//                                         />
//                                       </div>
                                      
//                                     </div>
                                
//                                   </div>
                    
//                                   {/* Action Buttons */}
//                                   <div className="flex gap-4 justify-between flex-wrap">
//                                     <div className="flex justify-between gap-4">
//                                       <Button className="bg-[#C62676] text-xs hover:bg-[#e91e63]/90 text-white px-8 h-10 rounded-full font-semibold w-40 cursor-pointer">
//                                         Subscribe
//                                       </Button>
//                                       <Button
//                                         variant="outline"
//                                         className="border-white/20 text-xs text-white hover:bg-white/20 hover:text-white px-6 h-10 rounded-full bg-[#2C2C2C] backdrop-blur-sm w-40 cursor-pointer"
//                                       >
//                                         <Bookmark className="h-4 w-4 mr-2" />
//                                         Save
//                                       </Button>
//                                     </div>
//                                     <div className="flex pr-10 justify-center sm:flex-row">
//                                         <div className="flex items-center justify-end mb-4">
//                                           <div className="flex space-x-2 mt-5 pr-10">
//                                             {slides.map((_, dotIndex: number) => (
//                                               <React.Fragment key={dotIndex}>
//                                                 <div
//                                                   className={`w-3 h-3 ${
//                                                     dotIndex === index
//                                                       ? "bg-[#C62676]"
//                                                       : "bg-gray-300 hover:bg-[#C62676]"
//                                                   } rounded-full`}
//                                                 ></div>
//                                               </React.Fragment>
//                                             ))}

//                                           </div>
//                                         </div>
//                                         <Button
//                                         variant="ghost"
//                                         size="icon"
//                                         className="text-white border-2 rounded-full mt-2 cursor-pointer"
//                                         >
//                                           <HiOutlineSpeakerXMark />
//                                         </Button>
//                                     </div>
                                  
//                                   </div>
                                  
                    
//                                   {/* Progress Bar */}
//                                   {/* <div className="flex items-center gap-4 mt-3 mb-4">
//                                     <span className="text-white text-sm font-medium">1:25</span>
//                                     <div className="flex-1 bg-white/20 rounded-full h-1.5 relative">
//                                       <div className="bg-[#C62676] h-1.5 rounded-full w-1/3 relative">
//                                         <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm"></div>
//                                       </div>
//                                     </div>
//                                     <span className="text-white text-sm font-medium">2:45</span>
//                                   </div> */}
//                                 </div>
                                
//                               </div>
//                        </div> 
//                     ))}
//                   </Slider>
//                   <PrevArrow/>
//                   <NextArrow/>
//           </div>
          
                 
//         {/* Custom Dots (Optional - you can remove if using default dots) */}
//       <style jsx global>{`
//         .slick-slider {
//           position: relative;
//         }
        
//         /* .slick-slide {
//           opacity: 1 !important;
//           transform: none !important;
//         } */
        
//         /* .slick-slide > div {
//           height: 100%;
//         } */
        
//         /* .slick-slide > div > div {
//           height: 100%;
//         } */
        
//         /* .slick-list {
//           height: 80vh;
//         } */
        
//         .slick-track {
//           height: 100%;
//         }
        
//         /* .custom-fullScreen-carousel-dots-container {
//           display: flex !important;
//           justify-content: center;
//           align-items: center;
//           position: absolute;
//           bottom: 20px;
//           left: 0;
//           right: 0;
//           z-index: 15;
//         } */
        
//         /* .custom-fullScreen-carousel-dots-container li {
//           margin: 0 4px;
//         } */
        
//         /* .custom-fullScreen-carousel-dots-container li button {
//           width: 12px;
//           height: 12px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.5);
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }
//          */
//         /* .custom-fullScreen-carousel-dots-container li.slick-active button {
//           background: #C62676;
//           transform: scale(1.2);
//         }
        
//         .custom-fullScreen-carousel-dots-container li button:hover {
//           background: #C62676;
//         }
        
//         .custom-fullScreen-carousel-dots-container li button:before {
//           display: none;
//         } */
//       `}</style>
                 
             
//         </>
//     )
// };

// export default VybzCarouselMain;


"use client";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Slider from "react-slick";
import { useRef, useState } from "react";
import { SlickSettings } from "@/types/slick";
import React from "react";

// ✅ Required slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface ICarousel {
  id: number;
  title: string;
  description?: string;
  category?: string;
  ageRating?: string;
  streamingPlatform?: string;
  platformLogo?: string;
  backgroundImage?: string;
}

const VybzCarouselMain = ({
  slides = [],
  delay = 8000,
}: {
  slides: ICarousel[];
  delay?: number;
}) => {
  const sliderRef = useRef<Slider>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  


  // Default slide if no slides provided
  const defaultSlide: ICarousel = {
    id: 1,
    title: "Squid Game 3",
    description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
    category: "Game",
    ageRating: "16 Yrs +",
    streamingPlatform: "Netflix",
    platformLogo: "/logos/netflix.png",
    backgroundImage: "/images/netflixGames.png"
  };

  slides = [
  {
    id: 2,
    title: "Squid Game 3",
    description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
    category: "Game",
    ageRating: "16 Yrs +",
    backgroundImage: "/images/netflixGames.png",
    streamingPlatform: "Netflix",
    platformLogo: "/logos/netflix.png"
  },
  {
    id: 3,
    title: "Mofaya",
    description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
    category: "Movie",
    ageRating: "16 Yrs +",
    backgroundImage: "/images/mofaya.png",
    streamingPlatform: "Baze",
    platformLogo: "/logos/bazeLg.png"
  },
  {
    id: 3,
    title: "Dora",
    description: "A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks more fire.",
    category: "Movie",
    ageRating: "16 Yrs +",
    backgroundImage: "/images/dora.png",
    streamingPlatform: "Baze",
    platformLogo: "/logos/bazeLg.png"
  }
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

  const goToNext = () => sliderRef.current?.slickNext();
  const goToPrev = () => sliderRef.current?.slickPrev();
  const goToSlide = (i: number) =>{
    console.log("slide",i)
      sliderRef.current?.slickGoTo(i)
  };

  const PrevArrow = () => {
    return (
      <button
        onClick={goToPrev}
        className="hidden cursor-pointer md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-[#C62676]"
      >
        <MdChevronLeft className="w-6 h-6 text-white" />
      </button>
    )}

  const NextArrow = () => {
    return(
      <button
        onClick={goToNext}
        className="hidden cursor-pointer md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#2C2C2C] rounded-full p-2 shadow-md hover:bg-[#C62676]"
      >
        <MdChevronRight className="w-6 h-6 text-white" />
      </button>
    )
  }

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slider */}
      <Slider {...settings} ref={sliderRef}  beforeChange={(_, next) => setActiveIndex(next)} className="w-screen h-[80vh]">
        {slidesToRender.map((slide, index) => (
          <div key={index} className="relative h-[80vh] w-screen">
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="flex flex-wrap items-end gap-6 mb-4">
                <div className="flex-1 min-w-[150px]">
                  <h1 className="text-[28px] font-extrabold text-white capitalize">
                    {slide.title}
                  </h1>
                  <p className="text-white text-[14px] font-semibold mt-2">
                    {slide.category} | {slide.ageRating}
                  </p>
                  <p className="text-white text-[12px] max-w-md pt-1">
                    {slide.description}
                  </p>
                </div>

                <div className="flex pt-10 items-center pr-10 cursor-pointer">
                  <p className="text-white/70 text-[14px] uppercase tracking-wide">
                    stream on:
                  </p>
                  {slide.platformLogo && (
                    <img
                      src={slide.platformLogo}
                      className="w-[45px] h-[45px] ml-2"
                    />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-between flex-wrap">
                <div className="flex gap-4 mx-auto md:mx-0">
                  <Button className="bg-[#C62676] text-xs hover:bg-[#e91e63]/90 text-white px-8 h-10 rounded-full font-semibold w-40 cursor-pointer">
                    Subscribe
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-xs text-white hover:bg-white/20 hover:text-white px-6 h-10 rounded-full bg-[#2C2C2C] backdrop-blur-sm w-40 cursor-pointer"
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>

                <div className="flex items-center gap-4 mx-auto md:mx-0 md:pr-10">
                  {/* Custom dots */}
                  <div className="flex space-x-2">
                    {slides.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => goToSlide(dotIndex)}
                        className={`w-3 h-3 rounded-full ${
                          dotIndex === activeIndex
                            ? "bg-[#C62676]"
                            : "bg-gray-300 hover:bg-[#C62676]"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white border-2 rounded-full cursor-pointer"
                  >
                    <HiOutlineSpeakerXMark />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Arrows */}
     
     <PrevArrow/>
     <NextArrow/>

       <style jsx global>{`
            .slick-list{
                height:80vh
            }
            .slick-track{
              height:80vh
            }
            .dot {
              transition: background-color 0.2s ease-in-out;
            }
       
       `}</style>
    </div>

      
  );
  
};

export default VybzCarouselMain;
