export const formatApiError = (errorResponse: any, returnAll = false): string | string[] => {
    if (!errorResponse) return "An unexpected error occurred.";

    // ✅ Check if the `errors` array exists and has errors
    if (errorResponse.errors?.length) {
        const errorMessages = errorResponse.errors.map((err: any) => err.message).filter(Boolean);
        return returnAll ? errorMessages : errorMessages[0] || "An unknown validation error occurred.";
    }

    // ✅ If no field-specific errors, return the global error message
    return errorResponse.message || "An unexpected error occurred.";
};

export const formatApiErrorWithStatusCode = (errorResponse: any, returnAll = false): any => {
    if (!errorResponse) return "An unexpected error occurred.";

    // ✅ Check if the `errors` array exists and has errors
    if (errorResponse.errors?.length) {
        const errorMessages = errorResponse.errors.map((err: any) => err.message).filter(Boolean);
        return returnAll ? errorMessages : errorMessages[0] || "An unknown validation error occurred.";
    }

    // ✅ If no field-specific errors, return the global error message
    return {message: errorResponse.message || "An unexpected error occurred.", status: errorResponse?.status};
};
