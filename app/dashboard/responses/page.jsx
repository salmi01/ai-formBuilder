'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItemResponse from './_components/FormListItemResponse'

function Responses() {

    const { user } = useUser()
    const [userFormList, setUserFormList] = useState([])

    useEffect(() => {
        user && getUserFormList()
    }, [user])

    const getUserFormList = async () => {
        const result = await db.select().from(JsonForms)
            .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(JsonForms.id))

        console.log(result)
        setUserFormList(result)
    }

    return (
        <div className='p-10'>
            <h2 className='font-bold text-3xl flex items-center justify-between'>Responses</h2>
            <div className='mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {
                userFormList.map((form, index) => (
                    <FormListItemResponse key={index} jsonForm={JSON.parse(form?.jsonform)}
                        formRecord={form}
                    />
                ))
            }
        </div>
        </div>
    )
}

export default Responses