'use client'
import React, { useState } from 'react'

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
import { JsonForms } from '@/configs/schema'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const PROMPT = ", Based on the description provided, please give a form in Json format, with formTitle, formHeading along with fieldName, fieldTitle, fieldType, placeholder, label, required fields in Json Format."

function CreateForm() {
    const [openDialog, setOpenDialog] = useState(false)
    const [userInput, setUserInput] = useState()
    const [loading, setLoading] = useState()
    const {user} = useUser()
    const route = useRouter()
    const onCreateForm = async () => {
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
            ).returning({id:JsonForms.id})
            console.log("New Form ID :", response[0].id)
            if (response[0].id) {
                route.push('/editFormStyle/'+response[0].id)
            }
            setLoading(false);
        }
    }

    return (
        <div>
            <Button onClick={() => setOpenDialog(true)}>+ Create a Form</Button>
            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new Form</DialogTitle>
                        <Textarea onChange={(event) => setUserInput(event.target.value)}  className='my-2'  placeholder="Type your Form description here." />
                        <div className='flex gap-2 my-3 justify-end'>
                            <Button variant="destructive" onClick = {() => setOpenDialog(false)}>
                                Cancel
                            </Button>
                            <Button onClick = { () => onCreateForm()} disabled = {loading} >
                            {loading ? <Loader2 className='animate-spin ' /> : 'Create'}  
                            </Button>
                        </div>
                        <DialogDescription>
                            
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default CreateForm