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
            <Button
            // variant="outline"
            // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Docs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            View the documentation for the buoy data API
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button
                        // variant="outline"
                        // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                        >
                            View Docs
                        </Button>
                    </CardFooter>
                </Card>
            </Button>

            <Button
            // variant="outline"
            // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>All Buoys</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            View all buoys in the network
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button
                        // variant="outline"
                        // className="px-6 py-3 border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500"
                        >
                            View All Buoys
                        </Button>
                    </CardFooter>
                </Card>
            </Button>
        </div>
    )
}



