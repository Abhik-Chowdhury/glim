import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "GLIM",
  description: "video Calling app",
  icons:'/icons/logo.svg'
};
const HomeLayout = ( { children }: { children: ReactNode }) => {
  return (
   <main className='relative'>
    {/* navbar sction */}
    <Navbar/>

     <div className='flex'>
        {/* sidebar section */}
        <Sidebar/>

        <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
            {/* the children to render */}
            <div className='w-full'>
                {children}
            </div>
        </section>

     </div>
   </main>
  )
}

export default HomeLayout