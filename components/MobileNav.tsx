'use client'
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    const pathName = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <div className='flex justify-end'>
                    <SheetTrigger className='relative ml-auto sm:mr-2'>
                        <Image
                            src="/icons/hamburger.svg"
                            alt="hamburger"
                            width={36}
                            height={36}
                            className='cursor-pointer sm:hidden'
                        />
                    </SheetTrigger>
                </div>

                <SheetContent side='left' className='border-none bg-dark-1'>
                    <div className='flex items-center gap-1'>
                        <Link href="/" className='flex items-center gap-1'>
                            <Image
                                src='/icons/logo.svg'
                                alt='Yoom logo'
                                width={36}
                                height={36}
                            />
                        </Link>
                        <p className='text-[26px] font-extrabold text-white'>Glim</p>

                    </div>

                    <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                        <SheetClose asChild>
                            <section className='flex  h-full flex-col gap-6 pt-16 text-white'>
                                {sidebarLinks.map((link) => {
                                    const isActive = pathName === link.route;
                                    return (
                                        // Mapping the option if side bar and use the cn for className
                                        // adding two parameter tailwind css on for normal layout style
                                        // seconde one is for the conditional style

                                        <SheetClose asChild key={link.route}>
                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                    'bg-blue-1': isActive,
                                                })}
                                            >
                                                <Image
                                                    src={link.imgUrl}
                                                    alt={link.label}
                                                    width={20}
                                                    height={20}
                                                />

                                                <p className='font-semibold'>
                                                    {link.label}
                                                </p>

                                            </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav