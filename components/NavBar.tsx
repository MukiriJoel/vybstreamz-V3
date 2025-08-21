"use client";

import { useState, useEffect } from "react";
import { ChevronRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import Image from "next/image";
import { MdOutlineNotifications, MdOutlineSearch, MdOutlineShoppingBag } from "react-icons/md";
import { IconButton } from "@mui/material";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      name: "videos",
      link: "/videos"
    },
    {
      name: "music",
      link: "/music"
    },
    {
      name: "games",
      link: "/games"
    },
    {
      name: "education",
      link: "/education"
    },
    {
      name: "podcasts",
      link: "/podcasts"
    },
    {
      name: "partners",
      link: "/partners"
    },
  ]

  // Dynamic background detection
  useEffect(() => {
    const detectBackground = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Check if we're in the music player section (adjust threshold as needed)
      const isInMusicPlayer = scrollY < viewportHeight - 150;
      
      // You can also check for specific routes that have dark backgrounds
      const isDarkRoute = pathname === '/music' || pathname === '/games' || pathname === '/videos' || pathname === '/podcasts' || pathname === '/education';
      
      setIsDarkBackground(isInMusicPlayer && isDarkRoute);
    };

    // Initial check
    detectBackground();
    
    // Listen for scroll events
    window.addEventListener('scroll', detectBackground);
    
    return () => window.removeEventListener('scroll', detectBackground);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Dynamic text colors based on background
  const textColor = isDarkBackground ? 'text-white' : 'text-gray-700';
  const hoverTextColor = isDarkBackground ? 'hover:text-gray-200' : 'hover:text-gray-900';
  const iconColor = isDarkBackground ? 'text-white' : 'text-[#000000]';
  const menuIconColor = isDarkBackground ? 'text-white' : 'text-[#000000]';

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isDarkBackground ? 'bg-transparent' : 'bg-[#F2F2F2]'
      }`}>
        <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 items-center">
          <div className="flex justify-between h-[100px]">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={"/"}>
                <Image 
                  src={"/logos/VybeStreams.png"} 
                  className="h-[26px] w-[157px] object-contain" 
                  alt={"logo"}
                  width={200} 
                  height={50}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-[12px]">
              {navItems.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.link} 
                  className={`${textColor} ${hoverTextColor} font-medium capitalize transition-colors duration-200 ${
                    pathname.includes(item.link) && "!text-[#C62676]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-2 md:space-x-4 gap-1 md:gap-3">
              {/* Mobile menu button - only visible on mobile */}
              <div className="md:hidden">
                <IconButton onClick={toggleMobileMenu}>
                  <Menu className={`h-[24px] w-[24px] ${menuIconColor} transition-colors duration-300`} />
                </IconButton>
              </div>

              {/* Search icon */}
              <IconButton>
                <MdOutlineSearch className={`h-[32px] w-[32px] md:h-[36px] md:w-[36px] ${iconColor} transition-colors duration-300`} />
              </IconButton>
              
              <IconButton>
                <MdOutlineShoppingBag className={`h-[32px] w-[32px] md:h-[36px] md:w-[36px] ${iconColor} transition-colors duration-300`} />
              </IconButton>

              <div className="relative">
                <IconButton>
                  <span className="absolute -top-[2px] -right-[2px] h-3 w-3 bg-red-500 rounded-full z-10"></span>
                  <MdOutlineNotifications className={`h-[32px] w-[32px] md:h-[36px] md:w-[36px] ${iconColor} transition-colors duration-300`} />
                </IconButton>
              </div>

              <Link href={"/profile"}>

                  <Avatar className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] ml-2 md:ml-4 cursor-pointer">
                    <AvatarImage src="/logos/user-profile-illustration.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed top-0 inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href={"/"} onClick={closeMobileMenu}>
            <Image 
              src={"/logos/VybeStreams.png"} 
              className="h-[26px] w-[157px] object-contain" 
              alt={"logo"}
              width={200} 
              height={50}
            />
          </Link>
          <IconButton onClick={closeMobileMenu}>
            <X className="h-[24px] w-[24px] text-[#000000]" />
          </IconButton>
        </div>

        {/* Mobile Navigation Links */}
        <div className="px-6 py-4">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              onClick={closeMobileMenu}
              className={`flex items-center justify-between py-4 font-medium capitalize text-lg border-b border-gray-100 last:border-b-0 transition-colors duration-200 ${
                pathname.includes(item.link) 
                  ? 'text-[#C62676]' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {item.name}
              <ChevronRight className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </>
  )
};

export default NavBar;