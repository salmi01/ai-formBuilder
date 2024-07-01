'use client'
import React, { useRef, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import emailjs from "@emailjs/browser";



function Contact() {

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setError(false);
        setSuccess(false);

        emailjs
            .sendForm(
                process.env.NEXT_PUBLIC_SERVICE_ID,
                process.env.NEXT_PUBLIC_TEMPLATE_ID,
                form.current,
                process.env.NEXT_PUBLIC_PUBLIC_KEY
            )
            .then(
                () => {
                    setSuccess(true);
                    form.current.reset();
                },
                () => {
                    setError(true);
                }
            );
    };

    return (
        <div>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container grid gap-12 px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in Touch</h1>
                            <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                Have a question about our services or need support? Fill out the form below and we`&apos;`ll get back to you as soon as
                                possible.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto w-full max-w-md space-y-4">
                        <form className="grid gap-4" onSubmit={sendEmail}
                            ref={form}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter your name" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" name="user_email" placeholder="Enter your email" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea id="message" name="user_message" placeholder="Enter your message" className="min-h-[120px]" />
                            </div>
                            <Button type="submit">Submit</Button>
                            {success && (
                                <span className="text-green-600 font-semibold">
                                    Your message has been sent successfully!
                                </span>
                            )}
                            {error && (
                                <span className="text-red-600 font-semibold">
                                    Something went wrong!
                                </span>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact