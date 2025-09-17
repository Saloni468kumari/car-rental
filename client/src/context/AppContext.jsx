import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    // ---------- GLOBAL STATES ----------
    const [token, setToken] = useState(null)          // user token
    const [user, setUser] = useState(null)            // logged-in user data
    const [isOwner, setIsOwner] = useState(false)     // check if user is owner
    const [showLogin, setShowLogin] = useState(false) // toggle login modal
    const [pickupDate, setPickupDate] = useState('')  // booking pickup date
    const [returnDate, setReturnDate] = useState('')  // booking return date
    const [cars, setCars] = useState([])              // all cars list

    // ---------- API CALLS ----------
    // Fetch logged-in user data
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data')
            if (data.success) {
                setUser(data.user)
                setIsOwner(data.user.role === 'owner') // set owner flag
            } else {
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Fetch all cars (public)
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Logout user
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been logged out')
    }

    // ---------- EFFECTS ----------
    // On mount → get token & fetch cars
    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
    }, [])

    // When token changes → fetch user
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    }, [token])

    // ---------- CONTEXT VALUE ----------
    const value = {
        navigate, currency, axios, user, setUser,
        token, setToken, isOwner, setIsOwner, fetchUser,
        showLogin, setShowLogin, logout, fetchCars, cars, setCars,
        pickupDate, setPickupDate, returnDate, setReturnDate
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// Hook for easy usage in components
export const useAppContext = () => {
    return useContext(AppContext)
}
