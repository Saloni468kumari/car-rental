import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import ManageBookings from './pages/owner/ManageBookings'
import ManageCars from './pages/owner/ManageCars'
import AddCar from './pages/owner/AddCar'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
      {/* Global toaster for notifications */}
      <Toaster />

      {/* Login modal (shown when state is true) */}
      {showLogin && <Login />}

      {/* Navbar is hidden on owner pages */}
      {!isOwnerPath && <Navbar />}

      {/* ----------- ROUTES ----------- */}
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/my-bookings' element={<MyBookings />} />

        {/* Owner routes (all under /owner) */}
        <Route path='/owner' element={<Layout />}>
          {/* Default owner dashboard */}
          <Route index element={<Dashboard />} />
          {/* Add new car page */}
          <Route path='add-car' element={<AddCar />} />
          {/* Manage all bookings (owner side) */}
          <Route path='manage-bookings' element={<ManageBookings />} />
          {/* Manage owner cars */}
          <Route path='manage-cars' element={<ManageCars />} />
        </Route>
      </Routes>
      {/* ----------- END ROUTES ----------- */}

      {/* Footer is hidden on owner pages */}
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
