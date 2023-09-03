import * as React from 'react';
import Link from 'next/link';

const navigation = [
    { name: 'Мероприятия', href: '/events' }
];

function Header() {
    return (
        <header className='bg-indigo-600'>
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div
                    className='w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none'>
                    <div className='flex items-center'>
                        <Link href='/' className='text-white font-medium font-mono'>
                            krd.dev
                        </Link>
                        <div className='hidden ml-10 space-x-8 lg:block'>
                            {navigation.map((link) => (
                                (<Link
                                    href={link.href}
                                    key={link.name}
                                    className='text-base font-medium text-white hover:text-indigo-50'>

                                    {link.name}

                                </Link>)
                            ))}
                        </div>
                    </div>
                    <div className='ml-10 space-x-4'>
                        <Link
                            href='/profile'
                            className='inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75'>
                            
                                Профиль
                            
                        </Link>
                    </div>
                </div>
                <div className='py-4 flex flex-wrap justify-center space-x-6 lg:hidden'>
                    {navigation.map((link) => (
                        (<Link
                            href={link.href}
                            key={link.name}
                            className='text-base font-medium text-white hover:text-indigo-50'>

                            {link.name}

                        </Link>)
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default Header;
