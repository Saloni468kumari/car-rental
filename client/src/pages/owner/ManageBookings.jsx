import { useEffect, useState } from "react"
import Title from "../../components/owner/Title"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const ManageBookings = () => {
  const { currency, axios } = useAppContext() // Get currency symbol and axios instance
  const [bookings, setBookings] = useState([]) // List of bookings
  const [loading, setLoading] = useState(true) // Loading state

  // Fetch all bookings for this owner
  const fetchOwnerBookings = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get("/api/bookings/owner", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      // console.log("Owner bookings response:", data); 

      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Change the status of a booking (pending → confirmed/cancelled)
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings() // Refresh bookings after change
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch bookings on component mount
  useEffect(() => {
    fetchOwnerBookings()
  }, [])

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      {/* Page Title */}
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      {/* Bookings Table */}
      <div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500 bg-gray-50">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* Show loading or empty state */}
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No bookings found
                </td>
              </tr>
            ) : (
              // Map each booking to a row
              bookings.map((booking) => (
                <tr key={booking._id} className="border-t border-borderColor text-gray-500">
                  {/* Car Info */}
                  <td className="p-3 flex items-center gap-3">
                    {booking.car ? (
                      <>
                        <img
                          src={booking.car.image}
                          alt={booking.car.model || "Car"}
                          className="h-12 w-12 aspect-square rounded-md object-cover"
                        />
                        <p className="font-medium max-md:hidden">
                          {booking.car.brand} {booking.car.model}
                        </p>
                      </>
                    ) : (
                      <p className="text-red-400">Car data missing</p>
                    )}
                  </td>

                  {/* Date Range */}
                  <td className="p-3 max-md:hidden">
                    {booking.pickupDate && booking.returnDate
                      ? `${new Date(booking.pickupDate).toLocaleDateString()} to ${new Date(booking.returnDate).toLocaleDateString()}`
                      : "N/A"}
                  </td>

                  {/* Total Price */}
                  <td className="p-3">
                    {currency}{booking.price || 0}
                  </td>

                  {/* Payment Method */}
                  <td className="p-3 max-md:hidden">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      {booking.paymentMethod || "Offline"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    {booking.status === "pending" ? (
                      <select
                        value={booking.status}
                        onChange={(e) => changeBookingStatus(booking._id, e.target.value)}
                        className="px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBookings

