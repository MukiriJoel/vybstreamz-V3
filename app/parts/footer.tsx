import { Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-[#333333] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* App Store Links */}
          <div className="flex space-x-4">
            <img src="/appstorebadge.png" alt="Download on App Store" className="h-10" />
            <img src="/googleplaybadge.png" alt="Get it on Google Play" className="h-10" />
          </div>

          {/* Social Media */}
          <div className="flex space-x-4">
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              Help and Support
            </a>
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              Contact Us
            </a>
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              Terms and Conditions
            </a>
            <a href="#" className="text-[#a6a6a6] hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

