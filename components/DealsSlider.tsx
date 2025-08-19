import { Button } from "@/components/ui/button";

const DealsSlider = () =>{
    return(
        <>
                    <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-8 text-center min-w-max">
                   {[
                  {
                    logo: "/logos/bazeLg.png",
                    title: "baze",
                    subtitle: "Baze Daily Access only Autorenewal",
                    percentage: "15",
                    price:"100",
                    discount:"50",
                    buttonText:"subscribe"
                  },
                  {
                    logo: "/logos/netflixLg.png",
                    title:"netflix",
                    subtitle: "netflix standard plan",
                    percentage: "15",
                    price:"100",
                    discount:"50",
                    buttonText:"subscribe"
                  },
                  {
                    logo: "/logos/mdundo.png",
                    title:"mdundo",
                    subtitle: "mdundo standard plan",
                    percentage: "15",
                    price:"100",
                    discount:"50",
                    buttonText:"subscribe"
                  },
                  {
                    logo: "/logos/showmax.png",
                    title:"showmax",
                    subtitle: "showmax standard plan",
                    percentage: "15",
                    price:"100",
                    discount:"50",
                    buttonText:"subscribe"
                  },
                  {
                    logo: "/logos/spotify.png",
                    title:"spotify",
                    subtitle: "spotify basic plan",
                    percentage: "15",
                    price:"100",
                    discount:"50",
                    buttonText:"subscribe"
                  },
                  {
                    logo: "/logos/startimes.png",
                    title:"startimes",
                    subtitle: "startimes Autorenewal",
                    percentage: "15",
                    price:"100",
                    discount:"50",
                    buttonText:"subscribe"
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 !min-w-[250px]">
                    <div className="flex items-center justify-between mb-3 ">
                      <div className="flex items-center space-x-2">
                        <img
                          src={item.logo}
                          alt="Baze"
                          className="w-14 h-14 shadow-lg rounded-lg"
                        />
                        <span className="font-extrabold text-black capitalize">{item.title}</span>
                      </div>
                      <span className="bg-[#3bad49] text-white text-xs px-2 py-1 rounded-md">
                        {item.percentage}% OFF
                      </span>
                    </div>
                    <p className="text-lg text-wrap py-2 border-t-2 border-b-2 border-gray-300 !font-normal text-[#2C2C2C] text-left mb-3 capitalize">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-lg font-normal text-[#2C2C2C]">
                        Ksh {item.price}
                      </span>
                      <span className="text-lg text-[#2C2C2C] font-extrabold mb-1 ml-1">
                        Ksh {item.discount}
                      </span>
                    </div>
                    <Button className="w-full bg-[#C62676] hover:bg-[#c62676] text-lg font-semibold text-white rounded-full capitalize py-6">
                      {item.buttonText}
                    </Button>
                  </div>
                ))}
                 
                </div>
              </div>
        </>
    )
}

export default DealsSlider;