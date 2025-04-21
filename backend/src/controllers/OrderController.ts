import Order from "../models/order";
import Restaurant, { MenuItemType } from "../models/restaurant"
import { Request, Response } from 'express';
import axios from 'axios';

const FRONTEND_URL = process.env.FRONTEND_URL as string
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY as string

const FLUTTERWAVE_API_URL = 'https://api.flutterwave.com/v3';

type CheckoutSessionRequest = {
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
const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId)
        if (!restaurant) {
            throw new Error("Restaurant not found")
        }
        const newOrder = new Order({
            restaurant: restaurant,
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems.map(item => ({
                ...item,
                menuItemId: item.menuItems
            })),
            createdAt: new Date(),
        })

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems)
        const session = await createSession(lineItems, newOrder)

        if (!session.url) {
            return res.status(500).json({ message: "Failed to create checkout session" })
        }
        await newOrder.save()
        res.status(200).json({ url: session.url })

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.equals(cartItem.menuItems))
        if (!menuItem) {
            throw new Error("Menu item not found")
        }
        return {
            name: menuItem.name,
            price: menuItem.price,
            currency: "NGN",
            quantity: parseInt(cartItem.quantity),
            metadata: {
                menuItemId: menuItem._id,
            }
        }
    })

    return lineItems
}

const createSession = async (lineItems: any, newOrder: any) => {
    try {
        const totalAmount = lineItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
        
        const payload = {
            tx_ref: `order-${newOrder._id}-${Date.now()}`,
            amount: Math.round(totalAmount / 100),
            currency: 'NGN',
            redirect_url: `${FRONTEND_URL}/order-status`,
            webhook_url: `${process.env.BACKEND_URL}/api/order/webhook`,
            customer: {
                email: newOrder.deliveryDetails.email,
                name: newOrder.deliveryDetails.name,
            },
            customizations: {
                title: 'Food Order Payment',
                description: 'Payment for your food order',
            },
            meta: {
                orderId: newOrder._id.toString(),
            },
            configurations: {
                session_duration: 10,
                max_retry_attempt: 5,
            }
        };

        const response = await axios.post(
            `${FLUTTERWAVE_API_URL}/payments`,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.status === 'success') {
            return {
                url: response.data.data.link
            };
        } else {
            throw new Error('Failed to initialize payment');
        }
    } catch (error: any) {
        console.error('Flutterwave payment initialization error:', error);
        throw error;
    }
}

const handleWebhook = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        
        if (payload.event === 'charge.completed') {
            const { data } = payload;
            
            // Verify the transaction
            if (data.status === 'successful') {
                const orderId = payload.meta_data.orderId;
                const order = await Order.findById(orderId);
                
                if (!order) {
                    console.error("Order not found for ID:", orderId);
                    return res.status(404).json({ message: 'Order not found' });
                }

                // Fetch menu items for price calculation
                const menuItemIds = order.cartItems.map(item => item.menuItemId);
                const menuItems = await Restaurant.find(
                    { 'menuItems._id': { $in: menuItemIds } },
                    { 'menuItems.$': 1 }
                );

                if (!menuItems || menuItems.length === 0) {
                    console.error("Menu items not found for order:", orderId);
                    return res.status(404).json({ message: 'Menu items not found' });
                }

                // Create a map of menu item prices
                const menuItemPriceMap = new Map();
                menuItems.forEach(restaurant => {
                    restaurant.menuItems.forEach(item => {
                        menuItemPriceMap.set(item._id.toString(), item.price);
                    });
                });

                // Calculate the order amount correctly
                const orderAmount = order.cartItems.reduce(
                    (sum: number, item: any) => {
                        const price = menuItemPriceMap.get(item.menuItemId.toString());
                        if (!price) {
                            throw new Error(`Price not found for menu item ${item.menuItemId}`);
                        }
                        const quantity = parseInt(item.quantity);
                        return sum + (price * quantity);
                    }, 
                    0
                );

                // Verify the transaction with Flutterwave
                const verificationResponse = await axios.get(
                    `${FLUTTERWAVE_API_URL}/transactions/${data.id}/verify`,
                    {
                        headers: {
                            'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const verifiedData = verificationResponse.data.data;

                if (
                    verifiedData.status === 'successful' &&
                    (verifiedData.amount * 100) === orderAmount &&
                    verifiedData.currency === 'NGN'
                ) {
                    // Only mark as paid if verification passes
                    order.status = 'paid';
                    await order.save();
                    return res.status(200).json({ message: 'Payment verified and order marked as paid' });
                } else {
                    console.error('Transaction verification failed:', {
                        verifiedAmount: verifiedData.amount,
                        verifiedAmountInKobo: verifiedData.amount * 100,
                        orderAmount,
                        verifiedStatus: verifiedData.status,
                        verifiedCurrency: verifiedData.currency
                    });
                    return res.status(400).json({ 
                        message: 'Transaction verification failed',
                        details: {
                            verifiedAmount: verifiedData.amount,
                            verifiedAmountInKobo: verifiedData.amount * 100,
                            orderAmount,
                            verifiedStatus: verifiedData.status,
                            verifiedCurrency: verifiedData.currency
                        }
                    });
                }
            }
        }

        res.status(200).json({ message: 'Webhook received' });
    } catch (error: any) {
        console.error('Webhook error:', error);
        res.status(500).json({ message: error.message || 'Something went wrong' });
    }
};

export default {
    createCheckoutSession,
    handleWebhook
}