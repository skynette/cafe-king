import { useCreateMyRestaurant } from '@/api/MyRestaurantAPI'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/manage-restaurant-form'

const ManageRestaurant = () => {
    const { createRestaurant, isLoading } = useCreateMyRestaurant()
    
    return (
        <ManageRestaurantForm isLoading={isLoading} onSave={createRestaurant} />
    )
}

export default ManageRestaurant