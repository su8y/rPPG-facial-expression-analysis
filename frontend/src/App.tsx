import {Route, Routes} from "react-router-dom";
import {Layout, ProtectLayout} from "./components";
import {Dashboard, Login, Signup} from "./pages";
import {AuthProvider} from "./store/AuthContext.tsx";
import {ROOT} from "./utils/constants.ts";

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
