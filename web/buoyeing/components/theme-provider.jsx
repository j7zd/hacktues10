"use client"

import * as React from "react"
// import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';

export function Providers({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </ThemeProvider>
    );
}

