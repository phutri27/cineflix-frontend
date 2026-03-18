import { useAdminGetUsers } from "@/hooks/admin/users/use-admin-users";

export default function User(){
    const { data: users, isLoading, isError } = useAdminGetUsers()

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Something went wrong</p>

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">First Name</th>
                        <th className="border p-2">Last Name</th>
                        <th className="border p-2">Spending Total</th>
                        <th className="border p-2">Member Rank</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr key={index}>
                            <td className="border p-2">{user.email}</td>
                            <td className="border p-2">{user.first_name}</td>
                            <td className="border p-2">{user.last_name}</td>
                            <td className="border p-2">{user.profile.spending_total}</td>
                            <td className="border p-2">{user.profile.member_rank}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}