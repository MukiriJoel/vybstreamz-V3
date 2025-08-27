import { Button } from "@/components/ui/button";

const PartnerHighlight = () =>{
    return(
        <>
                         <div className="mb-0">
              {/* Netflix Partner Card */}
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#333333] dark:text-white mb-6">
                  Partner Highlight
                </h1>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-4 mb-3">
                  {/* Netflix Logo */}
                  <div className="rounded-xl flex items-center justify-center">
                    <img
                      src="/logos/netflix.png"
                      className="w-[50px] h-[50px] "
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-[#333333] dark:text-white">
                    Netflix
                  </h2>
                </div>

                 <Button className="cursor-pointer bg-[#c62676] hover:bg-[#a91e63] text-white text-xl px-12 py-6 rounded-full font-medium">
                    Visit Site
                 </Button>
              </div>
            </div>

            {/* Netflix Content Banner */}
            <div className="relative w-full h-70 sm:h-70 md:h-100 lg:h-120 xl:h-120 rounded-lg overflow-hidden shadow-2xl">
              {/* Background Image Placeholder */}
              <div className="absolute inset-0 rounded-xl shadow-2xl">
                <img
                  src="/images/bestNetflix.png"
                  alt="Netflix comedies showcase"
                  className="w-full h-full  object-fit"
                />
              </div>

            </div>
        </>
    )
}

export default PartnerHighlight;