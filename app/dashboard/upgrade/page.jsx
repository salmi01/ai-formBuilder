'use client'
import PricingPlans from '@/app/_data/pricingPlans'
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import Link from 'next/link'
import { toast } from 'sonner'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function Upgrade() {
    const { user } = useUser()
    const [isYearly, setIsYearly] = useState(false)

    const handleCheckout = async (priceId) => {
        if (!user) {
            router.push('/sign-in');
            return
        }

        try {
            const { data } = await axios.post('/api/stripe/checkout-session', {
                priceId, email: user?.emailAddresses?.[0]?.emailAddress
            });

            if (data.sessionId) {
                const stripe = await stripePromise;

                const response = await stripe?.redirectToCheckout({
                    sessionId: data.sessionId,
                });


                return response
            } else {
                console.error('Failed to create checkout session');
                toast('Failed to create checkout session')
                return
            }

        } catch (error) {
            console.error('Error during checkout:', error);
            toast('Error during checkout')
            return
        }

    }



    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg font-semibold md:text-2xl">Pricing</h1>
            </div>

            <div className="flex justify-center py-12 md:py-16 lg:py-20">
                <div className='flex flex-col'>
                    <p className="max-w-[900px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Choose the plan that fits your needs.
                    </p>
                    <div className="flex items-center justify-center gap-4 m-4 ">
                        <Switch
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                            className="relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            <span className="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isYearly ? "translate-x-5 bg-primary" : "translate-x-0 bg-muted-foreground"
                                    }`}
                            />
                        </Switch>
                        <span className="text-sm font-medium">{isYearly ? "Yearly" : "Monthly"}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 md:max-w-2xl lg:max-w-4xl">
                        <Card className="flex flex-col items-center rounded-lg border bg-background p-6 text-center shadow-md">
                            <CardHeader>
                                <CardTitle>Free</CardTitle>
                                <CardDescription>Get started for free</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-6">
                                <div className="text-4xl font-bold">
                                    $0

                                </div>
                                <div className="space-y-2">
                                    <p>3 Form Generations</p>
                                    <p>Unlimited Users</p>
                                    <p>Basic Support</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">
                                    <Link href="/dashboard">Start for free </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="flex flex-col items-center rounded-lg border bg-background p-6 text-center shadow-md">
                            <CardHeader>
                                <CardTitle>Premium</CardTitle>
                                <CardDescription>Unlock more features</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-6">
                                <div className="text-4xl font-bold">
                                    ${isYearly ? PricingPlans.at(1).price : PricingPlans.at(0).price}
                                    <span className="text-sm font-normal text-muted-foreground">{isYearly ? "/year" : "/month"}</span>
                                </div>
                                <div className="space-y-2">
                                    <p>Unlimited Form Generations</p>
                                    <p>Unlimited Users</p>
                                    <p>Priority Support</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleCheckout(isYearly ? PricingPlans.at(1).apiId : PricingPlans.at(0).apiId)}>
                                    {/*<Link href={(isYearly ? PricingPlans.at(1).link : PricingPlans.at(0).link) + '?prefilled_email=' + user?.primaryEmailAddress.emailAddress} target='_blank'>
                                        Get started
                                    </Link>*/}
                                    Get started
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Upgrade