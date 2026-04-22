import { Navigate } from "react-router";
import { useUserRoleStore } from "@/hooks/user/use-user-role-store";
import { useVerifyUser } from "@/hooks/user/use-user";
import { Outlet } from "react-router";
export default function RoleAccess() {
    const { role } = useUserRoleStore()

    if (role !== "ADMIN"){
        return <Navigate to="/" replace={true} />
    }

    return <Outlet />
}

export function LoginAccess(){
    const { id } = useUserRoleStore()

    if (id){
        return <Navigate to="/" replace={true} />
    }

    return <Outlet />
}

export function RestrictLogin(){
    const { id } = useUserRoleStore()
    const { data, isLoading } = useVerifyUser(id)

    if (isLoading){
        return <div>Loading...</div>
    }
    if (!data?.isLogin){
        return <Navigate to="/" replace={true}/>
    }

    return <Outlet />
}