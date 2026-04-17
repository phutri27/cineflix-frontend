import Error from "@/components/Error"

export function ErrorMessages({error}: {error: any}) {
    const errors = error?.response?.data.message || error?.response?.data.errors || error?.message || "An error occurred"
    if (Array.isArray(errors)){
        return <Error errors={errors}/>
    }

    return <div>{errors}</div>
}