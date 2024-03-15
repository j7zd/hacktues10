"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Component() {
    const [allBuoys, setAllBuoys] = useState([])

    useEffect(() => {
        fetch('/api/get/all')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setAllBuoys(data))
            .catch(error => console.error('There was a problem with the fetch operation: ', error));
    }, [])

    return (
        <main className="flex flex-col items-center p-4 bg-gray-900 text-white min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Всички шамандури</h1>
            {/* Grid container with 4 columns as an example, adjust `grid-cols-{n}` as needed */}
            <div className="grid grid-cols-4 gap-4 w-full max-w-4xl">
                {allBuoys && allBuoys.map((buoy, index) => (
                    <Button variant="secondary" key={index} onClick={() => window.location.href = `/view/${buoy._id}`}>{buoy.name}</Button>
                ))}
            </div>
        </main>
    )
}
