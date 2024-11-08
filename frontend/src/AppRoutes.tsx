import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Home from "./pages/home"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/user-profile"
import ProtectedRoute from "./auth/ProtectedRoute"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout showHero><Home /></Layout>} />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route
                path="/user"
                element={
                    <Layout>
                        <ProtectedRoute component={UserProfilePage} />
                    </Layout>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}


export default AppRoutes