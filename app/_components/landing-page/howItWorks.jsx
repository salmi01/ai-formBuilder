
import { ClipboardIcon, EyeIcon, FilePenIcon, PaletteIcon } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';


function HowItWorks() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 ">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Create Beautiful Forms in Simple Steps! 🌟</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Effortless Form Creation Tailored to Your Needs, Just a Click Away 🚀
                        </p>
                    </div>
                </div>
                <div className="mx-auto  grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 lg:gap-12">
                    {/*
                    
                    <Image
                        src="/landing/prompt.png"
                        height={260}
                        width={630}
                        alt="Step 1"
                        className="rounded-xl sm:w-full dark:hidden"
                    />

                    <Image
                        src="/landing/prompt-dark.png"
                        height={260}
                        width={630}
                        alt="Step 1"
                        className="rounded-xl sm:w-full hidden dark:block"
                    />
                    */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Create a new Form 📑</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Textarea className='min-h-28' placeholder="📝 Describe your form here! Explain its purpose and the information you need to collect. Let AI take care of the rest! 🤖" />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline">Cancel</Button>
                            <Button ><Link href="/dashboard"> Create </Link></Button>
                        </CardFooter>
                    </Card>
                    <div className=" flex flex-col justify-center space-y-4 ">
                        <div className="grid gap-1">
                            <h3 className=" flex gap-2 text-xl font-bold items-center justify-center"><FilePenIcon className="h-5 w-5  " />Describe your form </h3>
                            <p className="text-muted-foreground text-center">Easily input the details and fields you need for your form.</p>
                        </div>
                    </div>

                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="order-last lg:order-first flex flex-col justify-center space-y-4">
                        <div className="grid gap-1">
                            <h3 className="flex gap-2 text-xl font-bold items-center justify-center"><PaletteIcon className="h-5 w-5 " /> Customize your form</h3>
                            <p className="text-muted-foreground text-center">
                                Modify form fields, choose from various themes, adjust the background, and customize the borders to match your brand.
                            </p>
                        </div>
                    </div>
                    <Image
                        src="/landing/style.png"
                        height={620}
                        width={450}
                        alt="Step 1"
                        className="rounded-xl sm:w-full dark:hidden"
                    />

                    <Image
                        src="/landing/style-dark.png"
                        height={620}
                        width={450}
                        alt="Step 1"
                        className="rounded-xl sm:w-full hidden dark:block"
                    />
                    <Image
                        src="/landing/form-edit.png"
                        height={620}
                        width={450}
                        alt="Step 1"
                        className="rounded-xl sm:w-full dark:hidden"
                    />
                    <Image
                        src="/landing/form-edit-dark.png"
                        height={620}
                        width={450}
                        alt="Step 1"
                        className="rounded-xl sm:w-full hidden dark:block"
                    />
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <Image
                        src="/landing/form-preview.png"
                        height={900}
                        width={900}
                        alt="Step 1"
                        className="rounded-xl sm:w-full lg:col-span-2"
                    />


                    <div className="flex flex-col justify-center space-y-4 lg:col-span-1">
                        <div className="grid gap-1">
                            <h3 className="flex gap-2 text-xl font-bold items-center justify-center"><EyeIcon className="h-5 w-5" /> Preview & share</h3>
                            <p className="text-muted-foreground text-center">
                                See a live preview of your form and then share it with your audience.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="order-last lg:order-first flex flex-col justify-center space-y-4 lg:col-span-1">
                        <div className="grid gap-1">
                            <h3 className="flex gap-2 text-xl font-bold items-center justify-center"><ClipboardIcon className="h-5 w-5" /> Visualize responses</h3>
                            <p className="text-muted-foreground text-center">
                                Analyze the collected form responses through visual dashboards and reports.
                            </p>
                        </div>
                    </div>
                    <Image
                        src="/landing/responses.png"
                        height={520}
                        width={1100}
                        alt="Step 4"
                        className=" dark:hidden lg:col-span-2 rounded-xl sm:w-full"
                    />
                    {/*<Image
                        src="/landing/responses-sm.png"
                        height={580}
                        width={350}
                        alt="Step 4"
                        className=" block sm:hidden dark:hidden rounded-xl sm:w-full"
                    />*/}
                    <Image
                        src="/landing/responses-dark.png"
                        height={520}
                        width={1100}
                        alt="Step 4"
                        className="hidden dark:block lg:col-span-2 rounded-xl sm:w-full"
                    />
                    {/*
                    <Image
                        src="/landing/responses-sm-dark.png"
                        height={580}
                        width={350}
                        alt="Step 4"
                        className=" hidden sm:block dark:block lg:hidden rounded-xl sm:w-full"
                    />*/}
                </div>
            </div>
        </section>
    )

}

export default HowItWorks;