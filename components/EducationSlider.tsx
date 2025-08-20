const EducationSlider = () =>{
    return(
        <>
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 md:gap-4 text-center min-w-max">
                {[
                    {
                    title: "Education Content",
                    image: "/images/edu1.png",
                    },
                    {
                    title: "Among Us",
                    image: "/images/edu2.png",
                    },
                    {
                    title: "Far Cry 4",
                    image: "/images/edu3.png",
                    },
                    {
                    title: "once upon a fime",
                    image: "/images/edu4.png",
                    },
                    {
                    title: "super mario galaxy",
                    image: "/images/edu5.png",
                    },
                    {
                    title: "Squid Game 3",
                    image: "/images/edu6.png",
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
                   
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default EducationSlider;