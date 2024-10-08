'use client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
// import (Persis)
import React from "react";

const queryClient = new QueryClient()

export function QueryProvider({children}: {children: React.ReactNode}) {
    return <QueryClientProvider client = {queryClient}>{children}</QueryClientProvider>
}