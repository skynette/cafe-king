import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import DetailSection from './details-section'
import { Separator } from '@/components/ui/separator'
import CuisineSection from './cuisines-section'
import MenuSection from './menu-section'
import ImageSection from './image-section'
import LoadingButton from '@/components/loading-button'
import { Button } from '@/components/ui/button'
import { Restaurant } from '@/types'
import { useEffect } from 'react'


const formSchema = z.object({
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    city: z.string({
        required_error: "city is required",
    }),
    country: z.string({
        required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid positive number"
    }),
    estimatedDeliveryTime: z.coerce.number({
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid positive number"
    }),
    cuisines: z.array(z.string()).nonempty({
        message: "please select at least one item",
    }),
    menuItems: z.array(z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional()
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image url or image file must be provided",
    path: ["imageFile"],
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant
    onSave: (restaurantData: FormData) => void
    isLoading: boolean
}

const ManageRestaurantForm = ({ isLoading, onSave, restaurant }: Props) => {
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    })

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        // properly format the prices
        const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2))
        const menuItemsFormatted = restaurant.menuItems.map((item) => ({
            ...item,
            price: parseInt((item.price / 100).toFixed(2)),
        }))

        const updatedRestaurant = {
            ...restaurant,
            deliveryPrice: deliveryPriceFormatted,
            menuItems: menuItemsFormatted,
        }

        // update the form with the correctly formatted restaurant details 
        form.reset(updatedRestaurant)

    }, [form, restaurant])


    const onSubmit = (formDataJson: RestaurantFormData) => {
        console.log("on submit handler")
        // todo - convert formDataJson to a new FormData object
        const formData = new FormData();

        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)

        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString())
        formData.append("estimatedDeliveryTime", (formDataJson.estimatedDeliveryTime.toString()))

        formDataJson.cuisines.forEach((cuisine, index) => {
            formData.append(`cuisines[${index}]`, cuisine)
        })

        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name)
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString())
        })

        if (formDataJson.imageFile){
            formData.append("imageFile", formDataJson.imageFile)
        }
        onSave(formData)
    }

    // Type-safe form state logging
    // console.log('Form State:', {
    //     isDirty: form.formState.isDirty,
    //     isSubmitting: form.formState.isSubmitting,
    //     errors: form.formState.errors as Record<keyof RestaurantFormData, any>
    // });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 bg-gray-50 p-10 rounded-lg'>
                <DetailSection />
                <Separator />
                <CuisineSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ?
                    <LoadingButton /> :
                    <Button type='submit'>Submit</Button>
                }
            </form>
        </Form>
    )
}

export default ManageRestaurantForm