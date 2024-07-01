import { Button } from '@/components/ui/button'
import { db } from '@/configs'
import { UserResponses } from '@/configs/schema'
import { count, eq, sql } from 'drizzle-orm'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx'


function FormListItemResponse({ jsonForm, formRecord }) {

    const [loading, setLoading] = useState(false)
    const [responsesNumber, setResponsesNumber] = useState(0)

    useEffect(() => {
        countResponsesNumber()
    }, [])

    const countResponsesNumber = async () => {
        const result = await db.select({
            count: count()
        })
            .from(UserResponses)
            .where(eq(UserResponses.formRef, formRecord?.id))

        console.log(result[0].count)
        setResponsesNumber(result[0].count)
    }

    const exportData = async () => {
        let jsonData = []
        setLoading(true)
        const result = await db.select().from(UserResponses)
            .where(eq(UserResponses.formRef, formRecord?.id))
        if (result) {
            result.forEach((item) => {
                const jsonItem = JSON.parse(item.jsonResponse)
                jsonData.push(jsonItem)
            })
            setLoading(false)
        }
        exportToExcel(jsonData)
    }

    /** 
     * Convert Json to Excel then download it
     */
    const exportToExcel = (jsonData) => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")
        XLSX.writeFile(workbook, "DataSheet.xlsx")
    }


    return (
        <div className='border shadow-sm rounded-lg p-4 '>
            <h2 className='text-lg '> <strong>  {jsonForm?.formTitle} </strong></h2>
            <p className='text-sm text-primary'>{jsonForm?.formHeading}</p>
            <hr className='my-4'></hr>
            <div className='flex justify-between items-center'>
                <h2 className='text-sm'><strong>{responsesNumber}</strong> responses</h2>
                <Button disabled={loading} size="sm" onClick={() => exportData()}>{loading ? <Loader className='animate-spin' /> : 'Export'}</Button>
            </div>
        </div>
    )
}

export default FormListItemResponse