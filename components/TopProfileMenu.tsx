import { IconButton } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdArrowForward, MdClose, MdOutlineListAlt } from "react-icons/md";
import { useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import TabPillComponent from "./TabPills";
import { FaCircleChevronRight } from "react-icons/fa6";
import { LogOut } from "lucide-react";

interface TopProfileMenuProps {
  closeProfileModal: () => void;
}

const TopProfileMenu = ({closeProfileModal}: TopProfileMenuProps) => {
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<any>(theme === 'dark' ? "dark" : "light");
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
       
    const onMenuClick = () => {
        if (isLoggedIn) {
            router.push('/profile');
        } else {
            router.push('/createAccount');
        }
        closeProfileModal(); // Close the profile menu after navigation
    }

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        setShowLogoutModal(true);
    };

    const handleDrawerTabChange = (tab: any) => {
        setActiveTab(tab);
        setTheme(tab);
        console.log('Active Tab:', tab);
    };
    
    const handleLogout = async () => {
        try {
            // Close all modals first
            setShowLogoutModal(false);
            closeProfileModal();
            
            // Call logout function
            await logout();
            
            // Navigate to homepage
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
            // Still navigate to homepage even if logout fails
            router.push('/');
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    // Handle backdrop click (click outside modal)
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeProfileModal();
        }
    };

    // Handle modal content click to prevent event bubbling
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };
    
    return(
        // Add backdrop with click handler
        <div 
          className="fixed inset-0 z-50 flex items-start justify-end pt-4 pr-4"
          onClick={handleBackdropClick}
        >
          <div 
            className="border-2 shadow-lg border-[#e5e5e5] dark:border-[#333333] bg-white dark:bg-[#2C2C2C] rounded-lg p-4 w-[350px]"
            onClick={handleModalClick}
          >
            {/* <div className="flex justify-end">
               <button 
                            onClick={closeProfileModal}
                            className="rounded-full cursor-pointer p-1 hover:bg-gray-400 transition-colors"
                          >
                            <MdClose className="w-6 h-6 text-[#2C2C2C] dark:text-white" />
                          </button>
            </div> */}
            <div onClick={()=>onMenuClick()} className="hover:bg-[#C62676]/20 cursor-pointer flex py-2 px-0 justify-between  items-center">
                 <div className="flex justify-start">
                  <Avatar  className="h-[35px] w-[35px] md:h-[65px] md:w-[65px] cursor-pointer">
                    <AvatarImage src="/logos/user-profile-illustration.png" className="object-cover" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="block items-center pt-3 pl-3 ">
                          <p className="!text-2xl !font-extrabold text-[#2C2C2C] dark:text-white leading-[100%]">{isLoggedIn ? `My Profile`:`Create Account`}</p>
                          <p className="!text-xs mt-2 !font-light text-[#2C2C2C] uppercase dark:text-white leading-[100%]">{isLoggedIn ? `Onunga`:``}</p>
                  </div>
                 </div>
                 
                 
                    <IconButton className="hover:!bg-transparent !pr-0" onClick={() => router.push("/account/profile")}>
                        {/* <p className="text-lg text-[#2C2C2C] dark:text-white">{isLoggedIn ? `My Profile`:`Create Account`}</p> */}
                      
                        <FaCircleChevronRight className="w-8 h-8 text-[#2C2C2C] dark:text-[#FFFFFF]" /> 
                    </IconButton>
            </div>
            <div className="hover:bg-[#C62676]/20 flex gap-2 px-1 py-3 justify-between items-center ">
                    <div className="flex justify-start items-center">
                        <p className="text-xs leading-[120%] text-[#2C2C2C2] dark:text-white">Switch App Theme</p>
                    </div>
                    <div className="flex justify-end">
                        <TabPillComponent tabs={['light', 'dark']} activeTab={activeTab}  onTabChange={handleDrawerTabChange}/>
                    </div>
            </div>
            
           
            {isLoggedIn ? 
            <div>
               <div className="hover:bg-[#C62676]/20 cursor-pointer flex gap-2 px-1 py-3 justify-between items-center border-t border-[#e5e5e5] dark:border-[#333333]" onClick={()=>router.push('/profile?tab=My Favorites')}>
                    <div className="flex justify-start items-center">
                      <MdOutlineListAlt className="h-7 w-7  text-[#2C2C2C2] dark:text-white"/>
                        <p className="text-xs leading-[120%] text-[#2C2C2C2] dark:text-white ml-3">My Favorites</p>
                    </div>
                    <div className="flex justify-end">
                      
                    </div>
              </div>
              <div className="hover:bg-[#C62676]/20 cursor-pointer flex px-1 py-3 justify-between items-center border-t border-[#e5e5e5] dark:border-[#333333]" onClick={isLoggedIn? ()=>handleLogout():undefined}>
                    <div className="flex justify-start items-center">
                        <LogOut className="h-7 w-7  text-[#2C2C2C2] dark:text-white"/>
                        <p className="text-xs leading-[120%] text-[#2C2C2C2] dark:text-white ml-3">Logout</p>
                       
                    </div>
                    <div className="flex justify-end">
                             <IconButton className="hover:!bg-transparent">
                           
                             </IconButton>
                    </div>
              </div>
            </div>
           
            :``
            }
            
          </div>
        </div>
    )
}

export default TopProfileMenu;