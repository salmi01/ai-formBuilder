'use client'
import React, { useEffect, useState } from 'react'
import ButtonCustomerPortal from '../_components/subscription/buttonCustomerPortal'
import { useUser } from '@clerk/nextjs'

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

        <div>

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold md:text-2xl">Subscription Details</h1>

            </div>
            <div
                className="flex items-center justify-center rounded-lg border border-dashed shadow-sm"
                x-chunk="dashboard-02-chunk-1"
            >
                <div className="m-5 w-full xl:w-3/4">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Subscription Status</span>
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                            {userPlan}
                        </div>
                    </div>
                    <p className="text-muted-foreground">You are currently on our {userPlan} plan.</p>

                </div>
            </div>
            <div className='flex items-center justify-center'>

                <ButtonCustomerPortal />
            </div>
        </div>


    )
}

export default Billing