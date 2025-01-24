import { IoLogoTwitter } from "react-icons/io";
import { RiFacebookFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";
import NewsLetter from "../components/newsletter";
import BottomFooter from "../components/bottomfooter";

export default function Footer() {
  return (
    <div className="w-full absolute flex flex-col justify-center items-center">
      {/* Newsletter Section */}
      <div className="w-full flex justify-start px-4">
        <div className="ml-2 w-full sm:w-auto">
          <NewsLetter />
        </div>
      </div>

      <div className="bg-[#F0F0F0] w-full py-8 px-4 sm:px-8 lg:px-20 mt-16 mb-12">
        <div className="max-w-full mx-auto flex flex-col sm:flex-row justify-between gap-8 sm:gap-12 mt-4 mb-8">
          {/* Company Info Section */}
          <div className="flex flex-col items-center sm:items-start mb-8 sm:mb-0">
            <h3 className="text-3xl sm:text-4xl font-bold font-satoshi mb-4 text-center sm:text-left">
              SHOP.CO
            </h3>
            <p className="text-sm text-[#00000099] mb-6 max-w-[280px] text-center sm:text-left">
              We have clothes that suit your style and which you’re proud to wear. From women to men.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              <div className="h-[35px] w-[35px] rounded-full bg-white flex justify-center items-center">
                <IoLogoTwitter className="text-xl" />
              </div>
              <div className="h-[35px] w-[35px] rounded-full bg-black text-white flex justify-center items-center">
                <RiFacebookFill className="text-xl" />
              </div>
              <div className="h-[35px] w-[35px] rounded-full bg-white flex justify-center items-center">
                <FaInstagram className="text-xl" />
              </div>
              <div className="h-[35px] w-[35px] rounded-full bg-white flex justify-center items-center">
                <IoLogoGithub className="text-xl" />
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full">
            {/* Individual Links */}
            <div>
              <h5 className="text-lg font-semibold mb-4 tracking-wide">COMPANY</h5>
              <ul className="text-sm text-[#00000099] space-y-4">
                <li>About</li>
                <li>Features</li>
                <li>Works</li>
                <li>Career</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 tracking-wide">HELP</h5>
              <ul className="text-sm text-[#00000099] space-y-4">
                <li>Customer Support</li>
                <li>Delivery Details</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 tracking-wide">FAQ</h5>
              <ul className="text-sm text-[#00000099] space-y-4">
                <li>Account</li>
                <li>Deliveries</li>
                <li>Orders</li>
                <li>Payments</li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4 tracking-wide">RESOURCES</h5>
              <ul className="text-sm text-[#00000099] space-y-4">
                <li>Free eBooks</li>
                <li>Developer Tutorials</li>
                <li>How-to Blogs</li>
                <li>YouTube Playlists</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider and Bottom Footer */}
        <BottomFooter />
      </div>
    </div>
  );
}