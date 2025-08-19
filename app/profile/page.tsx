import NavBar from "@/components/NavBar"
import Sidebar from "../parts/sidebar"
import ProfileContent from "../parts/profile-content"
import Footer from "@/components/Footer"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">

      <div className="flex pt-20 ">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <ProfileContent />
        </main>
      
      </div>
     
    </div>
  )
}
