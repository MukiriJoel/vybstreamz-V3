import Navbar from "../../parts/Navbar"
import Sidebar from "../../parts/sidebar"
import HelpCenter from "../../parts/help-center"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar />
      <div className="flex pt-25">
        <Sidebar />
        <HelpCenter />
      </div>
    </div>
  )
}
