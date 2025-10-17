"use client";
// import {store} from "@/store/store";
import {store} from "@/store"; // Import Redux store


export const getDeviceInfo = async (): Promise<Record<string, string | null>> => {
    const state = store.getState();
    let device_info = state.configs.device_info;


    const user = state.auth.user;
    // If device_info is missing, fetch it from API
    // if (!device_info) {
    
    // await store.dispatch(fetchIPData());
    device_info = store.getState().configs.device_info; // Re-fetch updated state
    

    // }

    return {
        
        "X-PLATFORM": process.env.NEXT_PUBLIC_X_PLATFORM || null,
        "X-DEVICE-ID": getDeviceID(),
        "X-PLATFORM-KEY": process.env.NEXT_PUBLIC_X_API_KEY || null,
        // "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY || null,
        "X-APP-VERSION": "1.0",
        "X-BUILD-VERSION": "1.2.1",
        "X-IP-ADDRESS": device_info?.query || null,
        "X-COUNTRY": device_info?.countryCode || null,
        "X-CITY": device_info?.city || null,
        "X-LOCATION": `${device_info?.lat ?? "0"} ${device_info?.lng ?? "0"}`,
        "X-DEVICE-TYPE": getDeviceType(),
        "X-DEVICE-NAME": navigator.vendor || null,
        "X-OS-NAME": getOSName(),
        "X-OS-VERSION": getOSVersion(),
        // @ts-ignore
        "X-INTERNET-CONNECTION-TYPE": navigator?.connection?.effectiveType || null,
        "X-INTERNET-SERVICE-PROVIDER": device_info?.isp || null,
        "X-LOGIN-SESSION-ID": user?.login_session_id,
        "X-SOURCE-SYSTEM":"vyb-streamz"
    };
};

// Function to detect OS name
export const getOSName = (): string => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Win")) return "Windows";
    if (userAgent.includes("Mac")) return "MacOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iPhone") || userAgent.includes("iPad")) return "iOS";
    return "Unknown";
};

// Function to get OS version
export const getOSVersion = (): string => {
    const userAgent = navigator.userAgent;
    const match = userAgent.match(/(Windows NT|Mac OS X|Android|CPU iPhone OS|Linux) ([\d_]+)/);
    return match ? match[2].replace(/_/g, ".") : "Unknown";
};

// Function to determine device type
export const getDeviceType = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mobile")) return "Mobile";
    if (userAgent.includes("tablet")) return "Tablet";
    return "Desktop";
};

// Function to determine device id
export const getDeviceID = (): string => {
    if (typeof window === 'undefined') return ''; // SSR-safe

    const KEY = 'stream_app_device_id';
    let deviceId = localStorage.getItem(KEY);

    if (!deviceId) {
        deviceId = crypto.randomUUID();
        localStorage.setItem(KEY, deviceId);
    }
    return deviceId;
};

import { useState, useEffect } from 'react';

interface BrowserInfo {
    name: string;
    version: string;
    isMobile: boolean;
    isTablet: boolean;
    isSafari: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isEdge: boolean;
    isIE: boolean;
    isOpera: boolean;
}

/**
 * Gets more detailed information about the current browser
 * @returns Object with browser name, version and other useful flags
 */
export const getBrowserInfo = () => {
    if (typeof window === 'undefined' || !window.navigator) {
        return {
            name: "Unknown",
            version: "Unknown",
            isMobile: false,
            isTablet: false,
            isSafari: false,
            isChrome: false,
            isFirefox: false,
            isEdge: false,
            isIE: false,
            isOpera: false
        };
    }

    const ua = navigator.userAgent;
    let name = "Unknown";
    let version = "Unknown";

    // Detection logic
    if (/Edg/.test(ua)) {
        name = "Edge";
        version = ua.match(/Edg\/([\d.]+)/)?.[1] || "Unknown";
    } else if (/OPR/.test(ua) || /Opera/.test(ua)) {
        name = "Opera";
        version = ua.match(/(?:OPR|Opera)\/([\d.]+)/)?.[1] || "Unknown";
    } else if (/Chrome/.test(ua)) {
        name = "Chrome";
        version = ua.match(/Chrome\/([\d.]+)/)?.[1] || "Unknown";
    } else if (/Firefox/.test(ua)) {
        name = "Firefox";
        version = ua.match(/Firefox\/([\d.]+)/)?.[1] || "Unknown";
    } else if (/Trident/.test(ua) || /MSIE/.test(ua)) {
        name = "Internet Explorer";
        version = ua.match(/(?:MSIE |rv:)([\d.]+)/)?.[1] || "Unknown";
    } else if (/Safari/.test(ua)) {
        name = "Safari";
        version = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown";
    }

    const isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(ua);
    const isTablet = /Tablet|iPad/.test(ua);

    return {
        name,
        version,
        isMobile,
        isTablet,
        isSafari: name === "Safari",
        isChrome: name === "Chrome",
        isFirefox: name === "Firefox",
        isEdge: name === "Edge",
        isIE: name === "Internet Explorer",
        isOpera: name === "Opera"
    };
};
