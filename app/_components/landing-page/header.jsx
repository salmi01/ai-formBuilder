"use client"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { ClipboardIcon, LayoutDashboard, User2Icon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from 'react'

function Header({ scrollToPricing, scrollToFeatures, scrollToFAQs }) {
    const { user, isSignedIn } = useUser();
    const path = usePathname()



    return (
        <header className="bg-background px-4 py-6 sm:px-6 lg:px-8">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <ClipboardIcon className="h-6 w-6" />
                    <span className="text-xl font-bold">FormAIze</span>
                </Link>
                <nav className="hidden space-x-4 md:flex">
                    <Link href="#" onClick={scrollToFeatures} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Features
                    </Link>
                    <Link href="" onClick={scrollToPricing} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Pricing
                    </Link>
                    <Link href="#" onClick={scrollToFAQs} className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        FAQs
                    </Link>
                    <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                        Contact
                    </Link>
                </nav>
                {
                    isSignedIn ? <div className="flex items-center gap-2">
                        <Link href={'/dashboard'}>
                            <LayoutDashboard />
                        </Link>
                        <ThemeToggle />


                    </div> : <div className="flex items-center gap-2"> <SignInButton>
                        <Button variant="outline">Get Started</Button>
                    </SignInButton>
                        <ThemeToggle />
                    </div>

                }
            </div>
        </header>
    )
}

export default Header