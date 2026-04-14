import { useLogout } from "@/hooks/user/use-logout";
import { useUserRoleStore } from "@/utils/user-role-store";
export default function LogoutBtn(){
    const { mutate: logout } = useLogout()
    const clearUserInfo = useUserRoleStore((state) => state.clearUser)

    const handleLogout = () => {
        clearUserInfo()
        logout()
    }

    return <button className="text-gray-200" onClick={handleLogout} >Logout</button>
}