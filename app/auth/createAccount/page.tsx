"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"
import { Button } from "@mui/material"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/context/AuthContext"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MdArrowBack } from "react-icons/md"
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "sonner"
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { setLoading } from "@/store/slices/authSlice"
import { IRegister } from "@/store/types/auth"
import { signupUser } from "@/store/thunks/authThunks"
import { useConfirm } from "@/hooks/useConfirm"
import { ModalConfirmDetails } from "@/components/ModalConfirmDetails"


interface SignInFormInputs {
    phone: string;
    email?: string;
    password: string;
}

// Updated phone regex for 9-digit Kenyan numbers (without country code)
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const phoneRegExp = /^[0-9]{9}$/
// Schema form submission
const schema = yup.object().shape({
    phone: yup.string()
        .matches(phoneRegExp, 'Phone number must be at least 9 digits')
        .required('Phone is required'),
    email: yup.string().email('Invalid Email').notRequired(),
    password: yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
        .required("Password is required")
})

export default function CreateAccountPage() {
  const { login } = useAuth()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const authState = useAppSelector((state)=>state.auth);
  const dispatch = useAppDispatch();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)
  const [loading, setLoading] = useState(false);
  const {isOpen: confirmModalOpen, data, openConfirm, closeConfirm} = useConfirm();

  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
      email: '',
      password: ''
    }
  })

  // Watch password field for validation display
  const password = watch('password')
  
  // Password validation checks - use the watched password value
  const hasMinLength = password?.length >= 8
  const hasCapitalLetter = /[A-Z]/.test(password || '')
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password || '')
  const hasNumber = /\d/.test(password || '')

  const allValidationsPassed = hasMinLength && hasCapitalLetter && hasSpecialChar && hasNumber

  const onSubmit = async(data: SignInFormInputs) => {
    if (!hasAcceptedTerms) {
      console.log("terms not accepted")
      toast.warning("Please accept the terms and conditions to proceed");
      return;
    }

    if (!allValidationsPassed) {
      console.log("validations not")
      toast.error("Please ensure your password meets all requirements");
      return;
    }

    const payload: IRegister = {
        ...data,
        phone_code: '+254',
        country_code: 'KE',
        country: 'Kenya'
    }

    const confirm = await openConfirm(payload);
     if (!confirm) {
            toast.warning("User canceled submission.");
            return; // Stop if user cancels
    }

    try {
      setLoading(true)
      // Your API call here
      console.log('Submitting:', payload)
      const res=await dispatch(signupUser(payload)).unwrap();
      console.log("res",res)
      router.push(`/auth/otp?token=${res?.data?.request_token}`)
      toast.success(res?.message)
    } catch (e:any) {
      console.log(e)
      toast.warning(e || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted on client
  if (!mounted) {
    return null
  }

  const handleLogin = () => {
    login()
    router.push('/profile')
  }

  const handleCreateAccount = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmNext = () => {
    setShowConfirmModal(false)
    router.push('/otp')
  }

  const handleCancel = () => {
    setShowConfirmModal(false)
  }

  const handleLoginPage = () => {
    router.push("/auth/login")
  }

  const GoToHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] flex flex-col transition-colors duration-200">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-60px)]">
        {/* Image Section - Hidden on mobile, visible on large screens */}
        <div className="hidden lg:flex lg:w-1/2 items-start justify-center p-8">
          <img className="max-w-full max-h-[90vh] object-contain" src="/images/create.png" alt="" />
        </div>
   
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col ">
          {/* Header - Now inside form section */}
          <div className="flex pt-10 items-center w-full justify-center  md:px-6 md:pt-6 lg:pt-8 gap-50">
            <button 
              onClick={() => router.back()}
              className="cursor-pointer flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <MdArrowBack className="!w-8 !h-8"/>
            </button>
            <img onClick={()=>GoToHome()}  src="/logos/vybstreamz.png" alt="" className="cursor-pointer !h-15 !w-50" />
          </div>
          
          {/* Form Content */}
          <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:pt-0">
          <div className="w-full max-w-md space-y-6">
            {/* Title Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#333333] dark:text-white mb-2 transition-colors duration-200">Create Account</h1>
              <p className="text-[#999999] dark:text-gray-400 text-sm md:text-base transition-colors duration-200">
                Create your account and dive into non-stop entertainment made for you
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Phone Number Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#333333] dark:text-white block transition-colors duration-200">
                  <span className="block sm:inline">Country</span>
                  <span className="block sm:inline sm:ml-16">Phone Number*</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-16 sm:w-20">
                    <Input
                      readOnly
                      type="tel"
                      value="+254"
                      className="text-center border-[#c62676] focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:border-[#c62676] dark:text-white transition-colors duration-200"
                    />
                  </div>
                  <div className="flex-1">
                    <Controller
                      name="phone"
                      control={control}
                      render={({field})=>(
                        <Input
                          {...field}
                          type="tel"
                          placeholder="720 123 456"
                          className={`border-[#c62676] focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:border-[#c62676] dark:text-white dark:placeholder-gray-400 transition-colors duration-200 ${
                            errors.phone ? 'border-red-500 ring-red-500' : ''
                          }`}
                        />
                      )}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#333333] dark:text-white transition-colors duration-200">Email Address (Optional)</label>
                <Controller
                  name="email"
                  control={control}
                  render={({field})=>(
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className={`border-[#cccccc] dark:border-gray-600 focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-colors duration-200 ${
                        errors.email ? 'border-red-500 ring-red-500' : ''
                      }`}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#333333] dark:text-white transition-colors duration-200">Password</label>
                <Controller
                  name="password"
                  control={control}
                  render={({field})=>(
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pr-10 border-[#cccccc] dark:border-gray-600 focus:border-[#c62676] focus:ring-[#c62676] text-sm dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-colors duration-200 ${
                          errors.password ? 'border-red-500 ring-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  )}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors duration-200 ${hasMinLength ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    {hasMinLength && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-[#2c2c2c] dark:text-white transition-colors duration-200">At least 8 characters</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors duration-200 ${hasCapitalLetter ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    {hasCapitalLetter && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-[#2c2c2c] dark:text-white transition-colors duration-200">At least 1 Capital Letter</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors duration-200 ${hasSpecialChar ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    {hasSpecialChar && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-[#2c2c2c] dark:text-white transition-colors duration-200">At least 1 special character e.g !,@,#,?</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors duration-200 ${hasNumber ? "bg-[#009951]" : "bg-gray-300 dark:bg-gray-600"}`}
                  >
                    {hasNumber && <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />}
                  </div>
                  <span className="text-xs sm:text-sm text-[#2c2c2c] dark:text-white transition-colors duration-200">At least 1 number</span>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={hasAcceptedTerms}
                  onCheckedChange={(checked) => setHasAcceptedTerms(checked === true)}
                  className="mt-0.5 border-[#cccccc] dark:border-gray-600 data-[state=checked]:bg-[#c62676] data-[state=checked]:border-[#c62676] w-4 h-4 sm:w-5 sm:h-5 dark:data-[state=checked]:bg-[#c62676] dark:data-[state=checked]:border-[#c62676] transition-colors duration-200"
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-[#333333] dark:text-white leading-relaxed transition-colors duration-200">
                  I Acknowledge that I have read and understood the{" "}
                  <a href="#" className="text-[#c62676] underline hover:no-underline">
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#c62676] underline hover:no-underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={authState?.loading || loading || hasAcceptedTerms===false}
                className="!w-full !bg-[#c62676] hover:!bg-[#c62676]/90 !text-white !font-medium !py-3 !rounded-full !text-sm !sm:text-base !transition-all !duration-200 disabled:!opacity-50"
              >
                {(authState?.loading || loading) ? 'Creating Account...' : 'Create Account'}
              </Button>

              {/* Sign In Link */}
              <div className="text-center text-xs sm:text-sm text-[#333333] pt-2 dark:text-white transition-colors duration-200">
                Already have an account{" "}
                <a href="#" 
                  onClick={handleLoginPage}
                  className="text-[#c62676] underline hover:no-underline">
                  Sign-in
                </a>
              </div>

              {/* Social Login Buttons */}
              <div className="flex justify-center gap-3 pt-4">
                <img className="w-auto h-8 sm:h-10" src="/images/Frame 480.png" alt="" />
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>

      {/* Confirmation Modal */}
      {/* {showConfirmModal && (
       
      )} */}
      <ModalConfirmDetails isOpen={confirmModalOpen} data={data} onClose={closeConfirm} loading={loading}/>
    </div>
  )
}