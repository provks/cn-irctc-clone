
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { BsTrainFront } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHelp } from "react-icons/io";
import LoginModal from '../pages/LoginModal';
import RegisterModal from '../pages/RegisterModal';


function Navbar() {
    // Tracks whether user is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // handle login user
    const handleLogin = () => {
        setIsLoggedIn(true);
    }
    const handleRegister = () => {
        setIsRegisterOpen(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }

    // handle click on bookings link
    // const handleBookingsClick = (e) => {
    //     if (!isLoggedIn) {
    //         e.preventDefault();
    //         alert("Please login to view your bookings.");
    //     }
    //     // navigate to bookings page if logged in

    // }

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
          <a href="/booking" className={styles.navLink}>
            Bookings
          </a>
          {/* <span className={styles.navLink} onClick={handleBookingsClick}>Bookings</span> */}
          <a href="/contact" className={styles.navLink}>
            Contact US
          </a>
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
            <span>Hello, User!</span>
            <button className={styles.authButton} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <div>
            <button className={styles.authButton} onClick={handleLogin}>
              Login
            </button>
            <button className={styles.registerButton} onClick={handleRegister}>
              Register
            </button>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
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