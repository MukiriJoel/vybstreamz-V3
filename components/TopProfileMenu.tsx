import { IconButton } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdArrowForward, MdClose } from "react-icons/md";
import { useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import TabPillComponent from "./TabPills";

interface TopProfileMenuProps {
  closeProfileModal: () => void;
}

const TopProfileMenu = ({closeProfileModal}:TopProfileMenuProps) =>{
    const { theme, setTheme } = useTheme();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [activeTab, setActiveTab] = useState<any>(theme==='dark' ? "dark" : "light");
     const { isLoggedIn,logout } = useAuth();
      const router=useRouter();
       
     
    
        const onMenuClick = () =>{
          isLoggedIn?
            router.push('/profile')
          :
            router.push('/createAccount')
          ;
        }
    
          const handleDrawerTabChange = (tab: any) => {
            setActiveTab(tab); // Update the active tab state
            // toggleDarkMode();
            setTheme(tab)
            console.log('Active Tab:', tab); // Emit the active tab (e.g., log or handle further)
        };
    
      const handleLogout = () => {
        setShowProfileModal(false);
        logout();
        router.push('/');
      };
    
    return(
        <div className=" absolute top-4 w-[350px] right-0 flex items-center justify-center z-50">
          <div className="border-2 shadow-lg border-[#e5e5e5] dark:border-[#333333] bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-100 mx-4">
            <div className="flex justify-end">
               <button 
                            onClick={closeProfileModal}
                            className="rounded-full cursor-pointer p-1 hover:bg-gray-400 transition-colors"
                          >
                            <MdClose className="w-6 h-6 text-[#2C2C2C] dark:text-white" />
                          </button>
            </div>
            <div onClick={()=>onMenuClick()} className="hover:bg-pink-300/20 cursor-pointer flex py-2 px-1 justify-between  items-center border-b border-[#e5e5e5] dark:border-[#333333] ">
                  <Avatar  className="h-[35px] w-[35px] md:h-[55px] md:w-[55px] ml-2 md:ml-4 cursor-pointer">
                    <AvatarImage src="/logos/user-profile-illustration.png" className="object-cover" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                 
                    <IconButton className="hover:!bg-transparent" onClick={() => router.push("/account/profile")}>
                        <p className="text-lg text-[#2C2C2C] dark:text-white">{isLoggedIn ? `My Profile`:`Create Account`}</p>
                        <MdArrowForward className="text-[#2C2C2C] ml-1 dark:text-white"/>
                    </IconButton>
            </div>
            <div className="hover:bg-pink-300/20 flex px-1 py-2 justify-between items-center ">
                    <div className="flex justify-start items-center">
                        <p className="text-lg text-[#2C2C2C2] dark:text-white">App Theme</p>
                    </div>
                    <div className="flex justify-end">
                        <TabPillComponent tabs={['light', 'dark']} activeTab={activeTab}  onTabChange={handleDrawerTabChange}/>
                    </div>
            </div>
            {isLoggedIn ? 
            <div className="hover:bg-pink-300/20 cursor-pointer flex px-1 py-2 justify-between items-center border-b border-[#e5e5e5] dark:border-[#333333] ">
                    <div className="flex justify-start items-center" onClick={isLoggedIn? ()=>handleLogout():undefined}>
                       
                        <p className="text-lg text-[#2C2C2C] dark:text-white">Logout</p>
                       
                    </div>
                    <div className="flex justify-end">
                             <IconButton className="hover:!bg-transparent">
                               <MdArrowForward className="text-[#2C2C2C] ml-1 dark:text-white"/>
                             </IconButton>
                    </div>
            </div>
            :``
            }
            
          </div>
        </div>
    )
}
export default TopProfileMenu;