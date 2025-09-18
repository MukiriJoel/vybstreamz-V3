'use client';

import { ComponentType } from 'react';
import AuthGuard from "@/components/guard/AuthGuard";

export function withAuth<T extends object>(Component: ComponentType<T>) {
    return function WithAuth(props: T) {
        return (
            <AuthGuard>
                <Component {...props} />
            </AuthGuard>
        );
    };
}
