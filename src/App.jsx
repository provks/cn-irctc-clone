import { Route, BrowserRouter, Routes, useLocation } from "react-router"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import BookingPage from "./pages/BookingPage"
import ContactPage from "./pages/ContactPage"
import LoginModal from "./pages/LoginModal"
import RegisterModal from "./pages/RegisterModal"

// App component is the main component of the application. It contains the Router, Navbar, Footer, and the Routes for different pages.
const RouteContentManager = () => {
  // get the current path from the route path
  const location = useLocation();
  console.log("Current path:", location); // Log the current path to the console for debugging

  console.log("Current path:", location.pathname); // Log the current path to the console for debugging

  return (
    <div>
      <Routes location={location.pathname} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginModal isOpen={true} />} />
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
      <RouteContentManager /> // This component manages the content based on the current route
      <Footer></Footer>

    </BrowserRouter>
    </>
  )
}

export default App
