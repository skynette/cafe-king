import { ComponentType } from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface ProtectedRouteProps {
    component: ComponentType;
}

const ProtectedRoute = ({ component }: ProtectedRouteProps): JSX.Element => {
    const Component = withAuthenticationRequired(component, {
        returnTo: "/",
        onRedirecting: () => (
            <div>Loading</div>
        ),
    });

    return <Component />;
}

export default ProtectedRoute;