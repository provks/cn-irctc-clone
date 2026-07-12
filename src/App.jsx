import { Route, BrowserRouter, Routes, useLocation, useNavigate } from "react-router"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BookingPage from "./pages/BookingPage"
import ContactPage from "./pages/ContactPage"
import LoginModal from "./pages/LoginModal"
import RegisterModal from "./pages/RegisterModal"
import TrainSearchResult from "./pages/TrainSearchResult"
import TrainDetails from "./pages/TrainDetails"

// App component is the main component of the application. It contains the Router, Navbar, Footer, and the Routes for different pages.
const RouteContentManager = () => {
  // get the current path from the route path
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Routes location={location.pathname} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/trainlist" element={<TrainSearchResult />} />
        <Route path="/train-details/:train_number" element={<TrainDetails />} />
        <Route path="/login" element={<LoginModal 
        isOpen={true}
        onClose={() => navigate(-1)}
        // onLogin={() => {}}
        switchToRegister={() => {}}
         />} />
        <Route path="/register" element={<RegisterModal />} />
      </Routes>
    </div>
  )
}

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar></Navbar>
      {/* // This component manages the content based on the current route */}
      <RouteContentManager /> 
      <Footer></Footer>

    </BrowserRouter>
    </>
  )
}

export default App
