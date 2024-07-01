"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ThemeToggle() {
    const { theme, setTheme } = useTheme("light")
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Set isMounted to true to indicate the component has mounted
        setIsMounted(true);
    }, []);

    const toggleTheme = () => {
        if (isMounted) {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    };

    // Ensure the button is only rendered if the component has mounted
    if (!isMounted) return null;

    return (
        <Button variant="outline" className='border-none' size="icon"  onClick={toggleTheme}>
            {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
