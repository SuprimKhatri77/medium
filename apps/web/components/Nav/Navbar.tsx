'use client'
import { ArrowUpRightIcon, Compass, Menu, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const [isSearchActive, setSearchActive] = useState(false)
  const active = isSearchActive && search.length == 0

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchActive(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <div className="relative py-2 flex flex-row">
        <div className="flex gap-5 px-5 items-center">
          {/* Menu */}
          <Menu
            onClick={() => {
              setMenuOpen((prev) => !prev)
            }}
            className="scale-90 text-gray-400 hover:text-black"
          />

          <AnimatePresence>
            {isMenuOpen && <Sidebar onClose={() => setMenuOpen(false)} />}
          </AnimatePresence>

          {/* Logo */}
          <Image
            src="/medium-logo.svg"
            alt="medium-logo"
            width={120}
            height={50}
          />
        </div>

        {/* search */}
        <div className="relative bg-gray-100 rounded-full gap-3 flex items-center px-2">
          <div>
            <Search className="text-gray-400 scale-95" />
          </div>

          <div ref={searchRef} className="">
            <input
              type="text"
              onFocus={() => {
                setSearchActive(true)
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none outline-0 placeholder:text-sm placeholder:text-gray-600"
              placeholder="Search"
            />
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute group top-full -left-1 px-4 mt-2 py-5 w-80 rounded-sm border bg-white shadow-md p-3"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <Compass className="text-gray-500" />
                      <p className="text-sm font-semibold text-gray-600">
                        Explore topics
                      </p>
                    </div>
                    <ArrowUpRightIcon className="scale-95 text-gray-400 transition-all duration-200 group-hover:text-black" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div>{/* Write & notification */}</div>
        <div>{/* User login & logout icon */}</div>
      </div>
      <hr className="w-full border-gray-100" />
    </>
  )
}

//bekjorjeio

export default Navbar
