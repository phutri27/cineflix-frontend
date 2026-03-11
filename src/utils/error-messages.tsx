export function errorMessages(error: Error): string | string[] {
    const errors = error?.response?.data.errors || error?.message || "An error occurred"
    return errors
}