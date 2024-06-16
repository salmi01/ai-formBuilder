import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import themes from '@/app/_data/themes'
import gradients from '@/app/_data/gradientBg'
import { Button } from '@/components/ui/button'
import Styles from '@/app/_data/styles'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'


function Controller({ selectedTheme, selectedBackgound, selectedStyle, setSignInBeforeSubmit }) {
    const [showMore, setShowMore] = useState(false)
    return (
        <div>
            {/*Theme selection controller  */}
            <h2 className='my-1'>Themes</h2>
            <Select onValueChange={(value) => selectedTheme(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Themes" />
                </SelectTrigger>
                <SelectContent>
                    {themes.map((theme, index) =>
                        <SelectItem value={theme.theme} key={index}>
                            <div className='flex gap-3'>

                                <div className='flex'>
                                    <div className='w-5 h-5 rounded-l-md' style={{ backgroundColor: theme.primary }}></div>
                                    <div className='w-5 h-5' style={{ backgroundColor: theme.secondary }}></div>
                                    <div className='w-5 h-5' style={{ backgroundColor: theme.accent }}></div>
                                    <div className='w-5 h-5 rounded-r-md' style={{ backgroundColor: theme.neutral }}></div>
                                </div>
                                {theme.theme}
                            </div>
                        </SelectItem>

                    )}
                </SelectContent>
            </Select>
            {/*Background selection controller  */}
            <h2 className='mt-8 mb-1'>Background</h2>
            <div className='grid grid-cols-3 gap-5'>

                {gradients.map((bg, index) => (index < 6 &&
                    <div key={index} onClick={() => selectedBackgound(bg.gradient)} className='w-full h-[70px] rounded flex items-center justify-center cursor-pointer hover:border-2 hover:border-black' style={{ background: bg.gradient }}>
                        {index == 0 && 'None'}
                    </div>
                ))}

                {showMore && gradients.map((bg, index) => (index >= 6 &&
                    <div key={index} onClick={() => selectedBackgound(bg.gradient)} className='w-full h-[70px] rounded flex items-center justify-center cursor-pointer hover:border-2 hover:border-black' style={{ background: bg.gradient }}>
                        {index == 0 && 'None'}
                    </div>
                ))}

            </div>

            <Button variant="ghost" size="sm" className='w-full my-5' onClick={() => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show more'}</Button>


            {/*Style selection controller  */}
            <div>
                <h2>Style</h2>
                <div className='grid grid-cols-3 gap-3'>
                    {Styles.map((style, index) => (
                        <div key={index}>
                            <div className='cursor-pointer hover:border-2 rounded-lg' onClick={() => selectedStyle(style)}>
                                <Image src={style.img} alt='' width={600} height={80} className='rounded-lg' />
                            </div>
                            <h2 className='text-center'>{style.name}</h2>
                        </div>
                    ))}
                </div>

            </div>

            {/** 
             * Enable Authentication before submitting the form
            */}

            <div className='flex gap-2 items-center my-4 mt-10 '>
                <Checkbox onCheckedChange={(e) => setSignInBeforeSubmit(e)} />
                <h2 className='text-sm'>Enable Authentication bofore submitting the form</h2>
            </div>
        </div>
    )
}

export default Controller