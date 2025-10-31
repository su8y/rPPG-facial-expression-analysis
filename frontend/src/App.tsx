import {Route, Routes} from "react-router-dom";
import {Layout, ProtectLayout} from "./components";
import {Login} from "./pages/login.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {ROOT} from "./utils/constants.ts";
import {Signup} from "./pages/signup.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";

function App() {
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

export default App;
