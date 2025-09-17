// Title component to display a section heading + subtitle
// Props: title (main heading), subTitle (description), align (optional alignment)

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center
      text-center 
      ${align == "left" && "md:items-start md:text-left"}`} 
      // Default: centered text. If align="left", text is left-aligned on medium+ screens
    >
      {/* Main heading */}
      <h1 className="font-semibold text-4xl md:text-[40px]">
        {title}
      </h1>

      {/* Subtitle / description */}
      <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
