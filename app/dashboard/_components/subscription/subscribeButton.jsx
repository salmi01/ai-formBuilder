"use client";
import { getStripe } from '@/lib/stripe-client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const SubscribeBtn = ({ userId, price }) => {


    const router = useRouter();

    const handleCheckout = async (price) => {
        if (!userId) {
            router.push('/sign-in');
            return
        }

        try {
            const { sessionId } = await fetch('/api/stripe/checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price }),
            }).then((res) => res.json());

            console.log('sessionId:', sessionId);
            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });

        } catch (error) {
            console.error('Error:', error)
        }
    }


    return (
        <button
            onClick={() => handleCheckout(price)}
            className="mt-8 block rounded-full border border-indigo-600  px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        >
            Get Started
        </button>
    )
}

export default SubscribeBtn;