import { Navigate, Outlet } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';
import {ROOT} from "../route/root.ts";
import {useAuth} from "../hooks/useAuthContext.ts"; // (옵션)

const ProtectLayout = () => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (isAuthenticated) {
        return <Outlet />;
    }

    return <Navigate to={ROOT.LOGIN} replace />;
};

export default ProtectLayout;