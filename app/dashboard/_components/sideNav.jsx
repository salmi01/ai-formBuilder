import { Button } from '@/components/ui/button';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { db } from '@/configs';
import { JsonForms, Users } from '@/configs/schema';
import { desc, eq } from 'drizzle-orm';
import CreateForm from './createForm';

function SideNav() {

    const path = usePathname();

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
    )
}

export default SideNav