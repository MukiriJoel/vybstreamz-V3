"use client"

import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  onClick?: () => void
  isActive?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm ${className || ''}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 text-[#49454f] dark:text-gray-400 mx-1" />}
          {item.isActive ? (
            <span className="text-[#333333] dark:text-white font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="text-[#49454f] dark:text-gray-400 hover:text-[#c62676] dark:hover:text-[#c62676] transition-colors duration-200 hover:underline cursor-pointer bg-transparent border-none p-0 font-inherit"
            >
              {item.label}
            </button>
          )}
        </div>
      ))}
    </nav>
  )
}