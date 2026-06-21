import trainImg from '../assets/train1.jpg';
import { FaCalendarAlt, FaExchangeAlt, FaSuitcase, FaTrain } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import styles from '../styles/Home.module.css';

function Home() {
  return (
    <>
        {/*  Background image of a train */}
        <div className={styles.background}>
            <img src={trainImg} alt="Train image" className={styles.trainImage} />
        </div>

        <div className={styles.container}>
        {/* booking form with source, destination, date of journey and class of travel */}
        <div className={styles.bookingForm}>
            <h2>BOOK TICKET</h2>
            <form>
                <div className={styles.inputGroup}>
                    {/* Source Station */}
                    <div className={styles.inputWrapper}>
                        <FaTrain className={styles.icon} />
                        <input className={styles.input} type="text" id="source" name="source" placeholder="Enter source station" required />
                    </div>

                    {/* Swap Stations */}
                    <button className={styles.swapButton}><FaExchangeAlt/></button>

                    {/* Destination Station */}
                    <div className={styles.inputWrapper}>
                        <FaTrain className={styles.icon} />
                        <input className={styles.input} type="text" id="destination" name="destination" placeholder="Enter destination station" required />
                    </div>
                </div>

                {/* Date Selection */}
                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <FaCalendarAlt className={styles.icon} />
                        <input className={styles.input} type="date" id="date" name="date" placeholder="Date of Journey" required />
                    </div>

                    {/* Class Selection */}
                    <div className={styles.inputWrapper}>
                        <FaSuitcase className={styles.icon} />
                        <select className={styles.select} id="class" name="class" required>
                            <option value="">All Classes</option>
                            <option value="sleeper">Sleeper</option>
                            <option value="ac3">AC 3 Tier</option>
                            <option value="ac2">AC 2 Tier</option>
                            <option value="ac1">AC 1 Tier</option>
                        </select>
                    </div>
                </div>

                {/* Quota Selection */}
                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <BiSolidCategory className={styles.icon} />
                        <select className={styles.select} name="quota" required>
                            <option value="general">General</option>
                            <option value="ladies">Ladies</option>
                            <option value="tatkal">Tatkal</option>
                            <option value="premium_tatkal">Premium Tatkal</option>
                            <option value="duty_pass">Duty Pass</option>
                        </select>
                    </div>
                </div>

                {/* Check box options */}
                <div className={styles.checkboxGroup}>
                    <label>
                    <input type="checkbox" />
                       Person with Disability (PwD)
                    </label>
                    <label>
                    <input type="checkbox" />
                       Flexible With Date
                    </label>
                    <label>
                    <input type="checkbox" />
                       Railway pass concession
                    </label>
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.searchButton} type="submit">Search Trains</button>
                    <button type="submit">Show All Trains</button>
                </div>
            </form>
        </div>
        </div>
    </>
  )
}

export default Home;