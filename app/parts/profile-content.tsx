"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { IconButton } from "@mui/material"
import { MdArrowForward, MdArrowLeft, MdArrowRight, MdOutlineChevronRight, MdOutlineEdit } from "react-icons/md"
import VideoSlider from "@/components/VideoSlider"
import MusicSlider from "@/components/MusicSlider"

const subscriptions = [
  {
    id: 1,
    name: "Baze Daily Access only One Off",
    description: "Ends on 26 July 2025",
    icon: "/logos/bazeLg.png",
    amount: "KES 200",
    expiryDate: "02/07/2026",
    status: "Active",
    showAction: false,
  },
  {
    id: 2,
    name: "Spotify Premium",
    description: "Renews 3 July 2025",
    icon: "/logos/spotify.png",
    amount: "KES 200",
    expiryDate: "02/07/2026",
    status: "Active",
    showAction: true,
  },
  {
    id: 3,
    name: "Showmax Entertainment",
    description: "Renews 3 July 2025",
    icon: "/logos/showmax.png",
    amount: "KES 200",
    expiryDate: "02/07/2026",
    status: "Active",
    showAction: true,
  },
]

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState("Subscriptions")

  const tabs = ["Account", "My Favorites", "Subscriptions"]

  return (
    <div className="py-4 ">
      {/* Profile Header */}
      <div className="bg-white flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 px-8 py-6 ">
        <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
          <img src="/logos/user-profile-illustration.png" alt="Profile" className="w-full h-full object-cover" />
          <div className="imgOverlay absolute w-40 h-40 flex justify-center bg-[#0D0D0D]/30 rounded-full inset-y-[120px] sm:inset-y-[130px] md:inset-y-[130px] ">
              <IconButton>
                <MdOutlineEdit className="text-white w-15 h-15"/>
                </IconButton>
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-[#2c2c2c] mb-2">My Profile</h1>
          <p className="text-[#2C2C2C] text-base !font-normal">View and edit your profile details below</p>
          {/* Tabs */}
      <div className="bg-white mb-8 pt-8">
        <nav className="flex space-x-8 overflow-x-auto ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                ${
                  activeTab === tab
                    ? "border-[#c62676] text-[#c62676]"
                    : "border-transparent text-[#000000 ] hover:text-[#2c2c2c] hover:border-[#cccccc]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
        </div>
      </div>

      

      {/* Subscriptions Content */}
      {activeTab === "Subscriptions" && (
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">All Subscription Plans</h2>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="text-center py-4 px-4 font-normal text-[#2C2C2C]"></th>
                  <th className="text-center py-4 px-4 font-normal text-[#2C2C2C]">Amount</th>
                  <th className="text-center py-4 px-4 font-normal text-[#2C2C2C]">Expiry Date</th>
                  <th className="text-center py-4 px-4 font-normal text-[#2C2C2C]">Status</th>
                  <th className="text-center py-4 px-4 font-normal text-[#2C2C2C]">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-[#f2f2f2]">
                    <td className="py-6 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-[#999999] p-0">
                          <img
                            src={subscription.icon || "/placeholder.svg"}
                            alt={subscription.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2c2c2c]">{subscription.name}</h3>
                          <p className="text-sm font-semibold text-[#2C2C2C]">{subscription.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-[#2c2c2c] font-normal">{subscription.amount}</td>
                    <td className="py-6 px-4 text-[#2c2c2c]">{subscription.expiryDate}</td>
                    <td className="py-6 px-4">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-[#06a54c] rounded-full mr-2"></span>
                        <span className="text-[#06a54c] font-normal">{subscription.status}</span>
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      {subscription.showAction && (
                        <Button
                          variant="outline"
                          className="border-[#2C2C2C] text-[#2c2c2c] text-base hover:bg-[#f2f2f2] bg-transparent rounded-sm"
                        >
                          Unsubscribe
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-white rounded-lg p-6 shadow-sm border border-[#e5e5e5]">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={subscription.icon || "/placeholder.svg"}
                      alt={subscription.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2c2c2c] mb-1">{subscription.name}</h3>
                    <p className="text-sm text-[#696969]">{subscription.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#696969] mb-1">Amount</p>
                    <p className="font-medium text-[#2c2c2c]">{subscription.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#696969] mb-1">Expiry Date</p>
                    <p className="text-[#2c2c2c]">{subscription.expiryDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-[#06a54c] rounded-full mr-2"></span>
                    <span className="text-[#06a54c] font-medium">{subscription.status}</span>
                  </div>
                  {subscription.showAction && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#cccccc] text-[#2c2c2c] hover:bg-[#f2f2f2] bg-transparent"
                    >
                      Unsubscribe
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder content for other tabs */}
      {activeTab === "Account" && (
        <div className="p-8">
            <div className="max-w-md mx-auto rounded-lg p-6">
                <form className="space-y-6">
                  
                    <div>
                        <label className="block text-base font-bold text-[#2C2C2C] mb-2">
                            Full Names
                        </label>
                        <input 
                            type="text" 
                            placeholder="John Kungu"
                            className="w-full px-4 py-3 border text-base border-gray-200 rounded-lg bg-gray-50 text-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                    </div>

                    
                    <div>
                        <label className="block text-base font-bold text-[#2C2C2C] mb-2">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            placeholder="john.doe@example.com"
                            className="w-full px-4 py-3 border text-base border-gray-200 rounded-lg bg-gray-50 text-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                    </div>

                
                    <div>
                        <label className="block text-sm font-bold text-[#2C2C2C] mb-2">
                            Phone Number
                        </label>
                        <input 
                            type="tel" 
                            placeholder="0720 123 456"
                            className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg bg-gray-50 text-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        />
                    </div>

                    
                    <div>
                        <div className="flex items-center justify-between py-4  rounded-lg">
                            <div>
                                <label className="text-base font-bold text-gray-700">Password</label>
                                <div className="text-sm text-[#2C2C2C] mt-1">Change Password</div>
                            </div>
                            <svg className="w-5 h-5 text-[#2C2C2C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </div>
                    </div>

                    
                    <button 
                        type="submit"
                        className="w-full bg-[#C62676] hover:bg-pink-700 cursor-pointer text-white font-medium py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                        Update Details
                    </button>
                </form>
            </div>
        </div>
      )}

      {activeTab === "My Favorites" && (
        <div className="p-8 w-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-start">
               <h3 className="text-2xl font-bold text-black">
                  Video
                </h3>
                <MdOutlineChevronRight className="text-[#C62676] h-6 w-6" />
              </div>
          
              <div className="flex items-center justify-end gap-1">
                  <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium bg-white !p-0"
                  >
                    <MdArrowLeft className="!w-[38px] !h-[38px]" />  
                  </Button>
                  <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium bg-white !p-0"
                  >
                      <MdArrowRight className="!w-[38px] !h-[38px]"/>
                  </Button>
              </div>
                
            </div>
         
            <VideoSlider/>
           

            {/* music */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center justify-start">
               <h3 className="text-2xl font-bold text-black">
                  Music
                </h3>
                <MdOutlineChevronRight className="text-[#C62676] h-6 w-6" />
              </div>
          
              <div className="flex items-center justify-end gap-1">
                  <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium bg-white !p-0"
                  >
                    <MdArrowLeft className="!w-[38px] !h-[38px]" />  
                  </Button>
                  <Button
                  variant="ghost"
                  className="text-[#1A1A1A] text-[16px] !font-medium bg-white !p-0"
                  >
                      <MdArrowRight className="!w-[38px] !h-[38px]"/>
                  </Button>
              </div>
                
            </div>
            <MusicSlider/>

        </div>
      )}
    </div>
  )
}
