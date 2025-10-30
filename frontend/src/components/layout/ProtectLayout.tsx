import { Navigate, Outlet } from 'react-router-dom';
import {ROOT} from "../../utils/constants.ts";
import {useAuth} from "../../features/auth/hooks/useAuthContext.ts";
import {LoadingIndicator} from "../common/LoadingIndicator.tsx"; // (옵션)

export const ProtectLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to={ROOT.LOGIN} replace />;
};
