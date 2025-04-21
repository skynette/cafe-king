import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingButton from "./loading-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "./ui/dialog"
import UserProfileForm, { UserFormData } from "@/forms/user-profle-form/user-profile-form"
import { useGetMyUser } from "@/api/MyUserAPI"

type CheckoutButtonProps = {
    onCheckout: (userFormData: UserFormData) => void
    disabled?: boolean
    isLoading?: boolean
}

const CheckoutButton = ({ onCheckout, disabled, isLoading }: CheckoutButtonProps) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { pathname } = useLocation()
    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        })
    }
    if (!isAuthenticated) {
        return <Button onClick={onLogin} className="flex-1">Login to checkout</Button>
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex-1" disabled={disabled}>
                    Go to checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <DialogHeader className="px-10">
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                        Please fill in your details to complete the checkout process
                    </DialogDescription>
                </DialogHeader>
                <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isGetUserLoading} isCheckout buttonText="Continue to payment"/>
            </DialogContent>
        </Dialog>
    )
}

export default CheckoutButton