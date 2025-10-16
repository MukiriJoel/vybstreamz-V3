// "use client";
// import {Controller, useForm} from 'react-hook-form';
// import * as yup from 'yup';
// import {yupResolver} from '@hookform/resolvers/yup';
// import {Button, CircularProgress, IconButton, Input} from '@mui/material';
// import React, {useEffect, useState} from 'react';
// import {MdArrowBack} from "react-icons/md";
// import {useRouter, useSearchParams} from "next/navigation";
// import { formatTime } from '@/lib/helpers/formatTime';
// import {useDispatch} from "react-redux";
// import {AppDispatch} from "@/store";
// import { resendOTP, verifyOTP } from '@/store/thunks/authThunks';
// import { toast } from 'sonner';

// const schema = yup.object().shape({
//     otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
// });

// interface OTPFormInputs {
//     otp: string;
// }

// const VerifyPhone = (props: { data?: any, emitClick?: any }) => {
//     const searchParams = useSearchParams();
//     const [loading, setLoading] = useState(false);
//     const dispatch = useDispatch<AppDispatch>();
//     const router = useRouter();
//     const {control, handleSubmit, setValue, watch} = useForm<OTPFormInputs>({
//         resolver: yupResolver(schema),
//     });
//     const [showPhoneModal, setShowPhoneModal] = useState(false);

//     const [timeLeft, setTimeLeft] = useState<any>(props?.data?.expiry_time * 60); // ✅ 5 minutes countdown (300 seconds)

//     const otp = watch('otp', '');

//     const onSubmit = async (data: OTPFormInputs) => {
//         const payload = {
//             ...props?.data,
//             otp: data?.otp
//         }
//         console.log("click payload",payload)
//         // props?.emitClick(payload);

//          try {
//               setLoading(true);
//               // const res = await dispatch(
//               //   verifyOTP({
//               //     request_token: payload?.request_token,
//               //     code: payload?.otp,
//               //   })
//               // ).unwrap();
//               // toast.success(res?.message);
//               setShowPhoneModal(true);
//               // if () {
//               //   // router.push(
//               //   //   `/auth/passwordReset?token=${ payload?.request_token}`
//               //   // );
//               // } else {
//               //   router.push("/");
//               // }
//             } catch (e: any) {
//               toast.error(e || "Could not sign you in", { duration: 5000 });
//             } finally {
//               setLoading(false);
//             }
//     };

//      const resendToken = async () => {
//         try {
//           setLoading(true);
//           const res = await dispatch(
//             resendOTP(props?.data?.request_token)
//           ).unwrap();
//           toast.success(res?.message);
//         } catch (e: any) {
//           console.log(e);
//           toast.error(e?.message || "Could not resend OTP. Please try Again", {
//             duration: 5000,
//           });
//         } finally {
//           setLoading(false);
//         }
//     };

//     const handleChange = (e: any, index: number) => {
//         const value = e.target.value;
//         const newOtp = otp.split('');

//         if (/^\d$/.test(value)) {
//             newOtp[index] = value;
//             setValue('otp', newOtp.join(''));
//             if (index < 3) {
//                 const nextField = document.getElementById(`otp-${index + 1}`);
//                 if (nextField) nextField.focus();
//             }
//         } else if (value === '' && e.nativeEvent.inputType === 'deleteContentBackward') {
//             newOtp[index] = '';
//             setValue('otp', newOtp.join(''));
//             if (index > 0) {
//                 const prevField = document.getElementById(`otp-${index - 1}`);
//                 if (prevField) prevField.focus();
//             }
//         }
//     };

//     const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//         const paste = e.clipboardData.getData('text');
//         if (/^\d{4}$/.test(paste)) {
//             setValue('otp', paste);
//             Array.from({length: 4}).forEach((_, index) => {
//                 const field: any = document.getElementById(`otp-${index}`);
//                 if (field) field.value = paste[index];
//             });
//         }
//     };

//     const handleUpdatePhone =()=>{

//     }

//     useEffect(() => {
//         if (timeLeft <= 0) return; // ✅ Stop countdown when reaching 0

//         const timer = setInterval(() => {
//             setTimeLeft((prev: any) => prev - 1);
//         }, 1000);

//         return () => clearInterval(timer); // ✅ Cleanup interval on unmount
//     }, [timeLeft]);

//     return (
//         <div className="flex flex-col gap-8">
//             <IconButton className="w-fit !p-0">
//                 <MdArrowBack onClick={props.emitClick} className="text-4xl text-black"/>
//             </IconButton>
//             <h2 className="text-3xl font-bold">Verify Phone
//                 <span className="block text-lg font-light">{props?.data?.message}</span>
//             </h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-8">
//                 <div className="flex gap-4">
//                     {Array.from({length: 4}).map((_, index) => (
//                         <Controller
//                             key={index}
//                             // @ts-ignore
//                             name={`otp`}
//                             control={control}
//                             defaultValue=""
//                             render={({field}) => (
                               
//     <Input
//     {...field}
//     id={`otp-${index}`}
//     value={otp[index] || ''}
    
//     onChange={(e: any) => {
//                     field.onChange(e); // Keep field in sync
//                     handleChange(e, index);
//                 }}
//     onPaste={handlePaste}
//     inputProps={{
//         maxLength: 1,
//         style: {
//             textAlign: 'center',
//             fontSize: '2.5rem',
//             fontWeight: 600,
//         }
//     }}
// />
//                             )}
//                         />
//                     ))}
//                 </div>
//                 <Button type="submit" variant="contained" color="primary" className="custom-btn mt-4">
//                     Verify
//                 </Button>
//             </form>
//             {timeLeft>0 ? (
//                 <p className="text-primary text-sm">Request another code in <span
//                 className="font-semibold">{formatTime(timeLeft)}</span></p>
//             ):(

//                 <div>
//                                   <button
//                                     className="text-[#2C2C2C] dark:text-[#FFFFFF] underline cursor-pointer"
//                                     onClick={resendToken}
//                                     disabled={loading}
//                                   >
//                                     {loading ? <CircularProgress size={20} /> : "Resend Code"}
//                                   </button>
                
//                                   <p className="text-[#2C2C2C] dark:text-[#FFFFFF]">
//                                     {loading ? (
//                                       <CircularProgress size={20} />
//                                     ) : (
//                                       ""
//                                     )}
//                                   </p>
//                                 </div>
//             ) }
           
//         {showPhoneModal && (
//         <div className="fixed inset-0 backdrop-blur bg-black/16 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-100 mx-4">
//             <div className="text-center">
//               <h3 className="text-[24px] font-semibold text-[#2C2C2C] mb-1">
//                 Change Your Phone Number
//               </h3>
//               <p className="text-[#2C2C2C] dark:text-[#FFFFFF] text-[14px] mb-6">
//                 Enter your new mobile number to proceed
//               </p>
//               <div>
//                               <label className="block text-base text-left !font-normal text-[#2C2C2C] dark:text-[#FFFFFF] mb-2">
//                                 New Phone Number
//                               </label>
                             
//                                   <input
//                                     type="text"
//                                     placeholder="John Doe"
//                                     className="w-full px-4 py-3 border text-base border-gray-200 dark:border-[#2C2C2C]  rounded-lg bg-gray-50 dark:bg-[#2C2C2C] text-[#4D4D4D] dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                                   />
                                
//                               {/* {errors.name && (
//                                 <p className="text-red-500 text-xs mt-1">
//                                   {errors.name.message}
//                                 </p>
//                               )} */}
//                             </div>
              
//               <div className="flex gap-4 justify-center mt-5">
//                 <button
//                   onClick={handleUpdatePhone}
//                   className="w-full text-capitalize cursor-pointer px-10 py-3 bg-[#c62676] text-white rounded-full hover:bg-pink-700 transition-colors"
//                 >
//                   update phone number
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//         </div>
        
//     );
// };

// export default VerifyPhone;



"use client";
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, CircularProgress, IconButton, Input} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {MdArrowBack, MdClose} from "react-icons/md";
import {useRouter, useSearchParams} from "next/navigation";
import { formatTime } from '@/lib/helpers/formatTime';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import { resendOTP, updateUserPhone, verifyOTP, verifyOTP2 } from '@/store/thunks/authThunks';
import { toast } from 'sonner';

const schema = yup.object().shape({
    otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
});

interface OTPFormInputs {
    otp: string;
}

const VerifyPhone = (props: { data?: any, emitClick?: any }) => {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {control, handleSubmit, setValue, watch} = useForm<OTPFormInputs>({
        resolver: yupResolver(schema),
    });
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [timeLeft, setTimeLeft] = useState<any>(props?.data?.expiry_time * 60);

    const otp = watch('otp', '');

    const onSubmit = async (data: OTPFormInputs) => {
        const payload = {
            ...props?.data,
            otp: data?.otp
        }
        console.log("click payload", payload)

        try {
            setLoading(true);
            // Uncomment when ready to use actual API
             setShowPhoneModal(true);
            const res = await dispatch(
              verifyOTP2({
                request_token: payload?.request_token,
                code: payload?.otp,
              })
            ).unwrap();
           
            // toast.success(res?.message);
            
            // Show phone update modal after successful OTP verification
            
            
        } catch (e: any) {
            toast.error(e || "Could not verify OTP", { duration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    const resendToken = async () => {
        try {
            setLoading(true);
            const res = await dispatch(
                resendOTP(props?.data?.request_token)
            ).unwrap();
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

    const handleUpdatePhone = async () => {
        // Validate phone number
        if (!newPhoneNumber.trim()) {
            setPhoneError('Phone number is required');
            return;
        }
        
        // Basic phone validation (adjust regex based on your needs)
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(newPhoneNumber.replace(/[\s\-\(\)]/g, ''))) {
            setPhoneError('Please enter a valid phone number');
            return;
        }

        // Create payload with OTP and new phone number
        const payload = {
            phone_code: "+254",
            country_code: "KE",
            country: "Kenya",
            phone: newPhoneNumber
        };

        console.log("Update phone payload", payload);

        
        // Send data back to parent component
        props?.emitClick(payload);

         try {
            setLoading(true);
            // Uncomment when ready to use actual API
            const res = await dispatch(
              updateUserPhone({
                ...payload
              })
            ).unwrap();
            console.log("updatePhoneres")
            toast.success(res?.message);
            
            // Show phone update modal after successful OTP verification
            setShowPhoneModal(false);
            
        } catch (e: any) {
            toast.error(e || "Could not verify OTP", { duration: 5000 });
        } finally {
            setLoading(false);
        }
        
        // Optionally close the modal
        // setShowPhoneModal(false);
    };

    const handleCloseModal = () => {
        setShowPhoneModal(false);
        setNewPhoneNumber('');
        setPhoneError('');
    };

    const handleChange = (e: any, index: number) => {
        const value = e.target.value;
        const newOtp = otp.split('');

        if (/^\d$/.test(value)) {
            newOtp[index] = value;
            setValue('otp', newOtp.join(''));
            if (index < 3) {
                const nextField = document.getElementById(`otp-${index + 1}`);
                if (nextField) nextField.focus();
            }
        } else if (value === '' && e.nativeEvent.inputType === 'deleteContentBackward') {
            newOtp[index] = '';
            setValue('otp', newOtp.join(''));
            if (index > 0) {
                const prevField = document.getElementById(`otp-${index - 1}`);
                if (prevField) prevField.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData('text');
        if (/^\d{4}$/.test(paste)) {
            setValue('otp', paste);
            Array.from({length: 4}).forEach((_, index) => {
                const field: any = document.getElementById(`otp-${index}`);
                if (field) field.value = paste[index];
            });
        }
    };

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev: any) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <>
            {/* Main verification form - only show when modal is NOT open */}
            {!showPhoneModal && (
                <div className="flex flex-col gap-8">
                    <IconButton className="w-fit !p-0">
                        <MdArrowBack onClick={props.emitClick} className="text-4xl text-black"/>
                    </IconButton>
                    <h2 className="text-3xl font-bold">Verify Phone
                        <span className="block text-lg font-light">{props?.data?.message}</span>
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-8">
                        <div className="flex gap-4">
                            {Array.from({length: 4}).map((_, index) => (
                                <Controller
                                    key={index}
                                    name={`otp`}
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            id={`otp-${index}`}
                                            value={otp[index] || ''}
                                            onChange={(e: any) => {
                                                field.onChange(e);
                                                handleChange(e, index);
                                            }}
                                            onPaste={handlePaste}
                                            inputProps={{
                                                maxLength: 1,
                                                style: {
                                                    textAlign: 'center',
                                                    fontSize: '2.5rem',
                                                    fontWeight: 600,
                                                }
                                            }}
                                        />
                                    )}
                                />
                            ))}
                        </div>
                        <Button type="submit" variant="contained" color="primary" className="custom-btn mt-4" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Verify'}
                        </Button>
                    </form>
                    {timeLeft > 0 ? (
                        <p className="text-primary text-sm">Request another code in <span
                            className="font-semibold">{formatTime(timeLeft)}</span></p>
                    ) : (
                        <div>
                            <button
                                className="text-[#2C2C2C] dark:text-[#FFFFFF] underline cursor-pointer"
                                onClick={resendToken}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={20}/> : "Resend Code"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Phone update modal - only show when triggered */}
            {showPhoneModal && (
                <div className="fixed inset-0 backdrop-blur bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-full max-w-md mx-4">
                      <div className='flex justify-end'>
                                <button 
                                  onClick={() => handleCloseModal()}
                                  className="cursor-pointer flex items-center mr-2 md:mr-4 text-[#2C2C2C] dark:text-[#FFFFFF] hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                                >
                                  <MdClose className="!w-8 !h-8"/>
                                </button>
                      </div>
                        <div className="text-center">
                            <h3 className="text-[24px] font-semibold text-[#2C2C2C] mb-1">
                                Change Your Phone Number
                            </h3>
                            <p className="text-[#2C2C2C] dark:text-[#FFFFFF] text-[14px] mb-6">
                                Enter your new mobile number to proceed
                            </p>
                            <div className="text-left mb-6">
                                <label className="block !text-base text-left !font-normal text-[#2C2C2C] dark:text-[#FFFFFF] mb-2">
                                    New Phone Number
                                </label>
                                <input
                                    type="tel"
                                    placeholder="0712345678"
                                    value={newPhoneNumber}
                                    onChange={(e) => {
                                        setNewPhoneNumber(e.target.value);
                                        setPhoneError(''); // Clear error on input
                                    }}
                                    className="w-full px-4 py-3 border text-base border-gray-200 dark:border-[#2C2C2C] rounded-lg bg-gray-50 dark:bg-[#2C2C2C] text-[#4D4D4D] dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                />
                                {phoneError && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {phoneError}
                                    </p>
                                )}
                            </div>

                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleUpdatePhone}
                                    disabled={loading}
                                    className="w-full cursor-pointer px-6 py-3 bg-[#c62676] text-white rounded-full hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <CircularProgress size={20} color="inherit" /> : 'Update Phone Number'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerifyPhone;
