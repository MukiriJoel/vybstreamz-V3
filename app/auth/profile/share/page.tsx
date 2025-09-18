"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, Bell, User, Send, MessageCircle, Phone, Mail, MoreHorizontal, Copy } from "lucide-react"
import ShareApp from "@/app/parts/ShareApp"

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
    // <div className="min-h-screen bg-[#f2f2f2]">
    //   {/* Header */}
      

    //   <div className="flex">
    //     {/* Sidebar */}
        

    //     {/* Main Content */}
    //     <main className="flex-1 p-8 pl-20">
    //       <div className="bg-white rounded-lg shadow-sm p-8">
    //         <div className="max-w-4xl">
    //           <h1 className="text-3xl font-bold text-[#2c2c2c] mb-4">Spread the Word</h1>
    //           <p className="text-[#696969] mb-8 leading-relaxed">
    //             Great things are meant to be shared. Invite your friends and colleagues to discover the platform — use
    //             the quick options below, or copy the link and send it your way.
    //           </p>

    //           <div className="mb-8">
    //             <h2 className="text-lg font-semibold text-[#2c2c2c] mb-6">Share To:</h2>
    //             <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
    //               <button
    //                 onClick={() => handleSocialShare("telegram")}
    //                 className="flex flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
    //               >
    //                 <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
    //                   <Send className="h-6 w-6 text-[#2c2c2c]" />
    //                 </div>
    //                 <span className="text-sm text-[#2c2c2c] font-medium">Telegram</span>
    //               </button>

    //               <button
    //                 onClick={() => window.open("https://web.whatsapp.com", "_blank")}
    //                 className="flex flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
    //               >
    //                 <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
    //                   <MessageCircle className="h-6 w-6 text-[#2c2c2c]" />
    //                 </div>
    //                 <span className="text-sm text-[#2c2c2c] font-medium">Chat</span>
    //               </button>

    //               <button
    //                 onClick={() => handleSocialShare("whatsapp")}
    //                 className="flex flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
    //               >
    //                 <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
    //                   <Phone className="h-6 w-6 text-[#2c2c2c]" />
    //                 </div>
    //                 <span className="text-sm text-[#2c2c2c] font-medium">Whatsapp</span>
    //               </button>

    //               <button
    //                 onClick={() => handleSocialShare("twitter")}
    //                 className="flex flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
    //               >
    //                 <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
    //                   <svg className="h-6 w-6 text-[#2c2c2c]" viewBox="0 0 24 24" fill="currentColor">
    //                     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    //                   </svg>
    //                 </div>
    //                 <span className="text-sm text-[#2c2c2c] font-medium">X</span>
    //               </button>

    //               <button
    //                 onClick={() => handleSocialShare("email")}
    //                 className="flex flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group"
    //               >
    //                 <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
    //                   <Mail className="h-6 w-6 text-[#2c2c2c]" />
    //                 </div>
    //                 <span className="text-sm text-[#2c2c2c] font-medium">Email</span>
    //               </button>

    //               <button className="flex flex-col items-center space-y-2 p-4 hover:bg-[#f2f2f2] rounded-lg transition-colors group">
    //                 <div className="w-12 h-12 bg-[#f2f2f2] rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
    //                   <MoreHorizontal className="h-6 w-6 text-[#2c2c2c]" />
    //                 </div>
    //                 <span className="text-sm text-[#2c2c2c] font-medium">More</span>
    //               </button>
    //             </div>
    //           </div>

    //           <div>
    //             <h2 className="text-lg font-semibold text-[#2c2c2c] mb-4">Or Copy Link</h2>
    //             <div className="flex items-center space-x-3 bg-[#f2f2f2] p-4 rounded-lg border border-[#e5e5e5]">
    //               <Input
    //                 value={shareUrl}
    //                 readOnly
    //                 className="flex-1 border-none bg-transparent text-[#696969] focus:ring-0"
    //               />
    //               <Button
    //                 onClick={handleCopyLink}
    //                 variant="outline"
    //                 className="flex items-center space-x-2 border-[#e5e5e5] hover:bg-[#ffffff] bg-transparent"
    //               >
    //                 <Copy className="h-4 w-4" />
    //                 <span>{copied ? "Copied!" : "Copy"}</span>
    //               </Button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <div className="mt-8 w-full">
              <ShareApp/>
    </div>
  
  )
}
