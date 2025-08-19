const GamesSlider = () => {
    return (
        <>
                <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-12 text-center min-w-max">
                {[
                    {
                    title: "Fortnite",
                    image: "/images/fortnite.png",
                    },
                    {
                    title: "Among Us",
                    image: "/images/amongUs.png",
                    },
                    {
                    title: "Far Cry 4",
                    image: "/images/farcry.png",
                    },
                    {
                    title: "once upon a fime",
                    image: "/images/once.png",
                    },
                    {
                    title: "super mario galaxy",
                    image: "/images/mario.png",
                    },
                    {
                    title: "Squid Game 3",
                    image: "/images/squid.png",
                    },
                ].map((item, index) => (
                    <div key={index} className="text-center w-50">
                    <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-60 aspect-square rounded-2xl object-fit mb-2"
                    />
                    <h4 className="!font-semibold text-[#2C2C2C] text-[12px] capitalize">
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