"use client"
import { useRouter } from 'next/navigation'

interface NavbarItemProps {
  label: string;
  href: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, href }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <div 
      onClick={handleClick}
      className="text-white hover:text-[#2C2C2C] dark:text-[#FFFFFF]cursor-pointer transition"
    >
      {label}
    </div>
  )
}

export default NavbarItem