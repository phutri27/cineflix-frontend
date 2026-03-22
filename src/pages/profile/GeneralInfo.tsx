import { useUserRoleStore } from "@/utils/user-role-store"
import { useGetProfile } from "@/hooks/user/use-profile"
import { ErrorMessages } from "@/utils/error-messages"
import Header from "@/components/Header"

export default function GeneralInfo() {
    const { id, first_name, last_name, email } = useUserRoleStore()
    const { data: profile, isLoading, isError, error } = useGetProfile(id!)

    if (isLoading){
        return <p>Loading...</p>
    }

    if (isError){
        return <ErrorMessages error={error}/>
    }

    return (
        <div>
            <Header />
            <h1>General Information</h1>
            <div>
                <p><b>Welcome back, {`${first_name} ${last_name}`} </b></p>
                <p>This page will allow you to manage all your account information.</p>
            </div>
            <div>
                <p>Member's rank: {profile?.member_rank}</p>
                <p>Total spending: {profile?.spending_total}</p>
            </div>
            <div>
                <h3>Personal Information</h3>
                <p>First name: {first_name} </p>
                <p>Last name: {last_name}</p>
                <p>Email: {email}</p>
            </div>
        </div>
    )
}