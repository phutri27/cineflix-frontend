export const generateTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const second = seconds % 60
    const result = minutes.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0')
    return result
}