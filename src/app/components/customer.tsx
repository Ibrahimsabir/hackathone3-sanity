import Card from "../components/card";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

export default function Customer() {
  return (
    <div className="max-w-[90%] flex flex-col justify-start items-center m-auto gap-0">
      {/* Title Section */}
      <div className="w-[90%] flex justify-between items-center mx-auto">
        <h4 className="text-[#000000] text-[32px] sm:text-[48px] leading-[57.6px] font-bold">
          OUR HAPPY CUSTOMERS
        </h4>
        {/* Arrow Navigation */}
        <div className="hidden sm:flex justify-between items-center gap-4 mt-12">
          <FaArrowLeft className="w-[24px] h-[24px] text-2xl text-gray-700" />
          <FaArrowRight className="w-[24px] h-[24px] text-2xl text-gray-700" />
        </div>
      </div>

      {/* Customer Cards Section */}
      <div className="mt-12 flex flex-col sm:flex-row sm:justify-between sm:gap-6 lg:gap-12 lg:mt-[150px]">
        {/* First Customer Card */}
        <Card
          text={"Sarah M."}
          p={
            `I&apos;m blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I&apos;ve bought has exceeded my expectations.`
          }
        />
        {/* Second Customer Card */}
        <Card
          text={"Alex K."}
          p={
            "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
          }
        />
        {/* Third Customer Card */}
        <Card
          text={"James L."}
          p={
            "As someone who&aposs always on the lookout for unique fashion pieces, I&apos;m thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
          }
        />
      </div>
    </div>
  );
}