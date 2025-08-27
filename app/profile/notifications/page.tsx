"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search, ShoppingCart, X, TriangleAlert } from "lucide-react"

export default function NotificationsPage() {
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(true)

  const notifications = [
    {
      id: 1,
      title: "New Season Is Here",
      date: "06/07/2025",
      hasImage: true,
    },
    {
      id: 2,
      title: "Listen to Diamond's new song",
      date: "06/12/2025",
      hasImage: true,
    },
  ]

  return (
    <div className="min-h-screen w-screen lg:w-[calc(95vw-256px)] bg-[#F2F2F2] dark:bg-[#141414]  pt-8">
      {/* Header */}
      

      <div className="flex">
           

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-[#FFFFFF] mb-8">My Notifications</h2>

          <div className="space-y-8">
            {/* Notifications List */}
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4 pb-6 border-b-2 border-[#999999]">
                {notification.hasImage && <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0"></div>}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-[#FFFFFF] mb-1">{notification.title}</h3>
                  <p className="text-sm text-[#2C2C2C] dark:text-white">{notification.date}</p>
                </div>
              </div>
            ))}

            {/* Subscription Alert */}
            {showSubscriptionAlert && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 relative">
                <button
                  onClick={() => setShowSubscriptionAlert(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-[#2C2C2C]"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <TriangleAlert className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscription has expired!</h3>
                    <p className="text-sm text-[#2C2C2C] mb-4">
                      Your Spotify subscription expired on 12/07/2025. Check on your account to resolve issue
                    </p>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">Subscribe Now</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
