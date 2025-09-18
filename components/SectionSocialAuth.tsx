import {IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {FcGoogle} from "react-icons/fc";
import {useDispatch} from "react-redux";
import {authenticateWithApple, authenticateWithFacebook, signInWithGoogle} from "@/store/thunks/authThunks";
import {AppDispatch} from "@/store";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {setRegistrationState} from "@/store/slices/authSlice";
import { FaApple, FaFacebookF } from "react-icons/fa";


export const isAppleDevice = () => {
    return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const SectionSocialAuth = ({loadingState}: { loadingState?: any }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const conditionalRouting = (code: number, message?: string, data?: any) => {
        switch (code) {

            // ACC REQUIRES VERIFICATION
            case 1000:
                router.push(`/auth/otp`);
                // TODO: RECHECK THE SOCIAL AUTH FLOW
                dispatch(setRegistrationState(data));
                toast.warning(message);
                return;

            // PHONE REQUIRED
            // case 1001:
            //     router.push(`/auth/set-phone?type=social-auth&token=${data?.access_token}`);
            //     return;

            //PHONE EXISTS
            // case 1002:
            //     router.push(`/auth/set-phone?type=social-auth&token=${data?.access_token}`);
            //     return;

            default:
                router.push("/auth/profile")
                return;
        }
    }

    useEffect(() => {
        loadingState(loading);
    }, [loading]);

    const submitGoogleSignIn = async () => {
        try {
            setLoading(true);
            const res = await dispatch(signInWithGoogle()).unwrap();
            console.log(res);
            conditionalRouting(res?.code, res?.message || "No message", res?.data);
        } catch (e: any) {
            console.log(e)
            toast.warning(e?.message)
        } finally {
            setLoading(false);
        }

    }

    const submitFacebookAuth = async () => {
        try {
            setLoading(true);
            const res = await dispatch(authenticateWithFacebook()).unwrap();
            console.log(res);
            conditionalRouting(res?.code, res?.message);
        } catch (e: any) {
            console.log(e)
            toast.warning(e?.message)
        } finally {
            setLoading(false);
        }

    }

    const submitAppleAuth = async () => {
        try {
            setLoading(true);
            const res = await dispatch(authenticateWithApple()).unwrap();
            console.log(res);
            conditionalRouting(res?.code, res?.message);
        } catch (e: any) {
            console.log(e)
            toast.warning(e?.message)
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex flex-col gap-4">
           
            <div className="flex items-center justify-start gap-4">
                <IconButton className="p-4 !bg-[#999999] dark:!bg-[#666666] !rounded-lg" loading={loading}
                            onClick={submitFacebookAuth}>
                    <FaFacebookF className="text-white text-3xl"/>
                </IconButton>
                {
                    isAppleDevice() &&
                    <IconButton className="p-4 !bg-[#999999] dark:!bbg-[#666666] !rounded-lg" loading={loading}
                                disabled={loading}
                                onClick={submitAppleAuth}>
                        {!loading && <FaApple className="text-white text-3xl"/>}
                    </IconButton>
                }
                <IconButton className="p-4 !bg-[#999999] dark:!bg-[#666666] !rounded-lg" loading={loading}
                            disabled={loading}
                            onClick={submitGoogleSignIn}>
                    <FcGoogle className="text-white dark:text-neutral-400 text-3xl"/>
                </IconButton>
            </div>

        </div>
    )
}
