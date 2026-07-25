
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { BsTrainFront } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHelp } from "react-icons/io";
import LoginModal from '../pages/LoginModal';
import RegisterModal from '../pages/RegisterModal';
import { useAuth } from '../context/AuthContext';
import { logout } from '../config/AuthService';


function Navbar() {
    // Tracks whether user is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const {currentUser, loading } = useAuth();
    const navigate = useNavigate();

    // Update time with real time every second.
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (currentUser && !isLoggedIn) {
      setIsLoggedIn(true);
    }

    // handle login user
    const handleLoginClick = () => {
        setIsLoginOpen(true);
    }
    const handleRegisterClick = () => {
        setIsRegisterOpen(true);
    }

    const handleLogout = async() => {
        try {
          await logout();
          navigate('/');
          setIsLoggedIn(false);
        } catch (error) {
          console.error("Logout failed", error);
        }
    }

    // handle click on bookings link
    const handleBookingsClick = () => {
        if (!isLoggedIn) {
        //     e.preventDefault();
            alert("Please login to view your bookings.");
            return;
        }
        // navigate to bookings page if logged in
        navigate('/booking');

    }

    const handleContactClick = () => {
      navigate('/contact');
    }

  return (
    <>
      <nav className={styles.navbar}>
        {/* Logo and name */}
        <div
          className={styles.logoContainer}
          onClick={() => {
            navigate("/");
          }}
        >
          {/* <img src={logo} alt="IRCTC Logo"  /> */}
          <BsTrainFront className={styles.homeIcon} />
          <span className={styles.logo}>IRCTC Clone</span>
        </div>

        {/* Navigation links */}
        <div className={styles.navLinks}>
          {/* <a href="/booking" className={styles.navLink}>
            Bookings
          </a> */}
          <span className={styles.navLink} onClick={handleBookingsClick}>Bookings</span>
          <span className={styles.navLink} onClick={handleContactClick}>Contact Us</span>
          {/* <a href="/contact" className={styles.navLink}>
            Contact US
          </a> */}
        </div>

        {/* Show date and time */}
        <div className={styles.dateTime}>
          <span>{currentTime.toLocaleDateString()}</span>
          <span>[{currentTime.toLocaleTimeString()}]</span>
        </div>

        {/* Notification and help icons */}
        <div className={styles.icons}>
          <span className={styles.icon}>
            <IoIosNotifications />
          </span>
          <span className={styles.icon}>
            <IoMdHelp />
          </span>
        </div>

        {/* Button for Login/Logout and Register */}
        {isLoggedIn ? (
          <>
            <span>Hello, {currentUser.displayName || "User"}!</span>
            <button className={styles.authButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div>
            <button className={styles.authButton} onClick={handleLoginClick}>
              Login
            </button>
            <button className={styles.registerButton} onClick={handleRegisterClick}>
              Register
            </button>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={() => {}}
        switchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        switchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}

export default Navbar