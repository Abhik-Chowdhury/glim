// because the usePathName state works for only cliet component
// adding the client directive 
'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    // for check the path is active or not
    // the functionn to grap the path using state of next js
    const pathName = usePathname();
    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
            {/* the side bar section */}
            <div className='flex flex-1 flex-col gap-6'>
                {/* the side bar option constants */}
                {sidebarLinks.map((link) => {
                    const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
                    return (
                        // Mapping the option if side bar and use the cn for className
                        // adding two parameter tailwind css on for normal layout style
                        // seconde one is for the conditional style
                        <Link
                         href={link.route}
                         key={link.label}
                         className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                            'bg-blue-1': isActive,
                         })}
                        >
                            <Image
                            src={link.imgUrl}
                            alt={link.label}
                            width={24}
                            height={24}
                            />

                            <p className='text-lg font-semibold max-lg:hidden'>
                                {link.label}
                            </p>

                        </Link>
                    )
                })}

            </div>
        </section>
    )
}

export default Sidebar