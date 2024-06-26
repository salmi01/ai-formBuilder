'use client'
import { db } from '@/configs'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ButtonCustomerPortal from '../_components/subscription/buttonCustomerPortal'
import { useUser } from '@clerk/nextjs'
import { Users } from '@/configs/schema'

const Billing = () => {

    const { user } = useUser()
    const [userPlan, setUserPlan] = useState('Free');
    const userEmail = user?.primaryEmailAddress.emailAddress;

    useEffect(() => {
        const fetchUserPlan = async () => {
            const response = await fetch('/api/userPlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail }),
            });

            if (response.ok) {
                const data = await response.json();
                setUserPlan(data.plan);
            }
        };

        if (userEmail) {
            fetchUserPlan();
        }
    }, [userEmail]);

    return (

        <div className='p-10 ' >
            <h2 className='font-bold text-3xl flex justify-between items-center'>
                Subscription Details
                <ButtonCustomerPortal />
            </h2>
            <p className='mb-1'>You currently are on a {userPlan} plan</p>

        </div>
    )
}

export default Billing