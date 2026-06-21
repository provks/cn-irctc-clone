
import { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import { BsTrainFront } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";
import { IoMdHelp } from "react-icons/io";


function Navbar() {
    // Tracks whether user is logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // handle login user
    const haldleLogin = () => {
        setIsLoggedIn(true);
    }

  return (
    <>
        <nav className={styles.navbar}>
            {/* Logo and name */}
            <div className={styles.logoContainer}>
                {/* <img src={logo} alt="IRCTC Logo"  /> */}
                <BsTrainFront className={styles.logo} />
                <span className={styles.logoText}>IRCTC Clone</span>
            </div>

            {/* Navigation links */}
            <div className={styles.navLinks}>
                <a href="/bookings" className={styles.navLink}>Bookings</a>
                <a href="/contact" className={styles.navLink}>Contact US</a>
            </div>

            {/* Show date and time */}
            <div className={styles.dateTime}>
                <span>{new Date().toLocaleDateString()}</span>
                <span>[{new Date().toLocaleTimeString()}]</span>
            </div>

            {/* Notification and help icons */}
            <div className={styles.icons}>
                <span className={styles.icon}><IoIosNotifications /></span>
                <span className={styles.icon}><IoMdHelp /></span>
            </div>

            {/* Button for Login/Logout and Register */}
            {isLoggedIn ? (
                <>
                    <span>Hello, User!</span>
                    <button className={styles.authButton}>Logout</button>
                </>
            ) : 
            (
                <>
                    <button className={styles.authButton}>Login</button>
                    <button className={styles.registerButton}>Register</button>
                </>
        )}
        </nav>
    </>
  )
}

export default Navbar