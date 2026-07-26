import { useEffect, useState } from "react";
import ModifySearch from "../components/ModifySearch";
// import {useAuth} from "../context/AuthContext";
import styles from "../styles/TrainSearchResult.module.css";
import { useNavigate } from "react-router-dom";

// const API_URL = "https://mocki.io/v1/0eb9aeed-eb15-42e5-805c-fbf8bbee39ce"; // to fetch the train data from the mock API
const API_URL = "https://mocki.io/v1/2ba7564f-1a03-45b4-8f57-74ea333687c8"; // to fetch the train data from the mock API

const TrainSearchResult = () => {
    const navigate = useNavigate();
    // const {currentUser} = useAuth();   // Access the user object from the authentication context
    const [trainData, setTrainData] = useState([]); // State to hold the fetched train data

    const handleDetailsClick = (trainNumber) => {
      navigate(`/train-details/${trainNumber}`)
    }

    useEffect(() => {
        // Fetch train data from the mock API
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched train data:", data);
                setTrainData(data); // Set the fetched data to state
            })
            .catch(error => {
                console.error("Error fetching train data:", error);
            });
    }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      {/* Modify Search component */}
      <ModifySearch />
      {/* Train Search Results */}
      <div className={styles.container}>
        <div className={styles.filterSection}>
          <div className={styles.filterColumn}>
            <h3>Travel Classes</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Sleeper
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> AC 3 Tier
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> AC 2 Tier
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> AC 1 Tier
            </label>
          </div>

          <div className={styles.filterColumn}>
            <h3>Train Type</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Rajdhani
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Shatabdi
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> Vande Bharat
            </label>
          </div>

          <div className={styles.filterColumn}>
            <h3>Departure Time</h3>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 00:00 - 06:00
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 06:00 - 12:00
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 12:00 - 18:00
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" /> 18:00 - 24:00
            </label>
          </div>
        </div>

        {/* Train list cards */}

        <div className={styles.trainList}>
          {trainData.length === 0 ? (
            <div className={styles.noTrains}>No trains available!</div>
          ) : (
            trainData?.map((train) => (
              <div key={train.train_number} className={styles.trainCard}>
                <div className={styles.trainHeader}>
                  <span className={styles.trainName}>
                    {train.train_name} ({train.train_number})
                  </span>
                  <span className={styles.trainSchedule}>Train Schedule</span>
                </div>
                <div className={styles.trainDetails}>
                  <div className={styles.timeInfo}>
                    <span>{train.departure_time}</span>
                    <span>{train.source}</span>
                  </div>
                  <span className={styles.durationInfo}>
                    {Array.isArray(train.days_of_operation)
                      ? train.days_of_operation.join(", ")
                      : train.days_of_operation}
                  </span>
                  <div className={styles.timeInfo}>
                    <span>{train.arrival_time}</span>
                    <span>{train.destination}</span>
                  </div>
                </div>
                <div className={styles.classInfo}>
                  {/* Use the price object keys as available classes */}
                  {train.price ? (
                    Object.keys(train.price).map((cls) => (
                      <span key={cls}>
                        {cls} (₹{train.price[cls]})
                      </span>
                    ))
                  ) : (
                    <span>No class information available</span>
                  )}
                </div>
                <div className={styles.actionButtons}>
                  <button className={styles.bookNowButton} onClick={() => handleDetailsClick(train.train_number)}>Book Now</button>
                  <button className={styles.otherDatesButton} onClick={() => handleDetailsClick(train.train_number)}>
                    Other Dates
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TrainSearchResult;