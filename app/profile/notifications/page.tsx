import Navbar from "../../parts/Navbar";
import Sidebar from "../../parts/sidebar"
import SettingsContent from "../../parts/settings-content"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar />
      <div className="flex pt-20 ">
        <Sidebar />
        <main className="flex-1">
          <SettingsContent />
        </main>
      </div>
    </div>
  )
}
