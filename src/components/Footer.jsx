import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"
import styles from '../styles/Footer.module.css'
function Footer() {
  return (
    <>
        <footer className={styles.footer}>
            {/* Social Media icons section */}
            <div className={styles.socialMedia}>
                <p>Get Connected with us on social networks</p>
                <div className={styles.icons}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaFacebookF />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
                        <FaInstagram />
                    </a>
                </div>
            </div>


            {/* Footer links section */}
            <div className={styles.footerLinks}>
                <div>
                    <h4>IRCTC Trains</h4>
                </div>
                <div>
                    <h4>General Information</h4>
                </div>
                <div>
                    <h4>Important Information</h4>
                </div>
                <div>
                    <h4>Agents</h4>
                </div>
                <div>
                    <h4>Enquiries</h4>
                </div>
                <div>
                    <h4>How to</h4>
                </div>
                <div>
                    <h4>IRCTC eWallets</h4>
                </div>
                <div>
                    <h4>IRCTC Official App</h4>
                </div>
                <div>
                    <h4>Advertise with us</h4>
                </div>
                <div>
                    <h4>Refund Rules and policies</h4>
                </div>
            </div>
            
        </footer>
    </>
  )
}

export default Footer;