// "use client"

// import { Search, ChevronRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useState } from "react"

// const helpCategories = [
//   "Getting Started",
//   "Payment and Subscriptions",
//   "Account Management",
//   "Playing Content",
//   "Frequently Asked Questions",
// ]

// const helpContent = {
//   "Getting Started": [
//     "How Do I Login to the platform",
//     "What kind of content is available in the platform",
//     "How do I get the most relevant content",
//     "Setting up your profile",
//   ],
//   "Payment and Subscriptions": [
//     "How to manage your subscription",
//     "Payment methods and billing",
//     "Subscription plans and pricing",
//     "Canceling your subscription",
//   ],
//   "Account Management": [
//     "Updating your profile information",
//     "Changing your password",
//     "Managing notification preferences",
//     "Deleting your account",
//   ],
//   "Playing Content": [
//     "How to play videos",
//     "Audio quality settings",
//     "Creating playlists",
//     "Download content for offline viewing",
//   ],
//   "Frequently Asked Questions": [
//     "Common technical issues",
//     "Account troubleshooting",
//     "Content availability",
//     "Contact support",
//   ],
// }

// export default function HelpCenter() {
//   const [selectedCategory, setSelectedCategory] = useState("Getting Started")

//   return (
//     <main className="w-screen  lg:w-[calc(95vw-256px)]  flex-1 px-6 pt-8 md:p-8 ml-0 md:ml-0">
//       <div className="max-w-6xl mx-auto pt-8">
//         {/* Search Bar */}
//         <div className="mb-8">
//           <div className="relative max-w-2xl">
//             <Input
//               type="text"
//               placeholder="Search for a help topic"
//               className="pl-4 pr-12 py-5 text-lg bg-[#ffffff] dark:bg-[#333333] border-[#d9d9d9] placeholder:text-[#2C2C2C] dark:placeholder:text-white rounded-full focus:border-[#c62676] focus:ring-[#c62676]"
//             />
//             <Button
//               size="icon"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#E5E5E5] dark:bg-[#333333] text-[#696969] dark:text-white"
//             >
//               <Search className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Help Center Title */}
//         <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-12">Help Center</h1>

//         {/* Help Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Left Column - Categories */}
//           <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6">
//             <div className="space-y-4">
//               {helpCategories.map((category, index) => (
//                 <Button
//                   key={index}
//                   variant="default"
//                   onClick={() => setSelectedCategory(category)}
//                   className={`cursor-pointer w-full justify-between text-left p-6 h-auto rounded-lg transition-colors ${
//                     selectedCategory === category
//                       ? "bg-[#c62676] hover:bg-[#c62676]/90 text-[#ffffff]"
//                       : "bg-white dark:bg-[#2C2C2C] hover:bg-[#F2F2F2] text-[#2C2C2C] dark:text-[#FFFFFF]"
//                   }`}
//                 >
//                   <span className="text-lg font-medium">{category}</span>
//                   <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0" />
//                 </Button>
//               ))}
//             </div>
//           </div>
          

//           {/* Right Column - Questions for Selected Category */}
//           <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 overflow-hidden">
//             <div className="space-y-4">
//               {(helpContent as any)[selectedCategory]?.map((question:any, index:any) => (
//                 <Button
//                   key={index}
//                   variant="default"
//                   className="cursor-pointer w-full justify-between text-left p-6 h-auto bg-[#ffffff] dark:bg-[#2C2C2C] hover:bg-[#F2F2F2] text-[#2C2C2C] dark:text-[#FFFFFF]  rounded-lg"
//                 >
//                   <span className="text-lg font-medium line-clamp-2 text-wrap">{question}</span>
//                   <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0 text-[#696969]" />
//                 </Button>
//               ))}
//             </div>
//           </div>
         
//         </div>
//       </div>
//     </main>
//   )
// }
// "use client"

// import { Search, ChevronRight, ArrowLeft } from "lucide-react"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// // Mock UI components for demo
// // const Button = ({ children, onClick, className, variant = "default", size, ...props }: any) => (
// //   <button onClick={onClick} className={className} {...props}>
// //     {children}
// //   </button>
// // )

// const Input = ({ className, ...props }: any) => (
//   <input className={className} {...props} />
// )

// const helpCategories = [
//   "Getting Started",
//   "Payment and Subscriptions", 
//   "Account Management",
//   "Playing Content",
//   "Frequently Asked Questions",
// ]

// const helpContent = {
//   "Getting Started": [
//     "How Do I Login to the platform",
//     "What kind of content is available in the platform",
//     "How do I get the most relevant content",
//     "Setting up your profile",
//   ],
//   "Payment and Subscriptions": [
//     "How to manage your subscription",
//     "Payment methods and billing",
//     "Subscription plans and pricing",
//     "Canceling your subscription",
//   ],
//   "Account Management": [
//     "Updating your profile information",
//     "Changing your password",
//     "Managing notification preferences",
//     "Deleting your account",
//   ],
//   "Playing Content": [
//     "How to play videos",
//     "Audio quality settings",
//     "Creating playlists",
//     "Download content for offline viewing",
//   ],
//   "Frequently Asked Questions": [
//     "Common technical issues",
//     "Account troubleshooting",
//     "Content availability",
//     "Contact support",
//   ],
// }

// export default function HelpCenter() {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

//   const handleCategoryClick = (category: string) => {
//     setSelectedCategory(category)
//   }

//   const handleBackClick = () => {
//     setSelectedCategory(null)
//   }

//   const renderCategoriesCard = () => (
//     <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6">
//       <div className="space-y-4">
//         {helpCategories.map((category, index) => (
//           <Button
//             key={index}
//             variant="default"
//             onClick={() => handleCategoryClick(category)}
//             className="cursor-pointer w-full justify-between text-left p-6 h-auto rounded-lg transition-colors bg-white dark:bg-[#2C2C2C] hover:bg-[#F2F2F2] text-[#2C2C2C] dark:text-[#FFFFFF] border border-gray-200 dark:border-gray-600"
//           >
//             <span className="text-lg font-medium">{category}</span>
//             <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0" />
//           </Button>
//         ))}
//       </div>
//     </div>
//   )

//   const renderQuestionsCard = () => (
//     <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 overflow-hidden">
//       {/* Mobile Back Button - only visible on mobile */}
//       <div className="flex items-center mb-6 lg:hidden">
//         <button
//           onClick={handleBackClick}
//           className="flex items-center text-[#c62676] hover:text-pink-700 transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           <span className="font-medium">Back to Categories</span>
//         </button>
//       </div>

//       {/* Category Title */}
//       <h2 className="text-xl font-semibold mb-6 text-[#2C2C2C] dark:text-[#FFFFFF] lg:hidden">
//         {selectedCategory}
//       </h2>

//       <div className="space-y-4">
//         {selectedCategory && (helpContent as any)[selectedCategory]?.map((question: any, index: any) => (
//           <Button
//             key={index}
//             variant="default"
//             className="cursor-pointer w-full justify-between text-left p-6 h-auto bg-[#ffffff] dark:bg-[#2C2C2C] hover:bg-[#F2F2F2] text-[#2C2C2C] dark:text-[#FFFFFF] rounded-lg border border-gray-200 dark:border-gray-600"
//           >
//             <span className="text-lg font-medium line-clamp-2 text-wrap">{question}</span>
//             <ChevronRight className="h-5 w-5 ml-2 flex-shrink-0 text-[#696969]" />
//           </Button>
//         ))}
//       </div>
//     </div>
//   )

//   const renderEmptyQuestionsCard = () => (
//     <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 flex items-center justify-center min-h-[300px]">
//       <p className="text-gray-500 dark:text-gray-400 text-center">
//         Select a category from the left panel to view help topics
//       </p>
//     </div>
//   )

//   return (
//     <main className="w-screen lg:w-[calc(95vw-256px)] flex-1 px-6 pt-8 md:p-8 ml-0 md:ml-0">
//       <div className="max-w-6xl mx-auto pt-8">
//         {/* Search Bar - Always visible */}
//         <div className="mb-8">
//           <div className="relative max-w-2xl">
//             <Input
//               type="text"
//               placeholder="Search for a help topic"
//               className="w-full pl-4 pr-12 py-5 text-lg bg-[#ffffff] dark:bg-[#333333] border border-[#d9d9d9] dark:border-gray-600 placeholder:text-[#2C2C2C] dark:placeholder:text-white rounded-full focus:border-[#c62676] focus:ring-[#c62676] focus:outline-none"
//             />
//             <Button
//               size="icon"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#E5E5E5] dark:bg-[#333333] text-[#696969] dark:text-white p-2 rounded-full"
//             >
//               <Search className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>

//         {/* Help Center Title - Always visible */}
//         <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-12">Help Center</h1>

//         {/* Help Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Categories Card - Hidden on mobile when a category is selected */}
//           <div className={`${selectedCategory !== null ? 'hidden lg:block' : 'block'}`}>
//             {renderCategoriesCard()}
//           </div>

//           {/* Questions Card - Hidden on mobile when no category is selected, always shown on desktop */}
//           <div className={`${selectedCategory === null ? 'hidden lg:block' : 'block'}`}>
//             {selectedCategory !== null ? renderQuestionsCard() : renderEmptyQuestionsCard()}
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

"use client"

import { Search, ChevronRight, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"


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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleBackClick = () => {
    setSelectedCategory(null)
  }

  const renderCategoriesCard = () => (
    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6">
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
          className="cursor-pointer flex items-center text-[#c62676] hover:text-pink-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Category Title */}
      <h2 className="text-xl font-semibold mb-6 text-[#2C2C2C] dark:text-[#FFFFFF] lg:hidden">
        {selectedCategory}
      </h2>

      <div className="space-y-4">
        {selectedCategory && (helpContent as any)[selectedCategory]?.map((question: any, index: any) => (
          <Button
            key={index}
            variant="default"
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

        {/* Help Center Title - Always visible */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-12">Help Center</h1>

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