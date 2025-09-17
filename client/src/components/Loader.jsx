// Loader Component - shows a spinning circle while data/content is loading
const Loader = () => {
  return (
    // Outer container → centers the loader both vertically & horizontally
    <div className="flex justify-center items-center h-[80vh]">
      
      {/* Loader Circle → a spinning ring made with Tailwind CSS */}
      <div
        className="animate-spin rounded-full h-14 w-14
        border-4 border-gray-300 border-t-blue-600"
      ></div>
    </div>
  )
}

export default Loader
