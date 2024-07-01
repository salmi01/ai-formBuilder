"use client"
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BadgeHelp, ClipboardIcon, CreditCardIcon, DollarSignIcon, FileIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme-toggle'


function DashboardLayout({ children }) {


    const path = usePathname();

    const { user } = useUser()
    const [userPlan, setUserPlan] = useState('Free');
    const userEmail = user?.primaryEmailAddress.emailAddress;

    useEffect(() => {
        const fetchUserPlan = async () => {
            const response = await fetch('/api/userPlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserPlan(data.plan);
            }
        };

        if (userEmail) {
            fetchUserPlan();
        }
    }, [userEmail]);

    const menuList = [
        {
            id: 1,
            name: 'Forms',
            icon: FileIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Responses',
            icon: ClipboardIcon,
            path: '/dashboard/responses'
        },
        /*      {
                  id: 3,
                  name: 'Analytics',
                  icon: BarChartIcon,
                  path: '/dashboard/analytics'
              },*/
        {
            id: 4,
            name: 'Pricing',
            icon: DollarSignIcon,
            path: '/dashboard/upgrade'
        },
        {
            id: 5,
            name: 'Billing',
            icon: CreditCardIcon,
            path: '/dashboard/billing'
        },
        {
            id: 6,
            name: 'Support',
            icon: BadgeHelp,
            path: '/dashboard/support'
        }
    ]

    return (
        <SignedIn>
            < div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" >
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/dashboard" className="flex items-center gap-2 font-semibold" prefetch={false}>
                                <ClipboardIcon className="h-6 w-6" />
                                <span className="">FormAIze</span>
                            </Link>
                            <ThemeToggle />


                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">

                                {menuList.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.path}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2  transition-all hover:text-primary ${path === item.path ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
                                        prefetch={false}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                        {/*item.name === 'Responses' && (<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>)*/}
                                    </Link>
                                ))}

                            </nav>
                        </div>
                        {userPlan === 'Free' && (
                            <div className="mt-auto p-4">


                                <Card x-chunk="dashboard-02-chunk-0">
                                    <CardHeader className="p-2 pt-0 md:p-4">
                                        <CardDescription className=' text-center'> Upgrade your plan for unlimited forms</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                        <Button size="sm" className="w-full">
                                            <Link href="/dashboard/upgrade" prefetch={false}>
                                                Upgrade
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                    <MenuIcon className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                                        <Package2Icon className="h-6 w-6" />
                                        <span className="sr-only">FormAIze</span>
                                    </Link>
                                    {menuList.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.path}
                                            className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground ${path === item.path ? 'bg-muted  text-primary' : 'text-muted-foreground'}`}
                                            prefetch={false}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                            {/*item.name === 'Responses' && (<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>)*/}
                                        </Link>
                                    ))}
                                </nav>
                                {userPlan === 'Free' && (
                                    <div className="mt-auto">
                                        <Card>
                                            <CardHeader>
                                                <CardDescription className='text-center'>Upgrade your plan for unlimited forms</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <Button size="sm" className="w-full">
                                                    <Link href="/dashboard/upgrade" prefetch={false}>
                                                        Upgrade
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>
                        <UserButton />
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SignedIn>
    )


    function MenuIcon(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
        )
    }


    function Package2Icon(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
                <path d="M12 3v6" />
            </svg>
        )
    }



}



export default DashboardLayout