"use client"

import { Search, ChevronRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

// Import the ResetPasswordPage component
import ResetPasswordPage from "../resetPasswordText/resetPasswordText"

// Breadcrumb Component
interface BreadcrumbItem {
  label: string
  onClick?: () => void
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm ${className || ''}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 text-[#49454f] dark:text-gray-400 mx-1" />}
          {item.isActive ? (
            <span className="text-[#333333] dark:text-white font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="text-[#49454f] dark:text-gray-400 hover:text-[#c62676] dark:hover:text-[#c62676] transition-colors duration-200 hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  )
}

const Input = ({ className, ...props }: any) => (
  <input className={className} {...props} />
)

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
    "How to reset your password",
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<string>("main")

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleBackClick = () => {
    setSelectedCategory(null)
  }

  const handleQuestionClick = (question: string, category: string) => {
    if (question === "How to reset your password" && category === "Account Management") {
      setCurrentPage("resetPassword")
    }
  }

  const handleNavigation = (level: string) => {
    if (level === "main") {
      setCurrentPage("main")
      setSelectedCategory(null)
    } else if (helpCategories.includes(level)) {
      setCurrentPage("main")
      setSelectedCategory(level)
    }
  }

  // If we're on the reset password page, render that component
  if (currentPage === "resetPassword") {
    return <ResetPasswordPage onNavigate={handleNavigation} />
  }

  // Generate breadcrumb items based on current state
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        label: "Help Center",
        onClick: () => setSelectedCategory(null),
        isActive: selectedCategory === null
      }
    ]

    if (selectedCategory) {
      items.push({
        label: selectedCategory,
        isActive: true
      })
    }

    return items
  }

  const renderCategoriesCard = () => (
    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-4">
      <div className="space-y-4">
        {helpCategories.map((category, index) => (
          <Button
            key={index}
            variant="default"
            onClick={() => handleCategoryClick(category)}
            className={`cursor-pointer w-full justify-between text-left p-3 h-auto rounded-lg transition-colors  ${
              selectedCategory === category
                ? "bg-[#c62676] text-white hover:bg-[#c62676]/90"
                : "bg-[#F2F2F2] text-[#2C2C2C] dark:text-[#FFFFFF] hover:bg-[#E5E5E5] dark:bg-[#333333] dark:hover:bg-gray-600"
            }`}
          >
            <span className="text-lg font-medium">{category}</span>
            <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0" />
          </Button>
        ))}
      </div>
    </div>
  )

  const renderQuestionsCard = () => (
    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 overflow-hidden">
      {/* Mobile Back Button - only visible on mobile */}
      <div className="flex items-center mb-6 lg:hidden">
        <button
          onClick={handleBackClick}
          className="cursor-pointer flex items-center text-[#c62676] hover:text-pink-700 transition-colors bg-transparent border-none p-0"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Category Title - only visible on mobile */}
      <h2 className="text-xl font-semibold mb-6 text-[#2C2C2C] dark:text-[#FFFFFF] lg:hidden">
        {selectedCategory}
      </h2>

      <div className="space-y-4">
        {selectedCategory && (helpContent as any)[selectedCategory]?.map((question: any, index: any) => (
          <Button
            key={index}
            variant="default"
            onClick={() => handleQuestionClick(question, selectedCategory)}
            className="cursor-pointer w-full justify-between text-left p-3 h-auto bg-[#F2F2F2] text-[#2C2C2C] dark:text-[#FFFFFF] hover:bg-[#E5E5E5] dark:bg-[#333333] dark:hover:bg-gray-600 rounded-lg"
          >
            <span className="text-lg font-medium line-clamp-2 text-wrap">{question}</span>
            <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0 text-[#696969]" />
          </Button>
        ))}
      </div>
    </div>
  )

  const renderEmptyQuestionsCard = () => (
    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 flex items-center justify-center min-h-[300px]">
      <p className="text-gray-500 dark:text-gray-400 text-center">
        Select a category from the left panel to view help topics
      </p>
    </div>
  )

  return (
    <main className="w-[98vw] lg:w-[calc(95vw-256px)] px-6 pt-8 md:p-8 mx-0 md:mx-0">
      <div className="max-w-6xl mx-auto pt-8">
        {/* Search Bar - Always visible */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Input
              type="text"
              placeholder="Search for a help topic"
              className="w-full pl-4 pr-12 py-5 text-lg bg-[#ffffff] dark:bg-[#333333] border border-[#d9d9d9] dark:border-gray-600 placeholder:text-[#2C2C2C] dark:placeholder:text-white rounded-full focus:border-[#c62676] focus:ring-[#c62676] focus:outline-none"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#E5E5E5] dark:bg-[#333333] text-[#696969] dark:text-white p-2 rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Help Center Title and Breadcrumb */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-6">Help Center</h1>
          <Breadcrumb items={getBreadcrumbItems()} className="mb-4" />
        </div>

        {/* Help Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Categories Card - Hidden on mobile when a category is selected */}
          <div className={`${selectedCategory !== null ? 'hidden lg:block' : 'block'}`}>
            {renderCategoriesCard()}
          </div>

          {/* Questions Card - Hidden on mobile when no category is selected, always shown on desktop */}
          <div className={`${selectedCategory === null ? 'hidden lg:block' : 'block'}`}>
            {selectedCategory !== null ? renderQuestionsCard() : renderEmptyQuestionsCard()}
          </div>
        </div>
      </div>
    </main>
  )
}