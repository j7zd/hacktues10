"use client"
// import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
// import { World } from '@/components/interactiveGlobe';
import MainButtons from '@/components/mainButtons';
import globeConfig from '@/data/globeConfig.json';
import 'leaflet/dist/leaflet.css'; // Ensure Leaflet's CSS is loaded
import { Bebas_Neue } from 'next/font/google';

const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebas', display: 'swap' })

const MainMap = dynamic(() => import('@/components/mainMap'), { ssr: false });
const DynamicWorld = dynamic(() => import('@/components/interactiveGlobe').then((mod) => mod.World), {
  ssr: false,
});

export default function Home() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchBuoys = async () => {
      try {
        const response = await fetch('/api/get/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const buoys = await response.json();
        console.log('buoys:', buoys);
        const newLocations = buoys.map(buoy => ({
          lat: buoy.location.coordinates[0],
          lng: buoy.location.coordinates[1],
          color: 'rgba(255, 165, 0, 0.5)',
          name: buoy.name,
        }));
        setLocations(newLocations);
        console.log('newLocations:', newLocations);
      } catch (error) {
        console.error('Error fetching buoys:', error);
      }
    };

    if (locations.length === 0) {
      fetchBuoys();
    }
  }, [locations.length]); // Use locations.length to trigger the effect only when needed

  // const HeatmapComponent = dynamic(() => import('@/components/mainMapWithHeatmap'), { ssr: false });

  return (
    <main className="flex flex-col items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row w-full items-center md:justify-center space-y-4 md:space-y-0 md:space-x-10 ">
        <div className="w-full md:w-auto flex flex-col items-start text-center md:max-w-[50%]">
          {/* <h1 className="text-5xl font-bold text-indigo-400">Шамандурите На Бъдещето</h1> */}
          <div className={bebas.className}>
            {/* <h1 className="text-5xl font-bold text-indigo-400">Шамандурите На Бъдещето</h1> */}
            <h1 className="text-9xl font-bold text-indigo-400">Smart Buoy</h1>
          </div>
          <p className="text-lg text-gray-300 mt-2 italic text-gray-400/85">От нестойностен отпадък, в стойностна шамандура. <br />Разгледайте как нашите устройства правят <span className='font-bold text-indigo-400'>разликата</span>!</p>
        </div>
        <div className="w-full md:w-auto h-96 aspect-square flex items-center justify-center">
          {/* <World key={locations.length} globeConfig={globeConfig} data={locations} /> */}
          <DynamicWorld key={locations.length} globeConfig={globeConfig} data={locations} />
        </div>
      </div>

      <h2 className="my-4 text-xl text-gray-300 text-center">Разгледайте различните изследователски шамандури около Бургас!</h2>


        <MainMap locations={locations} />
        {/* <HeatmapComponent data={heatmapLocations} /> */}



      <div className="flex space-x-4 mt-6">
        <MainButtons key={locations.length} locations={locations} />
      </div>
    </main>
  );
}
