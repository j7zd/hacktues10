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

export default function ViewBuoy() {
    const params = useParams();
    const [data, setData] = useState({ datasets: [] });
    const [requestData, setRequestData] = useState(1);
    const [timeframe, setTimeframe] = useState('all'); // day, month, year

    const buoy_uid = params.buoy_uid;

    const dataToTest = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/get/${buoy_uid}/${timeframe}`);
                const data = await response.json();
                setData(data);
                setRequestData(0);
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        };

        if (requestData) {
            fetchData();
        }
    }, [buoy_uid, timeframe, requestData]);

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
        // <Card className="w-full ">
        //     <CardHeader className="flex flex-col items-start gap-1.5">
        //         <CardTitle>
        //             Graph Analytics</CardTitle>
        //         <CardDescription>Real-time Sensor Data</CardDescription>
        //     </CardHeader>
        //     <CardContent className="flex flex-wrap justify-center items-stretch gap-4">
        //         {/* map over data */}
        //         <div className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full md:h-auto">
        //             <Line data={data} options={options} />
        //         </div>
        //     </CardContent>
        // </Card>
        <main className="flex flex-col items-center p-4 bg-gray-900 text-white min-h-screen">
            <h1 className="text-4xl font-bold mb-4">Шамандура</h1>
            {/* Flex container for buttons, allowing wrap */}
            <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
                {data.datasets && data.datasets.map((dataset, index) => (
                    <div key={index} className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full md:h-auto">
                        <Line data={dataset} options={options} />
                        {/* show dataset as text */}
                        {/* <h2>{dataset.label}</h2> */}
                        {/* <h2>{JSON.stringify(dataset)}</h2> */}
                        {/* <h2>{dataset.label}</h2> */}
                    </div>
                ))}
                {/* <div  className="bg-gray-300 dark:bg-gray-700 p-4 rounded-lg w-full md:h-auto">
                    <Line data={dataToTest} options={options} />
                </div> */}
            </div>
        </main>
    )
}
