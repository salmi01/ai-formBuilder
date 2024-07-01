"use client"
import FormUi from '@/app/edit-form/_components/FormUi'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ClipboardIcon, ExternalLink, SquareArrowOutUpRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function AiFormPreview({ params }) {
  const [jsonForm, setJsonForm] = useState()
  const [record, setRecord] = useState([])
  const { user } = useUser()

  useEffect(() => {
    getFormData()
  }, [user])

  const getFormData = async () => {
    const result = await db.select().from(JsonForms)
      .where((eq(JsonForms.id, Number(params?.formId))))

    // Check if jsonform exists and is valid
    const jsonFormString = result[0]?.jsonform;
    if (!jsonFormString) {
      throw new Error("jsonform field is missing or empty.");
    }

    // Parse the JSON string
    const jsonFormData = JSON.parse(jsonFormString);
    setRecord(result[0])
    setJsonForm(jsonFormData)
  }

  return (
    <div className='flex flex-col gap-2' style={{ background: record?.background }}>

      <div className='flex justify-center  items-center p-4 sm:p-4 md:p-6 lg:p-8 xl:p-10' >
        {record?.style && <FormUi
          jsonForm={jsonForm}
          onFieldUpdate={() => console.log}
          deleteField={() => console.log}
          selectedStyle={JSON.parse(record?.style)}
          selectedTheme={record?.theme}
          editable={false}
          formId={record.id}
          enableSignIn={record?.enableSignIn}
        />
        }

      </div>
      <div className='flex items-center justify-center'>

        <Link href='/' className='flex gap-2 items-center bg-black text-white px-2 py-2 rounded-full mb-2  cursor-pointer w-fit' >

          <div className='flex gap-2 '><p  className='text-muted-foreground'> POWERED BY </p> 
          <span className="">FormAIze</span> <ClipboardIcon className="h-6 w-6" /></div>
        </Link>
      </div>
    </div>
  )
}

export default AiFormPreview