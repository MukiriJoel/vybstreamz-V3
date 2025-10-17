"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import OtpInput from "@/components/OtpInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { resendOTP, verifyOTP } from "@/store/thunks/authThunks";
import { CircularProgress } from "@mui/material";
import AdSlider from "@/components/AdSlider";

const schema = yup.object().shape({
  otp: yup
    .string()
    .length(4, "OTP must be exactly 4 digits")
    .required("OTP is required"),
});

interface OTPFormInputs {
  otp: string;
}

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const requestToken = searchParams.get("token");
  // console.log("req",requestToken)

  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState<any>(300); // ✅ 5 minutes countdown (300 seconds)
  const [loading, setLoading] = useState(false);

  const {registrationState} = useAppSelector((state) => state.auth);
  const { control, handleSubmit, setValue, watch } = useForm<OTPFormInputs>({
    resolver: yupResolver(schema),
  });

  const otp = watch("otp", "");

  // Fixed handleInputChange function
  const handleInputChange = (index: number, e: any) => {
    const value = e.target.value;

    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Update form value with the new complete OTP
      setValue("otp", newCode.join(""));

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    } else if (
      value === "" &&
      e.nativeEvent.inputType === "deleteContentBackward"
    ) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      setValue("otp", newCode.join(""));

      if (index > 0) {
        const prevField = document.getElementById(`code-${index - 1}`); // Fixed ID
        if (prevField) prevField.focus();
      }
    }
  };

  // Fixed handlePaste function
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(paste)) {
      const newCode = paste.split("");
      setCode(newCode);
      setValue("otp", paste);

      // Update individual input fields
      newCode.forEach((digit, index) => {
        const field = document.getElementById(
          `code-${index}`
        ) as HTMLInputElement;
        if (field) field.value = digit;
      });
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

  const GoToHome = () => {
    router.push("/");
  };

  // Simplified form submission - remove onClick from button, use form onSubmit
  const onSubmit = async (data: OTPFormInputs) => {
    if (!data.otp) {
      toast.warning("Enter the OTP to proceed");
      return;
    }

    try {
      setLoading(true);
      const res = await dispatch(
        verifyOTP({
          request_token: requestToken || registrationState?.request_token,
          code: data.otp,
        })
      ).unwrap();
      toast.success(res?.message);

      if (searchParams.get("returnUrl")?.includes("forgotPassword")) {
        router.push(
          `/auth/passwordReset?token=${requestToken}`
        );
      } else {
        router.push("/");
      }
    } catch (e: any) {
      toast.error(e || "Could not sign you in", { duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeLeft(
      registrationState?.expires_in
        ? parseInt(registrationState?.expires_in.split(" ")[0]) * 60
        : 0
    );
  }, [registrationState]);

  useEffect(() => {
    if (timeLeft <= 0) return; // ✅ Stop countdown when reaching 0

    const timer = setInterval(() => {
      setTimeLeft((prev: any) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // ✅ Cleanup interval on unmount
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // const submitVerifyOTP = async () => {
  //   if (!otp) {
  //     toast.warning("Enter the OTP to proceed");
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await dispatch(
  //       verifyOTP({
  //         request_token: requestToken || registrationState?.request_token,
  //         code: otp,
  //       })
  //     ).unwrap();
  //     toast.success(res?.message);

  //     if (searchParams.get("returnUrl")?.includes("setPassword")) {
  //       router.push(
  //         `/auth/passwordReset?token=${res?.data?.request_token}&msg=${res?.data?.message}&exp=${res?.data?.expiry_time}`
  //       );
  //     } else {
  //       router.push("/profiles");
  //     }
  //   } catch (e: any) {
  //     toast.error(e || "Could not sign you", { duration: 5000 });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const resendToken = async () => {
    try {
      setLoading(true);
      const res = await dispatch(
        resendOTP(requestToken)
      ).unwrap();
      console.log("newToken",res?.request_token)
      replaceToken(res?.data?.request_token)
      toast.success(res?.message);
    } catch (e: any) {
      console.log(e);
      toast.error(e?.message || "Could not resend OTP. Please try Again", {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

 
  
  const replaceToken = (newToken:any) => {
    // Get current params
    const params = new URLSearchParams(searchParams.toString())
    
    // Update the token
    params.set('token', newToken)
    
    // Replace the URL
    router.replace(`${params.toString()}`)
  }

    const imgSlides = [
    {
      id: 1,
      image: "/splash/1.webp",
    },
     {
      id: 2,
      image: "/splash/2.webp",
    },
     {
      id: 3,
      image: "/splash/3.webp",
    }, {
      id: 4,
      image: "/splash/4.webp",
    }, {
      id: 5,
      image: "/splash/5.webp",
    }, {
      id: 6,
      image: "/splash/6.webp",
    }, {
      id: 7,
      image: "/splash/7.webp",
    }, {
      id: 8,
      image: "/splash/8.webp",
    }, {
      id: 9,
      image: "/splash/9.webp",
    }, {
      id: 10,
      image: "/splash/10.webp",
    }, {
      id: 11,
      image: "/splash/11.webp",
    }, {
      id: 12,
      image: "/splash/12.webp",
    },
    {
      id: 13,
      image: "/splash/13.webp",
    },
  ];

  return (
    <div className="px-2 min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex h-[100vh] lg:w-1/2 items-center justify-center p-8">
          {/* <img
            className="max-w-full max-h-[90vh] object-contain"
            src="/images/create.png"
            alt=""
          /> */}
          <div className="w-full h-full md:scale-65 !mt-[-31%]  object-contain">
            <AdSlider slides={imgSlides} showDots={false} isLandScape={false}/>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col ">
         
          

          <div className="w-full pt-12  md:pt-2 mx-auto">
             <div className="flex items-center w-full justify-between max-w-md mx-auto md:mx-auto lg:mx-0 mb-5 md:pt-6 lg:pt-8">
            <button 
              onClick={() => router.back()}
              className="cursor-pointer flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <MdArrowBack className="!w-8 !h-8"/>
            </button>
            <img onClick={()=>GoToHome()}  src="/logos/vybstreamz.png" alt="" className="cursor-pointer !h-15 !w-50" />
          </div>
            <h1 className="text-3xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">
              Verify Phone Number
            </h1>

            <p className="text-[#2C2C2C] dark:text-[#FFFFFF] mb-12 leading-relaxed">
              Please enter the verification code sent to your number
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Code Input */}
              <div className="flex justify-center lg:justify-start mb-8">
                <div className="flex justify-center gap-4 mb-8">
                  {code.map((digit, index) => (
                    <Controller
                      key={index}
                      // @ts-ignore
                      name={`otp-${index}`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <input
                          {...field}
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleInputChange(index, e)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          onPaste={handlePaste}
                          className="w-16 h-16 text-center text-2xl font-semibold bg-[#ffffff] dark:bg-[#2C2C2C] border-2 border-[#999999] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c62676] focus:border-transparent"
                          maxLength={1}
                        />
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Verify Button */}

              <Button
                type="submit"
                className="!w-sm md:w-md h-14 bg-[#c62676] hover:bg-[#a91e63] text-white text-lg font-semibold rounded-full mb-6"
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Verify"}
              </Button>
            </form>

            {/* Additional Options */}
            <div className="text-center md:text-center lg:text-left mx-auto lg:ml-0 w-[70%] space-y-4">
              {timeLeft > 0 ? (
                <p className="text-primary text-sm">
                  Request another code in{" "}
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <div>
                  <button
                    className="text-[#2C2C2C] dark:text-[#FFFFFF] underline cursor-pointer"
                    onClick={resendToken}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={20} /> : "Resend Code"}
                  </button>

                  <p className="text-[#2C2C2C] dark:text-[#FFFFFF]">
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Or verify via phone number"
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
    </div>
  );
}
