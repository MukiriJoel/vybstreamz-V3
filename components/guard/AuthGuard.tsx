'use client';

import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {useSelector} from "react-redux";
import {RootState} from "@/store";

// Auth service interface - implement based on your authentication system
interface AuthService {
    isAuthenticated(): boolean;
    login(): void;
}

// Sample auth service implementation
// class SampleAuthService implements AuthService {
//     isAuthenticated(): boolean {
//         // Check if the user is authenticated
//         // This is a placeholder - replace with your actual auth check
//         return localStorage.getItem('auth_token') !== null;
//     }
//
//     login(): void {
//         // Redirect to login page or initiate login flow
//         // This is a placeholder - replace with your actual login logic
//         window.location.href = '/login';
//     }
// }

// Create an instance of the auth service
// const authService = new SampleAuthService();

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * Auth guard component for Next.js App Router
 * Protects routes from unauthenticated access and saves the return URL
 */
const AuthGuard = ({ children }: AuthGuardProps) => {
    const {user, activeProfile, isAuthenticated} = useSelector((state: RootState) => state.auth);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isAuthenticated) {
            const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
            const returnUrl = encodeURIComponent(currentUrl);
            // Store the return URL in sessionStorage
            sessionStorage.setItem('returnUrl', returnUrl);
            // Redirect to login page with return URL
            router.push(`/auth/login?returnUrl=${returnUrl}`);
        }
    }, [pathname, searchParams, router]);

    useEffect(() => {
        console.log("HOC IS AUTHNTICATED")
    }, [isAuthenticated]);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         sendFCMToServer();
    //     }
    // }, [isAuthenticated]);
    //
    // const sendFCMToServer = async () => {
    //     try {
    //         await dispatch(postFCMToken(fcmToken)).unwrap();
    //     } catch (e) {
    //         toast.warning("Could not save token to server. Please try refreshing again.")
    //     }
    // }

    // Only render children if authenticated
    return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
