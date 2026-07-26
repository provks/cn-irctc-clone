import { useEffect, useState } from "react";
import {useAuth} from '../context/AuthContext';
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/BookingPage.module.css"
import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 


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
    email: currentUser?.currentUser?.email || '',
    phone: ''
  })
  const navigate = useNavigate();

  console.log(location);
  console.log(location.state);
  console.log("Booking page currentUser", currentUser);

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
        duration: location.state?.duration || "00:00",
        quota: location.state?.quota || 'General'
      })
    } else {
      //  No train selected, might want to handle this case later
      console.log("No train details provided");
    }
  }, [location.state])

  // handle class change for selected class
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  }

  // update passenger details
  const updatePassenger = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

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

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate form data (passenger, contactInfo)
    const isFormDataValid = passengers.every(p => p.name && p.age && p.gender) && contactInfo.email && contactInfo.phone;
    
    if (!isFormDataValid) {
      alert("Please fill in all the required data");
      return;
    }

    // create booking data in the database
    try {
      // In real app, you would submit booking infor to the backend server
      const bookingData = {
        userId: currentUser.currentUser.uid,
        trainDetails: {
          ...trainDetails,
          travelClass: selectedClass
        },
        passengers: passengers,
        contactInfo: contactInfo,
        paymentSummary: calculateTotalFare(),
        status: "confirmed",
        createdAt: serverTimestamp()  // function to get crrent timestamp from server
      }
      console.log("currentUser", currentUser.currentUser.uid);
      console.log("bookingData", bookingData);

      // store bookingData into databse
      const bookingsRef = collection(db, "bookings");
      const docRef =  await addDoc(bookingsRef, bookingData);

      alert("Booking submitted successfully!");

      // redirect user to payemnt/confirmation page
      navigate('/booking-confirmation', {
        state: {
          bookingId: docRef.id,
          bookingDetails: bookingData,
        }
      });
    } catch (error) {
      console.error("Error saving booking data to firestore:", error);
      alert("Error confirming booking. Please try again later!");
    }
  }

  const goBackToSearch = () => {
    navigate('/trainlist');
  };

  if (!trainDetails) {
    return (
      <div className={styles.container}>
        <h2>Booking Page</h2>
        <p>No train selected. Please search for trains and select one to book.</p>
        <button 
          onClick={goBackToSearch}
          className={styles.addButton}
          style={{ marginTop: '20px' }}
        >
          Search Trains
        </button>
      </div>
    );
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
      <form onSubmit={handleSubmit}>
        <div className={styles.passengerSection}>
          <h3>Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className={styles.passengerCard}>
              <h4>Passenger {index + 1}</h4>
              {/* Name */}
              <div className={styles.inputGroup}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={passenger.name}
                    onChange={(e) => updatePassenger(index, "name", e.target.value)}
                    required
                    placeholder="Enter full name as per ID"
                  />
                </label>
              </div>
              {/* Age */}
              <div className={styles.inputGroup}>
                <label>
                  Age:
                  <input
                    type="number"
                    value={passenger.age}
                    onChange={(e) => updatePassenger(index, "age", e.target.value)}
                    required
                    placeholder="Enter your age in years"
                    min="1"
                    max="110"
                  />
                </label>
              </div>
              {/* Gender */}
              <div className={styles.inputGroup}>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={passenger.gender}
                    onChange={(e) => updatePassenger(index, "gender", e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              {/* Berth Preference */}
              <div className={styles.inputGroup}>
                <label>
                  Berth Preference:
                  <select
                    name="bithPreference"
                    value={passenger.berth}
                    onChange={(e) => updatePassenger(index, "berth", e.target.value)}
                  >
                    <option value="lower">Lower</option>
                    <option value="middle">Middle</option>
                    <option value="upper">Upper</option>
                  </select>
                </label>
              </div>
              {/* Button to remove passenger (if more than 1 passenger) */}
              {passengers.length > 1 && (
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
            <label>
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
            <label>
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
          <label>
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