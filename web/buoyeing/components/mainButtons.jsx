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
            {/* <Button
            // variant="outline"
            // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
            > */}
            <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer w-auto">
                <CardHeader>
                    <CardTitle>Docs</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Документацията на публичния API
                    </CardDescription>
                </CardContent>
                {/* <CardFooter>
                    <Button
                    // variant="outline"
                    // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                    >
                        View Docs
                    </Button>
                </CardFooter> */}
            </Card>
            {/* </Button> */}

            <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer w-auto">
                <CardHeader>
                    <CardTitle>All Buoys</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        Вижте всички свързани и активни шамандури към мрежата
                    </CardDescription>
                </CardContent>
                {/* <CardFooter>
                    <Button
                    // variant="outline"
                    // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                    >
                        Виж всички шамандури
                    </Button>
                </CardFooter> */}
            </Card>

        </div>
    )
}



