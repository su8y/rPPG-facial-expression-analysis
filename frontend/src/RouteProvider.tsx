import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/Layout.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Login} from "./pages/Login.tsx";
import {Signup} from "./pages/Signup.tsx";
import ProtectLayout from "./components/ProtectLayout.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ROOT} from "./route/root.ts";

function RouteProvider() {
    return (
        <AuthProvider>
            <Routes>
                <Route path={ROOT.LOGIN} element={<Login/>}/>
                <Route path={ROOT.SIGNUP} element={<Signup/>}/>
                <Route element={<ProtectLayout/>}>
                    <Route element={<Layout/>}>
                        <Route path={ROOT.DASHBOARD} element={<Dashboard/>}/>
                    </Route>
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default RouteProvider;
