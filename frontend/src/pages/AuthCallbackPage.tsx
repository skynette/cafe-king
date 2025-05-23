import { useCreateMyUser } from "@/api/MyUserAPI"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const AuthCallbackPage = () => {
    const { user } = useAuth0()
    const { createUser } = useCreateMyUser()
    const navigate = useNavigate()
    console.log("callback page")
    const hasCreatedUser = useRef(false)

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({ auth0Id: user.sub, email: user.email })
            hasCreatedUser.current = true
        }
        navigate('/')
    }, [createUser, navigate, user])

    return (
        <div>Loading...</div>
    )
}

export default AuthCallbackPage