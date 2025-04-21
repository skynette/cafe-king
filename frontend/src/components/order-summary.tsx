import { CartIem } from '@/pages/detail-page'
import { MenuItem as MenuItemType, Restaurant } from '@/types'
import { CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'

type OrderSummaryProps = {
    restaurant: Restaurant
    cartItems: CartIem[]
    removeFromCart: (item: MenuItemType) => void
}

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: OrderSummaryProps) => {
    const getTotalCost = () => {
        const totalInKobo = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        const totalWithDelivery = totalInKobo + restaurant.deliveryPrice
        return (totalWithDelivery / 100).toFixed(2)
    }

    return (
        <>
            <CardHeader>
                <CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
                    <span>Order Summary</span>
                    <span>NGN{getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-5'>
                {cartItems.map((item) => (
                    <div className='flex justify-between'>
                        <span>
                            <Badge variant="outline">{item.quantity}</Badge>
                            <span>{item.name}</span>
                        </span>
                        <span className='flex items-center gap-1'>
                            NGN{(item.price * item.quantity / 100).toFixed(2)}
                        </span>
                        <Button variant="destructive" size="icon" onClick={() => removeFromCart(item)}>
                            <Trash2 />
                        </Button>
                    </div>
                ))}
                <Separator />
                <div className='flex justify-between'>
                    <span>Delivery Fee</span>
                    <span>NGN{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

export default OrderSummary