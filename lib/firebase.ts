import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut
} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// Initialize Messaging (Only in Browser)
let messaging: any = null;
// if (typeof window !== "undefined" && "Notification" in window) {
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    messaging = getMessaging(firebaseApp);
}

export {firebaseApp, messaging, auth, googleProvider, facebookProvider, appleProvider};

// Get FCM Token
export const getFCMToken = async (registration: any) => {
    if (typeof window === "undefined" || !messaging) {
        console.warn("FCM not initialized: Running in SSR or unsupported browser.");
        return null;
    }

    try {
        const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (currentToken) {
            console.log("FCM Token:", currentToken);
            return currentToken;
        } else {
            console.warn("No FCM token available.");
        }
    } catch (error) {
        console.error("Error fetching FCM token:", error);
    }
};

// Global Listener for Messages
export const messageListener = (callback: (payload: any) => void) => {
    if (typeof window === "undefined" || !messaging) {
        console.warn("Message listener not initialized: Running in SSR or unsupported browser.");
        return;
    }

    onMessage(messaging, (payload) => {
        console.log("Foreground message received:", payload);
        callback(payload);
    });
};

// Sign-in function
// export const signInWithGoogle = async () => {
//     try {
//         const result = await signInWithPopup(auth, googleProvider);
//         return result.user; // Returns authenticated user
//     } catch (error) {
//         console.error("Google Sign-In Error:", error);
//         throw error;
//     }
// };
//
// // Sign-out function
// export const logout = async () => {
//     try {
//         await signOut(auth);
//     } catch (error) {
//         console.error("Sign-Out Error:", error);
//     }
// };
