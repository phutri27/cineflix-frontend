import { useForm, type SubmitHandler } from "react-hook-form";
import type { SnackResponse, SnackInput } from "@/api/admin/snacks/admin-snacks-api";
import { snackData } from "@/components/modal/snack-submit-helper";
import { useAdminCreateSnack, useAdminUpdateSnack } from "@/hooks";
import { ErrorMessages } from "@/utils/error-messages";
import { Upload } from "lucide-react";

interface SnackFormProps {
    initialData?: SnackResponse;
    onClose: () => void
}

const inputClass = "w-full bg-neutral-800 border border-neutral-600 rounded-lg px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"

const filledMsg = 'field must be filled'

export default function SnackForm({ initialData, onClose }: SnackFormProps) {
    const isEditing = !!initialData
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SnackInput>({
        defaultValues: {
            name: initialData?.name || "",
            price: initialData?.price || 0,
        }
    })

    const selectedImage = watch("filename")

    const { mutate: createSnack, isPending: insertPending, isError: isInsertError, error: insertError } = useAdminCreateSnack()
    const { mutate: updateSnack, isPending: updatePending, isError: isUpdateError, error: updateError } = useAdminUpdateSnack()

    const onSubmit: SubmitHandler<SnackInput> = (data) => {
        const formData = snackData(data)
        if (!isEditing) {
            createSnack(formData, {
                onSuccess: () => {
                    onClose()
                    reset()
                }
            })
        } else {
            updateSnack({ id: initialData!.id, data: formData }, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }

    const previewSrc = (selectedImage && selectedImage.length > 0)
        ? URL.createObjectURL(selectedImage[0])
        : (isEditing ? initialData?.imageUrl : null)

    return (
        <div>
            <h2 className="text-lg font-bold text-white mb-4 border-b border-neutral-700 pb-3">
                {isEditing ? "Edit Snack" : "Add Snack"}
            </h2>

            {(isInsertError || isUpdateError) && (
                <div className="mb-4">
                    <ErrorMessages error={insertError! || updateError!} />
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Image</label>
                    <div className="relative group">
                        {previewSrc ? (
                            <div className="relative">
                                <img
                                    src={previewSrc}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-lg border border-neutral-700"
                                />
                                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center cursor-pointer">
                                    <Upload className="h-6 w-6 text-white mb-2" />
                                    <span className="text-xs text-neutral-300 font-medium">Change Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("filename")}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed border-neutral-700 hover:border-neutral-500 cursor-pointer transition-colors">
                                <Upload className="h-6 w-6 text-neutral-500 mb-2" />
                                <span className="text-xs text-neutral-500 font-medium">Click to upload image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("filename")}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                        <input
                            className={inputClass}
                            placeholder="Snack name"
                            {...register("name", { required: `Name ${filledMsg}` })}
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">Price (VND)</label>
                        <input
                            type="number"
                            step="0.01"
                            className={inputClass}
                            placeholder="0"
                            {...register("price", { required: `Price ${filledMsg}` })}
                        />
                        {errors.price && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.price.message}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isEditing ? updatePending : insertPending}
                    className="w-full py-2.5 text-sm font-bold rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors"
                >
                    {isEditing
                        ? (updatePending ? "Updating..." : "Update Snack")
                        : (insertPending ? "Creating..." : "Create Snack")
                    }
                </button>
            </form>
        </div>
    )
}