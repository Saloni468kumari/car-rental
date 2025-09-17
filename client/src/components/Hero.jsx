import { useState } from "react"
import { assets, cityList } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
import { motion } from "motion/react"

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("")

  const { navigate, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center"
    >
      {/* Heading */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-semibold"
      >
        Luxury cars on Rent
      </motion.h1>

      {/* Search Form */}
      <motion.form
        initial={{ scale: 0.95, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-start p-6 rounded-lg 
        md:rounded-full w-full max-w-xs md:max-w-md lg:max-w-3xl 
        bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] gap-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
          {/* Pickup Location */}
          <div className="flex flex-col items-start gap-1 pl-8">
            <label htmlFor="pickup-location" className="sr-only">
              Pickup Location
            </label>
            <select
              id="pickup-location"
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="outline-none text-md"
            >
              <option value="">Pickup Location</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <p className="px-1 text-sm text-gray-500">
              {pickupLocation ? pickupLocation : "Please select location"}
            </p>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="pickup-date" className="text-md text-gray-700">
              Pick-up Date
            </label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              min={new Date().toISOString().split("T")[0]}
              className="outline-none text-gray-500 text-sm"
              required
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="return-date" className="text-md text-gray-800">
              Return Date
            </label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              min={pickupDate || new Date().toISOString().split("T")[0]}
              className="outline-none text-gray-500 text-sm"
              required
            />
          </div>
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 px-9 py-3
          bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer shrink-0"
        >
          <img src={assets.search_icon} alt="search" className="w-5 h-5 brightness-200" />
          Search
        </motion.button>
      </motion.form>

      {/* Hero Image */}
      <motion.img
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        src={assets.main_car}
        alt="Luxury car"
        className="max-h-72"
      />
    </motion.div>
  )
}

export default Hero
