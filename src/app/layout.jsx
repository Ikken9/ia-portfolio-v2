import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { ThemeProvider } from 'next-themes'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Fira_Code } from "next/font/google"
import Image from 'next/image';
import './globals.css'
import Link from 'next/link'

const firaCode = Fira_Code({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: 'ML Portfolio | Introduction to Machine Learning',
    description: 'My journey through Introduction to Machine Learning - projects, exercises, and notes',
    keywords: 'machine learning, portfolio, projects, exercises, notes',
    author: 'Piero Saucedo',
    icons: {
        icon: '/favicon.ico'
    },
}

export const viewport = {
    width: "device-width",
    initialScale: 1,
}

const navbar = (
    <Navbar
        logo={
            <div className="flex items-center gap-2">
                <b>Portfolio</b>
            </div>
        }
        projectLink="https://github.com/Ikken9/ia-portfolio"
        gitTimestamp
        children={
            <Link href="/docs">
                <button className="px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white">
                    Docs
                </button>
            </Link>}
    />
)

const buildYear = new Date().getFullYear()

const footer = (
    <Footer>
        <div className="flex justify-between items-center w-full">
            <div className="text-gray-100/20">
                Copyright ©{buildYear} Piero Saucedo. All rights reserved.
            </div>

            <div className="flex gap-4 mt-2 sm:mt-0">
                <a
                    href="https://github.com/Ikken9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                >
                    <Image
                        src="/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                        className="icon-img filter invert brightness-0"
                        aria-label="GitHub"
                    />
                </a>
                <a
                    href="https://linkedin.com/in/piero-saucedo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    aria-label="LinkedIn"
                >
                    <Image
                        src="/linkedin.svg"
                        alt="LinkedIn"
                        width={20}
                        height={20}
                        className="icon-img filter invert brightness-0"
                    />
                </a>
            </div>
        </div>
    </Footer>
)

export default async function RootLayout({ children }) {
    return (
        <html lang="en" dir="ltr" suppressHydrationWarning>
        <Head />
        <body suppressHydrationWarning>
        <ThemeProvider forcedTheme="dark" attribute="class">
            <Layout
                navbar={navbar}
                pageMap={await getPageMap()}
                docsRepositoryBase="https://github.com/Ikken9/ia-portfolio/tree/main/docs"
                footer={footer}
                editLink={
                    <a href="https://github.com/Ikken9/ia-portfolio">
                        View this page on GitHub
                    </a>
                }
                darkMode={false}
            >
                {children}
            </Layout>
        </ThemeProvider>
        </body>
        </html>
    )
}