import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-dom"

// component to protect routes that requires authentication
const ProtectedRoute = ({children}) => {
    // get auth state from authContext
    const {currentUser, loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    // if no user logged in, redirect to the home page
    if (!currentUser) {
        return <Navigate to="/" />
    }

    // not laoding, user is authenticated, render the protected component
    return children;
}

export default ProtectedRoute