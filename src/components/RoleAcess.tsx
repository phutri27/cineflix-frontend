    import { Navigate } from "react-router";
    import { useUserRoleStore } from "@/utils/user-role-store";
    import { Outlet } from "react-router";
    export default function RoleAccess() {
        const { role } = useUserRoleStore()

        if (role !== "ADMIN"){
            return <Navigate to="/" replace={true} />
        }

        return <Outlet />
    }