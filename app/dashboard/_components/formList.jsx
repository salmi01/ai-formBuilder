'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import FormListItem from './formListItem'

function FormList() {

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
        <div className='m-5 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full'>
            {
                userFormList.map((form, index) => (
                    <FormListItem key={index} jsonForm={JSON.parse(form?.jsonform)}
                        formRecord={form}
                        refreshData={getUserFormList}
                    />
                ))
            }
        </div>
    )
}

export default FormList