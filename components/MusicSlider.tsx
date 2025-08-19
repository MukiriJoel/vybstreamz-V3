const MusicSlider = () =>{
    return(
        <>
                <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-12 text-center min-w-max">
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

export default MusicSlider;