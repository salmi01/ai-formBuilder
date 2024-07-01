import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';

function Hero() {
    return (
        <div className='flex flex-col items-center justify-center leading-6 mt-[3rem]'>
            <h1 className="scroll-m-20 text-4xl sm:text-4xl md:text-6xl font-semibold tracking-tight lg:text-6xl text-center max-w-[1120px] bg-gradient-to-b ">
                Create Beautiful Forms in Seconds
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-xl text-center mt-2 ">
                <strong>FormAIze</strong> is an AI-powered tool for creating beautiful, responsive forms in seconds. Customize, share, and visualize responses all in one platform.
            </p>
            <div className="flex justify-center items-center gap-3">
                <Link href="/dashboard" className="mt-5">
                    <Button className="animate-buttonheartbeat rounded-xl text-sm font-semibold ">TRY IT FOR FREE ✨</Button>
                </Link>
            </div>
            <div>
                <div className="relative flex max-w-6xl justify-center overflow-hidden mt-7">
                    <div className="relative rounded-xl">
                        <img
                            src="/landing/edit-form.png"
                            alt="Hero Image"
                            className="block w-[1200px] rounded-[inherit] border object-contain shadow-lg dark:hidden"
                        />
                        <img
                            src="/landing/edit-form-dark.png"
                            alt="Hero Image"
                            className="dark:block w-[1200px] rounded-[inherit] border object-contain shadow-lg hidden"
                        />
                        <BorderBeam size={250} duration={12} delay={9} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero