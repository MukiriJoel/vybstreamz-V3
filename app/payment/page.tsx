"use client"
import { Search, ShoppingCart, Bell, ArrowLeft, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "../parts/Navbar"
import CountryDropdown from "@/components/CountryDropdown"
import { useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { IconButton } from "@mui/material"
import { useRouter } from "next/navigation"
import { MdOutlineChevronRight } from "react-icons/md"

export default function HomePage() {
   const [selectedMethod, setSelectedMethod] = useState(null);
   const paymentMethods = [
    {
      id: 1,
      name: "M-PESA",
      component: <div className="text-green-600 font-bold text-lg">M→PESA</div>
    },
    {
      id: 2,
      name: "Airtime",
      component: <div className="text-black font-bold text-lg">Airtime</div>
    },
    {
      id: 3,
      name: "VISA",
      component: (
        <div className="flex items-center gap-2">
          <div className="text-blue-600 font-bold text-lg italic">VISA</div>
          <div className="w-8 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded-sm flex items-center justify-center">
            <div className="w-6 h-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 rounded-sm"></div>
          </div>
        </div>
      )
    }
  ];

  const cartItems=[{
    name:"Baze Daily Access only Autorenewal",
    price:"10",
    logo:"/logos/bazeLg.png"
  },{
    name:"Netflix Premium Three className",
    price:"10",
    logo:"/logos/netflixLg.png"
  },{
    name:"YouTube Premium Individual",
    price:"10",
    logo:"/logos/youtube.png"
  }
  ]

 const partners = [
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
    }
  ];
   const Router=useRouter();
  const onHandleClick=(partner:any)=>{
    Router.push(`/partners/${partner.id}`)
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
    <>
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414]  px-4 md:px-10 pt-8 max-w-8xl">
      {/* Header */}
      

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 pt-30">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Method Section */}
          <div className="flex-[1.5] bg-white dark:bg-[#2C2C2C] rounded-lg p-10 shadow-sm">
            <div className="flex items-center mb-4">
              
                <ArrowLeft className="h-5 w-5" />
              
            </div>
              <div className="flex items-center mb-6">
                 <h1 className="text-2xl font-semibold text-[#333333] dark:text-white">Payment Method</h1>
              </div>

            {/* Payment Options */}
             <div className="flex lg:gap-5 gap-2 md:gap-3 pb-6 overflow-hidden">
              
              {paymentMethods.map((method) => (
                <div 
                key={method.id}
                className={`bg-[#E5E5E5] rounded-lg md:px-6 py-4 px-1 border-2 hover:border-pink-500 cursor-pointer ${
                  selectedMethod === method.id 
                    ? 'border-pink-500 bg-pink-50 shadow-md' 
                    : 'border-gray-300'
                }`}
                onClick={() => setSelectedMethod((method.id) as any)}
                >
                  {method.component}
                </div>
                ))}
              </div>

            {/* Phone Number Input */}
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">Country</label>
                  {/* <div className="p-3 border-2 border-[#c62676] rounded-lg bg-[#F2F2F2] dark:bg-[#141414] text-center">+254</div> */}
                  <CountryDropdown/>
                </div>
                <div className="col-span-3 items-center">
                  <label className="block text-sm font-medium text-[#333333] dark:text-white mb-2">Phone Number*</label>
                  <Input type="tel" placeholder="720 123 456" className="border-2 border-[#c62676] bg-[#F2F2F2] dark:bg-[#2C2C2C]  h-13.5" />
                </div>
              </div>

              {/* Pay Button */}
              <Button className="w-full bg-[#c62676] hover:bg-[#b3246a] text-white py-6 text-lg font-semibold mt-6">
                Pay
              </Button>
            </div>
          </div>

          {/* Cart Section */}
          <div className="flex-1 bg-white dark:bg-[#2C2C2C] rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#333333] dark:text-white">Your Cart</h2>
              <Button variant="outline" className="cursor-pointer flex items-center space-x-2 bg-[#E5E5E5]">
                <Plus className="h-4 w-4" />
                <span>Add More</span>
              </Button>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item,index)=>(
              <div key={index} className="flex items-center justify-between p-4 border-b border-[#e5e5e5] dark:border-[#E5E5E5]">
                <div className="flex items-center space-x-3">
                  <div className="w-18 h-18 overflow-hidden shadow-sm !p-0 rounded-lg flex items-center">
                    <img src={item.logo} alt="Baze" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#333333] dark:text-white">{item.name}</h3>
                    <p className="text-[#c62676] mt-1 font-semibold">Ksh {item.price}</p>
                  </div>
                </div>
                <IconButton >
                   <IoIosCloseCircleOutline className="h-7 w-7 text-[#2C2C2C] dark:text-white" />
                </IconButton>
           
              </div>
              ))}
              {/* Baze Daily Access */}
            
            </div>

            {/* Total */}
            <div className=" py-2">
              <div className="flex items-center justify-start">
                <span className="text-2xl font-normal text-[#333333] dark:text-white">Total</span>
                <span className="text-2xl ml-3 pl-3 border-l font-bold text-[#333333] dark:text-white">Ksh 60</span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Partner Packages */}
        <div className="mt-12">
          <div className="flex items-center justify-start mb-6">
            <h2 className="text-2xl font-bold text-[#333333] dark:text-white">Other Partner Packages</h2>
            <div className="flex space-x-2">
               <MdOutlineChevronRight className="text-[#C62676] h-6 w-6" />
            </div>
          </div>

         
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer"> 
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
         
        </div>
      </div>
    </div>
    </>
  )
}
