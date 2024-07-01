import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import PricingPlans from '@/app/_data/pricingPlans'



const Pricing = React.forwardRef((props, ref) => {
    const [isYearly, setIsYearly] = useState(false)

    return (
        <div>

            <section className="w-full pb-12 md:pb-24 lg:pb-32">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 my-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Pricing</h2>
                            <p className="max-w-[900px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Choose the Plan that Fits Your Needs! 🎯
                            </p>
                        </div>
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
                                <Button className="w-full">
                                    <Link href='dashboard/upgrade'>
                                        Get started
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    )
})

Pricing.displayName = 'Pricing';

export default Pricing