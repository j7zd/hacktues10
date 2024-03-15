"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function viewBuoy() {
    const params = useParams();
    const [data, setData] = useState({ datasets: [] });
    const [requestData, setRequestData] = useState(1);
    const [timeframe, setTimeframe] = useState('all'); // day, month, year

    const buoy_uid = params.buoy_uid;

    useEffect(() => {
        // fetch from /api/get/[buoy_uid]/[timeframe]
        const fetchData = async () => {
            try {
                console.log('Fetching data for:', buoy_uid, timeframe);
                const response = await fetch(`/api/get/${buoy_uid}/${timeframe}`);
                const data = await response.json();
                setData(data);
                console.log('Data:', data);
                setRequestData(0);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        if (requestData) {
            fetchData();
        }
    }, [requestData])

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
        // on desktop - w-[80%]
        <Card className="w-full ">
            <CardHeader className="flex flex-col items-start gap-1.5">
                <CardTitle>
                    Graph Analytics</CardTitle>
                <CardDescription>Real-time Sensor Data</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap justify-center items-stretch gap-4">
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full sm:w-1/2 xl:w-1/4 h-[400px] md:h-auto">
                    <Line data={data} options={options} />
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full sm:w-1/2 xl:w-1/4 h-[400px] md:h-auto">
                    <Line data={data} options={options} />
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full sm:w-1/2 xl:w-1/4 h-[400px] md:h-auto">
                    <Line data={data} options={options} />
                </div>
                <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full sm:w-1/2 xl:w-1/4 h-[400px] md:h-auto">
                    <Line data={data} options={options} />
                </div>
            </CardContent>
        </Card>
    )
}
