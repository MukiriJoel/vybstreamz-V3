"use client"
import { useRouter } from "next/navigation";

const PartnersSlider =()=>{
   const Router=useRouter();
  
    const onHandleClick=(partner:any)=>{
      Router.push(`/partners/id=${partner.id}`)
    }
    
    return (
        <>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 md:gap-4 sm:gap-3 min-w-max pb-5">
                {[
                  { id:"1", name: "Baze", logo: "/logos/bazeLg.png" },
                  { id:"2", name: "Mdundo", logo: "/logos/mdundo.png" },
                  { id:"3", name: "Spotify", logo: "/logos/spotify.png" },
                  { id:"4", name: "startimes", logo: "/logos/startimes.png" },
                  { id:"5", name: "Showmax", logo: "/logos/showmax.png" },
                  { id:"6", name: "hulu", logo: "/logos/hulu.png" },
                  { id:"7", name: "gotv", logo: "/logos/gotv.png" },
                  { id:"8", name: "youtube", logo: "/logos/youtube.png" }
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="cursor-pointer pt-6 flex flex-col items-center justify-center flex-shrink-0 lg:h-[200px] w-28 xs:h-24 xs:w-24 sm:h-40 sm:w-36 md:h-40 md:w-38 lg:h-40 lg:w-40 xl:h-48 xl:w-44 2xl:h-48 2xl:w-48"
                    onClick={()=>onHandleClick(partner)}
                  >
                    <div className="!bg-[#F2F2F2] dark:bg-[#141414] mb-2 !min-h-28 !min-w-28 xs:h-25 xs:w-25 sm:h-28 sm:w-28 md:h-36 md:w-28 lg:h-35 lg:w-35 xl:h-40 xl:w-33 rounded-4xl shadow-sm overflow-hidden">
                      <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                      />
                    </div>
                   
                    <span className="text-xl font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] capitalize">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
        </>
    )
}

export default PartnersSlider;