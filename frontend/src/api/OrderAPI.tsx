import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type CheckoutSessionRequest = {
    cartItems: {
        menuItems: string
        name: string
        quantity: string
    }[]
    deliveryDetails: {
        email: string
        name: string
        addressLine1: string
        city: string
    }
    restaurantId: string
}

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(checkoutSessionRequest)
        })

        if (!response.ok) {
            throw new Error("Failed to create checkout session")
        }

        return response.json()
    }

    const { mutateAsync: createCheckoutSession, isLoading: isCreatingCheckoutSession, error, reset } = useMutation(createCheckoutSessionRequest, {
        onSuccess: (data) => {
            window.location.href = data.url
        },
        onError: (error: any) => {
            toast.error(error.message)
            reset()
        }
    })

    return { createCheckoutSession, isCreatingCheckoutSession, error, reset }
}
