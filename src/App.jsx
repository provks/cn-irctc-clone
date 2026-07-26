import { Route, BrowserRouter, Routes, useLocation, useNavigate } from "react-router"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BookingPage from "./pages/BookingPage"
import ContactPage from "./pages/ContactPage"
import LoginModal from "./pages/LoginModal"
// import RegisterModal from "./pages/RegisterModal"
import TrainSearchResult from "./pages/TrainSearchResult"
import TrainDetails from "./pages/TrainDetails"
import styles from "./styles/App.module.css";
import { AuthProvider } from "./context/AuthContext"
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
// import TrainCarousel from "./components/TrainCarousel"
import ProtectedRoute from "./components/ProtectedRoute"

const RouteContentManager = () => {
  // get the current path from the route path
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.mainContent}>
      {location.pathname === "/" && (
        <>
          <Home />
          {/* <TrainCarousel /> */}
        </>
      )}
      <Routes>
        <Route path="/" element={null} />
        <Route path="/trainlist" element={<TrainSearchResult />} />
        <Route path="/train-details/:train_number" element={<TrainDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        
        <Route 
          path="/booking" 
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route 
          path="/login" 
          element={
            <LoginModal 
              isOpen={true} 
              onClose={() => navigate(-1)} 
              onLogin={() => {}} 
              switchToRegister={() => {}} 
            />
          } 
        />
      </Routes>
    </div>
  )
}

// App component is the main component of the application. It contains the Router, Navbar, Footer, and the Routes for different pages.
function App() {
  return (
    <>
      {/* Wrapping the entire app with authprovider */}
      <AuthProvider>
        <BrowserRouter>
          <div className={styles.app}>
            <Navbar />
            {/* This component manages the content based on the current route */}
            <RouteContentManager />
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
