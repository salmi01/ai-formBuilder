import { Button } from '@/components/ui/button'
import React from 'react'
import CreateForm from './_components/createForm'

function Dashboard() {
  return (
    <div className='p-10 ' >
      <h2 className='font-bold text-3xl flex justify-between items-center'>
        Dashboard
        <CreateForm/>
      </h2>
    </div>
  )
}

export default Dashboard