const PodcastSlider = () =>{
    return(
        <>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-12 text-center min-w-max">
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
                  <div key={index} className="text-center w-50">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-60 aspect-square rounded-2xl object-fit mb-2"
                    />
                    <h4 className="!font-semibold text-[#2C2C2C] text-xl capitalize">
                      {item.title}
                    </h4>
                    <p className="text-xs !font-normal text-[#2C2C2C] capitalize">
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