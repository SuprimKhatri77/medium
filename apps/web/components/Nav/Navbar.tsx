'use client'
import {
  ArrowUpRightIcon,
  Bell,
  Compass,
  HelpCircle,
  Menu,
  Search,
  Settings,
  SquarePen,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'

export function maskEmail(email?: string): string {
  if (!email || !email.includes('@')) return ''

  const [name, domain] = email.split('@')

  if (!name || !domain) return ''

  if (name.length <= 2) {
    return '*'.repeat(name.length) + '@' + domain
  }

  return `${name.slice(0, 2)}${'*'.repeat(name.length - 2)}@${domain}`
}

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const [isSearchActive, setSearchActive] = useState(false)
  const active = isSearchActive && search.length == 0
  const [islogButtonClicked, setLogButtonClicked] = useState(false)
  const email = 'bishal@gmail.com'

  const profileRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setLogButtonClicked(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

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
      <div className="relative py-2 flex flex-row justify-between">
        <div className="flex gap-5 px-5 items-center">
          {/* Menu */}
          <Menu
            onClick={() => {
              setMenuOpen((prev) => !prev)
            }}
            className="scale-90 text-gray-400 hover:text-black"
          />

          <AnimatePresence mode="wait">
            {isMenuOpen && <Sidebar onClose={() => setMenuOpen(false)} />}
          </AnimatePresence>

          {/* Logo */}
          <Link href={'/'}>
            <Image
              src="/medium-logo.svg"
              alt="medium-logo"
              width={120}
              height={50}
            />
          </Link>
          {/* search */}
          <div className="relative bg-gray-100 rounded-full gap-3 flex items-center px-2 py-2">
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
              <AnimatePresence mode="wait">
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
        </div>

        <div className="mr-5 flex items-center w-47 gap-8">
          {/* Write & notification login,logout */}
          <Link href={'/new-story'}>
            <div className="flex gap-2 items-center h-full group transition-all duration-200">
              <SquarePen
                strokeWidth={1.25}
                className="text-gray-500 group-hover:text-black"
              />
              <h1 className="text-gray-500 text-sm group-hover:text-black">
                Write
              </h1>
            </div>
          </Link>
          <div>
            <Link href={'/notification'}>
              <Bell className="text-gray-400 hover:text-black" />
            </Link>
          </div>
          <div
            role="button"
            tabIndex={0}
            aria-haspopup="menu"
            aria-expanded={islogButtonClicked}
            onClick={() => setLogButtonClicked((prev) => !prev)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setLogButtonClicked((prev) => !prev)
              }
            }}
            ref={profileRef}
            className="relative flex items-center justify-center w-8.5 h-8.5"
          >
            <span
              className={`absolute inset-0 rounded-full ${
                islogButtonClicked ? 'border border-black/60' : ''
              }`}
            />
            <Image src="/globe.svg" width={28} height={28} alt="user" />
            {islogButtonClicked && (
              <div className="absolute z-50 bg-white shadow-md w-59 top-10 right-0 h-110">
                <div className="flex p-5 gap-8 flex-col">
                  <div>
                    <Link href={'/profile'} className="group flex gap-5">
                      <Image
                        src="/globe.svg"
                        width={45}
                        height={45}
                        alt="user"
                      />
                      <div>
                        <div className="flex flex-col mt-2">
                          <h1 className="text-gray-500 group-hover:text-black text-sm font-semibold">
                            Bishal Kunwar
                          </h1>
                          <p className="text-gray-500 group-hover:text-black text-xs">
                            View profile
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <div className="flex flex-col gap-4">
                      <Link
                        href={'/settings'}
                        className="group flex items-end gap-4"
                      >
                        <Settings className="group-hover:text-black text-gray-500" />
                        <h1 className="text-gray-500 group-hover:text-black text-sm font-semibold">
                          Settings
                        </h1>
                      </Link>
                      <Link
                        href={'/help'}
                        className="group flex items-end gap-4"
                      >
                        <HelpCircle className="group-hover:text-black text-gray-500" />
                        <h1 className="text-gray-500 group-hover:text-black text-sm font-semibold">
                          Help
                        </h1>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex p-5 gap-3 flex-col">
                  <div>
                    <Link href={'/profile'} className="group flex gap-5">
                      <h1 className="text-gray-500 group-hover:text-black text-sm font-semibold">
                        Become a medium member✨
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <div className="flex flex-col gap-4">
                      <Link
                        href={'/partner'}
                        className="group flex items-end gap-4"
                      >
                        <h1 className="text-gray-500 group-hover:text-black text-sm font-semibold">
                          Apply to the Partner Program
                        </h1>
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="flex p-5 gap-3 flex-col">
                  <Link href={'/profile'} className="group flex gap-5">
                    <div>
                      <div className="flex flex-col mt-2">
                        <h1 className="text-gray-500 group-hover:text-black text-sm font-semibold">
                          Sign out
                        </h1>
                        <p className="text-gray-500 group-hover:text-black text-xs">
                          {maskEmail(email)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <hr />
                <div>
                  <div className="flex flex-wrap p-5 gap-1.5">
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        About
                      </span>
                    </Link>
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        Blog
                      </span>
                    </Link>
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        Careers
                      </span>
                    </Link>
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        Privacy
                      </span>
                    </Link>
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        Terms
                      </span>
                    </Link>
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        Text to speech
                      </span>
                    </Link>
                    <Link href={'#'} className="flex gap-5">
                      <span className="text-gray-500 hover:text-black text-xs">
                        more
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="w-full border-gray-100" />
    </>
  )
}

//bekjorjeio

export default Navbar
