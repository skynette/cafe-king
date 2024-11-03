import { useUdpateMyUser } from "@/api/MyUserAPI"
import UserProfileForm from "@/forms/user-profle-form/user-profile-form"

const UserProfilePage = () => {
    const { updateUser, isLoading } = useUdpateMyUser()
    return (
        <UserProfileForm onSave={updateUser} isLoading={isLoading} />
    )
}

export default UserProfilePage