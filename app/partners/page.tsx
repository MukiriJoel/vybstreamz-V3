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
import { IPartnerItem } from "@/components/PartnersSlider";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getPartners } from "@/store/thunks/catalogThunks";

interface PartnerProps{
  slides:IPartnerItem[]
}

export default function PartnersPage({slides=[]}:PartnerProps) {
  const [sliderContent, setSliderContent] = useState<any>(null);
  const [videoContent, setVideoContent] = useState<any>(null);
  const [musicContent, setMusicContent] = useState<any>(null);
  const [gamesContent, setGamesContent] = useState<any>(null);
  const [eduContent, setEduContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [partnersArray, setPartnersArray] = useState<any>(null);
   const dispatch = useAppDispatch();
    
  // const partnersArray = [
  //   {
  //     id: 1,
  //     name: "Baze",
  //     description:
  //       "The journey of a couple towards their wedding, in their planning they...",
  //     logo: "baze",
  //   },
  //   {
  //     id: 2,
  //     name: "Hulu",
  //     description:
  //       "The journey of a couple towards their wedding, in their planning they...",
  //     logo: "hulu",
  //   },
  //   {
  //     id: 3,
  //     name: "Netflix",
  //     description:
  //       "The journey of a couple towards their wedding, in their planning they...",
  //     logo: "netflix",
  //   },
  //   {
  //     id: 4,
  //     name: "StarTimes",
  //     description:
  //       "The journey of a couple towards their wedding, in their planning they...",
  //     logo: "startimes",
  //   },
  //   {
  //     id: 5,
  //     name: "YouTube",
  //     description:
  //       "The journey of a couple towards their wedding, in their planning they...",
  //     logo: "youtube",
  //   },
  //   {
  //     id: 6,
  //     name: "GoTv",
  //     description:
  //       "Your account gives you access to live Gotv content and community",
  //     logo: "gotv",
  //   },
  // ];
const fetchPartners = async () =>{
      try{
         setLoading(true);
          const res = await dispatch(getPartners()).unwrap();
          setPartnersArray(res?.body)
         console.log("partnersres",res)
      }catch(error) {
        console.error('Failed to fetch genres', error);
      }finally {
          setLoading(false);
      }
}

useEffect(() => {
  fetchPartners();
  }, []);

  useEffect(()=>{
    if (!partnersArray) return;

    const sliders = partnersArray?.find(
      (content: any) => content.slug === "slider"
    );
    setSliderContent(sliders)
    console.log("sliders", sliderContent);

    const education = partnersArray?.find(
      (content: any) => content.slug === "education"
    );

    setEduContent(education);
    console.log("education", eduContent);

    const music = partnersArray?.find((content: any) => content.slug === "music");

    setMusicContent(music);
    console.log("music", musicContent);

    const videos = partnersArray?.find((content: any) => content.slug === "video");

    setVideoContent(videos);
    console.log("videos", videoContent);

     const games = partnersArray?.find((content: any) => content.slug === "games");

    setGamesContent(games);
    console.log("games", gamesContent);

  })



  return (
    <div className="bg-[#F2F2F2] dark:bg-[#141414]">
      {/* Main Content */}
      <main className="px-2 md:px-4 lg:px-6 xl:px-6">
        {/* Hero Section */}
        <div className="mt-12 pt-12">
          <PartnersCarousel slides={sliderContent?.items ?? []} />
        </div>

       
        <PartnerSection title="Video " partners={videoContent?.items ?? []} />

       
        <PartnerSection title="Music" partners={musicContent?.items ?? []} />

    
        <PartnerSection title="Games " partners={gamesContent?.items ?? []} />

       
        <PartnerSection title="Education " partners={eduContent?.items ?? []} />

       
        {/* <PartnerSection title="Podcast " partners={partnersArray} /> */}
      </main>
    </div>
  );
}

interface PartnerSectionProps {
  title: string;
  partners: IPartnerItem[];
}

function PartnerSection({ title, partners }: PartnerSectionProps) {
  const Router=useRouter();

  const onHandleClick=(partnerId:any)=>{
    Router.push(`/partners/${partnerId}`)
  }

  // const onViewMoreClick = () =>{
     
  //     Router.push(`/viewMore/`)
  // }

  // const getLogoSrc = (logo: string) => {
  //   switch (logo) {
  //     case "baze":
  //       return "/logos/baze.png";
  //     case "hulu":
  //       return "/logos/hulu.png";
  //     case "netflix":
  //       return "/logos/netflix.png";
  //     case "startimes":
  //       return "/logos/startimes.png";
  //     case "youtube":
  //       return "/logos/youtube.png";
  //     case "gotv":
  //       return "/logos/gotv.png";
  //     default:
  //       return "/generic-streaming-logo.png";
  //   }
  // };

  return (
    <section className="pt-10 border-gray-200 dark:border-[#2C2C2C] ">
     <SectionHeader  viewButton={true} title={title} route="/partners"/>

      <div className="grid pt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer"> 
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2C2C2C] rounded-2xl p-4 hover:shadow-md transition-shadow "
            onClick={()=>onHandleClick(partner?.cspId)}
          >
            <div className="flex items-start space-x-4">
              <div className="w-[97px] h-[97px] shadow-sm rounded-[20px] flex-shrink-0">
                <img
                  src={partner?.logoUrl|| "/placeholder.svg"}
                  alt={`${partner?.partner} logo`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-[#FFFFFF] mb-2">
                  {partner?.partner}
                </h4>
                <p className="md:text-base lg:text-base text-xs !font-normal text-[#2C2C2C] dark:text-[#FFFFFF] line-clamp-3">
                  {partner?.callbackUrl}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
