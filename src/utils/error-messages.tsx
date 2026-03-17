import Error from "@/components/Error"

export function ErrorMessages({error}: {error: Error}) {
    const errors = error?.response?.data.errors || error?.message || "An error occurred"
    if (Array.isArray(errors)){
        return <Error errors={errors}/>
    }

    return <div>{errors}</div>
}