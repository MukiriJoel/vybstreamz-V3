import { Search, ShoppingCart, Bell, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#eb3131] to-[#f6b60b] bg-clip-text text-transparent">
                Vyb Streams
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Videos
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Music
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Games
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Education
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Podcast
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Partners
              </a>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/user-profile-illustration.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-[#eb3131] rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Safaricom Baze</h2>
          <p className="text-gray-600 max-w-md">
            Baze is a digital-first content platform from Safaricom offering a rich mix of on-demand and live
            entertainment, including short-form videos, trending music.
          </p>
        </div>

        {/* Video Partners Section */}
        <PartnerSection
          title="Video Partners"
          partners={[
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
            {
              name: "StarTimes",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "startimes",
            },
            {
              name: "YouTube",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "youtube",
            },
            {
              name: "GoTv",
              description: "Your account gives you access to live Gotv content and community",
              logo: "gotv",
            },
          ]}
        />

        {/* Music Partners Section */}
        <PartnerSection
          title="Music Partners"
          partners={[
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
          ]}
        />

        {/* Games Partners Section */}
        <PartnerSection
          title="Games Partners"
          partners={[
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
          ]}
        />

        {/* Education Partners Section */}
        <PartnerSection
          title="Education Partners"
          partners={[
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
          ]}
        />

        {/* Podcast Partners Section */}
        <PartnerSection
          title="Podcast Partners"
          partners={[
            {
              name: "Baze",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "baze",
            },
            {
              name: "Hulu",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "hulu",
            },
            {
              name: "Netflix",
              description: "The journey of a couple towards their wedding, in their planning they...",
              logo: "netflix",
            },
          ]}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* App Store Buttons */}
          <div className="flex space-x-4 mb-8">
            <img src="/app-store-button.png" alt="Download on App Store" className="h-10" />
            <img src="/google-play-button.png" alt="Get it on Google Play" className="h-10" />
          </div>

          {/* Social Links and Footer Links */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>

            <div className="flex space-x-8 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">
                Help and Support
              </a>
              <a href="#" className="hover:text-gray-700">
                Contact Us
              </a>
              <a href="#" className="hover:text-gray-700">
                Terms and Conditions
              </a>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface Partner {
  name: string
  description: string
  logo: string
}

interface PartnerSectionProps {
  title: string
  partners: Partner[]
}

function PartnerSection({ title, partners }: PartnerSectionProps) {
  const getLogoSrc = (logo: string) => {
    switch (logo) {
      case "baze":
        return "/baze-colorful-logo.png"
      case "hulu":
        return "/hulu-green-logo.png"
      case "netflix":
        return "/netflix-red-logo.png"
      case "startimes":
        return "/generic-media-logo.png"
      case "youtube":
        return "/youtube-red-logo.png"
      case "gotv":
        return "/gotv-logo.png"
      default:
        return "/generic-streaming-logo.png"
    }
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
          View More
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <img
                src={getLogoSrc(partner.logo) || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                className="w-12 h-12 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{partner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
