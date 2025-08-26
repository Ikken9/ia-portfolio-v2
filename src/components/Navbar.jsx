'use client'

import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-black text-white px-6 py-3 sticky top-0 z-50 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 text-lg font-bold">
                    🤖 Portfolio
                </div>

                {/* Links */}
                <div className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/showcase">Showcase</Link>
                    <Link href="/about">About</Link>
                </div>

                {/* Search & GitHub */}
                <div className="flex gap-4 items-center">
                    <Search className="text-black" />   {/* Search bar */}
                    <a
                        href="https://github.com/Ikken9/ia-portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-300 transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </nav>
    )
}
