'use client'
import React from 'react'
import CreateForm from './_components/createForm'
import FormList from './_components/formList'
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BarChartIcon, ClipboardIcon, CreditCardIcon, DollarSignIcon, FileIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import DashboardLayout from './layout'


function Dashboard() {
  {/* <div className='p-10 ' >
      <h2 className='font-bold text-3xl flex justify-between items-center'>
        Dashboard
        <CreateForm/>
      </h2>
      <FormList/>
    </div> */}

  const path = usePathname();

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
    {
      id: 3,
      name: 'Analytics',
      icon: BarChartIcon,
      path: '/dashboard/analytics'
    },
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
    }
  ]



  return (

    <div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Forms</h1>
        <CreateForm />
      </div>
      <div
        className="flex items-center justify-center rounded-lg border border-dashed shadow-sm "
        x-chunk="dashboard-02-chunk-1"
      >
        <FormList />


      </div>
    </div>
  )

}

export default Dashboard