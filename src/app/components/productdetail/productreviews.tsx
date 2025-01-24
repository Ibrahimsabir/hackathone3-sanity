import Card from "../card";
import { AiOutlineSliders } from "react-icons/ai";
import { IoChevronDownSharp } from "react-icons/io5";

export default function Customer() {
  // Dummy data for cards
  const CustomerData = [
    {
      text: "Sarah M.",
      description:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
      date: "2024-12-05",
    },
    {
      text: "Alex K.",
      description:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
      date: "2024-12-04",
    },
    {
      text: "James L.",
      description:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
      date: "2024-12-03",
    },
    {
      text: "Emily R.",
      description:
        "The customer service at Shop.co is top-notch! They were incredibly helpful in assisting me with my order. I will definitely be returning for more shopping.",
      date: "2024-12-02",
    },
    {
      text: "Michael T.",
      description:
        "I appreciate how Shop.co prioritizes quality without compromising on affordability. Their collection is a breath of fresh air in the fashion world.",
      date: "2024-12-01",
    },
    {
      text: "Olivia P.",
      description:
        "Shop.co has completely revolutionized my shopping experience. Their user-friendly platform, coupled with amazing products, makes for an unbeatable combo!",
      date: "2024-11-30",
    },
  ];

  return (
    <div className="flex font-Satoshi flex-col justify-between items-center m-auto gap-0">
      {/* Header */}
      <div className="w-[90%] h-[80px] flex flex-col sm:flex-row justify-between items-center m-auto">
  {/* Left Section */}
  <div className="flex flex-col sm:flex-row w-full sm:w-2/3 h-auto justify-start gap-2 items-start sm:items-center">
    <h1 className="text-black flex gap-2 text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-0">
      All Reviews 
      <h2 className="text-gray-500 text-base sm:text-lg mt-1">(415)</h2>
    </h1>
  </div>

  {/* Right Section */}
  <div className="flex flex-wrap sm:flex-nowrap w-full sm:w-1/3 justify-end items-center gap-2 mt-2 sm:mt-0">
    <AiOutlineSliders className="text-xl sm:w-[40px] sm:h-[40px] text-black bg-gray-100 p-2 rounded-full" />       
    <button className="text-sm sm:text-lg flex items-center justify-between text-black bg-gray-100 px-4 sm:px-6 py-2 gap-2 rounded-full">
      Latest
      <IoChevronDownSharp />
    </button>
    <button className="text-sm sm:text-lg text-gray-100 bg-black px-4 sm:px-6 py-2 gap-2 rounded-full">
      Write a review
    </button>
  </div>


      </div>

      {/* Dynamic Cards */}
      <div className="lg:ml-[90px] mt-[50px] border-b-2  border-gray-200 flex flex-wrap gap-6 justify-center">
        {CustomerData.map((customer, index) => (
          <Card
            key={index} // Use index as key for now (prefer unique IDs in real apps)
            text={customer.text}
            p={customer.description}
            date={customer.date} // Pass date as a prop to the Card component
          />
        ))}
        <div className="col-span-full flex justify-center mt-8 mb-12">
          <button className="text-lg font-Satoshi font-medium text-black px-16 py-2 border-2 border-gray-200 rounded-full">
            Load More Reviews
          </button>
        </div>
      </div>
      
    </div>
  );
}