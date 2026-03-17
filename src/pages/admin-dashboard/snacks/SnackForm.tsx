import { useForm, type SubmitHandler } from "react-hook-form";
import type { SnackResponse, SnackInput } from "@/api/admin/snacks/admin-snacks-api";
import { snackData } from "@/components/helper/snack-submit-helper";
import { useAdminCreateSnack, useAdminUpdateSnack } from "@/hooks";
import { ErrorMessages } from "@/utils/error-messages";
interface SnackFormProps {
    initialData?: SnackResponse;
    onClose: () => void
}

const filledMsg = 'field must be filled'
export default function SnackForm({ initialData, onClose }: SnackFormProps) {
    const isEditing = !!initialData
    const { register, handleSubmit, watch, formState: {errors}, reset } = useForm<SnackInput>({ 
        defaultValues:{
            name: initialData?.name || "",
            price: initialData?.price || 0,
        }
     })

    const selectedImage = watch("filename")

     console.log(selectedImage)
    const { mutate: createSnack, isPending: insertPending, isError: isInsertError, error: insertError} = useAdminCreateSnack()
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
            updateSnack({id: initialData!.id, data: formData}, {
                onSuccess: () => {
                    onClose()
                }
            })
        }
    }


    return (
        <div>
            <div>
                {(isInsertError || isUpdateError) && <ErrorMessages error={insertError! || updateError!}/>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <input {...register("name", {required: `Name ${filledMsg}`})} />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" step="0.01" {...register("price", {required: `Price ${filledMsg}`})} />
                    {errors.price && <p>{errors.price.message}</p>}
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" {...register("filename")} accept="image/*"/>
                    {(selectedImage && selectedImage.length > 0) && (
                        <div>
                            <img src={URL.createObjectURL(selectedImage[0])} alt="image preview" />
                        </div>
                    )}
                    {isEditing && selectedImage && selectedImage.length === 0 && (
                        <div>
                            <img src={initialData?.imageUrl} alt="current image" />
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <button type="submit" disabled={updatePending}>{updatePending ? "Updating..." : "Update Snack"}</button>
                ) : (
                    <button type="submit" disabled={insertPending}>{insertPending ? "Creating..." : "Create Snack"}</button>
                )}
            </form>
        </div>
    )
}