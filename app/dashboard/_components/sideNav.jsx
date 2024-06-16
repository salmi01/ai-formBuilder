import { Button } from '@/components/ui/button';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { desc, eq } from 'drizzle-orm';
import CreateForm from './createForm';

function SideNav() {

    const path = usePathname();
    console.log(path)

    const menuList = [
        {
            id: 1,
            name: 'My Forms',
            icon: LibraryBig,
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
    ]

    const { user } = useUser()
    const [userFormList, setUserFormList] = useState([])
    const [percentageFormsCreated, setPercentageFormsCreated] = useState(0)

    useEffect(() => {
        user && getUserFormList()
    }, [user])

    const getUserFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id))

        console.log(result)
        setUserFormList(result)
        setPercentageFormsCreated((result.length / process.env.NEXT_PUBLIC_NUMBER_OF_FREE_FORMS_ALLOWED) * 100)
    }

    return (
        <div className='h-screen shadow-md border bg-white'>
            <div className='p-5'>
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500 ${path === menu.path && 'bg-primary text-white'}   `}>
                        <menu.icon />
                        {menu.name}
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-6 w-64'>
                <CreateForm />
                <div className='my-7 flex flex-col gap-3 items-start'>
                    <Progress value={percentageFormsCreated} className='w-[70%]' />
                    <h2 className='  text-sm mt-2 text-gray-700'><strong>{userFormList?.length}</strong> Out of <strong>{process.env.NEXT_PUBLIC_NUMBER_OF_FREE_FORMS_ALLOWED}</strong> Created</h2>
                    <Link href={'/dashboard/upgrade'}> <h2 className='  text-sm mt-2 text-gray-700'>Upgrade your plan for unlimited Form build</h2></Link>
                </div>
            </div>


        </div>
    )
}

export default SideNav