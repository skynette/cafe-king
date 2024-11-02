import { useAuth0 } from '@auth0/auth0-react';
import { Button } from './ui/button'
import UsernameMenu from './username-menu';

const MainNav = () => {
    const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
    console.log("USER", user, isAuthenticated, isLoading)

    return (
        <span className='flex space-x-2 items-center'>
            {isAuthenticated
                ? <UsernameMenu />
                : <Button onClick={() => loginWithRedirect()} variant={'default'} className='font-bold text-white'>
                    Login lol
                </Button>}
        </span>
    )
}

export default MainNav