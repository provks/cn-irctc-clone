import { useState } from "react";
import styles from "../styles/AuthModal.module.css";
import { FaRegWindowClose } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { loginWithGoogle, registerUserWithEmail } from "../config/AuthService";

function RegisterModal({ isOpen, onClose, switchToLogin }) {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    // error handling
  const [error, setError] = useState("");
  // hangling loading state
  const [loading, setLoading] = useState(false);

  // handle user register with email
  const handleRegister = async (e) => {
    e.preventDefault(); // prevent the default form submission
    
    setError("");
    setLoading(true);

    try {
      await registerUserWithEmail(email, password, fullName);
      setEmail("");
      setPassword("");
      onClose();
      switchToLogin();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // handle register with google
  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);
    

    try {
      await loginWithGoogle();
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
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
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
            {loading ? "Registering..." :  "Register"}
          </button>
        </form>

         {/* Google Login Button */}
          <button className={styles.googleBtn} onClick={handleGoogleRegister} disabled={loading}>
            <FaGoogle /> Register with Google
          </button>
        <p>
          Already have an account?{" "}
          <span onClick={switchToLogin}>Login here</span>
        </p>
      </div>
    </div>
  )
}

export default RegisterModal;