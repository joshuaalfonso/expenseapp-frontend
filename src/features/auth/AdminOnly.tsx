import type { ReactNode } from "react";
import { useAuthContext } from "./useAuthContext";


export const AdminOnly  = ({ children }: { children: ReactNode }) => {
    const { user } = useAuthContext();

    return user.user?.role === 'admin' ? children : null;
};