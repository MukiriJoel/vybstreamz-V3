"use client"
import { Button } from "@/components/ui/button";
import {
  MdArrowForward,
  MdOutlineNotifications,
  MdOutlineSearch,
  MdOutlineShoppingBag,
} from "react-icons/md";
import PartnersCarousel from "@/components/PartnersCarousel";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";

export default function PartnersPage() {
  const partnersArray = [
    {
      id: 1,
      name: "Baze",
      description:
        "The journey of a couple towards their wedding, in their planning they...",
      logo: "baze",
    },
    {
      id: 2,
      name: "Hulu",
      description:
        "The journey of a couple towards their wedding, in their planning they...",
      logo: "hulu",
    },
    {
      id: 3,
      name: "Netflix",
      description:
        "The journey of a couple towards their wedding, in their planning they...",
      logo: "netflix",
    },
    {
      id: 4,
      name: "StarTimes",
      description:
        "The journey of a couple towards their wedding, in their planning they...",
      logo: "startimes",
    },
    {
      id: 5,
      name: "YouTube",
      description:
        "The journey of a couple towards their wedding, in their planning they...",
      logo: "youtube",
    },
    {
      id: 6,
      name: "GoTv",
      description:
        "Your account gives you access to live Gotv content and community",
      logo: "gotv",
    },
  ];
  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="">
        {/* Hero Section */}
        <div className="px-8 mt-12 pt-12">
          <PartnersCarousel />
        </div>

        {/* Video Partners Section */}
        <PartnerSection title="Video Partners" partners={partnersArray} />

        {/* Music Partners Section */}
        <PartnerSection title="Music Partners" partners={partnersArray} />

        {/* Games Partners Section */}
        <PartnerSection title="Games Partners" partners={partnersArray} />

        {/* Education Partners Section */}
        <PartnerSection title="Education Partners" partners={partnersArray} />

        {/* Podcast Partners Section */}
        <PartnerSection title="Podcast Partners" partners={partnersArray} />
      </main>
    </div>
  );
}

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
}

interface PartnerSectionProps {
  title: string;
  partners: Partner[];
}

function PartnerSection({ title, partners }: PartnerSectionProps) {
  const Router=useRouter();

  const onHandleClick=(partner:any)=>{
    Router.push(`/partners/${partner.id}`)
  }

  const onViewMoreClick = () =>{
     
      Router.push(`/viewMore/`)
  }

  const getLogoSrc = (logo: string) => {
    switch (logo) {
      case "baze":
        return "/logos/baze.png";
      case "hulu":
        return "/logos/hulu.png";
      case "netflix":
        return "/logos/netflix.png";
      case "startimes":
        return "/logos/startimes.png";
      case "youtube":
        return "/logos/youtube.png";
      case "gotv":
        return "/logos/gotv.png";
      default:
        return "/generic-streaming-logo.png";
    }
  };

  return (
    <section className="p-8 border-gray-200 dark:border-[#2C2C2C] ">
     <SectionHeader title={title} onViewMoreClick={onViewMoreClick}/>

      <div className="grid pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer"> 
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2C2C2C] rounded-2xl p-6 hover:shadow-md transition-shadow min-h-[135px]"
            onClick={()=>onHandleClick(partner)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-[97px] h-[97px] shadow-sm rounded-[20px] flex-shrink-0">
                <img
                  src={getLogoSrc(partner.logo) || "/placeholder.svg"}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-3xl font-semibold text-gray-900 dark:text-[#FFFFFF] mb-2">
                  {partner.name}
                </h4>
                <p className="text-sm font-normal text-[#2C2C2C] dark:text-[#FFFFFF] line-clamp-3">
                  {partner.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
