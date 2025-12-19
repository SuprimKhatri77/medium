'use client'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative py-2">
      <div className="flex gap-5 px-5 items-center">
        {/* Menu */}
        {!isMenuOpen ? (
          <Menu
            onClick={() => {
              setMenuOpen(!isMenuOpen)
            }}
            className="scale-90 text-gray-400 hover:text-black"
          />
        ) : (
          <Sidebar onClose={() => setMenuOpen(!isMenuOpen)} />
        )}
        {/* Logo */}
        <Image
          src="/medium-logo.svg"
          alt="medium-logo"
          width={120}
          height={50}
        />
      </div>
      <div>{/* search */}</div>
      <div>{/* Write & notification */}</div>
      <div>{/* User login & logout icon */}</div>
    </div>
  )
}

export default Navbar
