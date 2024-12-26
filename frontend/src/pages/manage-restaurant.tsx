import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/MyRestaurantAPI'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/manage-restaurant-form'

const ManageRestaurant = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant()
    const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant()
    const { restaurant } = useGetMyRestaurant()

    const isEditing = !!restaurant

    return (
        <ManageRestaurantForm
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isLoading || isUpdateLoading}
            restaurant={restaurant}
        />
    )
}

export default ManageRestaurant