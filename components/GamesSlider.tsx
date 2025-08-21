const GamesSlider = () => {
    return (
        <>
                <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 md:gap-4 text-center min-w-max">
                {[
                    {
                    title: "Fortnite",
                    image: "/images/fortnite.png",
                    partner:"/logos/vuclip.png"
                    },
                    {
                    title: "Among Us",
                    image: "/images/amongUs.png",
                    partner:"/logos/vuclip.png"
                    },
                    {
                    title: "Far Cry 4",
                    image: "/images/farcry.png",
                    partner:"/logos/vuclip.png"
                    },
                    {
                    title: "once upon a fime",
                    image: "/images/once.png",
                    partner:"/logos/vuclip.png"
                    },
                    {
                    title: "super mario galaxy",
                    image: "/images/mario.png",
                    partner:"/logos/vuclip.png"
                    },
                    {
                    title: "Squid Game 3",
                    image: "/images/squid.png",
                    partner:"/logos/vuclip.png"
                    },
                ].map((item, index) => (
                    <div key={index} className="text-center flex-shrink-0 relative">
                    <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-24 h-36 sm:w-28 sm:h-40 md:w-32 md:h-48 lg:w-40 lg:h-60 rounded-lg md:rounded-xl object-cover mb-2"
                    />
                    <div className="rounded-full items-center flex justify-center bg-white w-6 h-6 md:h-8 md:w-8 lg:h-10 lg:w-10 overflow-hidden border-2 border-[#FFFFFF] absolute top-29 left-1 sm:top-32 md:top-38 lg:top-48 lg:left-2 ">
                        <img src={item.partner} className="w-full h-full object-cover"/>
                    </div>
                    <h4 className="font-semibold text-[#2C2C2C] text-xs sm:text-sm md:text-base lg:text-lg capitalize max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-40">
                        {item.title}
                    </h4>
                   
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default GamesSlider;