import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig";

// Register a new user with email and password
export const registerUserWithEmail = async (email, password, fullName) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        // update user's name with full name
        await updateProfile(userCredentials.user, {displayName : fullName});

        return userCredentials.user; // return the user created
    } catch (error) {
        // const errorCode = error.code;
        console.log(error);
        const errorMessage = error.message;
        throw errorMessage // Handle user registration error 
    }    
}


// Login existing user with email and password
export const loginWithEmail = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // return the authenticated user
    } catch (error) {
        console.log(error);
        const errorMessage = error.message;
        throw errorMessage // Handle user login error 
    }
}

// Sign in with Google using popup
export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.log(error);
        const errorMessage = error.message;
        throw errorMessage // Handle user login with google error 
    }
}

// Log out the loggedIn user
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error);
        const errorMessage = error.message;
        throw errorMessage // Handle user logout error 
    }
}

// Listen for auth state changes
export const observeAuthState = (callback) => {
    return onAuthStateChanged(auth, callback); // triggers the callback when the user logs in or logs out
}
