"use client"

import { Search, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const helpCategories = [
  "Getting Started",
  "Payment and Subscriptions",
  "Account Management",
  "Playing Content",
  "Frequently Asked Questions",
]

const helpContent = {
  "Getting Started": [
    "How Do I Login to the platform",
    "What kind of content is available in the platform",
    "How do I get the most relevant content",
    "Setting up your profile",
  ],
  "Payment and Subscriptions": [
    "How to manage your subscription",
    "Payment methods and billing",
    "Subscription plans and pricing",
    "Canceling your subscription",
  ],
  "Account Management": [
    "Updating your profile information",
    "Changing your password",
    "Managing notification preferences",
    "Deleting your account",
  ],
  "Playing Content": [
    "How to play videos",
    "Audio quality settings",
    "Creating playlists",
    "Download content for offline viewing",
  ],
  "Frequently Asked Questions": [
    "Common technical issues",
    "Account troubleshooting",
    "Content availability",
    "Contact support",
  ],
}

export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] = useState("Getting Started")

  return (
    <main className="w-screen  lg:w-[calc(95vw-256px)]  flex-1 px-6 pt-8 md:p-8 ml-0 md:ml-0">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Input
              type="text"
              placeholder="Search for a help topic"
              className="pl-4 pr-12 py-3 text-lg bg-[#ffffff] border-[#d9d9d9] rounded-full focus:border-[#c62676] focus:ring-[#c62676]"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#e5e5e5] text-[#696969]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Help Center Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#2c2c2c] mb-12">Help Center</h1>

        {/* Help Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Categories */}
          <div className="bg-white rounded-lg p-6">
            <div className="space-y-4">
              {helpCategories.map((category, index) => (
                <Button
                  key={index}
                  variant="default"
                  onClick={() => setSelectedCategory(category)}
                  className={`cursor-pointer w-full justify-between text-left p-6 h-auto rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-[#c62676] hover:bg-[#c62676]/90 text-[#ffffff]"
                      : "bg-white hover:bg-[#f2f2f2] text-[#2c2c2c]"
                  }`}
                >
                  <span className="text-lg font-medium">{category}</span>
                  <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0" />
                </Button>
              ))}
            </div>
          </div>
          

          {/* Right Column - Questions for Selected Category */}
          <div className="bg-white rounded-lg p-6">
            <div className="space-y-4">
              {(helpContent as any)[selectedCategory]?.map((question:any, index:any) => (
                <Button
                  key={index}
                  variant="default"
                  className="cursor-pointer w-full justify-between text-left p-6 h-auto bg-[#ffffff] hover:bg-[#f2f2f2] text-[#2c2c2c]  rounded-lg"
                >
                  <span className="text-lg font-medium">{question}</span>
                  <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0 text-[#696969]" />
                </Button>
              ))}
            </div>
          </div>
         
        </div>
      </div>
    </main>
  )
}