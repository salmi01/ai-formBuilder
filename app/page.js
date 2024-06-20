'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/hero";
import { useUser } from "@clerk/nextjs";
import { addUserIfNotExists } from "@/configs";
import { useEffect } from "react";

export default function Home() {

  const {user} = useUser()

  useEffect(() => {
    if (user) {
      addUserIfNotExists(user)
    }
}, [user]);

  return (
   <div>
      <Hero/>
   </div>
  );
}
