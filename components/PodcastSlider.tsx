const PodcastSlider = () =>{
    return(
        <>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 md:gap-4 text-center min-w-max ">
                {[
                  {
                    title: "97s podcast",
                    subtitle: "Kodong Klan",
                    image: "/images/pod1.png",
                  },
                  {
                    title: "africa listen up",
                    subtitle: "Bensoul",
                    image: "/images/bensoul.png",
                  },
                  {
                    title: "kenyan life podcast",
                    subtitle: "Savara",
                    image: "/images/pod2.png",
                  },
                  {
                    title: "true crime",
                    subtitle: "Kagwe",
                    image: "/images/pod4.png",
                  },
                  {
                    title: "sandwich podcast",
                    subtitle: "Njerae",
                    image: "/images/podcastThumb.png",
                  },
                  {
                    title: "3 truths no lies",
                    subtitle: "Nikita Kering'",
                    image: "/images/pod3.png",
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
export default PodcastSlider;