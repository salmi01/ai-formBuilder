'use client'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { ArrowLeft, Share2, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FormUi from '../_components/FormUi'
import { toast } from 'sonner'
import Controller from '../_components/controller'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { RWebShare } from 'react-web-share'
import { Share } from 'next/font/google'

function EditForm({ params }) {
    const router = useRouter()
    const { user } = useUser()
    const [jsonForm, setJsonForm] = useState()
    const [updateTrigger, setUpdateTrigger] = useState()
    const [record, setRecord] = useState([])
    const [selectedTheme, setSelectedTheme] = useState("light")
    const [selectedBackground, setSelectedBackground] = useState()
    const [selectedStyle, setSelectedStyle] = useState()

    useEffect(() => {
        user && getFormData()
    }, [user])


    const getFormData = async () => {
        const result = await db.select().from(JsonForms)
            .where(and(eq(JsonForms.id, params?.formId), eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress)))
        console.log(JSON.parse(result[0].jsonform))
        setRecord(result[0])
        setJsonForm(JSON.parse(result[0].jsonform))
        setSelectedTheme(result[0].theme)
        setSelectedBackground(result[0].background)
        setSelectedStyle(JSON.parse(result[0].style))

    }

    useEffect(() => {
        if (updateTrigger) {
            setJsonForm(jsonForm)
            updateJsonFormInDB()
        }
    }, [updateTrigger])

    const updateJsonFormInDB = async () => {
        const result = await db.update(JsonForms)
            .set({ jsonform: jsonForm }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress)))
        console.log(result)
        toast('Form updated')
    }

    const onFieldUpdate = (value, index) => {
        jsonForm.formFields[index].label = value.label
        jsonForm.formFields[index].placeholder = value.placeholder
        console.log(jsonForm)
        setUpdateTrigger(Date.now())
    }

    const deleteField = (indexToRemove) => {
        const result = jsonForm.formFields.filter((item, index) => index != indexToRemove);
        console.log(result)
        jsonForm.formFields = result;
        setUpdateTrigger(Date.now())
    }

    const updateControllerFields = async (value, columnName) => {
        const result = await db.update(JsonForms).set({
            [columnName]: value
        }).where(and(eq(JsonForms.id, record.id), eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress))).returning({ id: JsonForms.id })
        toast('Form updated')
    }

    return (
        <div className='p-10 '>
            <div className='flex justify-between items-center'>

                <h2 className='flex gap-2 items-center my-5 cursor-pointer hover:font-bold ' onClick={() => router.back()}>
                    <ArrowLeft /> Back
                </h2>
                <div className='flex gap-2'>
                    <Link href={'/aiForm/' + record?.id} target='_blank'>
                        <Button className='flex gap-2'> <SquareArrowOutUpRight /> Live Preview</Button>
                    </Link>
                    <RWebShare
                        data={{
                            text: jsonForm?.formHeading,
                            url: process.env.NEXT_PUBLIC_BASE_URL + "/aiForm/" + record?.id,
                            title: jsonForm?.formTitle,
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <Button className='flex gap-2 bg-green-500 hover:bg-green-600' > <Share2 /> Share</Button>

                    </RWebShare>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>

                <div className='border rounded-lg p-5  shadow-md'>
                    <Controller selectedTheme={(value) => {
                        setSelectedTheme(value)
                        updateControllerFields(value, 'theme')
                    }}
                        selectedBackgound={(value) => {
                            updateControllerFields(value, 'background')
                            setSelectedBackground(value)

                        }}

                        selectedStyle={(style) => {
                            updateControllerFields(JSON.stringify(style), 'style')
                            setSelectedStyle(style)
                        }}

                        setSignInBeforeSubmit={(value) => {
                            updateControllerFields(value, 'enableSignIn')
                        }}

                    />
                </div>
                <div className='md:col-span-2 border rounded-lg p-5  flex items-center justify-center' style={{ background: selectedBackground }}>
                    <FormUi jsonForm={jsonForm} selectedTheme={selectedTheme} selectedStyle={selectedStyle} onFieldUpdate={onFieldUpdate} deleteField={(index) => deleteField(index)} editable={true} />
                </div>
            </div>
        </div>
    )
}

export default EditForm