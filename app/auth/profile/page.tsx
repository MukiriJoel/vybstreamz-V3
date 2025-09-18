import NavBar from "@/components/NavBar"
import ProfileContent from "@/app/parts/profile-content"
import Sidebar from "@/app/parts/sidebar"
import Footer from "@/components/Footer"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] dark:bg-[#141414] w-full w-max-full overflow-x-hidden">

      <div className="flex">
        <Sidebar />
        <main className="flex-1 pt-20 lg:ml-64 pt-[150px] lg:pt-19.5 ">
          <ProfileContent />
        </main>
      
      </div>
     
    </div>
  )
}
