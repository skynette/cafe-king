import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
}

export const useCreatMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    }

    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest)

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
}

type UpdateMyUserRequest = {
    name: string
    addressLine1: string
    city: string
    country: string
}
export const useUdpateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const udpateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently()

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(formData,)
        })

        if (!response.ok) {
            throw new Error("Failed to update user")
        }

        return response.json()
    }

    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(udpateMyUserRequest)

    if (isSuccess){
        toast.success("profile updated")
    }

    if(error){
        toast.error(error.toString())
        reset()
    }

    return {
        updateUser,
        isLoading,
    }
}