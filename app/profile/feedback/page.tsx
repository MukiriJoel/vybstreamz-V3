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
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const ratingEmojis = [
    { emoji: "😊", color: "#14ae5c", label: "Very Happy" },
    { emoji: "😊", color: "#d732a8", label: "Happy" },
    { emoji: "😐", color: "#e5a000", label: "Neutral" },
    { emoji: "😞", color: "#bf6a02", label: "Sad" },
    { emoji: "😠", color: "#ec221f", label: "Very Sad" },
  ]

  const handleSubmitClick = () =>{
    setShowSubmitModal(true)
  }

  const handleCloseSubmitModal = () =>{
    setShowSubmitModal(false)
  }

  return (
    <div className="min-h-screen w-screen lg:w-[calc(95vw-256px)] bg-[#F2F2F2] dark:bg-[#141414]  pt-8">
      {/* Header */}
    
      <div className="flex">
        
        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 mx-auto">
          <div className="">
            <h1 className="text-2xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-8">Help Us Improve</h1>

            <div className="p-6  bg-[#F2F2F2] dark:bg-[#141414]">
              <div className="space-y-6">
                {/* Feedback Type */}
                <div className="max-w-2xl">
                  <label className="block text-[#2C2C2C] dark:text-[#FFFFFF] font-bold mb-3">Type of Feedback</label>
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
                  <label className="block text-[#2C2C2C] dark:text-[#FFFFFF] font-bold mb-4">
                    How would you rate the content you have seen on Vyb Streamz
                  </label>
                  <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                    {ratingEmojis.map((rating, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRating(index)}
                        className={`
                          w-9 h-9 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-200
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
                  <label className="block text-[#2C2C2C] dark:text-[#FFFFFF] font-bold mb-3">Tell us more about your experience</label>
                  <Textarea
                    placeholder="Type your feedback here"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-32 bg-[#ffffff] border-[#d9d9d9] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-2">
                  <Button onClick={()=>handleSubmitClick()} className="cursor-pointer px-8 py-6 bg-[#c62676] hover:bg-[#c62676] text-[#ffffff] font-medium rounded-full transition-colors">
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* submitt Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 backdrop-blur bg-black/16 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-100 mx-4">
              <div className="text-center">
                <div className="flex justify-center">
                  <img src={"/logos/submit.png"}/>
                </div>
                <p className="py-3 text-[#C62676] font-bold !text-2xl">Submitted</p>
                <p className="text-[#333333] dark:text-white mb-6 font-semibold">
                Thank you for your suggestion. Your input helps us make Vyb Streamz better for everyone. Stay tuned!
                </p>
                
                <div className="w-full flex gap-4 justify-center">
                
                  <button
                    onClick={()=>handleCloseSubmitModal()}
                    className="cursor-pointer w-full px-6 py-2 bg-[#C62676] text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
