export default function Error({errors}: {errors: string[]}){
    return (
        <div>
            {errors.map(error => (
                <p>{error}</p>
            ))}
        </div>
    )
}