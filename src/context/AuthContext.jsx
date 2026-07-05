import { createContext, useContext, useEffect, useState } from "react";
import { observeAuthState } from "../config/AuthService";

// create auth context
const AuthContext = createContext();

// custom hook for authentication context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    // state to sotre the current authenticated user
    const [currentUser, setCurrentUser] = useState(null);
    // tracking the loading status while checking for authentication
    const [loading, setLoading] = useState(true);

    // sethe currentuser
    useEffect(() => {
        // substribe to authetication state changes
        const unsubscribe = observeAuthState((user) => {
            setCurrentUser(user); // se the authenticated user
            setLoading(false); // set loading to flase once the user is set
        });

        // cleanup function to unsubscribe when component unmounts
        return unsubscribe;
    }, []);

    // provide authentication state and loading status to the whoel app
    const value = {
        currentUser,    // current user details if logged in else null
        loading     // specify whether the auth state is still being checked 
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}