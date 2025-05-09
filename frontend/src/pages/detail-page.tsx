import { CheckoutSessionRequest, useCreateCheckoutSession } from "@/api/OrderAPI"
import { useGetRestaurantById } from "@/api/RestaurantApi"
import CheckoutButton from "@/components/checkout-button"
import MenuItem from "@/components/menu-item"
import OrderSummary from "@/components/order-summary"
import RestaurantInfo from "@/components/restaurant-info"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardFooter } from "@/components/ui/card"
import { UserFormData } from "@/forms/user-profle-form/user-profile-form"
import { MenuItem as MenuItemType } from "@/types"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
export type CartIem = {
    _id: string
    name: string
    price: number
    quantity: number
}

const RestaurantDetailPage = () => {
    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetRestaurantById(restaurantId)
    const { createCheckoutSession, isCreatingCheckoutSession, error, reset } = useCreateCheckoutSession()

    const [cartItems, setCartItems] = useState<CartIem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
        return storedCartItems ? JSON.parse(storedCartItems) : []
    })

    const addToCart = (item: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find((cartItem) => cartItem._id === item._id)
            let updatedCartItems;

            if (existingItem) {
                updatedCartItems = prevCartItems.map((cartItem) => cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem)
            } else {
                updatedCartItems = [...prevCartItems, { ...item, quantity: 1 }]
            }

            // save to session storage
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            return updatedCartItems
        })
    }

    const removeFromCart = (item: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter((cartItem) => cartItem._id !== item._id)
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))
            return updatedCartItems
        })
    }

    const onCheckout = async (userFormData: UserFormData) => {
        console.log("userFormData", userFormData)

        const checkoutData = {
            cartItems: cartItems.map((item) => ({
                menuItems: item._id,
                name: item.name,
                quantity: item.quantity.toString()
            })),
            restaurantId: restaurantId,
            deliveryDetails: {
                name: userFormData.name,
                addressLine1: userFormData.addressLine1,
                city: userFormData.city,
                country: userFormData.country,
                email: userFormData.email,
            }
        }

        try {
            const data = await createCheckoutSession(checkoutData as CheckoutSessionRequest)
            window.location.href = data.url
        } catch (error) {
            console.error(error)
            toast.error("Failed to create checkout session")
        }
    }

    if (isLoading || !restaurant) {
        return "Loading"
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>

            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((item) => (
                        <MenuItem menuItem={item} addToCart={() => addToCart(item)} />
                    ))}
                </div>

                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} isLoading={isCreatingCheckoutSession} />
                        </CardFooter>
                    </Card>
                </div>
            </div>


        </div>
    )
}

export default RestaurantDetailPage