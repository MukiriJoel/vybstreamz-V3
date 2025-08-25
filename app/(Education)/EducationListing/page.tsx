// import Image from "next/image";
import Navbar from "../../parts/Navbar";
import { FaChevronDown } from "react-icons/fa"
import { Search, ShoppingBag, Bell, ChevronLeft, ChevronRight, Play, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import Footer from "../../parts/footer";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Home() {

    const contentTabs = ["E-Book", "Audio Book"]
    
  return (
    <>
      
      {/* Hero Section */}
      <section className="relative h-[700px] bg-gradient-to-r from-[#1a1a1a] to-transparent">
        <div className="absolute inset-0">
         <img src="/kiyosaki3.jpeg" alt="" className="w-full h-full object-cover"/>
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/70 to-transparent" /> */}
        </div>

        <div className="relative z-10 flex items-center h-full px-6">
          <button className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-md ml-8">
            <h2 className="text-4xl font-bold mb-2">MO-FAYA</h2>
            <div className="flex items-center space-x-2 text-sm text-[#999999] mb-4">
              <span>Movie</span>
              <span>•</span>
              <span>1hr 45min</span>
              <span>•</span>
              <span>16 Yrs+</span>
            </div>
            <p className="text-sm text-[#d9d9d9] mb-6 leading-relaxed">
              A young woman moves in with her boyfriend for a fresh start—only to get pulled into a dangerous world of
              secrets, crime, and betrayal. Set in modern Kenya, Mo-Faya is a gritty drama where every choice sparks
              more fire.
            </p>
            <div className="flex items-center space-x-4">
              <Button className="bg-[#ff007b] hover:bg-[#c62676] text-white px-8 py-2 rounded-full">Subscribe</Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-2 rounded-full bg-transparent"
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <button className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="absolute bottom-4 right-6 flex items-center space-x-2">
          <span className="text-sm text-white">STREAM ON:</span>
          <div className="bg-white rounded px-2 py-1">
            <span className="text-black text-xs font-semibold">TV</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-[#ff007b] rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="w-2 h-2 bg-white/30 rounded-full"></div>
        </div>
      </section>

    {/* Content Navigation */}
        <div className="mb-6 mt-20">
          <div className="flex space-x-8 border-b border-[#e5e5e5] pl-220">
            {contentTabs.map((tab, index) => (
              <button
                key={tab}
                className={`pb-3 px-1 text-sm font-medium transition-colors relative ${
                  index === 0 ? "text-[#c62676] border-b-2 border-[#c62676]" : "text-[#696969] hover:text-[#333333]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

      {/* Partners Section */}
      <section className="px-6 py-8 bg-[#f2f2f2]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Partners</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-6 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center mb-2 shadow-sm">
              <img src="/baze-logo-colorful.png" alt="Baze" className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium text-black">Baze</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-[#f6b60b] rounded-2xl flex items-center justify-center mb-2">
              <img src="/mdundo.png" alt="Mdundo" className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium text-black">Mdundo</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-[#3bad49] rounded-2xl flex items-center justify-center mb-2">
              <img src="/Spotify_App_Logo.svg" alt="Spotify" className="w-10 h-10" />
            </div>
            <span className="text-sm font-medium text-black">Spotify</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-[#ff007b] rounded-2xl flex items-center justify-center mb-2">
              {/* <img src="/showmax-x-logo-white.png" alt="Showmax" className="w-10 h-10" /> */}
            </div>
            <span className="text-sm font-medium text-black">Showmax</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-[#100f0d] rounded-2xl flex items-center justify-center mb-2">
              {/* <img src="/placeholder-gmhq4.png" alt="Hulu" className="w-10 h-10" /> */}
            </div>
            <span className="text-sm font-medium text-black">Hulu</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-[#5778c5] rounded-2xl flex items-center justify-center mb-2">
              {/* <img src="/placeholder-e9zkh.png" alt="EA Sports" className="w-10 h-10" /> */}
            </div>
            <span className="text-sm font-medium text-black">EA Sports</span>
          </div>
        </div>
      </section>

      {/* Best Deals Section */}
      

      {/* Trending Section */}
      <section className="px-6 py-8 bg-[#f2f2f2] pl-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Trending</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-10 overflow-x-auto pb-4 gap-2">
          {[
            { title: "Jacob's Daughter", category: "Drama" },
            { title: "Kaka Chainizee", category: "Comedy" },
            { title: "Msingi Pack", category: "Action" },
            { title: "Alusa why are ...", category: "Comedy" },
            { title: "Asphalt 9", category: "Gaming" },
            { title: "Awinja's Perfect ...", category: "Comedy" },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-60 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={`/young-people-steps.png`}
                  alt={item.title}
                  className="w-full h-50 object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended For You Section */}
      <section className="px-6 py-8 bg-[#f2f2f2] pl-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Recommended For You</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="relative">
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
            <FaChevronDown className="w-6 h-6 text-white" />
          </button>
          <div className="flex space-x-4 overflow-x-auto pb-4 gap-15">
            {[
              { title: "CarX Drift", category: "Gaming" },
              { title: "My Baby", category: "Bien Ft Ayrra Star" },
              { title: "Asphalt 9", category: "Gaming" },
              { title: "Digital Branding", category: "Education" },
              { title: "Alusa why are ...", category: "Bien" },
              { title: "The Cash mon", category: "Drama" },
            ].map((item, index) => (
              <div key={index} className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="relative">
                  <img
                    src={`/download.jpeg`}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[#696969]">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
            <FaChevronDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </section>

      

      {/* Trending Section */}
      <section className="px-6 py-8 bg-[#f2f2f2] pl-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Trending</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 gap-15">
          {[
            { title: "Jacob's Daughter", category: "Drama" },
            { title: "Kaka Chainizee", category: "Comedy" },
            { title: "Msingi Pack", category: "Action" },
            { title: "Alusa why are ...", category: "Comedy" },
            { title: "Asphalt 9", category: "Gaming" },
            { title: "Awinja's Perfect ...", category: "Comedy" },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={`/young-people-steps.png`}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="px-6 py-8 bg-[#f2f2f2] pl-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Trending</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 gap-15">
          {[
            { title: "Jacob's Daughter", category: "Drama" },
            { title: "Kaka Chainizee", category: "Comedy" },
            { title: "Msingi Pack", category: "Action" },
            { title: "Alusa why are ...", category: "Comedy" },
            { title: "Asphalt 9", category: "Gaming" },
            { title: "Awinja's Perfect ...", category: "Comedy" },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={`/young-people-steps.png`}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      

      {/* Trending Section */}
      <section className="px-6 py-8 bg-[#f2f2f2] pl-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Trending</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 gap-15">
          {[
            { title: "Jacob's Daughter", category: "Drama" },
            { title: "Kaka Chainizee", category: "Comedy" },
            { title: "Msingi Pack", category: "Action" },
            { title: "Alusa why are ...", category: "Comedy" },
            { title: "Asphalt 9", category: "Gaming" },
            { title: "Awinja's Perfect ...", category: "Comedy" },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={`/young-people-steps.png`}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Trending Section */}
      <section className="px-6 py-8 bg-[#f2f2f2] pl-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-black">Trending</h3>
          <button className="text-black hover:text-[#ff007b] transition-colors flex items-center">
            View More
            <FaChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-4 gap-15">
          {[
            { title: "Jacob's Daughter", category: "Drama" },
            { title: "Kaka Chainizee", category: "Comedy" },
            { title: "Msingi Pack", category: "Action" },
            { title: "Alusa why are ...", category: "Comedy" },
            { title: "Asphalt 9", category: "Gaming" },
            { title: "Awinja's Perfect ...", category: "Comedy" },
          ].map((item, index) => (
            <div key={index} className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={`/young-people-steps.png`}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <div className="w-6 h-6 bg-[#3bad49] rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-black text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-[#696969]">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    
    </>
  );
}
