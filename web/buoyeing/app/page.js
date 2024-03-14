// "use client"
import 'leaflet/dist/leaflet.css';

import React from 'react';
import MainMap from '@/components/mainMap';
import { World } from '@/components/interactiveGlobe';
import MainButtons from '@/components/mainButtons';
import globeConfig from '@/data/globeConfig.json';

export default function Home() {
  const locations = [
    { lat: 40.7128, lng: -74.0060, color: 'rgba(255, 165, 0, 0.5)' }, // New York
    { lat: 34.0522, lng: -118.2437, color: 'rgba(0, 255, 0, 0.5)' }, // Los Angeles
    { lat: 51.5074, lng: -0.1278, color: 'rgba(0, 0, 255, 0.5)' },   // London
  ];

  return (
    <main className="flex max-h-full flex-col items-center justify-between p-4 bg-gray-900 text-white">
      {/* Title and Globe Container */}
      <div className="flex flex-col md:flex-row w-full items-center md:justify-center space-y-4 md:space-y-0 md:space-x-10">
        {/* Title and Description */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-indigo-400">Шамандура със стойност</h1>
          <p className="text-lg text-gray-300">От нестойностен отпадък, във стойностна шамандура!</p>
        </div>

        {/* Globe */}
        <div className="w-full md:w-auto h-96 flex items-center justify-center">
          <World globeConfig={globeConfig} data={locations} />
        </div>
      </div>

      {/* Text saying to check out the map below */}
      <p className="text-lg text-gray-300">Check out the map below</p>

      {/* Map */}
      <MainMap />

      {/* Docs and all buoys button */}
      <div className="flex space-x-4">
        <MainButtons />
      </div>
    </main>
  )
}
