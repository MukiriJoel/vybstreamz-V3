const PartnersSlider =()=>{
    return (
        <>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 md:gap-4 sm:gap-3 min-w-max pb-5">
                {[
                  { name: "Baze", logo: "/logos/bazeLg.png" },
                  { name: "Mdundo", logo: "/logos/mdundo.png" },
                  { name: "Spotify", logo: "/logos/spotify.png" },
                  { name: "startimes", logo: "/logos/startimes.png" },
                  { name: "Showmax", logo: "/logos/showmax.png" },
                  { name: "hulu", logo: "/logos/hulu.png" },
                  { name: "gotv", logo: "/logos/gotv.png" },
                  { name: "youtube", logo: "/logos/youtube.png" }
                ].map((partner, index) => (
                  <div
                    key={index}
                    className="pt-6 flex flex-col items-center justify-center flex-shrink-0 lg:h-[200px] w-28 xs:h-24 xs:w-24 sm:h-40 sm:w-36 md:h-40 md:w-38 lg:h-40 lg:w-40 xl:h-48 xl:w-44 2xl:h-48 2xl:w-48"
                  >
                    <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-full object-cover mb-2 rounded-4xl shadow-sm"
                    />
                    <span className="text-xl font-semibold text-[#2C2C2C] capitalize">
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