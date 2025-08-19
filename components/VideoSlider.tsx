const VideoSlider = () =>{
    return(
        <>
                <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-12 text-center min-w-max">
                {[
                  {
                    title: "take me home",
                    image: "/images/vid4.png",
                  },
                  {
                    title: "wyfie",
                    image: "/images/vid6.png",
                  },
                  {
                    title: "jacob's daughter",
                    image: "/images/vid1.png",
                  },
                  {
                    title: "awinja's perfect wedding",
                    image: "/images/vid5.png",
                  },
                  {
                    title: "Hoje",
                    image: "/images/vid2.png",
                  },
                  {
                    title: "moukoko",
                    image: "/images/vid3.png",
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
                  </div>
                ))}
              </div>
            </div>
        </>
    )
}

export default VideoSlider;