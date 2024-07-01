import React from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'

const page = () => {
    return (
        <Alert variant="destructive">
            <AlertTitle>Payment Cancelled 😢</AlertTitle>
            <AlertDescription>
                The good news is, you can try again 😊 <Link href="/dashboard" className='underline'>Go to the dashboard</Link> to create more forms</AlertDescription>
        </Alert>
    )
}

export default page