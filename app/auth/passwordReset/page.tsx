"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/context/AuthContext"
import { MdArrowBack } from "react-icons/md"
import * as yup from "yup";
import {toast} from "sonner";
import {yupResolver} from '@hookform/resolvers/yup';
import { Controller, useForm } from "react-hook-form"
import { resetPassword } from "@/store/thunks/authThunks"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { AsyncThunkAction, AsyncThunkConfig } from "@reduxjs/toolkit"
import { setRegistrationState } from "@/store/slices/authSlice"
import { CircularProgress } from "@mui/material"
import AdSlider from "@/components/AdSlider"

interface ResetPasswordFormInputs {
    new_password: string;
    confirm_password: string;
  
}

const schema = yup.object().shape({
    new_password: yup.string()
            .min(12, "Password must be at least 12 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
            .required("Password is required"),
    confirm_password: yup.string().oneOf([yup.ref('new_password'), ''], 'Passwords must match').required('Password is required'),
});

export default function PasswordResetForm() {
  const {control, handleSubmit,watch, formState: {errors}} = useForm<ResetPasswordFormInputs>({
      resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const {user}=useAppSelector((state)=>state.auth);
  const sessionId=user?.login_session_id;
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  // const [confirmPassword, setConfirmPassword] = useState("")

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const handleClickShowPassword = () => setShowPassword(!showPassword);

  const confirmPassword = watch('confirm_password')
  // Password validation checks
  const hasMinLength = confirmPassword?.length >= 12
  const hasCapitalLetter = /[A-Z]/.test(confirmPassword)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword)
  const hasNumber = /\d/.test(confirmPassword)

  const allValidationsPassed = hasMinLength && hasCapitalLetter && hasSpecialChar && hasNumber

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (allValidationsPassed && newPassword === confirmPassword) {
  //     console.log("Password reset submitted")
  //   }
  // }

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    if (!allValidationsPassed && newPassword !== confirmPassword) {
      console.log("Password reset not")
      toast.warning("validations not passed")
      return
    }
        // Add your reset password logic here
        const payload: any = {
            ...data,
            login_session_id: sessionId 
        }

        try {
            setLoading(true);
            const res = await dispatch(resetPassword(payload)).unwrap();
            dispatch(setRegistrationState(res?.data));
            router.push(`/`);
            toast.success(res?.message);
        } catch (e: any) {
           
            toast.warning("Something went wrong")
        } finally {
            setLoading(false)
        }
    };


  const GoToHome = () =>{
    router.push('/')
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
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col">

        {/* Header */}
        

    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
         <div className="hidden lg:flex h-[100vh] lg:w-1/2 items-start justify-center p-8">
          {/* <img className="max-w-full max-h-[90vh] object-contain" src="/images/create.png" alt="" /> */}
          <div className="w-full h-full md:scale-65 mt-[-16%]  object-contain">
            <AdSlider slides={imgSlides} showDots={false} isLandScape={false}/>
          </div>
        </div>
   
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col ">
          {/* Header - Now inside form section */}
          
          
          {/* Form Content */}
          <div className="flex-1 flex-col items-center justify-center mx-auto p-4 md:p-8 lg:pt-0">
            <div className="flex pt-10 items-center max-w-md w-full justify-between  gap-4">
              <button 
                onClick={() => router.back()}
                className="cursor-pointer flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <MdArrowBack className="!w-8 !h-8"/>
              </button>
              <img onClick={()=>GoToHome()}  src="/logos/vybstreamz.png" alt="" className="cursor-pointer !h-15 !w-50" />
            </div>
          <div className="w-full max-w-md space-y-6">
            {/* Title Section */}
            

            {/* Form */}
                    <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#2c2c2c] dark:text-[#FFFFFF]">Reset Password</h1>
            <p className="text-[#2c2c2c] dark:text-[#CCCCCC] text-sm">Your new password must be different from your previous passwords</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-[#2c2c2c] dark:text-[#FFFFFF] mb-2">
                  New Password
                </label>
                <Controller
                  name="new_password"
                  control={control}
                  defaultValue=""
                  render={({field})=>(
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        className={`pr-10 border-[#cccccc] dark:border-gray-600 focus:border-[#c62676] focus:ring-[#c62676] text-sm bg-white dark:bg-[#2A2A2A] dark:text-[#FFFFFF] dark:placeholder-[#888888] transition-colors duration-200 ${
                          errors.new_password ? 'border-red-500 ring-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ?  <Eye className="h-4 w-4" />:<EyeOff className="h-4 w-4" />}
                      </button>
                    </div>
                  )}
                />
                {errors.new_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.new_password.message}</p>
                )}
                
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2c2c2c] dark:text-[#FFFFFF] mb-2">
                  Confirm Password
                </label>
                <Controller
                  name="confirm_password"
                  control={control}
                  defaultValue=""
                  render={({field})=>(
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        className={`pr-10 border-[#cccccc] dark:border-gray-600 focus:border-[#c62676] focus:ring-[#c62676] text-sm bg-white dark:bg-[#2A2A2A] dark:text-[#FFFFFF] dark:placeholder-[#888888] transition-colors duration-200 ${
                          errors.confirm_password ? 'border-red-500 ring-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ?  <Eye className="h-4 w-4" />:<EyeOff className="h-4 w-4" />}
                      </button>
                    </div>
                  )}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${hasMinLength ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  {hasMinLength && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#2c2c2c] dark:text-[#CCCCCC]">At least 12 characters</span>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${hasCapitalLetter ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  {hasCapitalLetter && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#2c2c2c] dark:text-[#CCCCCC]">At least 1 Capital Letter</span>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${hasSpecialChar ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  {hasSpecialChar && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#2c2c2c] dark:text-[#CCCCCC]">At least 1 special character e.g !,@,#,?</span>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${hasNumber ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  {hasNumber && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm text-[#2c2c2c] dark:text-[#CCCCCC]">At least 1 number</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!allValidationsPassed && newPassword !== confirmPassword}
              className="w-full h-12 bg-[#c62676] hover:bg-[#c62676]/90 text-white font-semibold py-4 px-6 rounded-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
                 {loading ? <CircularProgress size={10} /> : "Update Password"}
            </Button>
          </form>
        </div>

          </div>
        </div>
      </div>
      </div>
  
    </div>
  )
}


