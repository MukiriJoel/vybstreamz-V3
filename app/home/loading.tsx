// import {CardsHomeLoader} from "@/components/ui/CardsHomeLoader";
"use client"
import React from "react";
import {Skeleton} from "@mui/material";

export default function HomePageLoading() {
    return (
        <div>
            <Skeleton variant="rectangular" animation="wave" width={500} height={500}
                      className="!w-full !h-[90vh] pt-[100px]"/>
            {/* <CardsHomeLoader rows={2} maxCols={10}/> */}
        </div>
    );
}
