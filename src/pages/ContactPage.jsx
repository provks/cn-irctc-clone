import styles from "../styles/ContactPage.module.css";

function ContactPage() {
  return (
    // Main container
    <div className={styles.contactContainer}>
      <div className={styles.contactContent}>
        <h2>Contact Us</h2>
        {/* contact info section */}
        <div className={styles.contactInfo}>
          {/* Email Support */}
          <div className={styles.contactItem}>
            <h3>Email Support</h3>
            <p>contact@irctc.com</p>
          </div>
          {/* Phone Support */}
          <div className={styles.contactItem}>
            <h3>Phone Support</h3>
            <p>+91 12345 67890</p>
          </div>
          {/* Office Hours */}
          <div className={styles.contactItem}>
            <h3>Office Hours</h3>
            <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
          </div>
          {/* Address */}
          <div className={styles.contactItem}>
            <h3>Address</h3>
            <p>123 Railway Road, New Delhi, India</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage;