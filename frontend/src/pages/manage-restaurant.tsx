import { useCreateMyRestaurant, useGetMyRestaurant } from '@/api/MyRestaurantAPI'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/manage-restaurant-form'

const ManageRestaurant = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()

    return (
        <ManageRestaurantForm isLoading={isLoading} restaurant={restaurant} onSave={createRestaurant} />
    )
}

export default ManageRestaurant