"use client";
import { getStripe } from '@/lib/stripe-client';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

const SubscribeBtn = ({ userId, price }) => {


    const router = useRouter();

    const handleCheckout = async (priceId) => {
        if (!userId) {
            router.push('/sign-in');
            return
        }

        try {
            const { data } = await axios.post('/api/stripe/checkout-session', {
                priceId
            });
            

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