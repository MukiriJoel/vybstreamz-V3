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

    // Handle logout modal backdrop click
    const handleLogoutBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setShowLogoutModal(false);
        }
    };
    
    return (
        <>
            {/* Profile Menu Modal */}
            <div 
                className="fixed inset-0 z-50 flex items-start justify-end pt-4 pr-4"
                onClick={handleBackdropClick}
            >
                <div 
                    className="border-2 shadow-lg border-[#e5e5e5] dark:border-[#333333] bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-[350px]"
                    onClick={handleModalClick}
                >
                    {/* Profile Section */}
                    <div 
                        onClick={onMenuClick} 
                        className="hover:bg-[#C62676]/20 cursor-pointer flex py-2 px-1 justify-between items-center border-b border-[#e5e5e5] dark:border-[#333333]"
                    >
                        <Avatar className="h-[35px] w-[35px] md:h-[55px] md:w-[55px] ml-2 md:ml-4 cursor-pointer">
                            <AvatarImage src="/logos/user-profile-illustration.png" className="object-cover" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex items-center">
                            <p className="text-lg text-[#2C2C2C] dark:text-white">
                                {isLoggedIn ? 'My Profile' : 'Create Account'}
                            </p>
                            <MdArrowForward className="text-[#2C2C2C] ml-1 dark:text-white"/>
                        </div>
                    </div>

                    {/* Theme Section */}
                    <div className="hover:bg-[#C62676]/20 flex gap-2 px-1 py-2 justify-between items-center">
                        <div className="flex justify-start items-center">
                            <p className="text-lg text-[#2C2C2C] dark:text-white">App Theme</p>
                        </div>
                        <div className="flex justify-end">
                            <TabPillComponent 
                                tabs={['light', 'dark']} 
                                activeTab={activeTab}  
                                onTabChange={handleDrawerTabChange}
                            />
                        </div>
                    </div>

                    {/* Logout Section - Only show if logged in */}
                    {isLoggedIn && (
                        <div 
                            className="hover:bg-[#C62676]/20 cursor-pointer flex px-1 py-2 justify-between items-center border-t border-[#e5e5e5] dark:border-[#333333]"
                            onClick={handleLogoutClick}
                        >
                            <div className="flex justify-start items-center">
                                <p className="text-lg text-[#2C2C2C] dark:text-white">Logout</p>
                            </div>
                            <div className="flex justify-end">
                                <IconButton className="hover:!bg-transparent">
                                    <MdArrowForward className="text-[#2C2C2C] ml-1 dark:text-white"/>
                                </IconButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div 
                    className="fixed inset-0 backdrop-blur bg-black/50 flex items-center justify-center z-[60]"
                    onClick={handleLogoutBackdropClick}
                >
                    <div 
                        className="bg-white dark:bg-[#2C2C2C] rounded-lg p-6 w-96 mx-4 border-2 border-[#e5e5e5] dark:border-[#333333] shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-pink-600 mb-4">
                                You are about to log out!
                            </h3>
                            <p className="text-[#2C2C2C] dark:text-[#FFFFFF] mb-6">
                                Are you sure you want to log out from Vybz Streams? You will have to log back in to access your account.
                            </p>
                            
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleCancelLogout}
                                    className="px-6 py-2 bg-gray-600 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                                >
                                    No, Go back
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TopProfileMenu;