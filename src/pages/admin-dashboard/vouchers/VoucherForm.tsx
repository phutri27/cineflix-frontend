import type { VoucherResponse, VoucherProp } from "@/types/admin/vouchers/vouchers-type";
import { useAdminVoucher } from "@/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorMessages } from "@/utils/error-messages";

interface VoucherFormProps {
    initialData?: VoucherResponse,
    onClose: () => void
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const filledMsg = "field must be filled"

export default function VoucherForm({ initialData, onClose }: VoucherFormProps) {
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

    const { mutate: createVoucher, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminVoucher.useAdminInsertVoucher()
    const { mutate: updateVoucher, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminVoucher.useAdminUpdateVoucher()

    const onSubmit: SubmitHandler<VoucherProp> = (data) => {
        if (!isEditing) {
            createVoucher(data, {
                onSuccess: () => onClose()
            })
        } else {
            updateVoucher({ id: initialData!.id, data }, {
                onSuccess: () => onClose()
            })
        }
    }

    return (
        <div>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                {isEditing ? "Edit Voucher" : "Create Voucher"}
            </h2>

            {(isInsertError || isUpdateError) && (
                <div className="mb-4">
                    <ErrorMessages error={insertError! || updateError!} />
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                    <input
                        className={inputClass}
                        placeholder="Voucher name"
                        {...register("name", { required: `Name ${filledMsg}` })}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Discount (%)</label>
                        <input
                            type="number"
                            step="0.01"
                            className={inputClass}
                            placeholder="0"
                            {...register("reduceAmount", { required: `Reduce amount ${filledMsg}` })}
                        />
                        {errors.reduceAmount && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.reduceAmount.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Quantity</label>
                        <input
                            type="number"
                            className={inputClass}
                            placeholder="0"
                            {...register("quantity", { required: `Quantity ${filledMsg}` })}
                        />
                        {errors.quantity && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.quantity.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Max / Booking</label>
                        <input
                            type="number"
                            className={inputClass}
                            placeholder="1"
                            {...register("maxUsed", { required: `Maximum time used ${filledMsg}` })}
                        />
                        {errors.maxUsed && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.maxUsed.message}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Start Date</label>
                        <input
                            type="date"
                            className={`${inputClass} [color-scheme:dark]`}
                            {...register("startAt", { required: `Start time ${filledMsg}` })}
                        />
                        {errors.startAt && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.startAt.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Expire Date</label>
                        <input
                            type="date"
                            className={`${inputClass} [color-scheme:dark]`}
                            {...register("expireAt", {
                                required: `Expire time ${filledMsg}`,
                                validate: (value) => {
                                    const startAt = watch("startAt")
                                    if (!startAt) return true
                                    return new Date(value) > new Date(startAt) || "Expire date must be after start date"
                                }
                            })}
                        />
                        {errors.expireAt && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.expireAt.message}</p>}
                    </div>
                </div>
                {!isEditing && (
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Activation Code</label>
                        <input
                            className={`${inputClass} font-mono tracking-widest`}
                            placeholder="e.g. SUMMER2025"
                            {...register("activationCode", { required: `Activation code ${filledMsg}` })}
                        />
                        {errors.activationCode && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.activationCode.message}</p>}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isEditing ? updatePending : insertPending}
                    className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isEditing
                        ? (updatePending ? "Updating..." : "Update")
                        : (insertPending ? "Creating..." : "Create")
                    }
                </button>
            </form>
        </div>
    )
}