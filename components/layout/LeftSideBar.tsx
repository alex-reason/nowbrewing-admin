"use client"
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import { navLinks } from '@/lib/constants'
import logo from '@/public/logo2.png'

const LeftSideBar = () => {
    const containerClassName = 'flex items-center gap-4 text-body-medium';
    const pathname = usePathname();

    return (
        <div className='h-screen left-0 sticky top-0 p-10 flex flex-col gap-16 bg-lightblue-1 shadow-xl max-lg:hidden'>
            <Image src={logo} alt='nowbrewing logo' width={80} className='mx-auto' />

            <div className='flex flex-col gap-12'>
                {navLinks.map((link) => (
                   <Link href={link.url} key={link.label} className={`${containerClassName} ${pathname === link.url ? "text-blue-1" : ""}`}>
                        <div className='w-[28px]'>{link.icon} </div>
                        <p>{link.label}</p>
                    </Link>
                ))}
            </div>
            <div className={containerClassName}>
                <UserButton />
                <p>Edit Profile</p>
            </div>
        </div>
    )
}

export default LeftSideBar