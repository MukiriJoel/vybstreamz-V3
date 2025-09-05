"use client";

import type React from "react";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import OtpInput from "@/components/OtpInput";

export default function VerifyEmail() {
  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };
  const handleVerify = () => {
    router.push("/preference");
  };

  const GoToHome = () =>{
    router.push('/')
  }

  return (
    <div className="px-8 min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
          <img
            className="max-w-full max-h-[90vh] object-contain"
            src="/images/create.png"
            alt=""
          />
        </div>


        {/* Form Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col ">
          <div className="flex pt-10 items-center w-full justify-between md:px-6 md:pt-6 lg:pt-8 gap-50 lg:pr-60">
            <button
              onClick={() => router.back()}
              className="cursor-pointer flex items-center mr-1 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"

            >
              <MdArrowBack className="!w-8 !h-8" />
            </button>
            <img onClick={()=>GoToHome()} src="/logos/vybstreamz.png" alt="" className="cursor-pointer !h-15 !w-50" />
          </div>

          <div className="w-full mx-auto  pt-20">
            <h1 className="text-3xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">
              Verify Email
            </h1>

            <p className="text-[#2C2C2C] dark:text-[#FFFFFF] mb-12 leading-relaxed">
              Please enter the verification code sent to your email address
            </p>

            {/* Code Input */}
            <div className="flex justify-center lg:justify-start mb-8">
              {/* {code.map((digit, index) => (
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
              ))} */}
              <OtpInput/>
            </div>

            {/* Verify Button */}
            <Button
              className="w-[70%] h-14 bg-[#c62676] hover:bg-[#a91e63] text-white text-lg font-semibold rounded-full mb-6"
              onClick={handleVerify}
            >
              Verify
            </Button>

            {/* Additional Options */}
            <div className="text-center mx-auto lg:ml-0 w-[70%] space-y-4">
              <button className="text-[#2C2C2C] dark:text-[#FFFFFF] underline">
                Resend Code
              </button>

              <p className="text-[#2C2C2C] dark:text-[#FFFFFF]">
                Or verify via phone number
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
    </div>
  );
}
