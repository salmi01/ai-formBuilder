import { Button } from '@/components/ui/button';
import { CreditCard, FileIcon, LibraryBig, LineChart, MessageSquare, Settings, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms, Users } from '@/configs/schema';
import { desc, eq } from 'drizzle-orm';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function SideNav() {

    const path = usePathname();

    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: FileIcon,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Responses',
            icon: MessageSquare,
            path: '/dashboard/responses'
        },
        {
            id: 3,
            name: 'Analytics',
            icon: LineChart,
            path: '/dashboard/analytics'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/upgrade'
        },
        {
            id: 5,
            name: 'Billing',
            icon: CreditCard,
            path: '/dashboard/billing'
        }
    ]

    const { user } = useUser()
    const [userFormList, setUserFormList] = useState([])
    const [formsCreated, setFormsCreated] = useState(0);
    const [percentageFormsCreated, setPercentageFormsCreated] = useState(0)

    useEffect(() => {
        user && getUserFormList()
    }, [user])

    const getUserFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id))

        const userRecord = await db.select().from(Users)
            .where(eq(Users.emailAddress, user?.primaryEmailAddress?.emailAddress));
        setFormsCreated(userRecord[0]?.formCount);

        setUserFormList(result)
        setPercentageFormsCreated((userRecord[0]?.formCount / process.env.NEXT_PUBLIC_NUMBER_OF_FREE_FORMS_ALLOWED) * 100)
    }

    return (
        /*
        <div className='h-screen shadow-md border '>
            <div className='p-5'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary rounded-lg cursor-pointer text-gray-500 ${path === menu.path && 'bg-primary text-white'}   `}>
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-6 w-64'>
                <div className='p-6 mb-4 text-left text-xs'>
                    <Progress value={percentageFormsCreated} className='w-full' />
                    <h2 className=' mt-2 text-gray-700'><strong>{userFormList?.length}</strong> Out of <strong>{process.env.NEXT_PUBLIC_NUMBER_OF_FREE_FORMS_ALLOWED}</strong> forms generated</h2>
                    <p>
                        <Link href={'/dashboard/upgrade'} className='underline'>Upgrade your plan </Link>
                        for unlimited forms
                    </p>
                </div>
            </div>
        </div>
        */
        <div className="hidden border-r  md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                    <Package2Icon className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <BellIcon className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                    >
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                    >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Orders
                        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        prefetch={false}
                    >
                        <PackageIcon className="h-4 w-4" />
                        Products{" "}
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                    >
                        <UsersIcon className="h-4 w-4" />
                        Customers
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                    >
                        <LineChartIcon className="h-4 w-4" />
                        Analytics
                    </Link>
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Card x-chunk="dashboard-02-chunk-0">
                    <CardHeader className="p-2 pt-0 md:p-4">
                        <CardTitle>Upgrade to Pro</CardTitle>
                        <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                        <Button size="sm" className="w-full">
                            Upgrade
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
    )


    function BellIcon(props) {
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
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
        )
    }
    
    
    function CircleUserIcon(props) {
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
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
            </svg>
        )
    }
    
    
    function HomeIcon(props) {
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
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        )
    }
    
    
    function LineChartIcon(props) {
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
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        )
    }
    
    
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
    
    
    function PackageIcon(props) {
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
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
            </svg>
        )
    }
    
    
    function SearchIcon(props) {
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        )
    }
    
    
    function ShoppingCartIcon(props) {
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
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
        )
    }
    
    
    function UsersIcon(props) {
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    }

}

export default SideNav