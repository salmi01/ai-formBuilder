import Link from 'next/link'
import React from 'react'

function Privacy() {
    return (
        <div className="container mx-auto max-w-3xl py-12 px-4 md:px-0">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Privacy Policy</h1>
                    <p className="mt-2 text-muted-foreground">Effective Date: June 29, 2024</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Information We Collect</h2>
                    <p className="mt-2">
                        At FormAIze, we collect only one type of user data: email addresses. We do not
                        collect any other personal information from our users.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                    <p className="mt-2">
                        We use the email addresses we collect solely for the purpose of providing our SaaS services to you. We will
                        never share, sell, or rent your email address to any third parties.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Data Security</h2>
                    <p className="mt-2">
                        We take the security of your data very seriously. We use industry- standard encryption and security measures
                        to protect your email address from unauthorized access or misuse.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Changes to this Policy</h2>
                    <p className="mt-2">
                        We may update this privacy policy from time to time. We will notify you of any changes by posting the new
                        policy on our website. Your continued use of our services after any such changes constitutes your acceptance
                        of the new policy.
                    </p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">Contact Us</h2>
                    <p className="mt-2">
                        If you have any questions or concerns about our privacy policy, please don&apos;t hesitate to contact us at{" "}
                        <Link href="#" className="text-primary" prefetch={false}>
                            support@formaize.com
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Privacy