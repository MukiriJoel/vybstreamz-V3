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
    <div className="mt-8 w-full">
              <ShareApp/>
    </div>
  
  )
}
