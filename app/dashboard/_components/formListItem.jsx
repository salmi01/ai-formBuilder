import { Button } from '@/components/ui/button'
import { Edit, Share, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useUser } from '@clerk/nextjs'
import { db } from '@/configs'
import { JsonForms } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import { toast } from 'sonner'
import { RWebShare } from 'react-web-share'



function FormListItem({ formRecord, jsonForm, refreshData }) {
    const { user } = useUser()

    const onDeleteForm = async () => {
        const result = await db.delete(JsonForms)
            .where(and(eq(JsonForms.id, formRecord?.id), eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)))

        if (result) {
            toast('The form is successfully deleted !')
            refreshData()
        }
    }

    return (
        <div className='border shadow-sm rounded-lg p-4 '>
            
            <h2 className='text-lg '><strong>  {jsonForm?.formTitle} </strong></h2>
            <p className='text-sm text-primary '>{jsonForm?.formHeading}</p>
            <hr className='my-4'></hr>
            <div className='flex justify-between'>
                <RWebShare
                    data={{
                        text: jsonForm?.formHeading,
                        url: process.env.NEXT_PUBLIC_BASE_URL + "/aiForm/" + formRecord?.id,
                        title: jsonForm?.formTitle,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button variant="outline" size="sm" className='flex gap-2' ><Share className='h-5 w-5' />Share</Button>
                </RWebShare>
                <Link href={'/edit-form/' + formRecord?.id}>
                    <Button size="sm" className='flex gap-2'><Edit className='h-5 w-5' />Edit</Button>
                </Link>
            </div>
        </div>
    )
}

export default FormListItem
