const CarouselDots = ({slides, goToSlide,activeIndex}: any) =>{
    return (
        <>
            <div className="flex space-x-2 pt-2 my-auto">
                {slides.map((_:any, dotIndex:any) => (
                    <button
                        key={dotIndex}
                        onClick={() => goToSlide(dotIndex)}
                        className={`h-3 transition-all duration-400 cursor-pointer ${
                            dotIndex === activeIndex
                                ? "w-8 bg-[#C62676] rounded-full"
                                : "w-3 bg-gray-300 hover:bg-[#C62676] rounded-full"
                        }`}
                    />
                ))}
            </div>
        </>
    )
}

export default CarouselDots;