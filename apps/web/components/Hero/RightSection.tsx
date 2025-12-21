import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

function RightSection() {
  const StaffData = [
    {
      img: '',
      name: 'Bishal Kunwar Magar',
      baddage: '/badge.svg',
      description: 'Here Are My Favorite Books, Movies, and Music of 2026',
      uploadDate: '2d ago',
    },
    {
      img: '',
      name: 'Suprim Khatri',
      baddage: '',
      description:
        "I'm a Psychologist and let My Kids Have Screen Time:Here's Why the Research Might Suprise You",
      uploadDate: 'Dec 13',
    },
    {
      img: '',
      name: 'John Battelle',
      baddage: '',
      description: "You Can't Save the Web With Biz Dev Deals",
      uploadDate: '2d ago',
    },
  ]
  const [isCardClose, setCardClose] = useState(true)
  return (
    <div className="absolute w-88 border-l border-t-0 border-gray-100 right-0 bg-white h-screen p-6">
      <div className="flex flex-col gap-5">
        <h1 className="font-semibold text-gray-900 mt-3">Staff Picks</h1>
        <div className="flex flex-col gap-4">
          {StaffData.map((data) => (
            <div className="flex" key={data.name}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="border-[0.1px] border-gray-700 flex justify-center items-center rounded-full w-5 h-5">
                    {data.img ? (
                      <Image
                        src={data.img}
                        width={20}
                        height={20}
                        alt="staff"
                        className="items-center rounded-full"
                      />
                    ) : (
                      <h1 className="text-gray-600 font-semibold">
                        {data.name.charAt(0)}
                      </h1>
                    )}
                  </div>
                  <Link className="group" href={`/${data.name}`}>
                    <h1 className="group-hover:underline font-semibold text-gray-600 text-xs">
                      {data.name}
                    </h1>
                  </Link>
                  {data.baddage ? (
                    <Image
                      src={data.baddage}
                      width={10}
                      height={10}
                      alt="badge"
                    />
                  ) : (
                    ''
                  )}
                </div>
                <p className="tracking-tight font-bold">{data.description}</p>
                <span className="text-xs font-semibold text-gray-500">
                  {data.uploadDate}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Link className="group" href={'/@MediumStaff/list/staff-picks'}>
          <span className="group-hover:underline font-semibold text-gray-600 text-sm tracking-tight">
            See the full list
          </span>
        </Link>
        {isCardClose && (
          <div className="my-3">
            <div className="relative w-full h-auto bg-blue-200 rounded-sm p-5">
              <div className="absolute right-3 top-3">
                <X
                  size={15}
                  onClick={() => {
                    setCardClose((prev) => !prev)
                  }}
                  className="text-gray-500 hover:text-gray-700"
                />
              </div>
              <div className="flex flex-col justify-start gap-5">
                <h1 className="text-black tracking-tight font-bold">
                  Writing on Medium
                </h1>
                <div>
                  <p className="text-gray-600 text-md tracking-tighter font-bold">
                    Join Our Medium Writing 101 Webinar
                  </p>
                  <p className="text-gray-600 text-md tracking-tighter font-bold">
                    Read Medium tips & tricks
                  </p>
                  <p className="text-gray-600 text-md tracking-tighter font-bold">
                    Get practical Medium writing advice
                  </p>
                </div>
                <div>
                  <Link
                    className="bg-black text-sm tracking-tight mx-auto text-white py-2 px-4 rounded-full items-center"
                    href={'/new-story'}
                  >
                    Start writing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RightSection
