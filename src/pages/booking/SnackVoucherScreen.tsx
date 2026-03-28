import { useSnacks } from "@/hooks/user/use-snack";
import { useRedeemVoucher } from "@/hooks/user/use-voucher";
import { ErrorMessages } from "@/utils/error-messages";
import { useState } from "react";
import { useBookingStore } from "@/utils/booking-store";
import type { SnackData } from "@/utils/booking-store";
interface SnackVoucherScreenProps {
    snackQuantities: SnackData[]
}

export default function SnackVoucherScreen({snackQuantities}: SnackVoucherScreenProps){
    const [voucherCode, setVoucherCode] = useState<string>("")

    const handleIncrementQty = useBookingStore((state) => state.incrementSnackQuantities)
    const handleDecrementQty = useBookingStore((state) => state.decrementSnackQuantites)
    const setVoucherQuantity = useBookingStore((state) => state.setVoucherQuantity)

    const { data: snacks, isLoading, isError, error } = useSnacks()
    const { data: voucherData, 
        mutate: redeem, 
        isPending: isRedeeming, 
        isError: isRedeemError,
         error: redeemError, 
         isSuccess } = useRedeemVoucher()

    const handleVoucherCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(e.target.value)
    }

    const handleRedeem = (e: React.SubmitEvent) => {
        e.preventDefault()
        redeem(voucherCode, {
            onSuccess: (data) => {
                setVoucherQuantity(data.id, data.reduceAmount)
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