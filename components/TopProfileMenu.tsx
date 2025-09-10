// import { IconButton } from "@mui/material";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { MdArrowForward, MdClose } from "react-icons/md";
// import { useState } from "react";
// import { useTheme } from "@/lib/context/ThemeContext";
// import { useAuth } from "@/lib/context/AuthContext";
// import { useRouter } from "next/navigation";
// import TabPillComponent from "./TabPills";

// interface TopProfileMenuProps {
//   closeProfileModal: () => void;
// }

// const TopProfileMenu = ({closeProfileModal}:TopProfileMenuProps) =>{
//     const { theme, setTheme } = useTheme();
//     const [showProfileModal, setShowProfileModal] = useState(false);
//     const [activeTab, setActiveTab] = useState<any>(theme==='dark' ? "dark" : "light");
//     const { isLoggedIn,logout } = useAuth();
//     const router=useRouter();
       
  
//       const onMenuClick = () =>{
//         isLoggedIn?
//           router.push('/profile')
//         :
//           router.push('/createAccount')
//         ;
//       }
  
//         const handleDrawerTabChange = (tab: any) => {
//           setActiveTab(tab); // Update the active tab state
//           // toggleDarkMode();
//           setTheme(tab)
//           console.log('Active Tab:', tab); // Emit the active tab (e.g., log or handle further)
//       };
    
//       const handleLogout = () => {
//         setShowProfileModal(false);
//         logout();
//         router.push('/');
//       };
    
//     return(
//         <div className=" absolute top-4 w-[350px] right-0 flex items-center justify-center z-50">
//           <div className="border-2 shadow-lg border-[#e5e5e5] dark:border-[#333333] bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-100 mx-4">
//             <div className="flex justify-end">
//                <button 
//                             onClick={closeProfileModal}
//                             className="rounded-full cursor-pointer p-1 hover:bg-gray-400 transition-colors"
//                           >
//                             <MdClose className="w-6 h-6 text-[#2C2C2C] dark:text-white" />
//                           </button>
//             </div>
//             <div onClick={()=>onMenuClick()} className="hover:bg-[#C62676]/20 cursor-pointer flex py-2 px-1 justify-between  items-center border-b border-[#e5e5e5] dark:border-[#333333] ">
//                   <Avatar  className="h-[35px] w-[35px] md:h-[55px] md:w-[55px] ml-2 md:ml-4 cursor-pointer">
//                     <AvatarImage src="/logos/user-profile-illustration.png" className="object-cover" />
//                     <AvatarFallback>U</AvatarFallback>
//                   </Avatar>
                 
//                     <IconButton className="hover:!bg-transparent" onClick={() => router.push("/account/profile")}>
//                         <p className="text-lg text-[#2C2C2C] dark:text-white">{isLoggedIn ? `My Profile`:`Create Account`}</p>
//                         <MdArrowForward className="text-[#2C2C2C] ml-1 dark:text-white"/>
//                     </IconButton>
//             </div>
//             <div className="hover:bg-[#C62676]/20 flex px-1 py-2 justify-between items-center ">
//                     <div className="flex justify-start items-center">
//                         <p className="text-lg text-[#2C2C2C2] dark:text-white">App Theme</p>
//                     </div>
//                     <div className="flex justify-end">
//                         <TabPillComponent tabs={['light', 'dark']} activeTab={activeTab}  onTabChange={handleDrawerTabChange}/>
//                     </div>
//             </div>
//             {isLoggedIn ? 
//             <div className="hover:bg-[#C62676]/20 cursor-pointer flex px-1 py-2 justify-between items-center border-b border-[#e5e5e5] dark:border-[#333333] ">
//                     <div className="flex justify-start items-center" onClick={isLoggedIn? ()=>handleLogout():undefined}>
                       
//                         <p className="text-lg text-[#2C2C2C] dark:text-white">Logout</p>
                       
//                     </div>
//                     <div className="flex justify-end">
//                              <IconButton className="hover:!bg-transparent">
//                                <MdArrowForward className="text-[#2C2C2C] ml-1 dark:text-white"/>
//                              </IconButton>
//                     </div>
//             </div>
//             :``
//             }
            
//           </div>
//         </div>
//     )
// }
// export default TopProfileMenu;
import { IconButton } from "@mui/material";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdArrowForward, MdClose, MdOutlineListAlt } from "react-icons/md";
import { useState } from "react";
import { useTheme } from "@/lib/context/ThemeContext";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import TabPillComponent from "./TabPills";
import { FaCircleChevronRight } from "react-icons/fa6";

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

      // Handle backdrop click (click outside modal)
      const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if the click is on the backdrop itself, not on modal content
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
                        <MdOutlineListAlt className="h-7 w-7  text-[#2C2C2C2] dark:text-white"/>
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