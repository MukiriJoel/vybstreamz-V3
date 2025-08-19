import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import Image from "next/image";
import { MdArrowForward, MdOutlineNotifications, MdOutlineSearch, MdOutlineShoppingBag } from "react-icons/md";
import {IconButton} from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";


export default function PartnersPage() {

  return (
    <div className="bg-[#f2f2f2]">
    
      {/* Main Content */}
      <main className="">
        {/* Hero Section */}
        <div className="p-8 mt-10 pt-10">
          <div className="flex pt-5 !rounded-lg">
              <img src={"/images/Mask_group.png"}  className="w-full object-cover" alt=''/>
          </div>
          <div className="flex items-center justify-end mb-4">
            
            <div className="flex space-x-2 mt-5 pr-10">
              <div className="w-3 h-3 bg-[#C62676] rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          <h2 className="text-4xl font-semibold text-gray-900 mb-3">Safaricom Baze</h2>
          <p className="text-gray-900 max-w-md max-h-[72px] text-[20px] tracking-normal leading-none">
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
        return "/logos/baze.png"
      case "hulu":
        return "/logos/hulu.png"
      case "netflix":
        return "/logos/netflix.png"
      case "startimes":
        return "/logos/startimes.png"
      case "youtube":
        return "/logos/youtube.png"
      case "gotv":
        return "/logos/gotv.png"
      default:
        return "/generic-streaming-logo.png"
    }
  }

  return (
    <section className="p-8 border-gray-200">
      <div className="flex items-center justify-between mb-6 pt-6  border-t-2">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <Button variant="ghost" className="text-gray-900 hover:text-gray-900 cursor-pointer">
          View More
          <MdArrowForward className="!w-[36px] !h-[36px]"/> 
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow min-h-[135px]">
            <div className="flex items-start space-x-4">
              <div className="w-[97px] h-[97px] shadow-sm rounded-[20px] flex-shrink-0">
                <img
                  src={getLogoSrc(partner.logo) || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
             
              <div className="flex-1 min-w-0">
                <h4 className="text-3xl font-semibold text-gray-900 mb-2">{partner.name}</h4>
                <p className="text-sm font-normal text-gray-600 line-clamp-3">{partner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
