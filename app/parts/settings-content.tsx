"use client"
import { ChevronRight } from "lucide-react"
import ToggleSwitch from "../parts/toggle-switch"

export default function SettingsContent() {
  return (
    <div className="flex">
      {/* General Settings */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#2c2c2c] mb-8">General</h1>

        <div className="space-y-6">
          {/* App Theme */}
          <div className="flex items-center justify-between py-4 border-b border-[#e5e5e5]">
            <div>
              <h3 className="font-medium text-[#2c2c2c]">App Theme</h3>
              <p className="text-[#808080] text-sm">Light Mode</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#808080]" />
          </div>

          {/* Notifications */}
          <div className="bg-[#c62676] rounded-lg p-4 text-[#ffffff]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm opacity-90">On</p>
              </div>
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          {/* Video Quality */}
          <div className="flex items-center justify-between py-4 border-b border-[#e5e5e5]">
            <div>
              <h3 className="font-medium text-[#2c2c2c]">Video Quality</h3>
              <p className="text-[#808080] text-sm">High Quality</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#808080]" />
          </div>

          {/* Autoplay */}
          <div className="flex items-center justify-between py-4 border-b border-[#e5e5e5]">
            <div>
              <h3 className="font-medium text-[#2c2c2c]">Autoplay</h3>
              <p className="text-[#808080] text-sm">Enabled</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#808080]" />
          </div>

          {/* Account Deletion */}
          <div className="flex items-center justify-between py-4">
            <div>
              <h3 className="font-medium text-[#2c2c2c]">Account Deletion</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-[#808080]" />
          </div>
        </div>
      </div>

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
                <ToggleSwitch enabled={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">New Releases</span>
                <ToggleSwitch enabled={false} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Payment Issues</span>
                <ToggleSwitch enabled={false} />
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div>
            <h3 className="font-semibold text-[#2c2c2c] mb-4">SMS</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Recommended Content</span>
                <ToggleSwitch enabled={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">New Releases</span>
                <ToggleSwitch enabled={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Payment Issues</span>
                <ToggleSwitch enabled={true} />
              </div>
            </div>
          </div>

          {/* App Notifications */}
          <div>
            <h3 className="font-semibold text-[#2c2c2c] mb-4">App</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Recommended Content</span>
                <ToggleSwitch enabled={false} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">New Releases</span>
                <ToggleSwitch enabled={true} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#2c2c2c]">Payment Issues</span>
                <ToggleSwitch enabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
