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
    imageFile: z.instanceof(File, { message: "image is required" })
})

type restaurantFormData = z.infer<typeof formSchema>

type Props = {
    onSave: (restaurantData: FormData) => void
    isLoading: boolean
}

const ManageRestaurantForm = ({ isLoading, onSave }: Props) => {
    const form = useForm<restaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [],
            menuItems: [{ name: "", price: 0 }],
        }
    })

    const onSubmit = (formDataJson: restaurantFormData) => {
        // todo - convert formDataJson to a new FormData object
    }
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