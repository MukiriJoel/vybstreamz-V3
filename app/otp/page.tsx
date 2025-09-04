"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { MdArrowBack } from "react-icons/md"

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", ""])
  const router = useRouter()

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }
  const handleVerify = () => {
    router.push('/preference')
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <img className="max-w-full max-h-full object-contain" src="/images/create.png" alt="" />
        </div>
   
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col ">

          <div className="flex pt-10 items-center w-full justify-center  md:px-6 md:pt-6 lg:pt-8 gap-50">
                      <button 
                        onClick={() => router.push('/')}
                        className="flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        <MdArrowBack className="!w-8 !h-8"/>
                      </button>
                      <img src="/logos/vybstreamz.png" alt="" className="!h-15 !w-50" />
                    </div>
      

      <div className="max-w-sm mx-auto pt-20">
        <h1 className="text-3xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">Verify Email</h1>

        <p className="text-[#2C2C2C] dark:text-[#FFFFFF] mb-12 leading-relaxed">
          Please enter the verification code sent to your email address
        </p>

        {/* Code Input */}
        <div className="flex gap-4 mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-16 h-16 text-center text-2xl font-semibold bg-[#ffffff] border-2 border-[#c62676] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c62676] focus:border-transparent"
              maxLength={1}
            />
          ))}
        </div>

        {/* Verify Button */}
        <Button className="w-full h-14 bg-[#c62676] hover:bg-[#a91e63] text-white text-lg font-semibold rounded-full mb-6" onClick={handleVerify}>
          Verify
        </Button>

        {/* Additional Options */}
        <div className="text-center space-y-4">
          <button className="text-[#2C2C2C] dark:text-[#FFFFFF] underline">Resend Code</button>

          <p className="text-[#2C2C2C] dark:text-[#FFFFFF]">Or verify via phone number</p>
        </div>
      </div>
      </div>

      </div>

      {/* Confirmation Modal */}
      
    </div>
  )
}
