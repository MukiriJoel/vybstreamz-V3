import { ChevronRight } from "lucide-react"

export default function SimilarVideos() {
  const videos = [
    { title: "Awinja's Perfect...", image: "/movie-poster-1.png" },
    { title: "Awinja's Perfect...", image: "/movie-poster-2.png" },
    { title: "Awinja's Perfect...", image: "/movie-poster-3.png" },
    { title: "Awinja's Perfect...", image: "/movie-poster-4.png" },
    { title: "Awinja's Perfect...", image: "/movie-poster-5.png" },
    { title: "Awinja's Perfect...", image: "/movie-poster-6.png" },
  ]

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-semibold">Similar Videos</h2>
        <button className="text-[#a6a6a6] hover:text-white flex items-center">
          View More
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-2">
              <img
                src={video.image || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <p className="text-[#a6a6a6] text-sm truncate">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
