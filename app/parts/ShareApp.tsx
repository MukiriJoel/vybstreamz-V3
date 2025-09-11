"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Bell, User, Send, MessageCircle, Phone, Mail, MoreHorizontal, Copy } from "lucide-react"
import { FaXTwitter } from "react-icons/fa6"

export default function VybStreamsPage() {
  const [copied, setCopied] = useState(false)
  const shareUrl = "https://baze.saf/QDAyzReghImOiuNtEDC"

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const socialLinks = {
    telegram: "https://telegram.org",
    whatsapp: "https://whatsapp.com",
    twitter: "https://x.com",
    email:
      "mailto:?subject=Check out Vyb Streams&body=Great things are meant to be shared. Check out this platform: " +
      shareUrl,
  }

  const handleSocialShare = (platform: keyof typeof socialLinks) => {
    if (platform === "email") {
      window.location.href = socialLinks[platform]
    } else {
      window.open(socialLinks[platform], "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="bg-[#f2f2f2] dark:bg-[#141414] w-full overflow-hidden">
      {/* Header */}
      
        {/* Sidebar */}
        

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white dark:bg-[#2C2C2C] rounded-lg shadow-sm p-8">
            <div className="w-full">
              <h1 className="text-3xl font-bold text-[#2c2c2c] dark:text-white mb-4">Spread the Word</h1>
              <p className="text-[#2C2C2C] dark:text-white mb-8 leading-relaxed">
                Great things are meant to be shared. Invite your friends and colleagues to discover the platform — use
                the quick options below, or copy the link and send it your way.
              </p>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#2c2c2c] dark:text-white  mb-6">Share To:</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                  
                  <button
                    onClick={() => handleSocialShare("email")}
                    className="flex cursor-pointer flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:!bg-white dark:group-hover:!bg-[#2C2C2C] transition-shadow">
                      <Send className="h-6 w-6 text-[#2c2c2c] dark:group-hover:text-white" />
                    </div>
                    <span className="text-sm text-[#2c2c2c] dark:text-white dark:group-hover:text-[#2c2c2c] font-medium">Telegram</span>
                  </button>

                  
                  <button
                    onClick={() => handleSocialShare("email")}
                    className="flex cursor-pointer flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:!bg-white dark:group-hover:!bg-[#2C2C2C] transition-shadow">
                      <MessageCircle className="h-6 w-6 text-[#2c2c2c] dark:group-hover:text-white" />
                    </div>
                    <span className="text-sm text-[#2c2c2c] dark:text-white dark:group-hover:text-[#2c2c2c] font-medium">Chat</span>
                  </button>

                  
                  <button
                    onClick={() => handleSocialShare("email")}
                    className="flex cursor-pointer flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:!bg-white dark:group-hover:!bg-[#2C2C2C] transition-shadow">
                      <Phone className="h-6 w-6 text-[#2c2c2c] dark:group-hover:text-white" />
                    </div>
                    <span className="text-sm text-[#2c2c2c] dark:text-white dark:group-hover:text-[#2c2c2c] font-medium">Whatsapp</span>
                  </button>
                  

                 
                  <button
                    onClick={() => handleSocialShare("twitter")}
                    className="flex cursor-pointer flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:!bg-white dark:group-hover:!bg-[#2C2C2C] transition-shadow">
                      <FaXTwitter className="h-6 w-6 text-[#2c2c2c] dark:group-hover:text-white" />
                    </div>
                    <span className="text-sm text-[#2c2c2c] dark:text-white dark:group-hover:text-[#2c2c2c] font-medium">X</span>
                  </button>

                  <button
                    onClick={() => handleSocialShare("email")}
                    className="flex cursor-pointer flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:!bg-white dark:group-hover:!bg-[#2C2C2C] transition-shadow">
                      <Mail className="h-6 w-6 text-[#2c2c2c] dark:group-hover:text-white" />
                    </div>
                    <span className="text-sm text-[#2c2c2c] dark:text-white dark:group-hover:text-[#2c2c2c] font-medium">Email</span>
                  </button>

                
                  <button
                    onClick={() => handleSocialShare("email")}
                    className="flex cursor-pointer flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
                  >
                    <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:!bg-white dark:group-hover:!bg-[#2C2C2C] transition-shadow">
                      <MoreHorizontal className="h-6 w-6 text-[#2c2c2c] dark:group-hover:text-white" />
                    </div>
                    <span className="text-sm text-[#2c2c2c] dark:text-white dark:group-hover:text-[#2c2c2c] font-medium">More</span>
                  </button>
                  
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#2c2c2c] mb-4">Or Copy Link</h2>
                <div className="flex items-center space-x-3 bg-[#E5E5E5] dark:bg-[#666666] p-4 rounded-sm ">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="flex-1 !border-none !bg-transparent !shadow-none text-[#2C2C2C] dark:text-white focus:ring-0"
                  />
                  <Button
                    onClick={handleCopyLink}
                    variant="ghost"
                    className="flex items-center space-x-2 !border-none hover:bg-[#ffffff] bg-transparent"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-[#2C2C2C] dark:text-white">{copied ? "Copied!" : "Copy"}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
    
    </div>
  )
}
