import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'


const Navbar = () => {
  return (
    <nav className='flex items-center justify-between fixed z-50 w-full bg-dark-1 py-4 lg:px-10'>
      <div className='flex items-center gap-1'>
        <Link href="/" className='flex items-center'>
          <Image
            src='/icons/logo.svg'
            alt='Yoom logo'
            width={32}
            height={32}
          />
        </Link>
        <p className='text-[26px] font-extrabold text-white max-sm:hiddren'>Glim</p>

      </div>

      <div className='flex items-center gap-5 ml-auto'>
        {/* clerk  use mangement*/}
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar