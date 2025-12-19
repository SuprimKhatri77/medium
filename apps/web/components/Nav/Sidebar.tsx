'use client'
import {
  BookText,
  ChartColumnBig,
  HomeIcon,
  Library,
  PlusIcon,
  User2,
  Users,
  X,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NavItems } from './nav-types'

type Props = {
  item: NavItems
}

type SidebarProps = {
  onClose: () => void
}

const NavItemLink = ({ item }: Props) => {
  const pathname = usePathname()

  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`)
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      aria-current={isActive ? 'page' : undefined}
      className="relative flex items-center gap-4 group"
    >
      {/* Active bar */}
      <span
        className={`absolute -left-6 w-1 h-full transition-colors ${
          isActive ? 'bg-black' : 'bg-transparent'
        }`}
      />

      <Icon
        className={`transition-colors ${
          isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
        }`}
      />

      <span
        className={`font-semibold transition-colors ${
          isActive ? 'text-black' : 'text-gray-500 group-hover:text-black'
        }`}
      >
        {item.label}
      </span>
    </Link>
  )
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const NAV_ITEMS = [
    {
      label: 'Home',
      href: '/',
      icon: HomeIcon,
    },
    {
      label: 'Library',
      href: '/library',
      icon: Library,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: User2,
    },
    {
      label: 'Stories',
      href: '/stories',
      icon: BookText,
    },
    {
      label: 'Stats',
      href: '/stats',
      icon: ChartColumnBig,
    },
  ]

  const NAV_2Items = [
    {
      label: 'Following',
      href: '/following',
      icon: Users,
    },
  ]

  return (
    <div className="absolute inset-0 z-9 bg-gray-950/10 h-screen flex">
      <div className="flex flex-col gap-8 w-60 h-screen px-6 py-2 bg-gray-50">
        <div className="flex flex-row gap-4 w-full items-center">
          <X
            onClick={onClose}
            className="text-gray-400 scale-90 hover:text-black"
          />
          <Image
            src="/medium-logo.svg"
            alt="medium-logo"
            width={120}
            height={50}
          />
        </div>
        <nav className="flex flex-col gap-5">
          {NAV_ITEMS.map((item) => (
            <NavItemLink key={item.href} item={item} />
          ))}
        </nav>
        <hr className="border-gray-200/60" />
        <div className="flex flex-col gap-6">
          {NAV_2Items.map((item) => (
            <NavItemLink key={item.href} item={item} />
          ))}
          <div className="flex flex-row gap-4">
            <PlusIcon width={40} className="text-gray-400" />
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm font-semibold">
                Find writers and publications to follow.
              </p>
              <Link
                href={'/suggestions'}
                className="text-gray-500 font-semibold text-sm hover:text-black underline"
              >
                See suggestions
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Sidebar
