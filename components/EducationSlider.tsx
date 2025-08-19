const EducationSlider = () =>{
    return(
        <>
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-12 text-center min-w-max">
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

export default EducationSlider;