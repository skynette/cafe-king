import { useGetMyUser, useUdpateMyUser } from "@/api/MyUserAPI"
import UserProfileForm from "@/forms/user-profle-form/user-profile-form"

const UserProfilePage = () => {
    const { currentUser, isLoading: currentUserLoading } = useGetMyUser()
    const { updateUser, isLoading } = useUdpateMyUser()

    if (currentUserLoading) {
        return <span>Loading</span>
    }

    if (!currentUser){
        return <span>Unable to load profile data</span>
    }
    return (
        <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isLoading} />
    )
}

export default UserProfilePage