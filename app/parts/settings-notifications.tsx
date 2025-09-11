"use client"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import ToggleSwitch from "./toggle-switch"
// Toggle Switch Component
// function ToggleSwitch({ enabled, onChange }) {
//   return (
//     <button
//       onClick={onChange}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#c62676] focus:ring-offset-2 ${
//         enabled ? 'bg-[#c62676]' : 'bg-gray-300'
//       }`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white dark:bg-[#2C2C2C] transition-transform ${
//           enabled ? 'translate-x-6' : 'translate-x-1'
//         }`}
//       />
//     </button>
//   )
// }

export default function SettingsContent() {
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
  const toggleNotification = (category:any, setting:any) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [setting]: !(prev as any)[category][setting]
      }
    }))
  }

  return (
    <div className="flex">
      {/* General Settings */}
      

      {/* Notifications Panel */}
      <div className="w-80 bg-[#ffffff] border-l border-[#e5e5e5] dark:border-[#333333] p-8">
        <h2 className="text-xl font-bold text-[#2C2C2C] dark:text-[#FFFFFF] mb-8">Notifications</h2>

        <div className="space-y-8">
          {/* Email Notifications */}
          <div>
            <h3 className="font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">Email</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">Recommended Content</span>
                <ToggleSwitch 
                  enabled={notifications.email.recommendedContent}
                  onChange={() => toggleNotification('email', 'recommendedContent')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">New Releases</span>
                <ToggleSwitch 
                  enabled={notifications.email.newReleases}
                  onChange={() => toggleNotification('email', 'newReleases')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">Payment Issues</span>
                <ToggleSwitch 
                  enabled={notifications.email.paymentIssues}
                  onChange={() => toggleNotification('email', 'paymentIssues')}
                />
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div>
            <h3 className="font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">SMS</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">Recommended Content</span>
                <ToggleSwitch 
                  enabled={notifications.sms.recommendedContent}
                  onChange={() => toggleNotification('sms', 'recommendedContent')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">New Releases</span>
                <ToggleSwitch 
                  enabled={notifications.sms.newReleases}
                  onChange={() => toggleNotification('sms', 'newReleases')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">Payment Issues</span>
                <ToggleSwitch 
                  enabled={notifications.sms.paymentIssues}
                  onChange={() => toggleNotification('sms', 'paymentIssues')}
                />
              </div>
            </div>
          </div>

          {/* App Notifications */}
          <div>
            <h3 className="font-semibold text-[#2C2C2C] dark:text-[#FFFFFF] mb-4">App</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">Recommended Content</span>
                <ToggleSwitch 
                  enabled={notifications.app.recommendedContent}
                  onChange={() => toggleNotification('app', 'recommendedContent')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">New Releases</span>
                <ToggleSwitch 
                  enabled={notifications.app.newReleases}
                  onChange={() => toggleNotification('app', 'newReleases')}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2C2C2C] dark:text-[#FFFFFF]">Payment Issues</span>
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
}