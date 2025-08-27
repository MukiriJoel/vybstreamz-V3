import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer =()=>{
    return(
        <footer className="w-full bg-[#F2F2F2] dark:bg-[#141414] mt-10 max-w-8xl mx-auto ">
         <div className="px-8 sm:px-6 lg:px-8 py-8 ">
          {/* App Store Buttons */}
          <div className="flex gap-3 mb-4 flex-start sm:mx-auto xs:justify-center cursor-pointer">
            <img src="/logos/appStore.png" alt="Download on App Store" className="h-10" />
            <img src="/logos/googlePlay.png" alt="Get it on Google Play" className="h-10" />
          </div>

          {/* Social Links and Footer Links */}
          <div className="flex flex-wrap justify-between items-center border-t border-gray-600 pt-5 min-h-[60px]">
            <div className="flex space-x-6 xs:mb-5">
              <a href="#" className="text-[#2C2C2C] dark:text-white hover:text-[#2C2C2C]">
                <span className="sr-only">Instagram</span>
               {/* <img src={"/logos/instagram.svg"}></img> */}
               <FaInstagram className="w-8 h-8 "/>
              </a>
              <a href="#" className="text-[#2C2C2C] dark:text-white hover:text-[#2C2C2C]">
                <span className="sr-only">Facebook</span>
                 <FaFacebookF className="w-8 h-7 "/>
              </a>
              <a href="#" className="text-[#2C2C2C] dark:text-white hover:text-[#2C2C2C]">
                <span className="sr-only">Twitter</span>
                 {/* <img src={"/logos/twitter-x.svg"}></img> */}
                 <FaXTwitter   className="w-8 h-8 "/>
              </a>
            </div>

            <div className="flex flex-wrap xs:pt-4 gap-2 gap-x-4 text-sm text-[#2C2C2C] dark:text-[#FFFFFF] items-end">
              <a href="#" className="hover:text-gray-900 dark:text-[#FFFFFF]">
                Help and Support
              </a>
              <a href="#" className="hover:text-gray-900 dark:text-[#FFFFFF]">
                Contact Us
              </a>
              <a href="#" className="hover:text-gray-900 dark:text-[#FFFFFF]">
                Terms and Conditions
              </a>
              <a href="#" className="hover:text-gray-900 dark:text-[#FFFFFF]">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
}
export default Footer;