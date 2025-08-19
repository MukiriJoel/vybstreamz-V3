"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, ShoppingCart, Bell, Menu, X } from "lucide-react"

export default function VybStreamzPage() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState("Content Feedback")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const ratingEmojis = [
    { emoji: "😊", color: "#14ae5c", label: "Very Happy" },
    { emoji: "😊", color: "#d732a8", label: "Happy" },
    { emoji: "😐", color: "#e5a000", label: "Neutral" },
    { emoji: "😞", color: "#bf6a02", label: "Sad" },
    { emoji: "😠", color: "#ec221f", label: "Very Sad" },
  ]

  const sidebarItems = [
    { name: "My Profile", active: true },
    { name: "Settings", active: false },
    { name: "Notifications", active: false },
    { name: "Feedback and Rating", active: false },
    { name: "Help & Support", active: false },
    { name: "Logout", active: false },
  ]

  const navItems = ["Videos", "Music", "Games", "Education", "Podcast", "Partners"]

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      {/* Header */}
    
      <div className="flex max-w-7xl  pt-30 gap-30">
        {/* Sidebar - Hidden on mobile, shown as overlay when menu is open */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#ffffff] border-r border-[#e5e5e5] transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          lg:block
        `}
        >
          <div className="p-6 pt-8">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.name}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg font-medium transition-colors
                    ${item.active ? "bg-[#d732a8] text-[#ffffff]" : "text-[#2c2c2c] hover:bg-[#f2f2f2]"}
                  `}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-[#2c2c2c] mb-8">Help Us Improve</h1>

            <Card className="p-6 bg-[#ffffff] border border-[#e5e5e5]">
              <div className="space-y-6">
                {/* Feedback Type */}
                <div>
                  <label className="block text-[#2c2c2c] font-medium mb-3">Type of Feedback</label>
                  <Select value={feedbackType} onValueChange={setFeedbackType}>
                    <SelectTrigger className="w-full bg-[#ffffff] border-[#d9d9d9]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Content Feedback">Content Feedback</SelectItem>
                      <SelectItem value="Technical Feedback">Technical Feedback</SelectItem>
                      <SelectItem value="General Feedback">General Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-[#2c2c2c] font-medium mb-4">
                    How would you rate the content you have seen on Vyb Streamz
                  </label>
                  <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                    {ratingEmojis.map((rating, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRating(index)}
                        className={`
                          w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200
                          ${selectedRating === index ? "ring-4 ring-opacity-50 scale-110" : "hover:scale-105"}
                        `}
                        style={{
                                backgroundColor: rating.color,
                                ...(selectedRating === index && {
                                    boxShadow: `0 0 0 4px ${rating.color}40` // Creates ring effect with transparency
                                })
                                }}
                        aria-label={rating.label}
                      >
                        {rating.emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Text */}
                <div>
                  <label className="block text-[#2c2c2c] font-medium mb-3">Tell us more about your experience</label>
                  <Textarea
                    placeholder="Type your feedback here"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32 bg-[#ffffff] border-[#d9d9d9] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center lg:justify-end pt-4">
                  <Button className="px-8 py-3 bg-[#d732a8] hover:bg-[#c62676] text-[#ffffff] font-medium rounded-full transition-colors">
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
