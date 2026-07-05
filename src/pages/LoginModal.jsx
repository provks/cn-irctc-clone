import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import styles from "../styles/AuthModal.module.css";
import { FaRegWindowClose } from "react-icons/fa";
import { loginWithEmail, loginWithGoogle } from "../config/AuthService";


function LoginModal({ isOpen, onClose, switchToRegister, onLogin }) {
  // State variables to hold the email and password input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // error handling
  const [error, setError] = useState("");
  // hangling loading state
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault(); // prevent the default form submission
    
    setError("");
    setLoading(true);
    
    try {
      const user = await loginWithEmail(email, password);
      // clear the email and password fields after login success
      setEmail("");
      setPassword("");
      if (onLogin) onLogin();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // jandle google login
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // attempt to login the user using google auth provider
      await loginWithGoogle();
      
      if (onLogin) onLogin();
      
      // close the modal
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  // if my modal is not open, return null to not render anything
  if (!isOpen) return null;

  return (
    // For Overlay background
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`} onClick={onClose}>
      {/* Modal content container */}
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}><FaRegWindowClose /></button>
        <h3>Login</h3>
        <form onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loggin in...": "Login"}
          </button>
        </form>

        {/* Google Login Button */}
        <button className={styles.googleBtn} onClick={handleGoogleLogin} disabled={loading}>
          <FaGoogle /> Login with Google
        </button>
        <p>
          Don't have an account?{" "}
          <span onClick={switchToRegister}>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal