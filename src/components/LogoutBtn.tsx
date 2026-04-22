import { useUserStore, useLogout } from "@/hooks";
export default function LogoutBtn(){
    const { mutate: logout } = useLogout.useLogout()
    const clearUserInfo = useUserStore.useUserRoleStore((state) => state.clearUser)

    const handleLogout = () => {
        clearUserInfo()
        logout()
    }

    return <button className="text-gray-200" onClick={handleLogout} >Logout</button>
}