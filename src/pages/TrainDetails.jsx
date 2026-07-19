import { useEffect, useState } from "react";
import { BsTrainFront } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/TrainDetails.module.css"

// const API_URL = "https://mocki.io/v1/4582f754-3228-4f96-a2a7-3206d65fc261";
const API_URL = "https://mocki.io/v1/b10badde-9b06-4a34-b9af-b021da859e73";

const TrainDetails = () => {
  const { train_number } = useParams();
  const [trainDetails, setTrainDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState("null");

  const navigate = useNavigate();

  console.log("Fetching train details for train number:", train_number);

  // make an api call to fetch the train details from the API_URL and store it in a state variable called trainDetails
  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await fetch(API_URL); // list of trains is fetched from the API_URL
        const data = await response.json();
        // find the train details for the given train_number from the data and set it in the state variable
        const train = data.find((train) => train.train_number === train_number);
        if (!train) {
          throw new Error(`Train with number ${train_number} not found`);
        }
        setTrainDetails(train);
        // set the default selected calss to the first class available in the train details
        if (train.price && Object.keys(train.price).length > 0) {
          setSelectedClass(Object.keys(train.price)[0]);
        }
      } catch (error) {
        console.error("Error fetching train details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // console.log("trainDetails:", trainDetails);
    fetchTrainDetails();
  }, [train_number]);

  console.log("train details: ", trainDetails)

  // if loading is true, return a loading message
  if (loading) {
    return <div className={styles.loading}>Loading train details...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  const handleBooking = () => {
    if (!trainDetails || !selectedClass) return;

    // create a formatted date for today (app state)
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`

    // get source and desitnation station name
    const source = trainDetails.route[0].station_name;
    const destination = trainDetails.route[trainDetails.route.length - 1].station_name;

    // TODO: check why we are not getting state data in BOokings page
    const state =  {
        trainNumerb: trainDetails.train_number,
        trainName: trainDetails.train_name,
        from: source,
        to: destination,
        date: formattedDate,
        departureTime: trainDetails.departure_time,
        arrivalTime: trainDetails.arrival_time,
        duration: trainDetails.duration,
        travelClass: selectedClass,
        quota: 'General',
        price: trainDetails.price
      }
    console.log("state", state)

    // navidate to booking with train details formatted to mach bookingPage component
    navigate('/booking', {
      state: state
    });
  }


    //Get source and destionation from the route array
  const source = trainDetails.route[0];
  const destination = trainDetails.route[trainDetails.route.length - 1];

  // Calculate the totalfare with service charge (5% of base fare)
  const baseFare = trainDetails.price && selectedClass ? trainDetails.price[selectedClass] : 0;
  const serviceCharge = baseFare * 0.05;
  const totalFare = baseFare + serviceCharge;

  return (
    <div className={styles.container}>
      {/* Head Section with train details */}
      <h2>
        <BsTrainFront /> {trainDetails.train_name} ({trainDetails.train_number})
      </h2>

      {/* Days of operation */}
      <div className={styles.operationDays}>
        <h3>Days of Operation:</h3>
        <div className={styles.daysContainer}>
          {trainDetails.days_of_operation.map((day, index) => (
            <span key={index} className={styles.dayBadge}>
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Source and Destination */}
      <div className={styles.journeyInfo}>
        <div className={styles.journeyDetail}>
          <span>Departure:</span>
          <strong>{trainDetails.departure_time}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Duration:</span>
          <strong>{trainDetails.duration}</strong>
        </div>
        <div className={styles.journeyDetail}>
          <span>Arrival:</span>
          <strong>{trainDetails.arrival_time}</strong>
        </div>
      </div>

      {/* Route section (progress bar) */}
      <div className={styles.progressBar}>
        {/* source stop */}
        <div className={`${styles.station} ${styles.source}`}>
          <span className={styles.staionName}>{source.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {source.arrival_time}</div>
            <BsTrainFront />
            <div>Departure: {source.departure_time}</div>
          </div>
        </div>

        {/* dynamically handle stops in between source and destination */}
        {trainDetails.route.slice(1, -1).map((station, index) => (
          <div
            key={index}
            className={`${styles.station} ${index % 2 === 0 ? styles.right : styles.left}`}
          >
            <span className={styles.stationName}>{station.station_name}</span>
            <div className={styles.timeInfo}>
              <div>Arrival: {station.arrival_time}</div>
              <BsTrainFront />
              <div>Departure: {station.departure_time}</div>
            </div>
          </div>
        ))}

        {/* destination stop  */}
        <div className={`${styles.station} ${styles.destination}`}>
          <span className={styles.staionName}>{destination.station_name}</span>
          <div className={styles.timeInfo}>
            <div>Arrival: {destination.arrival_time}</div>
            <BsTrainFront />
            <div>Departure: {destination.departure_time}</div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      {trainDetails.price && (
        <div className={styles.priceCard}>
          <h3>Fare Information</h3>

          <div className={styles.classSelector}>
            {Object.keys(trainDetails.price).map((classType) => (
              <button
                key={classType}
                className={`${styles.classButton} ${selectedClass === classType ? styles.active : ""}`}
                onClick={() => setSelectedClass(classType)}
              >
                {classType}
              </button>
            ))}
          </div>

          <div className={styles.priceDetails}>
            <span>Base Fare:</span>
            <span className={styles.price}>₹{baseFare}</span>
          </div>
          <div className={styles.priceDetails}>
            <span>Service Charges:</span>
            <span className={styles.price}>₹{serviceCharge}</span>
          </div>
          <div className={styles.priceDetails}>
            <span>
              <strong>Total:</strong>
            </span>
            <span className={styles.price}>
              <strong>₹{totalFare}</strong>
            </span>
          </div>
          <button 
            className={styles.bookButton} 
            onClick={handleBooking}>
            Book Now - {selectedClass}
          </button>
        </div>
      )}

      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default TrainDetails;
