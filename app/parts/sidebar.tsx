"use client"

import { useState } from "react"
import { User, Settings, Bell, MessageSquare, HelpCircle, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Link from "next/link"

const menuItems = [
  { icon: User, label: "My Profile", active: true,link:"/profile" },
  { icon: Settings, label: "Settings", active: false,link:"/settings" },
  { icon: Bell, label: "Notifications", active: false,link:"/notifications" },
  { icon: MessageSquare, label: "Feedback and Rating", active: false,link:"/feedback" },
  { icon: HelpCircle, label: "Help & Support", active: false, link:"/help" },
  { icon: LogOut, label: "Logout", active: false,link:"/logout" },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('profile');
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth() // Added logout function

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    // Close the modal first
    setShowLogoutModal(false);
    
    // Set logged in state to false
    logout();
    
    // Navigate to home (localhost:3000)
    router.push('/');
    
    // In a real app, you'd also clear authentication tokens, etc.
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };


  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-30 left-0 h-full= border-r border-[#E5E5E5] w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shadow-none
      `}
      >
        <div className="p-6">
          <nav className="space-y-2">
                {menuItems.map((item, index) => (
                    <Link
                    href={item.link}
                    key={index}
                    onClick={item.label === "Logout" ? handleLogoutClick : undefined}
                    className={`
                        w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer
                        ${item.active ? "bg-[#c62676] text-white" : "text-[#2c2c2c] hover:bg-[#f2f2f2]"}
                        ${item.label === "Logout" ? "hover:bg-red-50 hover:text-red-600" : ""}
                    `}
                    >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 mx-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-pink-600 mb-4">
                You are about to log out !
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to log out from Vybz Streams? You will have to log back in to access your account
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleCancelLogout}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  No, Go back
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}