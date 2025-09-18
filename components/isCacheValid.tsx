export const isCacheValid = (expiryTime: number): boolean => {
    if (!expiryTime) return false;
    return Date.now() < expiryTime;
};
