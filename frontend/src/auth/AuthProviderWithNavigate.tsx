import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const AuthProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate()

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    // console.log("DOMAIN", domain, "CLIENT ID", clientId, "REDIRECT URI", redirectUri)

    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("Unable to initialize Auth provider");
    }

    // called when the user finally gets logged in
    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || "/auth-callback")
    }

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            {children}
        </Auth0Provider>
    )

}

export default AuthProviderWithNavigate