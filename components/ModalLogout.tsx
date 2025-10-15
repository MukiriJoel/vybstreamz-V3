"use client "
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ModalLogout = ()=>{
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { logout } = useAuth();
    const router=useRouter();
    
  const handleLogoutClick = (e:any) => {
    e.preventDefault();
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    logout();
    router.push('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

    return(
        <div className="fixed inset-0 backdrop-blur bg-black/16 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-100 mx-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-pink-600 mb-4">
                You are about to log out !
              </h3>
              <p className="text-[#2C2C2C] dark:text-[#FFFFFF] mb-6">
                Are you sure you want to log out from VybStreamz? You will have to log back in to access your account
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleCancelLogout}
                  className="px-6 py-2 bg-gray-600 dark:bg-white text-white dark:text-[#2C2C2C] rounded-lg hover:bg-gray-700 transition-colors"
                >
                  No, Go back
                </button>
                <button
                  onClick={handleLogout}
                  className="px-10 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
    )
}

export default ModalLogout;