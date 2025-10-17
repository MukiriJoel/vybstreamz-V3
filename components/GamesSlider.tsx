import { useRouter } from "next/navigation";
import RatingDisplay from "./RatingDisplay";

export interface IGamesItem{
  id: number;
  title: string;
  provider:string;
  releaseDates:string;
  logoUrl:string;
  trending:boolean;
  cspid:string;
  contentCategory:string;
  comments:string;
  contentDetails:{
    contentLength:string,
    contentType:string,
    providerContentUrl:string,
    images:[{
      url:string,
      title:string
    }],
    thumbnails:[{
      url:string,
      width:string,
      height:string
    }],
    genres:string[],
    audioLanguages:string[],
    subTitles:string[],
    artists:string[],
    trailers:string[],
    casts:string[],
    samplePaths:string[] 
  };
  contentRating:{
    kfcbRating:string,    
  };
  contentWarning:[];
  description?: string;  
}

interface SliderProps{
  slides:IGamesItem[],
  title:string,
  slug:string
}

const GamesSlider = ({title,slug,slides=[]}:SliderProps) => {
  const router=useRouter();

  const onGameClick = (id:any) =>{
    console.log("gameid",id)
    router.push(`/games/id=${id}&genre=${slug}`)
  }

  return (
    <>
      <div className="overflow-x-auto scrollbar-hide  overflow-y-hidden">
        <div className="flex gap-3 md:gap-4 text-center min-w-max h-[190px] md:!h-auto">
          {slides.map((item, index) => (
            <div
              key={index}
              className="pt-3 md:py-11 lg:py-8 group text-center flex-shrink-0 relative cursor-pointer transition-all duration-300 ease-in-out md:hover:scale-110 hover:z-10"
            >
              {/* Main Image Container */}
              <div className="relative" onClick={()=>onGameClick(item?.id)}>
                <img
                  src={item?.contentDetails?.thumbnails?.[0]?.url || "/placeholder.svg"}
                  alt={item.title}
                  className="w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-48 lg:w-40 lg:h-60 rounded-lg md:rounded-xl object-cover mb-2 transition-all duration-300"
                />

                {/* Partner Logo */}
                <div className="bg-white rounded-full items-center flex justify-center w-6 h-6 md:h-8 md:w-8 lg:h-10 lg:w-10 overflow-hidden border-2 border-[#FFFFFF] absolute top-29 left-1 sm:top-32 md:top-38 lg:top-48 lg:left-2">
                  <img
                    src={item?.logoUrl }
                    className="w-full h-full object-contain"
                    alt="Partner logo"
                  />
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute w-65 h-75 !md:h-72 inset-0 bg-white dark:bg-[#2C2C2C] rounded-xl md:rounded-xl opacity-0 md:group-hover:opacity-100 transition-all duration-300 ease-in-out transform -translate-y-2 ${
                    index === 0
                      ? "md:hover:scale-100 ml-12 md:-translate-x-10.5 !md:hover:origin-left"
                      : "-translate-x-12"
                  } md:group-hover:-translate-y-7 lg:group-hover:-translate-y-4 xl:group-hover:-translate-y-4 shadow-xl overflow-hidden`}
                >
                  <div className="!p-0 h-2/5 overflow-hidden border-0">
                    <img
                      src={item?.contentDetails?.images?.[0]?.url }
                      className="w-full h-[200%] object-cover"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-3 md:p-4 h-full flex flex-col justify-between">
                    {/* Top Section */}
                    <div className="text-left">
                      {/* <div className="flex items-center gap-2 mb-2">
                        <div className="rounded-full w-4 h-4 md:w-5 md:h-5 overflow-hidden border border-gray-200 dark:border-[#2C2C2C] ">
                          <img src={item.partner} className="w-full h-full object-cover" alt="Partner" />
                        </div>
                        <span className="text-xs text-[#2C2C2C] uppercase tracking-wide">Original</span>
                      </div> */}

                      <h3 className="font-extrabold text-sm md:text-lg text-black dark:text-white mb-1 leading-tight capitalize">
                        {item.title}
                      </h3>
                      {/* genres */}
                      <div className="flex gap-1 ">
                        {item.contentDetails?.genres.map((genre, index) => (
                          <div
                            key={index}
                            className="py-1 px-2 rounded-lg bg-[#333333] dark:bg-[#999999] text-white !font-normal !text-[10px] capitalize"
                          >
                            {genre}
                          </div>
                        ))}
                      </div>
                      <div className="py-1">
                        {/* <RatingDisplay rating={4} /> */}
                      </div>
                      <p className="!text-sm !md:text-sm text-black dark:text-white !font-normal line-clamp-2 leading-[120%]">
                        {item.description}
                      </p>

                      {/* Bottom Action Buttons */}
                      <div className="flex items-center justify-between gap-2 mt-1 mb-3 py-2">
                        <div className="flex items-center text-left cursor-pointer">
                          <p className="text-[12px] text-[#333333] dark:text-white uppercase leading-[120%] font-semibold">
                            stream on:
                          </p>
                          <div className="w-[32px] h-[32px] ml-2 shadow-sm dark:border dark:border-white/10 dark:shadow-[0_1px_3px_0_rgba(255,255,255,0.1)]  rounded-lg overflow-hidden">
                            <img
                              src={item?.logoUrl}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <button onClick={()=>onGameClick(item?.id)}  className="cursor-pointer bg-[#C62676] hover:bg-pink-600 text-white text-xs md:text-sm px-5 py-2 rounded-full transition-colors duration-200 flex items-center gap-1">
                          <svg
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title (shown when not hovering) */}
              <h4 className="font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] text-xs sm:text-sm md:text-base lg:text-lg capitalize max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-40 md:group-hover:opacity-0 transition-opacity duration-300">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GamesSlider;
