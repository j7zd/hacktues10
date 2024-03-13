"use client"

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
// import { ResponsiveLine } from "@nivo/line"
import { Chart, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Ticks,
    Tooltip
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function Component() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Desktop',
                data: [43, 137, 61, 145, 26, 154, 32, 12, 45, 78, 12, 45],
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
            },
            // {
            //     label: 'Mobile',
            //     data: [60, 48, 177, 78, 96, 204],
            //     fill: false,
            //     backgroundColor: '#e11d48',
            //     borderColor: '#e11d48',
            // },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Adjust based on your needs
        scales: {
            x: {
                grid: {
                    display: true,
                },
            },
            y: {
                grid: {
                    display: true,
                },
            },
        },
        plugins: {
            legend: false,
            title: {
                display: true,
                text: (ctx) => 'Tooltip point style: ' + ctx.chart.options.plugins.tooltip.usePointStyle,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                usePointStyle: true,
            }

        }
    };




    return (
        <Card className="w-full p-8">
            <CardHeader className="flex flex-col items-start gap-1.5">
                {/* <div className="grid gap-1.5"> */}
                <CardTitle>Graph Analytics</CardTitle>
                <CardDescription>Real-time Sensor Data</CardDescription>
                {/* </div> */}
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg">
                    <Line data={data} options={options} />
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg">
                    <Line data={data} options={options} />
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg">
                    <Line data={data} options={options} />
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg">
                    <Line data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    )
}
