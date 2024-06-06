import { Button } from '@/components/ui/button';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Progress } from "@/components/ui/progress"

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
    return (
        <div className='h-screen shadow-md border bg-white'>
            <div className='p-5'>
                {menuList.map((menu, index) => (
                    <h2 key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500 ${path === menu.path && 'bg-primary text-white'}   `}>
                        <menu.icon />
                        {menu.name}
                    </h2>
                ))}
            </div>
            <div className='fixed bottom-10 p-6 w-64'>
                <Button className='w-full'>+ Create a Form</Button>
                <div className='my-7 flex flex-col gap-3'>
                    <Progress value={33} />
                    <h2 className=' text-center text-sm mt-2 text-gray-700'><strong>2</strong> Out of <strong>3</strong> Created</h2>
                    <h2 className=' text-center text-sm mt-2 text-gray-700'>Upgrade your plan for unlimited Form build</h2>
                </div>
            </div>


        </div>
    )
}

export default SideNav