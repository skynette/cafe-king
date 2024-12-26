import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { useSheetStore } from '../hooks/useSheetStore'

const MobileNavLinks: React.FC = () => {
    const { logout } = useAuth0()
    const { closeSheet } = useSheetStore()

    return (
        <>
            <Link to="/user" className="flex bg-white items-center font-bold hover:text-primary" onClick={closeSheet}>
                User Profile
            </Link>
            <Link to="/manage-restaurant" className='font-bold hover:text-primary' onClick={closeSheet}>
                My restaurant
            </Link>
            <Button onClick={() => {
                logout()
                closeSheet()
            }} className="flex items-center px-3 font-bold hover:bg-gray-500">
                Logout
            </Button>
        </>
    )
}

export default MobileNavLinks