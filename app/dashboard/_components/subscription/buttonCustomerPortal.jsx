'use client';

import { Button } from "@/components/ui/button";
import { SignIn, useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


// Customer portal link
const customerPortalLink =
    'https://billing.stripe.com/p/login/test_fZe3eF4IC7hgfhS7ss';

const ButtonCustomerPortal = () => {
    const { user } = useUser()
    const router = useRouter()

    const redirectToCustomerPortal = async (user) => {
        try {
            const {data} = await axios.post('/api/stripe/customer-portal', {
                user: user,
            });

            router.push(data.url);
        } catch (error) {
            console.error('Error redirecting to customer portal:', error);
        }
    }

    if (user) {
        return (
            <Button className='m-5 ' onClick={()=> redirectToCustomerPortal(user)}>
                {/*<Link
                    href={
                        customerPortalLink +
                        '?prefilled_email=' +
                        user.primaryEmailAddress.emailAddress
                    } target='_blank'
                >
                    Manage Subscription
                </Link>*/}
                Manage Subscription
            </Button>
        );
    }

    return (
        <SignIn path="/sign-in" />
    );
};

export default ButtonCustomerPortal;