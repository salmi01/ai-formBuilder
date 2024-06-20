'use client'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AichatSession } from '@/configs/AiModel'
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms, Users } from '@/configs/schema'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { eq } from 'drizzle-orm'
import { toast } from 'sonner'
import Link from 'next/link'

const PROMPT = ", Based on the description provided, please give a form in Json format, with formTitle, formHeading along with formFields, each formField contains fieldName, fieldTitle, fieldType, placeholder, label, required fields in Json Format, if the fieldType is select, add a field called options, options is an array of option (String). if the fieldType is checkbox or radio and had options, each option contains a value and a label. you have to respect all this requirements."

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false)
    const [userInput, setUserInput] = useState()
    const [loading, setLoading] = useState()
    const [formCount, setFormCount] = useState(0);
    const { user } = useUser()
    const route = useRouter()

    useEffect(() => {
        const fetchFormCount = async () => {
            const userRecord = await db.select().from(Users)
                .where(eq(Users.emailAddress, user?.primaryEmailAddress?.emailAddress));
            setFormCount(userRecord[0]?.formCount || 0);
        };

        user && fetchFormCount();
    }, [user]);


    const onCreateForm = async () => {
        if (formCount >= process.env.NEXT_PUBLIC_NUMBER_OF_FREE_FORMS_ALLOWED) {
            toast('You have reached your free limit. Upgrade your plan to create more forms.');
            route.push('/dashboard/upgrade')
            return
        }


        setLoading(true)
        const result = await AichatSession.sendMessage("Description : " + userInput + PROMPT)
        console.log(result.response.text());
        if (result.response.text()) {
            const response = await db.insert(JsonForms).values(
                {
                    jsonform: result.response.text(),
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD/MM/yyyy')
                }
            ).returning({ id: JsonForms.id })

            await db.update(Users)
                .set({ formCount: formCount + 1 })
                .where(eq(Users.emailAddress, user?.primaryEmailAddress?.emailAddress));

            console.log("New Form ID :", response[0].id)
            if (response[0].id) {
                route.push('/edit-form/' + response[0].id)
            }
            setLoading(false);
        }
    }

    return (
        <div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <Button onClick={() => setOpenDialog(true)} >+ Create a Form</Button>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='mb-2'>Create a new Form 📑</DialogTitle>
                        <Textarea onChange={(event) => setUserInput(event.target.value)} className='my-2' placeholder="📝 Describe your form here! Explain its purpose and the information you need to collect. Let AI take care of the rest! 🤖" />
                        <div className='flex my-2 justify-end'>
                            <Button className='mt-2' onClick={() => onCreateForm()} disabled={loading} >
                                {loading ? <Loader2 className='animate-spin ' /> : 'Create'}
                            </Button>
                        </div>
                        {formCount >= process.env.NEXT_PUBLIC_NUMBER_OF_FREE_FORMS_ALLOWED && (
                            <DialogDescription>
                                <Link href='/dashboard/upgrade' className='underline' >
                                    You have reached your free limit. Upgrade your plan to create more forms.
                                </Link>
                            </DialogDescription>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm