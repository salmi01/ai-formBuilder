import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQs() {
    return (
        <div className="flex flex-col w-[70%] lg:w-[50%]">
            <h1 className="scroll-m-20 pb-[3rem] text-center text-3xl font-semibold tracking-tight lg:text-4xl">
                Frequently Asked Questions (FAQs)
            </h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is Formaize? 🤔</AccordionTrigger>
                    <AccordionContent>
                        Formaize is an AI-powered platform that helps you create beautiful, responsive forms quickly and easily. You can customize, share, and analyze form responses all in one place.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How does Formaize work? 🔍</AccordionTrigger>
                    <AccordionContent>
                        Simply describe the form you need, customize it to match your brand, preview it, and share it with your audience. Our AI assists in designing a form that meets your requirements in just a few clicks.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Can I customize the forms? 🎨</AccordionTrigger>
                    <AccordionContent>
                        Absolutely! You can modify form fields, select from various themes, adjust backgrounds, and customize borders to align with your brand`&apos;`s style.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How can I share the forms? 🌐</AccordionTrigger>
                    <AccordionContent>
                        Once your form is ready, you can share it via a direct link, embed it on your website, or distribute it through email and social media.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is my data secure with Formaize? 🔒</AccordionTrigger>
                    <AccordionContent>
                        Yes, we prioritize data security. All data is encrypted and securely stored. We comply with industry standards to protect your information.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}