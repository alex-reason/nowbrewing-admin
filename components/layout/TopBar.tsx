"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MdDehaze } from "react-icons/md";
import { SignedIn, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

import logo from '@/public/logo2.png'
import { navLinks } from '@/lib/constants';

const TopBar = () => {
    const pathname = usePathname();
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const containerClassName = 'flex items-center gap-2 text-[.8rem]';

    const linksMap = (
        navLinks.map((link) => (
            <Link href={link.url} key={link.label} className={`${containerClassName} ${pathname === link.url ? "text-blue-1" : ""}`}>
                {link.icon}
                <p>{link.label}</p>
            </Link>
        )))
    return (
        <div className='top-0 w-full h-12 fixed z-20 bg-lightblue-1 px-8 py-4 hidden max-lg:flex items-center justify-between shadow-xl'>

            <div className='pl-4'>
                <Image src={logo} alt='nowbrewing logo' width={40} className='mx-auto' />
            </div>
            <SignedIn>
                <div className='flex gap-8 max-md:hidden items-center'>
                    {linksMap}
                </div>

                <div className='flex gap-4 items-center'>
                    <div className={containerClassName}>
                        <MdDehaze className='text-[1.2rem] cursor-pointer md:hidden' onClick={() => setDropdownMenu(!dropdownMenu)} />
                        <UserButton />
                    </div>
                </div>

                {
                    dropdownMenu &&
                    <div className='absolute top-10 right-6 md:hidden flex flex-col gap-8  bg-white p-5 shadow-xl rounded-lg'>
                        {linksMap}
                    </div>
                }
            </SignedIn>
        </div>
    )
}

export default TopBar