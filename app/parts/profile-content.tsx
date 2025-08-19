"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const subscriptions = [
  {
    id: 1,
    name: "Baze Daily Access only One Off",
    description: "Ends on 26 July 2025",
    icon: "/baze-logo-colorful.png",
    amount: "KES 200",
    expiryDate: "02/07/2026",
    status: "Active",
    showAction: false,
  },
  {
    id: 2,
    name: "Spotify Premium",
    description: "Renews 3 July 2025",
    icon: "/placeholder-1h2us.png",
    amount: "KES 200",
    expiryDate: "02/07/2026",
    status: "Active",
    showAction: true,
  },
  {
    id: 3,
    name: "Showmax Entertainment",
    description: "Renews 3 July 2025",
    icon: "/showmax-logo-red-black.png",
    amount: "KES 200",
    expiryDate: "02/07/2026",
    status: "Active",
    showAction: true,
  },
]

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState("Subscriptions")

  const tabs = ["Account", "My Favorites", "Subscriptions"]

  return (
    <div className="p-4 lg:p-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
        <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
          <img src="/smiling-person-avatar.png" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#2c2c2c] mb-2">My Profile</h1>
          <p className="text-[#696969]">View and edit your profile details below</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#e5e5e5] mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                ${
                  activeTab === tab
                    ? "border-[#c62676] text-[#c62676]"
                    : "border-transparent text-[#696969] hover:text-[#2c2c2c] hover:border-[#cccccc]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Subscriptions Content */}
      {activeTab === "Subscriptions" && (
        <div>
          <h2 className="text-2xl font-bold text-[#2c2c2c] mb-6">All Subscription Plans</h2>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e5e5]">
                  <th className="text-left py-4 px-4 font-medium text-[#696969]">Service</th>
                  <th className="text-left py-4 px-4 font-medium text-[#696969]">Amount</th>
                  <th className="text-left py-4 px-4 font-medium text-[#696969]">Expiry Date</th>
                  <th className="text-left py-4 px-4 font-medium text-[#696969]">Status</th>
                  <th className="text-left py-4 px-4 font-medium text-[#696969]">Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b border-[#f2f2f2]">
                    <td className="py-6 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={subscription.icon || "/placeholder.svg"}
                            alt={subscription.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#2c2c2c]">{subscription.name}</h3>
                          <p className="text-sm text-[#696969]">{subscription.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6 px-4 text-[#2c2c2c] font-medium">{subscription.amount}</td>
                    <td className="py-6 px-4 text-[#2c2c2c]">{subscription.expiryDate}</td>
                    <td className="py-6 px-4">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-[#06a54c] rounded-full mr-2"></span>
                        <span className="text-[#06a54c] font-medium">{subscription.status}</span>
                      </span>
                    </td>
                    <td className="py-6 px-4">
                      {subscription.showAction && (
                        <Button
                          variant="outline"
                          className="border-[#cccccc] text-[#2c2c2c] hover:bg-[#f2f2f2] bg-transparent"
                        >
                          Unsubscribe
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="bg-white rounded-lg p-6 shadow-sm border border-[#e5e5e5]">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={subscription.icon || "/placeholder.svg"}
                      alt={subscription.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2c2c2c] mb-1">{subscription.name}</h3>
                    <p className="text-sm text-[#696969]">{subscription.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-[#696969] mb-1">Amount</p>
                    <p className="font-medium text-[#2c2c2c]">{subscription.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#696969] mb-1">Expiry Date</p>
                    <p className="text-[#2c2c2c]">{subscription.expiryDate}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-[#06a54c] rounded-full mr-2"></span>
                    <span className="text-[#06a54c] font-medium">{subscription.status}</span>
                  </div>
                  {subscription.showAction && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#cccccc] text-[#2c2c2c] hover:bg-[#f2f2f2] bg-transparent"
                    >
                      Unsubscribe
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Placeholder content for other tabs */}
      {activeTab === "Account" && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-[#2c2c2c] mb-2">Account Settings</h3>
          <p className="text-[#696969]">Account management content would go here</p>
        </div>
      )}

      {activeTab === "My Favorites" && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-[#2c2c2c] mb-2">My Favorites</h3>
          <p className="text-[#696969]">Your favorite content would be displayed here</p>
        </div>
      )}
    </div>
  )
}
