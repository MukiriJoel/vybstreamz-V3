"use client";

import { useState } from "react";

export function useConfirm() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(false);
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>();

    const openConfirm = (data?: any) => {
        return new Promise<boolean>((resolve) => {
            setIsOpen(true);
            data && setData(data);
            setResolvePromise(() => resolve);
        });
    };

    const closeConfirm = (result: boolean) => {
        setIsOpen(false);
        resolvePromise?.(result);
    };

    return { isOpen, data, openConfirm, closeConfirm };
}
