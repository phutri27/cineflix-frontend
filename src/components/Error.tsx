export default function Error({errors, keyword}: {errors: string[], keyword: string}){
    return (
        <>
            {errors.map(error => (
                (error.includes(keyword) ? <p>{error}</p> : null)
            ))}
        </>
    )
}