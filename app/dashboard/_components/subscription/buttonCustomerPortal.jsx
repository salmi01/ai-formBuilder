'use client';

import { Button } from "@/components/ui/button";
import { SignIn, useUser } from "@clerk/nextjs";
import Link from "next/link";


// Customer portal link
const customerPortalLink =
    'https://billing.stripe.com/p/login/test_fZe3eF4IC7hgfhS7ss';

const ButtonCustomerPortal = () => {
    const { user } = useUser()

    if (user) {
        return (
            <Button>
                <Link
                    href={
                        customerPortalLink +
                        '?prefilled_email=' +
                        user.primaryEmailAddress.emailAddress
                    } target='_blank'
                >
                    Manage Subscription
                </Link>
            </Button>
        );
    }

    return (
        <SignIn path="/sign-in" />
    );
};

export default ButtonCustomerPortal;