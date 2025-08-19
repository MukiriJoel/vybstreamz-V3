'use client';
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import Loader from "@/components/Loader";


function AppHome() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/videos');
    }, []);

    return (
        <>
            <Loader/>
        </>
    );
}

export default AppHome;
