import { Button } from "./ui/button";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEncryptedMSISDN, getHECustomerDetails, getHEToken} from "@/store/thunks/authThunks";
import {AppDispatch, RootState} from "@/store";
import {useRouter} from "next/navigation";
import Image from "next/image";
import { getDeviceInfo } from "@/lib/helpers/deviceInfo";
import { isCacheValid } from "./isCacheValid";
import { setHEData,setRegistrationState } from "@/store/slices/authSlice";
import { CircularProgress } from "@mui/material";



export const isAppleDevice = () => {
    return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const SectionHEAuth = React.memo(({loadingState}: { loadingState?: any }) => {
    const {HEData} = useSelector((state: RootState) => state.auth);
    
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [loadingShowButton, setLoadingShowButton] = useState(false)

    const conditionalRouting = (res?: any) => {
        console.log(res)
        if (res?.password_required) {
            router.push(`/auth/resetPassword?session=${res?.login_session_id}`);
            return;
        }

        if (res?.request_token) {
            router.push(`/auth/otp?token=${res?.request_token}`);
            dispatch(setRegistrationState(res))
            return;
        }
        router.push("/profiles")
    }

    const submit = async () => {
        try {
            setLoading(true);

            if (!isCacheValid(HEData?.expires_on as number) || !HEData?.access_token) {
                await dispatch(getHEToken()).unwrap();
            }

            console.log(HEData)
            if (HEData?.access_token) {
                const encryptedRes = await dispatch(getEncryptedMSISDN()).unwrap();
                if (encryptedRes) {
                    dispatch(getHECustomerDetails()).unwrap()
                        .then(
                            res => {
                                conditionalRouting(res?.data)
                            },
                            error => {
                                console.log(error)
                            }
                        )
                }
            }
        } catch (error) {
            console.error('Auth check error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMsisdn = async () => {
        try {
            setLoadingShowButton(true);
            if (!isCacheValid(HEData?.expires_on as number)) {
                await dispatch(getHEToken()).unwrap();
                const msisdnRes = await dispatch(getEncryptedMSISDN()).unwrap();
                if (msisdnRes) setShowButton(true);
                return;
            }
            // const response = await dispatch(getHEToken()).unwrap();
            if (HEData?.access_token && isCacheValid(HEData?.expires_on as number)) {
                const msisdnRes = await dispatch(getEncryptedMSISDN()).unwrap();
                if (msisdnRes) setShowButton(true);
                return;
            }
        } catch (e: any) {
            if (e?.status == 401) {
                dispatch(setHEData(null));
                await getMsisdn();
            }
            setShowButton(false);
        } finally {
            setLoadingShowButton(false);
        }
    }

    useEffect(() => {
        getDeviceInfo().then()
        getMsisdn();
    }, []);

    return (
        showButton ?
            <Button
                onClick={submit}
                variant="default"
                color="primary"
                className="!rounded-2xl h-12 disabled:!bg-neutral-400 w-full bg-[#35a839] hover:bg-[#35a839]/90 text-white font-medium !py-4 rounded-full text-sm sm:text-base transition-all duration-200"
                disabled={loading || loadingShowButton}
            >
                <Image src={"/images/saf-logo.svg"} alt={"saf logo"} width={50} height={50}/>
                 {loading ? <CircularProgress size={20} /> :"Continue With Saf"}
            </Button>
            : null
    )
});

SectionHEAuth.displayName = 'SectionHEAuth';
