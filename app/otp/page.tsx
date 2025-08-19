"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-[#f2f2f2] px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <ArrowLeft className="w-6 h-6 text-[#2c2c2c]" />
        <div className="text-2xl font-bold">
          <span className="text-[#e16026]">Vybe</span>
          <span className="text-[#c62676]">Streams</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-[#2c2c2c] mb-4">Verify Email</h1>

        <p className="text-[#2c2c2c] mb-12 leading-relaxed">
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
          <button className="text-[#2c2c2c] underline">Resend Code</button>

          <p className="text-[#2c2c2c]">Or verify via phone number</p>
        </div>
      </div>
    </div>
  )
}
