const MusicSlider = () =>{
    return(
        <>
                <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 md:gap-4 text-center min-w-max">
                {[
                  {
                    title: "Disko",
                    subtitle: "Kodong Klan",
                    image: "/images/kodong.png",
                  },
                  {
                    title: "Medicine",
                    subtitle: "Bensoul",
                    image: "/images/bensoul.png",
                  },
                  {
                    title: "Sianda",
                    subtitle: "Savara",
                    image: "/images/savara.png",
                  },
                  {
                    title: "Rada",
                    subtitle: "Kagwe",
                    image: "/images/kagwe.png",
                  },
                  {
                    title: "OTD",
                    subtitle: "Njerae",
                    image: "/images/njerae.png",
                  },
                  {
                    title: "A Side Of Me",
                    subtitle: "Nikita Kering'",
                    image: "/images/nikita.png",
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-48 lg:w-40 lg:h-60 rounded-lg md:rounded-xl object-cover mb-2"
                    />
                    <h4 className="font-semibold text-[#2C2C2C] text-xs sm:text-sm md:text-base lg:text-lg capitalize max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-40">
                      {item.title}
                    </h4>
                    <p className="font-normal text-[#2C2C2C] text-xs sm:text-sm md:text-base lg:text-lg capitalize max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-40">
                      {item.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </div>
        </>
    )
}

export default MusicSlider;