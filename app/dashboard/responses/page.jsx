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

        <div>
            <div className="flex items-center justify-between mb-4">

                <h1 className="text-lg font-semibold md:text-2xl">Responses</h1>
            </div>
            <div
                className="flex items-center justify-center rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1"
            >
                <div className='m-5 grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full'>

                    {
                        userFormList.map((form, index) => (
                            <FormListItemResponse key={index} jsonForm={JSON.parse(form?.jsonform)}
                                formRecord={form}
                            />
                        ))
                    }
                </div>
            </div>
        </div>

    )
}

export default Responses