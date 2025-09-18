import { IconButton } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdArrowForward, MdClose, MdOutlineListAlt, MdStarOutline } from "react-icons/md";
import { useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import TabPillComponent from "./TabPills";
import { FaCircleChevronRight } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { logoutUser } from "@/store/thunks/authThunks";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

interface TopProfileMenuProps {
  closeProfileModal: () => void;
}

const TopProfileMenu = ({closeProfileModal}: TopProfileMenuProps) => {
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState<any>(theme === 'dark' ? "dark" : "light");
    const { isLoggedIn, logout } = useAuth();
    const router = useRouter();
    const dispatch=useAppDispatch();
    const [loading, setLoading] = useState(false)
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const {user,isAuthenticated,activeProfile}=useAppSelector((state)=>state.auth);
       
console.log("isauth",isAuthenticated)
    const onMenuClick = () => {
        if (isAuthenticated) {
            router.push('/auth/profile');
        } else {
            router.push('/auth/createAccount');
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
            setLoading(true);
            const res = await dispatch(logoutUser({login_session_id: user?.login_session_id})).unwrap()
            toast.success(res?.message);
            closeProfileModal();         
            // Navigate to homepage
            router.push('/');
        } catch (error) {
            toast.warning("Could not log you out");
            console.error('Logout error:', error);
            // // Still navigate to homepage even if logout fails
            // router.push('/');
        }finally {
            setLoading(false)
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
                  <Avatar  className="h-[65px] w-[65px] md:h-[65px] md:w-[65px] cursor-pointer">
                    <AvatarImage src="/logos/user-profile-illustration.png" className="object-cover" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="block items-center pt-3 pl-3 ">
                          <p className="!text-2xl !font-extrabold text-[#2C2C2C] dark:text-white leading-[100%]">{isAuthenticated ? `My Profile`:`Create Account`}</p>
                          <p className="!text-xs mt-2 !font-light text-[#2C2C2C] uppercase dark:text-white leading-[100%]">{isAuthenticated ? user?.profiles[0]?.name:``}</p>
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
            
           
            {isAuthenticated ? 
            <div>
               <div className="hover:bg-[#C62676]/20 cursor-pointer flex gap-2 px-1 py-3 justify-between items-center border-t border-[#e5e5e5] dark:border-[#333333]" onClick={()=>router.push('/auth/profile?tab=My Favorites')}>
                    <div className="flex justify-start items-center">
                      <MdStarOutline className="h-7 w-7  text-[#2C2C2C2] dark:text-white"/>
                        <p className="text-xs leading-[120%] text-[#2C2C2C2] dark:text-white ml-3">My Favorites</p>
                    </div>
                    <div className="flex justify-end">
                      
                    </div>
              </div>
               <div className="hover:bg-[#C62676]/20 cursor-pointer flex gap-2 px-1 py-3 justify-between items-center border-t border-[#e5e5e5] dark:border-[#333333]" onClick={()=>router.push('/auth/profile?tab=Subscriptions')}>
                    <div className="flex justify-start items-center">
                      <MdOutlineListAlt className="h-7 w-7  text-[#2C2C2C2] dark:text-white"/>
                        <p className="text-xs leading-[120%] text-[#2C2C2C2] dark:text-white ml-3">Subscriptions</p>
                    </div>
                    <div className="flex justify-end">
                      
                    </div>
              </div>
              <div className="hover:bg-[#C62676]/20 cursor-pointer flex px-1 py-3 justify-between items-center border-t border-[#e5e5e5] dark:border-[#333333]" onClick={isAuthenticated? ()=>handleLogout():undefined}>
                    <div className="flex justify-start items-center">
                        <LogOut className="h-7 w-7  text-[#2C2C2C2] dark:text-white"/>
                        <p className="text-xs leading-[120%] text-[#2C2C2C2] dark:text-white ml-3">Logout</p>
                       
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

// function dispatch(arg0: any) {
//     throw new Error("Function not implemented.");
// }
