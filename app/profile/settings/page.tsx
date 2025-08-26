"use client"

import { useState } from "react"
import { ChevronRight, Search, ShoppingCart, Bell, User } from "lucide-react"
import SettingsContent from "@/app/parts/settings-content"
// import ToggleSwitch from "@/app/parts/toggle-switch"

// Toggle Switch Component
function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#c62676] focus:ring-offset-2 ${
        enabled ? 'bg-[#c62676]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

type SettingOption = "appTheme" | "notifications" | "autoplay" | "accountDeletion"

export default function SettingsPage() {
  const [selectedOption, setSelectedOption] = useState<SettingOption>("appTheme")
  const [selectedTheme, setSelectedTheme] = useState("Light Mode")

  // State for all notification settings
  const [notifications, setNotifications] = useState({
    email: {
      recommendedContent: true,
      newReleases: false,
      paymentIssues: false,
    },
    sms: {
      recommendedContent: true,
      newReleases: true,
      paymentIssues: true,
    },
    app: {
      recommendedContent: false,
      newReleases: true,
      paymentIssues: true,
    },
  })

  // Function to toggle a specific notification setting
  const toggleNotification = (category, setting) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }))
  }

  const renderRightPanel = () => {
    switch (selectedOption) {
      case "appTheme":
        return (
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-[#2c2c2c]">App Theme</h2>
            <div className="space-y-3">
              {["Light Mode", "Dark Mode", "System Defined"].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedTheme === theme
                      ? "bg-[#c62676] text-white"
                      : "bg-[#f2f2f2] text-[#2c2c2c] hover:bg-[#e5e5e5]"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        )
      case "notifications":
        return (
                            
              
                    
                    <div className="flex">
      {/* General Settings */}
      

      {/* Notifications Panel */}
      <div className="w-80 bg-[#ffffff] border-l border-[#e5e5e5] p-8">
        <h2 className="text-xl font-bold text-[#2c2c2c] mb-8">Notifications</h2>

        <div className="space-y-8">
          {/* Email Notifications */}
          <div>
            <h3 className="font-semibold text-[#2c2c2c] mb-4">Email</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Recommended Content</span>
                <ToggleSwitch 
                  enabled={notifications.email.recommendedContent}
                  onChange={() => toggleNotification('email', 'recommendedContent')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">New Releases</span>
                <ToggleSwitch 
                  enabled={notifications.email.newReleases}
                  onChange={() => toggleNotification('email', 'newReleases')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Payment Issues</span>
                <ToggleSwitch 
                  enabled={notifications.email.paymentIssues}
                  onChange={() => toggleNotification('email', 'paymentIssues')}
                />
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div>
            <h3 className="font-semibold text-[#2c2c2c] mb-4">SMS</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Recommended Content</span>
                <ToggleSwitch 
                  enabled={notifications.sms.recommendedContent}
                  onChange={() => toggleNotification('sms', 'recommendedContent')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">New Releases</span>
                <ToggleSwitch 
                  enabled={notifications.sms.newReleases}
                  onChange={() => toggleNotification('sms', 'newReleases')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Payment Issues</span>
                <ToggleSwitch 
                  enabled={notifications.sms.paymentIssues}
                  onChange={() => toggleNotification('sms', 'paymentIssues')}
                />
              </div>
            </div>
          </div>

          {/* App Notifications */}
          <div>
            <h3 className="font-semibold text-[#2c2c2c] mb-4">App</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Recommended Content</span>
                <ToggleSwitch 
                  enabled={notifications.app.recommendedContent}
                  onChange={() => toggleNotification('app', 'recommendedContent')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">New Releases</span>
                <ToggleSwitch 
                  enabled={notifications.app.newReleases}
                  onChange={() => toggleNotification('app', 'newReleases')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Payment Issues</span>
                <ToggleSwitch 
                  enabled={notifications.app.paymentIssues}
                  onChange={() => toggleNotification('app', 'paymentIssues')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
                 
           
        )
      case "autoplay":
        return (
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-[#2c2c2c]">Autoplay</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-[#c62676] text-white">Enabled</button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-[#f2f2f2] text-[#2c2c2c] hover:bg-[#e5e5e5]">
                Disabled
              </button>
            </div>
          </div>
        )
      case "accountDeletion":
        return (
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6 text-[#2c2c2c]">Account Deletion</h2>
            <div className="space-y-4">
              <p className="text-[#696969] text-sm">
                Deleting your account will permanently remove all your data and cannot be undone.
              </p>
              <button className="w-full px-4 py-3 rounded-lg bg-[#ec221f] text-white hover:bg-red-600 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen w-screen lg:w-[calc(95vw-256px)] bg-[#f2f2f2] pt-8">
      {/* Header */}
      

      <div className="flex">       

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* General Settings */}
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-semibold mb-6 text-[#2c2c2c]">General</h1>
              <div className="space-y-4">
                <button
                  onClick={() => setSelectedOption("appTheme")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                    selectedOption === "appTheme"
                      ? "bg-[#c62676] text-white"
                      : "bg-[#f2f2f2] text-[#2c2c2c] hover:bg-[#e5e5e5]"
                  }`}
                >
                  <div>
                    <div className="font-medium">App Theme</div>
                    <div className="text-sm opacity-75">Light Mode</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setSelectedOption("notifications")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                    selectedOption === "notifications"
                      ? "bg-[#c62676] text-white"
                      : "bg-[#f2f2f2] text-[#2c2c2c] hover:bg-[#e5e5e5]"
                  }`}
                >
                  <div>
                    <div className="font-medium">Notifications</div>
                    <div className="text-sm opacity-75">On</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setSelectedOption("autoplay")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                    selectedOption === "autoplay"
                      ? "bg-[#c62676] text-white"
                      : "bg-[#f2f2f2] text-[#2c2c2c] hover:bg-[#e5e5e5]"
                  }`}
                >
                  <div>
                    <div className="font-medium">Autoplay</div>
                    <div className="text-sm opacity-75">Enabled</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setSelectedOption("accountDeletion")}
                  className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
                    selectedOption === "accountDeletion"
                      ? "bg-[#c62676] text-white"
                      : "bg-[#f2f2f2] text-[#2c2c2c] hover:bg-[#e5e5e5]"
                  }`}
                >
                  <div>
                    <div className="font-medium">Account Deletion</div>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Panel */}
            {renderRightPanel()}
          </div>
        </div>
      </div>
    </div>
  )
}
