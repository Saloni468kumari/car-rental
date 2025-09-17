import { assets } from "../assets/assets"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      {/* Top Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col md:flex-row items-start justify-between gap-8 pb-6 border-borderColor border-b"
      >
        {/* Left Part */}
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src={assets.logo}
            alt="CarRental Logo"
            className="h-8 md:h-9"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3"
          >
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src={assets.facebook_logo} alt="Facebook" className="w-5 h-5 hover:opacity-80 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={assets.instagram_logo} alt="Instagram" className="w-5 h-5 hover:opacity-80 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src={assets.twitter_logo} alt="Twitter" className="w-5 h-5 hover:opacity-80 transition" />
            </a>
            <a href="mailto:info@example.com">
              <img src={assets.gmail_logo} alt="Gmail" className="w-5 h-5 hover:opacity-80 transition" />
            </a>
          </motion.div>
        </div>

        {/* Right Part */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">Quick Links</h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li><Link to="/" className="hover:text-gray-700 transition">Home</Link></li>
              <li><Link to="/cars" className="hover:text-gray-700 transition">Browse Cars</Link></li>
              <li><Link to="/list-your-car" className="hover:text-gray-700 transition">List Your Car</Link></li>
              <li><Link to="/about" className="hover:text-gray-700 transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">Resources</h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li><Link to="/help" className="hover:text-gray-700 transition">Help Center</Link></li>
              <li><Link to="/terms" className="hover:text-gray-700 transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-gray-700 transition">Privacy Policy</Link></li>
              <li><Link to="/insurance" className="hover:text-gray-700 transition">Insurance</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-medium text-gray-800 uppercase">Contact</h2>
            <ul className="mt-3 flex flex-col gap-1.5">
              <li>1234 Luxury Drive</li>
              <li>Mumbai, India</li>
              <li><a href="tel:+919876543210" className="hover:text-gray-700 transition">+91 9876543210</a></li>
              <li><a href="mailto:info@example.com" className="hover:text-gray-700 transition">info@example.com</a></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col md:flex-row gap-2 items-center justify-between py-5"
      >
        <p>© {new Date().getFullYear()} CarRental. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li><Link to="/privacy" className="hover:text-gray-700 transition">Privacy</Link></li>
          <li>|</li>
          <li><Link to="/terms" className="hover:text-gray-700 transition">Terms</Link></li>
          <li>|</li>
          <li><Link to="/cookies" className="hover:text-gray-700 transition">Cookies</Link></li>
        </ul>
      </motion.div>
    </motion.footer>
  )
}

export default Footer
