// Importing all the sections/components that make up the Home page
import Banner from "../components/Banner"
import FeaturedSection from "../components/FeaturedSection"
import Hero from "../components/Hero"
import NewsLetter from "../components/NewsLetter"
import Testimonial from "../components/Testimonial"

const Home = () => {
  return (
    <>
      {/* Hero Section: Typically the top banner with main call-to-action */}
      <Hero />

      {/* FeaturedSection: Highlights premium or popular cars/services */}
      <FeaturedSection />

      {/* Banner: Promotional banner or offers */}
      <Banner />

      {/* Testimonial Section: Show customer reviews */}
      <Testimonial />

      {/* Newsletter Section: Email subscription form */}
      <NewsLetter />
    </>
  )
}

export default Home
