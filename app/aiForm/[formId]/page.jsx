"use client"
import FormUi from '@/app/edit-form/_components/FormUi'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ExternalLink, SquareArrowOutUpRightIcon } from 'lucide-react'
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
    <div className='flex justify-center p-10 items-center' style={{ background: record?.background }}>
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
      <Link href='/' className='flex gap-2 items-center bg-black text-white px-2 py-1 rounded-full fixed bottom-4 left-2 cursor-pointer'>

        <div className='flex gap-2'>Build your own Forms with AI</div><ExternalLink />
      </Link>
    </div>
  )
}

export default AiFormPreview