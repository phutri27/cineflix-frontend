import { useAdminInsertVoucher, useAdminUpdateVoucher } from "@/hooks/admin/vouchers/use-admin-vouchers";
import type { VoucherResponse, VoucherProp } from "@/api/admin/vouchers/admin-vouchers-api";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessages } from "@/utils/error-messages";
interface VoucherFormProps{
    initialData?: VoucherResponse ,
    onClose: () => void
}

const filledMsg = "field must be filled"
export default function VoucherForm({initialData, onClose}: VoucherFormProps){
    const isEditing = !!initialData
    const { register, handleSubmit, formState: { errors }, watch } = useForm<VoucherProp>({
        defaultValues: {
            name: initialData?.name || "",
            reduceAmount: initialData?.reduceAmount || 0,
            quantity: initialData?.quantity || 0,
            startAt: initialData ? new Date(initialData.startAt).toISOString().split("T")[0] : "",
            expireAt: initialData ? new Date(initialData.expireAt).toISOString().split("T")[0] : "",
            activationCode: "",
            maxUsed: initialData?.maxUsed
        },
        mode: "onChange"
    })

    const { mutate: createVoucher, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminInsertVoucher()
    const { mutate: updateVoucher, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminUpdateVoucher()

    const onSubmit: SubmitHandler<VoucherProp> = (data) => {
        if (!isEditing) {
            createVoucher(data, {
                onSuccess: () => {
                    onClose()
                }
            })
        } else {
            updateVoucher({id: initialData!.id, data}, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    return (
        <div>
            <div>
                {(isInsertError || isUpdateError) && <ErrorMessages error={insertError! || updateError!} />}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input {...register("name", { required: `Name ${filledMsg}`})} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Reduce Amount</label>
                    <input type="number" step="0.01" {...register("reduceAmount", { required: `Reduce amount ${filledMsg}`})} />
                    {errors.reduceAmount && <p>{errors.reduceAmount.message}</p>}
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" {...register("quantity", { required: `Quantity: ${filledMsg}`})} />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                </div>
                <div>
                    <label>Start At</label>
                    <input type="date" {...register("startAt", {required: `Start time ${filledMsg}`})} />
                    {errors.startAt && <p>{errors.startAt.message}</p>}
                </div>
                <div>
                    <label>Expire At</label>
                    <input type="date" {...register("expireAt", 
                    {required: `Expire time ${filledMsg}`, 
                    validate: (value) => {
                        const startAt = watch("startAt")
                        if(!startAt) return true
                        return new Date(value) > new Date(startAt) || "Expire date must be after start date"
                    }})} />
                    {errors.expireAt && <p>{errors.expireAt.message}</p>}
                </div>
                {!isEditing && (
                    <div>
                        <label>Activation Code</label>
                        <input {...register("activationCode", {required: `Activation code ${filledMsg}`})} />
                        {errors.activationCode && <p>{errors.activationCode.message}</p>}
                    </div>
                )}
                <div>
                    <label htmlFor="maxUsed">Maximum used per booking</label>
                    <input type="number" {...register("maxUsed", {required: `Maximum time used ${filledMsg}`})}/>
                    {errors.maxUsed && <p>{errors.maxUsed.message}</p>}
                </div>
                {isEditing 
                ? <button type="submit" disabled={updatePending}>{updatePending ? "Updating..." : "Update"}</button> 
                : <button type="submit" disabled={insertPending}>{insertPending ? "Creating..." : "Create"}</button>}
            </form>
        </div>
    )
}