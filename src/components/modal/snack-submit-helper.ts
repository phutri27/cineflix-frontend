import type { SnackInput } from "@/types/admin/snacks/snacks-type"

export const snackData = (data: SnackInput) => {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price.toString())
    if(data.filename && data.filename.length > 0) {
        formData.append("filename", data.filename[0])
    }
    return formData
}