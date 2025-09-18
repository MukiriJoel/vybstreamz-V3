import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateWithApple,
  authenticateWithFacebook,
  getEncryptedMSISDN,
  getHECustomerDetails,
  getHEToken,
  signInWithGoogle,
} from "@/store/thunks/authThunks";
import { AppDispatch, RootState } from "@/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { setHEData, setRegistrationState } from "@/store/slices/authSlice";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { isCacheValid } from "./isCacheValid";
import { getDeviceInfo } from "@/lib/helpers/deviceInfo";

export const isAppleDevice = () => {
  return /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const SectionSocialAuth = ({ loadingState }: { loadingState?: any }) => {
  const { HEData } = useSelector((state: RootState) => state.auth);
  const [loadingShowButton, setLoadingShowButton] = useState(false);
  const [showButton, setShowButton] = useState(true);
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
        router.push("/auth/profile");
        return;
    }
  };

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
      console.log(e);
      toast.warning(e?.message);
    } finally {
      setLoading(false);
    }
  };

  const submitFacebookAuth = async () => {
    try {
      setLoading(true);
      const res = await dispatch(authenticateWithFacebook()).unwrap();
      console.log(res);
      conditionalRouting(res?.code, res?.message);
    } catch (e: any) {
      console.log(e);
      toast.warning(e?.message);
    } finally {
      setLoading(false);
    }
  };

  const submitAppleAuth = async () => {
    try {
      setLoading(true);
      const res = await dispatch(authenticateWithApple()).unwrap();
      console.log(res);
      conditionalRouting(res?.code, res?.message);
    } catch (e: any) {
      console.log(e);
      toast.warning(e?.message);
    } finally {
      setLoading(false);
    }
  };

  const submitSafComAuth = async () => {
    try {
      setLoading(true);

      if (
        !isCacheValid(HEData?.expires_on as number) ||
        !HEData?.access_token
      ) {
        await dispatch(getHEToken()).unwrap();
      }

      console.log(HEData);
      if (HEData?.access_token) {
        const encryptedRes = await dispatch(getEncryptedMSISDN()).unwrap();
        if (encryptedRes) {
          dispatch(getHECustomerDetails())
            .unwrap()
            .then(
              (res) => {
                conditionalRouting(res?.data);
              },
              (error) => {
                console.log(error);
              }
            );
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
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
  };

  useEffect(() => {
    getDeviceInfo().then();
    getMsisdn();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-start gap-4">
        {showButton ? (
          <IconButton
            className="p-4 !bg-[#35a839] !rounded-lg h-12 w-12"
            loading={loading}
            onClick={submitSafComAuth}
            disabled={loading || loadingShowButton}
          >
            <img
              src={"/images/saf-logo.svg"}
              alt={"saf logo"}
              width={35}
              height={35}
            />
          </IconButton>
        ) : null}

        <IconButton
          className="p-4 !bg-[#999999] dark:!bg-[#666666] !rounded-lg"
          loading={loading}
          onClick={submitFacebookAuth}
        >
          <FaFacebookF className="text-white text-3xl" />
        </IconButton>
        {isAppleDevice() && (
          <IconButton
            className="p-4 !bg-[#999999] dark:!bbg-[#666666] !rounded-lg"
            loading={loading}
            disabled={loading}
            onClick={submitAppleAuth}
          >
            {!loading && <FaApple className="text-white text-3xl" />}
          </IconButton>
        )}
        <IconButton
          className="p-4 !bg-[#999999] dark:!bg-[#666666] !rounded-lg"
          loading={loading}
          disabled={loading}
          onClick={submitGoogleSignIn}
        >
          <FcGoogle className="text-white dark:text-neutral-400 text-3xl" />
        </IconButton>
      </div>
    </div>
  );
};
