import { useSnacks } from "@/hooks/user/use-snack";
import { useRedeemVoucher } from "@/hooks/user/use-voucher";
import { ErrorMessages } from "@/utils/error-messages";
import { useState } from "react";
import type { SnackData, VoucherData } from "./SeatsDisplay";

interface SnackVoucherScreenProps {
    snackQuantities: SnackData[]
    setSnackQuantities: React.Dispatch<React.SetStateAction<SnackData[]>>
    setVoucherQuantity: React.Dispatch<React.SetStateAction<VoucherData[]>>
}

export default function SnackVoucherScreen({snackQuantities, 
    setSnackQuantities,
    setVoucherQuantity}: SnackVoucherScreenProps){
    const [voucherCode, setVoucherCode] = useState<string>("")

    const { data: snacks, isLoading, isError, error } = useSnacks()
    const { data: voucherData, 
        mutate: redeem, 
        isPending: isRedeeming, 
        isError: isRedeemError,
         error: redeemError, 
         isSuccess } = useRedeemVoucher()
    
    const handleIncrementQty = (snackId: string, price: number) => {
        const snackIndex = snackQuantities.findIndex((snack) => snack.snackId === snackId)
        if (snackIndex !== -1){
            const newQuantities = [...snackQuantities]
            newQuantities[snackIndex].quantity += 1
            setSnackQuantities(newQuantities)
        } else{
            setSnackQuantities((prev) => [...prev, {snackId, price, quantity: 1}])
        }

    }

    const handleDecrementQty = (snackId: string) => {
        const snackIndex = snackQuantities.findIndex((snack) => snack.snackId === snackId)
        if (snackIndex !== -1){
            const newQuantities = [...snackQuantities]
            if (newQuantities[snackIndex].quantity > 0){
                newQuantities[snackIndex].quantity -= 1
                if (newQuantities[snackIndex].quantity === 0){
                    newQuantities.splice(snackIndex, 1)
                }
                setSnackQuantities(newQuantities)
            }
        }
    }

    const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value)
    }

    const handleRedeem = (e: React.SubmitEvent) => {
        e.preventDefault()
        redeem(voucherCode, {
            onSuccess: (data) => {
                console.log(data)
                setVoucherQuantity((prev) => [...prev, {voucherId: data.id, reduceAmount: data.reduceAmount, quantity: 1}])
            }
        })
    }

    return(
        <div>
            <h1>Snack & Voucher</h1>
            <div>
                <h2>Redeem Voucher</h2>
                <form onSubmit={handleRedeem}>
                    <div>
                        {isRedeemError && <ErrorMessages error={redeemError}/>}
                        <input type="text"  
                        name="voucher_code"
                        id="voucher_code"
                        value={voucherCode} 
                        onChange={handleVoucherCodeChange} 
                        placeholder="Enter voucher code" />
                    </div>
                    <button type="submit" disabled={isRedeeming}>Redeem</button>
                </form>
                {isSuccess && voucherData && (
                    <div>
                        <p>Voucher redeemed successfully!</p>
                        <p>Name: {voucherData.name}</p>
                        <p>Reduce Amount: ${voucherData.reduceAmount}</p>
                    </div>
                )}
            </div>
            <div>
                <h2>Available Snacks</h2>
                {isLoading && <p>Loading snacks...</p>}
                {isError && <ErrorMessages error={error} />}
                {snacks && snacks.length > 0 ? (
                    <ul>
                        {snacks.map(snack => {
                            const currentQuantity = snackQuantities.find((s) => s.snackId === snack.id)?.quantity || 0
                            return (
                                <div key={snack.id}>
                                    <li key={snack.id}>{snack.name} - ${snack.price}</li>
                                    <img src={snack.imageUrl} alt={snack.name} />
                                    <div>
                                        <button onClick={() => handleDecrementQty(snack.id)}>-</button>
                                        <span>{currentQuantity}</span>
                                        <button onClick={() => handleIncrementQty(snack.id, snack.price)}>+</button>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                ) : (
                    <p>No snacks available.</p>
                )}
            </div>
        </div>
    )
}