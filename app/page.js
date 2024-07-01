'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/landing-page/hero";
import { useUser } from "@clerk/nextjs";
import { addUserIfNotExists } from "@/configs";
import { useEffect, useRef } from "react";
import Header from "./_components/landing-page/header";
import HowItWorks from "./_components/landing-page/howItWorks";
import Pricing from "./_components/landing-page/pricing";
import Footer from "./_components/landing-page/footer";
import CustomerReview from "./_components/landing-page/customers-review";
import FAQs from "./_components/landing-page/FAQ";

export default function Home() {
  const pricingRef = useRef(null);
  const featuresRef = useRef(null);
  const FAQsRef = useRef(null);
  const { user } = useUser()

  useEffect(() => {
    if (user) {
      addUserIfNotExists(user)
    }

  }, [user]);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollToFAQs = () => {
    FAQsRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };


  return (
    <div>
      <Header
        scrollToPricing={scrollToPricing}
        scrollToFeatures={scrollToFeatures}
        scrollToFAQs={scrollToFAQs}
      />
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <Hero />
        <div ref={featuresRef}>
          <HowItWorks />
        </div>
        <div>
          <CustomerReview />
        </div>
        <div ref={pricingRef}>
          <Pricing />
        </div>
        <div className="w-full flex items-center justify-center pb-10" ref={FAQsRef}>
          <FAQs />
        </div>
      </div>
      <Footer />
    </div>
  );
}
