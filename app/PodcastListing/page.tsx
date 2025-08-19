import { Search, ShoppingCart, Bell, MoreHorizontal, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from "../parts/Navbar"

export default function Home() {
  return (
    <>
    <Navbar isDarkBackground={false} />

    <div className="min-h-screen bg-white">
      {/* Header */}
      

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pt-40">
        {/* Podcast Player Section */}
        {/* <div className="mb-12 bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/sandwich2.jpg')"}}> */}
          <div className="mb-12 relative overflow-hidden min-h-[500px]">
  {/* Full-width blurred background */}
  <div 
    className="absolute w-screen h-full bg-cover bg-center bg-no-repeat blur-md"
    style={{
      backgroundImage: "url('/sandwich2.jpg')",
      left: '50%',
      transform: 'translateX(-50%)'
    }}
  ></div>
  
  {/* Optional: Gradient overlay for better text contrast */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
  
  {/* Content container */}
  <div className="relative z-10 container mx-auto px-4 py-12">
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
      {/* Podcast Cover */}
      <div className="flex-shrink-0">
        <img
          src="/sandwich.jpeg"
          alt="Sandwich Podcast Cover"
          className="w-48 h-48 rounded-lg object-cover"
        />
      </div>
      
      {/* Podcast Info */}
      <div className="flex-1 pt-30">
        <h2 className="text-3xl font-bold text-white mb-2">SANDWICH PODCAST</h2>
        <p className="text-[#d9d9d9] mb-1">Sandwich Podcast</p>
        <p className="text-[#a6a6a6] text-sm mb-4">Podcast | 1hr 45min | 10 Songs | Hiphop</p>
        
        <p className="text-[#d9d9d9] text-sm mb-6">STREAM ON:</p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button className="bg-[#c62676] hover:bg-[#c62676]/90 text-white px-8 py-2 rounded-full">
            Subscribe
          </Button>
          <Button
            variant="outline"
            className="border-[#4d4d4d] text-white hover:bg-white/10 px-6 py-2 rounded-full bg-transparent"
          >
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        
        {/* Audio Controls */}
        <div className="flex items-center gap-4 mb-4">
          <Button className="bg-[#333333] hover:bg-[#333333]/90 text-white px-4 py-2 rounded-md text-sm">
            Switch To Audio
          </Button>
          <Button variant="ghost" size="icon" className="text-white">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4">
          <span className="text-white text-sm">1:25</span>
          <div className="flex-1 bg-[#4d4d4d] rounded-full h-2 relative">
            <div className="bg-[#c62676] h-2 rounded-full w-1/4 relative">
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <span className="text-white text-sm">2:45</span>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Episodes Section */}
        <div className="bg-[#f2f2f2] rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-[#333333] mb-6">Episodes</h3>
          <div className="space-y-4">
            {[
              { title: "Ukichelewa", subtitle: "Edin Finky Ft Lilian Okemo", duration: "4:33" },
              { title: "Way Up", subtitle: "Edin Finky", duration: "3:33" },
              { title: "Sweet Mama", subtitle: "Edin Finky", duration: "3:33" },
              { title: "Facts", subtitle: "Edin Finky Ft Christine Okemo", duration: "3:33" },
              { title: "Gere", subtitle: "Edin Finky", duration: "5:33" },
            ].map((episode, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-[#333333]">{episode.title}</h4>
                  <p className="text-sm text-[#808080]">{episode.subtitle}</p>
                </div>
                <span className="text-sm text-[#808080]">{episode.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partners Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Partners</h3>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              View More →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Baze", logo: "/baze-logo.png" },
              { name: "Netflix", logo: "/netflix-logo-red.png" },
              { name: "StarTimes", logo: "/placeholder-asu9g.png" },
              { name: "Showmax", logo: "/generic-streaming-logo.png" },
              { name: "GoTV", logo: "/gotv-logo.png" },
            ].map((partner, index) => (
              <div key={index} className="bg-white rounded-lg p-4 flex flex-col items-center justify-center h-24">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-12 w-12 object-contain mb-2"
                />
                <span className="text-sm font-medium text-[#333333]">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Trending</h3>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              View More →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Disko", subtitle: "Kodong Klan", image: "/disko-podcast-green.png" },
              { title: "Medicine", subtitle: "Bensol", image: "/medicine-podcast-yellow.png" },
              { title: "Midnight Train", subtitle: "Sauti Sol", image: "/midnight-train-podcast-purple.png" },
              { title: "Collective", subtitle: "Kenyan Artists", image: "/collective-podcast-red.png" },
              { title: "OTD", subtitle: "Njerae", image: "/sandwich-podcast-characters.png" },
              { title: "A Side Of Me", subtitle: "Nikita Kering'", image: "/a-side-of-me-podcast-green.png" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full aspect-square rounded-lg object-cover mb-2"
                />
                <h4 className="font-medium text-white text-sm">{item.title}</h4>
                <p className="text-xs text-[#a6a6a6]">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Digital Skills</h3>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              View More →
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: "Disko", subtitle: "Kodong Klan", image: "/disko-podcast-green.png" },
              { title: "Medicine", subtitle: "Bensol", image: "/medicine-podcast-yellow.png" },
              { title: "Midnight Train", subtitle: "Sauti Sol", image: "/midnight-train-podcast-purple.png" },
              { title: "Collective", subtitle: "Kenyan Artists", image: "/collective-podcast-red.png" },
              { title: "OTD", subtitle: "Njerae", image: "/sandwich-podcast-characters.png" },
              { title: "A Side Of Me", subtitle: "Nikita Kering'", image: "/a-side-of-me-podcast-green.png" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full aspect-square rounded-lg object-cover mb-2"
                />
                <h4 className="font-medium text-white text-sm">{item.title}</h4>
                <p className="text-xs text-[#a6a6a6]">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
