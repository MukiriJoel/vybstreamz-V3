"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const africanCountries = [
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+244", country: "Angola", flag: "🇦🇴" },
  { code: "+229", country: "Benin", flag: "🇧🇯" },
  { code: "+267", country: "Botswana", flag: "🇧🇼" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫" },
  { code: "+257", country: "Burundi", flag: "🇧🇮" },
  { code: "+237", country: "Cameroon", flag: "🇨🇲" },
  { code: "+238", country: "Cape Verde", flag: "🇨🇻" },
  { code: "+236", country: "Central African Republic", flag: "🇨🇫" },
  { code: "+235", country: "Chad", flag: "🇹🇩" },
  { code: "+269", country: "Comoros", flag: "🇰🇲" },
  { code: "+243", country: "Congo (DRC)", flag: "🇨🇩" },
  { code: "+242", country: "Congo (Republic)", flag: "🇨🇬" },
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "+253", country: "Djibouti", flag: "🇩🇯" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  { code: "+240", country: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+291", country: "Eritrea", flag: "🇪🇷" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+241", country: "Gabon", flag: "🇬🇦" },
  { code: "+220", country: "Gambia", flag: "🇬🇲" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+224", country: "Guinea", flag: "🇬🇳" },
  { code: "+245", country: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+266", country: "Lesotho", flag: "🇱🇸" },
  { code: "+231", country: "Liberia", flag: "🇱🇷" },
  { code: "+218", country: "Libya", flag: "🇱🇾" },
  { code: "+261", country: "Madagascar", flag: "🇲🇬" },
  { code: "+265", country: "Malawi", flag: "🇲🇼" },
  { code: "+223", country: "Mali", flag: "🇲🇱" },
  { code: "+222", country: "Mauritania", flag: "🇲🇷" },
  { code: "+230", country: "Mauritius", flag: "🇲🇺" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+258", country: "Mozambique", flag: "🇲🇿" },
  { code: "+264", country: "Namibia", flag: "🇳🇦" },
  { code: "+227", country: "Niger", flag: "🇳🇪" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+250", country: "Rwanda", flag: "🇷🇼" },
  { code: "+239", country: "São Tomé and Príncipe", flag: "🇸🇹" },
  { code: "+221", country: "Senegal", flag: "🇸🇳" },
  { code: "+248", country: "Seychelles", flag: "🇸🇨" },
  { code: "+232", country: "Sierra Leone", flag: "🇸🇱" },
  { code: "+252", country: "Somalia", flag: "🇸🇴" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+211", country: "South Sudan", flag: "🇸🇸" },
  { code: "+249", country: "Sudan", flag: "🇸🇩" },
  { code: "+268", country: "Eswatini", flag: "🇸🇿" },
  { code: "+255", country: "Tanzania", flag: "🇹🇿" },
  { code: "+228", country: "Togo", flag: "🇹🇬" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  { code: "+260", country: "Zambia", flag: "🇿🇲" },
  { code: "+263", country: "Zimbabwe", flag: "🇿🇼" },
]

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("720 123 456")
  const [selectedCountryCode, setSelectedCountryCode] = useState("+254")
  const router = useRouter()

  const handleBackToCreate = () => {
    router.push("/createAccount")
  }

  const handleSuccessLogin = () => {
    router.push("/preference")
  }

  const handleForgotPassword = () => {
    router.push("/verifyForgotEmail")
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col transition-colors duration-200">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <img className="max-w-full max-h-full object-contain" src="/images/create.png" alt="" />
        </div>
   
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Header - Now inside form section */}
          <div className="flex pb-10 pt-10 items-center pl-13 md:p-6 md:pl-50 lg:pt-8 lg:pl-56 gap-50">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <img src="/images/VybeStreams.png" alt="" className="h-8 md:h-10" />
          </div>
          
          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:pt-0">
            <div className="w-full max-w-md space-y-6 pb-40">
              {/* Title Section */}
              <div className="text-center lg:text-left">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] dark:text-white mb-2 transition-colors duration-200">Welcome Back</h1>
                <p className="text-[#999999] dark:text-gray-400 text-sm md:text-base transition-colors duration-200">
                  Log into your account and dive into non-stop entertainment made for you
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4">
                {/* Phone Number Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333333] dark:text-white block transition-colors duration-200">
                    <span className="block sm:inline">Country</span>
                    <span className="block sm:inline sm:ml-16">Phone Number*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="w-16 sm:w-20">
                      <Input
                        value="+254"
                        readOnly
                        className="text-center border-[#c62676] focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:border-[#c62676] dark:text-white transition-colors duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border-[#c62676] focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:border-[#c62676] dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                        placeholder="720 123 456"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333333] dark:text-white transition-colors duration-200">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pr-10 border-[#cccccc] dark:border-gray-600 focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] dark:text-gray-400 hover:text-[#777777] dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-left">
                  <button 
                    onClick={handleForgotPassword}
                    className="text-xs sm:text-sm text-[#333333] dark:text-white font-medium hover:text-[#c62676] transition-colors duration-200"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button 
                  onClick={handleSuccessLogin}
                  className="w-full bg-[#c62676] hover:bg-[#c62676]/90 text-white font-medium py-3 rounded-full text-sm sm:text-base transition-all duration-200"
                >
                  Log In
                </Button>

                {/* Safaricom Button */}
                <Button className="w-full bg-[#35a839] hover:bg-[#35a839]/90 text-white font-medium py-3 rounded-full text-sm sm:text-base transition-all duration-200">
                  Continue With Safaricom
                </Button>

                {/* Social Login Icons */}
                <div className="flex justify-center gap-3 pt-4">
                  <img className="w-auto h-8 sm:h-10" src="/images/Frame 480.png" alt="" />
                </div>

                {/* Sign Up Link */}
                <div className="text-center text-xs sm:text-sm text-[#333333] dark:text-white transition-colors duration-200">
                  {"Don't have an account "}
                  <button 
                    onClick={handleBackToCreate}
                    className="text-[#c62676] underline hover:no-underline font-medium"
                  >
                    Sign-Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}