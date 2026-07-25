import { useEffect, useState } from "react";
import {useAuth} from '../context/AuthContext';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/BookingPage.module.css"


function BookingPage() {
  const location = useLocation();
  const currentUser = useAuth();
  const [trainDetails, setTrainDetails] = useState(null);
  const [selectedClass, setSelectedClass] = useState('');
  const [classPrice, setClassPrice] = useState({});
  const [availableClasses, setAvailableClasses] = useState([]);
  const [passengers, setPassengers] = useState([{
    name: '',
    age: '',
    gender: '',
    berth: 'No preference'
  }]);
  const [contactInfo, setContactInfo] = useState({
    email: currentUser?.email || '',
    phone: ''
  })
  const navigate = useNavigate();

  console.log(location);
  console.log(location.state);

  // check train details
  useEffect(() => {
    // check for detail details from navigation state
    if (location.state?.trainNumber) {
      // price info from navigation state
      const priceData = location.state?.price || {};
      setClassPrice(priceData);

      // get available classes
      const classes = Object.keys(priceData);
      setAvailableClasses(classes);

      // set default value for class (selected class, first class)
      if (classes.length > 0) {
        const defaultClass = location.state?.travelClass || classes[0];
        setSelectedClass(defaultClass);
      }

      // set train details from navigation state
      setTrainDetails({
        trainNumber: location.state?.trainNumber,
        trainName: location.state?.trainName || 'NA',
        from: location.state?.from,
        to: location.state?.to,
        date: location.state?.date,
        departureTime: location.state?.departureTime,
        arrivalTime: location.state?.arrivalTime,
        travelClass: location.state?.travelClass,
        duration: location.state?.duration,
        quota: location.state?.quota || 'General'
      })
    } else {
      //  No train selected, might want to handle this case later
      console.log("No train details provided");
    }
  }, [location.state])

  if (!trainDetails?.trainNumber) {
    console.log("inside train details check", trainDetails);
    return <Navigate to='/'></Navigate>
  }

  // handle class change for selected class
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  }

  // update passenger details
  const updatePassenger = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers[updatedPassengers];
  }

  // remove passenger
  const removePassenger = (index) => {
    if (passengers.length > 1) {
      const updatedPassengers = [...passengers];
      updatedPassengers.splice(index, 1);
      setPassengers(updatedPassengers);
    }
  }

  // add passenger
  const addPassenger = () => {
    setPassengers([...passengers, {
      name: '',
      age: '',
      gender: '',
      berth: 'No preference'
    }])
  }

  // fare calculation
  const calculateTotalFare = () => {
    const passengerCount = passengers.length;
    
    // get the fare for the selected class
    const baseFarePerPassenger = classPrice[selectedClass] || 0;
    const totalBaseFare = baseFarePerPassenger * passengerCount;

    //calculate addtional charges
    const gst = Math.round(totalBaseFare * 0.05); // 5% gst
    const convenienceFee = 30; // fixed
    const cateringCharge = selectedClass === 'Executive Class' ? 150 * passengerCount: 120 * passengerCount;

    return {
      baseFare: totalBaseFare,
      gst,
      convenienceFee,
      cateringCharge,
      total: totalBaseFare + gst + convenienceFee + cateringCharge
    }
  }

  const fareDetails = calculateTotalFare();

  // handle contact change
  const handleContactChange = (field, value) => {
    setContactInfo({
      ...contactInfo,
      [field]: value
    })
  }

  return (
    <div className={styles.container}>
      {/* Train Details */}
      <h2>Book Your Train Ticket</h2>
      <div className={styles.trainSummary}>
        <h3>Tain Details</h3>
        <div className={styles.detailsGrid}>
          <div>
            <strong>Train Number: </strong> {trainDetails.trainNumber}
          </div>
          <div>
            <strong>Train Name: </strong> {trainDetails.trainName}
          </div>
          <div>
            <strong>From: </strong> {trainDetails.from}
          </div>
          <div>
            <strong>To: </strong> {trainDetails.to}
          </div>
          <div>
            <strong>Date: </strong> {trainDetails.date}
          </div>
          <div>
            <strong>Departure: </strong> {trainDetails.departureTime}
          </div>
          <div>
            <strong>Arrival: </strong> {trainDetails.arrivalTime}
          </div>
          <div>
            <strong>Duration: </strong> {trainDetails.duration}
          </div>
          <div>
            <strong>Class: </strong>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              style={{
                marginLeft: "10px",
                padding: "3px",
                borderRadius: "5px",
              }}
            >
              {availableClasses.map((cls) => (
                <option key={cls} value={cls}>
                  {" "}
                  {cls} (₹{classPrice[cls]})
                </option>
              ))}
            </select>
          </div>
          <div>
            <strong>Quota</strong> {trainDetails.quota}
          </div>
        </div>
      </div>

      {/* Passenger Details */}
      <form>
        <div className={styles.passengerSection}>
          <h3>Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className={styles.passengerCard}>
              <h4>Passenger {index + 1}</h4>
              {/* Name */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Name:
                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) =>
                      updatePassenger(index, "name", e.target.value)
                    }
                    required
                    placeholder="Enter full name as per ID"
                  />
                </label>
              </div>
              {/* Age */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Age:
                  <input
                    type="number"
                    value={passenger.age}
                    onChange={(e) =>
                      updatePassenger(index, "age", e.target.value)
                    }
                    required
                    placeholder="Enter your age in years"
                    min={1}
                    max={110}
                  />
                </label>
              </div>
              {/* Gender */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Gender:
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              {/* Berth Preference */}
              <div className={styles.inputGroup}>
                <label htmlFor="">
                  Berth Preference:
                  <select
                    name="bithPreference"
                    value={passenger.berth}
                    onChange={(e) =>
                      updatePassenger(index, "gender", e.target.value)
                    }
                  >
                    <option value="lower">Lower</option>
                    <option value="middle">Middle</option>
                    <option value="upper">Upper</option>
                  </select>
                </label>
              </div>
              {/* Button to remove passenger (if more than 1 passenger) */}
              {passenger.length > 1 && (
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removePassenger(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className={styles.addButton}
            onClick={addPassenger}
          >
            Add passenger
          </button>
        </div>

        {/* information/contact section */}
        <div className={styles.contactSection}>
          <h3>Contact Information</h3>
          {/* Email */}
          <div className={styles.inputGroup}>
            <label htmlFor="">
              Email:
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleContactChange("email", e.target.value)}
                required
                placeholder="Enter email for e-ticket and updates"
              />
            </label>
          </div>
          {/* phone */}
          <div className={styles.inputGroup}>
            <label htmlFor="">
              Phone:
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
                required
                pattern="[0-9]{10}"
                title="Phone number must be of 10 digits"
                placeholder="Enter 10 digit mobile number"
              />
            </label>
          </div>
        </div>

        {/* payment section */}
        <div className={styles.payementSection}>
          <h3>Payment Summary</h3>
          <div className={styles.paymentDetails}>
            <div>
              <span>Base Fare ({selectedClass} x {passengers.length}):</span>
              <span>₹{fareDetails.baseFare}</span>
            </div>
            <div>
              <span>Catering Charges:</span>
              <span>₹{fareDetails.cateringCharge}</span>
            </div>
            <div>
              <span>GST (5%):</span>
              <span>₹{fareDetails.gst}</span>
            </div>
            <div>
              <span>Convenience Fee:</span>
              <span>₹{fareDetails.convenienceFee}</span>
            </div>
            <div className={styles.totalAmount}>
              <span>Total Amount:</span>
              <span>₹{fareDetails.total}</span>
            </div>
          </div>
        </div>

        {/* terms section */}
        <div className={styles.termsSection}>
          <label htmlFor="">
            <input type="checkbox" />
            I agree to the Terms and conditions with cancellation policy.
          </label>
        </div>

        {/* Payment proceed button */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.payButton}>Proceed to payment</button>
        </div>
      </form>
    </div>
  );
}

export default BookingPage;