"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/context/AuthContext"
import { MdArrowBack } from "react-icons/md"
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import { AppDispatch } from "@/store"
import { ILogin } from "@/store/types/auth"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner";
import { loginUser } from "@/store/thunks/authThunks"
import { SectionHEAuth } from "@/components/SectionHEAuth"
import { SectionSocialAuth } from "@/components/SectionSocialAuth"
import AdSlider from "@/components/AdSlider"
import { usePathname } from 'next/navigation'

const phoneRegExp = /^[0-9]{9}$/

const schema = yup.object().shape({
    username: yup.string()
            .matches(phoneRegExp, 'Phone number must be at least 9 digits')
            .required('Phone is required'),
    password: yup.string().min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)").
        required('Password is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountryCode, setSelectedCountryCode] = useState("+254")
  const router = useRouter()
  const { isAuthenticated, login,logout } = useAuth()
  const dispatch=useAppDispatch();
  const authState = useAppSelector((state)=>state.auth);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const {control, register, handleSubmit, formState: {errors}} = useForm<ILogin>({
            resolver: yupResolver(schema),
  });

  const pathname = usePathname();
   // Get base URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const returnUrl = searchParams.get("returnUrl");
  

  const handleBackToCreate = (e:any) => {
    e.preventDefault();
    router.push("/auth/createAccount")
  }

  // const handleSuccessLogin = () => {
  //   login() // Set logged in state to true
  //   router.push('/')
  // }

  const handleForgotPassword = (e:any) => {
    e.preventDefault()
    router.push("/auth/ForgotPassword")
  }

  const GoToHome = () =>{
    router.push('/')
  }

  const reRouteUser = (data: any) => {
            switch (parseInt(data?.code)) {
                case 1000:
                    router.push(`/auth/otp?token=${data?.data?.request_token}`)
                    return;
                case 1001:
                    return;
                default:
                    returnUrl ? router.push(`${baseUrl}/${returnUrl}`) : router.push("/")
                    return;
            }
  }

  const onSubmit = async (data: ILogin) => {
            try {
                setLoading(true);
                const response = await dispatch(loginUser(data)).unwrap();
                toast.success(response?.data?.message);
                reRouteUser(response?.data);
            } catch (e: any) {
                toast.warning(e || "Error logging in")
            } finally {
                setLoading(false);
            }
  };
  
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
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col transition-colors duration-200">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex h-[100vh] lg:w-1/2 items-start justify-start p-8">
          {/* <img className="max-w-full max-h-[90vh] object-contain" src="/images/create.png" alt="" /> */}
          <div className="w-full h-full lg:scale-65 mt-[-15.9%] my-auto  object-contain">
            <AdSlider slides={imgSlides} showDots={false} isLandScape={false}/>
          </div>
        </div>
   
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Header - Now inside form section */}
          
          
          {/* Form Content */}
          <div className="flex-1 flex-col items-center justify-center mx-auto p-4 md:p-8 lg:pt-0">
             <div className="flex pt-10 mb-4 items-center w-full justify-between max-w-md md:pt-6 lg:pt-8 gap-4">
                      <button 
                        onClick={() => router.back()}
                        className="cursor-pointer flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        <MdArrowBack className="!w-8 !h-8"/>
                      </button>
                      <img onClick={()=>GoToHome()}  src="/logos/vybstreamz.png" alt="" className="cursor-pointer !h-15 !w-50" />
            </div>
            <div className="w-full max-w-md space-y-6 pb-40">
              {/* Title Section */}
              <div className="text-center lg:text-left">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] dark:text-white mb-2 transition-colors duration-200">Welcome Back</h1>
                <p className="text-[#999999] dark:text-gray-400 text-sm md:text-base transition-colors duration-200">
                  Log into your account and dive into non-stop entertainment made for you
                </p>
                
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  {/* Phone Number Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333] dark:text-white block transition-colors duration-200">
                      <span className="inline-block sm:inline-block pr-7 ">Country</span>
                      <span className="inline-block sm:inline-block pl-3">Phone Number*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="w-16 sm:w-20">
                        
                                <Input
                                
                                value="+254"
                                readOnly
                                className="h-12 text-center border-[#cccccc] focus:border-[#c62676] focus:ring-[#c62676] dark:border-gray-600 text-sm dark:bg-[#2A2A2A] dark:text-[#FFFFFF] dark:text-white dark:placeholder-[#888888] transition-colors duration-200"
                                />
                          
                        
                      
                      </div>
                      <div className="flex-1">
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({field})=>(
                                  <Input
                                    type="tel"
                                    {...field}
                                    className={`h-12 focus:!border-[#c62676] focus:!ring-[#c62676] border-[#cccccc] dark:border-gray-600  text-sm dark:bg-[#2A2A2A] dark:text-white dark:placeholder-[#888888] transition-colors duration-200 ${
                            errors.username ? 'border-red-500 ring-red-500' : ''}`}
                                    placeholder="720 123 456"
                                    
                                  />
                            )}
                        />
                        {errors.username && (
                          <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
                        )}
                        
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#333333] dark:text-white transition-colors duration-200">Password</label>
                    <div className="relative">
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                          <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="h-12 pr-10 focus:!border-[#c62676] focus:!ring-[#c62676] border-[#cccccc] dark:border-gray-600  text-sm dark:bg-[#2A2A2A] dark:text-white dark:placeholder-[#888888] transition-colors duration-200 "
                          placeholder="Enter your password"
                          />
                      
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] dark:text-gray-400 hover:text-[#777777] dark:hover:text-gray-300 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </button>
                     
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                  </div>

              
                  {/* Forgot Password */}
                  <div className="text-left">
                    <button 
                      onClick={(e)=>handleForgotPassword(e)}
                      className="cursor-pointer text-xs sm:text-sm text-[#333333] dark:text-white font-medium hover:text-[#c62676] transition-colors duration-200"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Login Button */}
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#c62676] hover:bg-[#c62676]/90 text-white font-medium py-4 rounded-full text-sm sm:text-base transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </Button>

                  {/* Safaricom Button */}
                  {/* <Button className="w-full bg-[#35a839] hover:bg-[#35a839]/90 text-white font-medium py-3 rounded-full text-sm sm:text-base transition-all duration-200">
                    Continue With Safaricom
                  </Button> */}
                  <SectionHEAuth/>
                
                
                  {/* Social Login Icons */}
                  <div className="flex justify-start gap-3 !py-0">
                    {/* <img className="w-auto h-8 sm:h-10" src="/images/Frame 4802.png" alt="" /> */}
                    <SectionSocialAuth loadingState={(e: any) => setLoading(e)}/>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center md:text-left text-xs sm:text-sm text-[#333333] dark:text-white transition-colors duration-200">
                    {"Don't have an account "}
                    <button 
                      onClick={(e)=>handleBackToCreate(e)}
                      className="cursor-pointer text-[#c62676] underline hover:no-underline font-medium"
                    >
                      Sign-Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}