'use client';
import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center p-24">
            <CircularProgress size={50} />
            
            <p className="text-sm text-center">Loading...</p>
        </div>
    );
};

export default Loader;
