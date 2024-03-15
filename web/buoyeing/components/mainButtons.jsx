"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function MainButtons() {
    return (
        <div className="flex space-x-4">
            <Card
                className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer w-auto"
                onClick={() => {
                    window.location.href = "/docs"
                }}
            >
                <CardHeader>
                    <CardTitle>Документация</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Документацията на публичния API
                    </CardDescription>
                </CardContent>
            </Card>

            <Card
                className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer w-auto"
                onClick={() => {
                    window.location.href = "/buoys"
                }}
            >
                <CardHeader>
                    <CardTitle>Всички шамандури</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Вижте всички свързани и активни шамандури към мрежата
                    </CardDescription>
                </CardContent>
            </Card>

        </div>
    )
}



