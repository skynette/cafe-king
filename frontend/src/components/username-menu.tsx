import { useAuth0 } from '@auth0/auth0-react'
import { CircleUserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

const UsernameMenu = () => {
    const { user, logout } = useAuth0()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-primary gap-2">
                <CircleUserRound className='text-primary' />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link to={"/user"} className='font-bold hover:text-primary'>
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to={"/manage-restaurant"} className='font-bold hover:text-primary'>
                        My restaurant
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button onClick={() => logout()} className='flex flex-1 font-bold bg-primary'>
                        Logout
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu