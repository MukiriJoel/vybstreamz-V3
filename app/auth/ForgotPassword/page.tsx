"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { MdArrowBack } from "react-icons/md"
import * as yup from "yup";
import {toast} from "sonner";
import { useAppDispatch } from "@/hooks/redux"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { requestPasswordResetToken } from "@/store/thunks/authThunks"
import { setRegistrationState } from "@/store/slices/authSlice"


interface ForgotPasswordFormInputs {
    username: string;
}

const phoneRegExp = /^[0-9]{10}$/

const schema = yup.object().shape({
    username: yup.string().matches(phoneRegExp, 'Phone number must be at least 10 digits')
    .required('Username is required'),
});

export default function ForgotPasswordPage() {
  const dispatch=useAppDispatch();
  const [email, setEmail] = useState("")
  const [usePhone, setUsePhone] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const {control, handleSubmit, formState: {errors}} = useForm<ForgotPasswordFormInputs>({
        resolver: yupResolver(schema),
  });


  const handleResetPassword = () => {
    router.push("/passwordReset")
  }

  const handleEmail = () => {
    router.push("/verifyForgotEmail")
  }

  const GoToHome = () =>{
    router.push('/')
  }

  const onSubmit = async (data: ForgotPasswordFormInputs) => {
        const payload: ForgotPasswordFormInputs = {
            ...data,
        }
        try {
            setLoading(true);
            // dispatch(logout());
            const res = await dispatch(requestPasswordResetToken(payload)).unwrap();
            console.log(res);
            dispatch(setRegistrationState(res?.data))
            router.push(`/auth/otp?returnUrl=setPassword`)
            toast.success(res?.message);
        } catch (e: any) {
            console.log(e)
            toast.warning(e || "Something went wrong")
        } finally {
            setLoading(false)
        }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] transition-colors duration-200">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Section - Hidden on mobile and tablet, visible on desktop */}
         <div className="hidden lg:flex lg:w-1/2 items-start justify-start p-8">
          <img className="max-w-full max-h-[90vh] object-contain" src="/images/create.png" alt="" />
        </div>
   
       
        {/* Form Section */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col">
          {/* Header */}
           <div className="flex pt-10 items-center w-full justify-center  md:px-6 md:pt-6 lg:pt-8 gap-4">
              <button 
                onClick={() => router.push('/auth/login')}
                className="cursor-pointer flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <MdArrowBack className="!w-8 !h-8"/>
              </button>
              <img onClick={()=>GoToHome()}  src="/logos/vybstreamz.png" alt="" className="cursor-pointer !h-15 !w-50" />
            </div>
              
          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 lg:pt-0 lg:space-y-8">
            <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
              {/* Title Section */}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#2c2c2c] dark:text-white transition-colors duration-200">
                  Forgot Password
                </h1>
                <p className="text-sm sm:text-base leading-relaxed text-[#999999] dark:text-gray-400 transition-colors duration-200">
                  Please enter your phone number or email address to receive a verification code
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#333333] dark:text-white transition-colors duration-200">
                    <span className="inline-block">Country</span>
                    <span className="inline-block ml-8 lg:ml-16">Phone Number*</span>
                  </label>
                  
                  <div className="flex gap-2">
                    <div className="w-16 sm:w-20">
                      <Input
                        value="+254"
                        readOnly
                        className="text-center text-sm sm:text-base border-[#c62676] focus:border-[#c62676] focus:ring-[#c62676] dark:bg-gray-800 dark:border-[#c62676] dark:text-white transition-colors duration-200"
                      />
                    </div>
                    <div className="flex-1">
                    <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({field}) => (
                      <Input
                        {...field}
                        type="tel"
                        placeholder="0720 123 456"
                        className="text-sm sm:text-base border-[#c62676] focus:border-[#c62676] focus:ring-[#c62676] dark:bg-gray-800 dark:border-[#c62676] dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
                      />
                    )}
                    />
                    {errors.username && (
                        <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                    )}
                     
                    </div>
                  </div>
                </div>

                {/* <button
                  type="button"
                  onClick={handleEmail}
                  className="text-sm underline text-[#999999] dark:text-gray-400 hover:text-[#777777] dark:hover:text-gray-300 transition-colors duration-200"
                >
                  Use Email Instead
                </button> */}

                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full py-3 sm:py-4 text-sm sm:text-base font-medium rounded-full border-0 hover:opacity-90 transition-all duration-200 bg-[#c62676] hover:bg-[#b01f64] text-white"
                >
                   {loading ? "Sending..." : "Send"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}