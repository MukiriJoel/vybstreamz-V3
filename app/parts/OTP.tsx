"use client";
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, CircularProgress, IconButton, Input} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {MdArrowBack} from "react-icons/md";
import {useRouter} from "next/navigation";
import { formatTime } from '@/lib/helpers/formatTime';
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store";
import { resendOTP } from '@/store/thunks/authThunks';
import { toast } from 'sonner';

const schema = yup.object().shape({
    otp: yup.string().length(4, 'OTP must be exactly 4 digits').required('OTP is required'),
});

interface OTPFormInputs {
    otp: string;
}

const VerifyPhone = (props: { data?: any, emitClick?: any }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const {control, handleSubmit, setValue, watch} = useForm<OTPFormInputs>({
        resolver: yupResolver(schema),
    });

    const [timeLeft, setTimeLeft] = useState<any>(props?.data?.expiry_time * 60); // ✅ 5 minutes countdown (300 seconds)

    const otp = watch('otp', '');

    const onSubmit = async (data: OTPFormInputs) => {
        const payload = {
            ...props?.data,
            otp: data?.otp
        }

        props?.emitClick(payload);
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
        if (timeLeft <= 0) return; // ✅ Stop countdown when reaching 0

        const timer = setInterval(() => {
            setTimeLeft((prev: any) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); // ✅ Cleanup interval on unmount
    }, [timeLeft]);

    return (
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
                            // @ts-ignore
                            name={`otp-${index}`}
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <Input
                                    {...field}
                                    id={`otp-${index}`}
                                    value={otp[index] || ''}
                                    onChange={(e: any) => handleChange(e, index)}
                                    onPaste={handlePaste}
                                    inputProps={{
                                        maxLength: 1,
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '2.5rem',
    
                                            fontWeight: 600,
                                            flex: 1,
                                            flexGrow: 1
                                        }
                                    }}
                                   
                                    className=""
                                />
                            )}
                        />
                    ))}
                </div>
                <Button type="submit" variant="contained" color="primary" className="custom-btn mt-4">
                    Verify
                </Button>
            </form>
            {timeLeft>0 ? (
                <p className="text-primary text-sm">Request another code in <span
                className="font-semibold">{formatTime(timeLeft)}</span></p>
            ):(

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
                                      ""
                                    )}
                                  </p>
                                </div>
            ) }
           
        </div>
    );
};

export default VerifyPhone;
