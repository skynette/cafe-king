import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Home from "./pages/home"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/user-profile"
import ProtectedRoute from "./auth/ProtectedRoute"
import ManageRestaurant from "./pages/manage-restaurant"

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
            <Route
                path="/manage-restaurant"
                element={
                    <Layout>
                        <ProtectedRoute component={ManageRestaurant} />
                    </Layout>
                }
            />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}


export default AppRoutes