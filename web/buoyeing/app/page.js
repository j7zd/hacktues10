// "use client"
import 'leaflet/dist/leaflet.css';

import React from 'react';
import MainMap from '@/components/mainMap';
import { Button } from "@/components/ui/button"
import { World } from '@/components/interactiveGlobe';

export default function Home() {
  const locations = [
    { lat: 40.7128, lng: -74.0060, color: 'rgba(255, 165, 0, 0.5)' }, // New York
    { lat: 34.0522, lng: -118.2437, color: 'rgba(0, 255, 0, 0.5)' }, // Los Angeles
    { lat: 51.5074, lng: -0.1278, color: 'rgba(0, 0, 255, 0.5)' },   // London
  ];

  const globeConfig = {
    pointSize: 0.05, // Size of points on the globe
    globeColor: "#4287f5", // Color of the globe
    showAtmosphere: true, // Show atmosphere effect
    atmosphereColor: "#ffffff", // Color of the atmosphere
    atmosphereAltitude: 0.1, // Altitude of the atmosphere effect
    ambientLight: "#ffffff", // Color of the ambient light
    directionalLeftLight: "#ffffff", // Color of directional light from left
    directionalTopLight: "#ffffff", // Color of directional light from top
    pointLight: "#ffffff", // Color of the point light
    autoRotate: true, // Enable auto-rotation of the globe
    autoRotateSpeed: 1, // Speed of auto-rotation
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* Title  */}
      <div className="flex  flex-col items-center space-y-4">
        <h1 className="text-5xl font-bold">Bouy Data</h1>
        {/* description */}
        <p className="text-lg">This is a simple app to display data from a network of bouys</p>
      </div>

      {/* map */}
      <MainMap />

      {/* docs and all bouys button */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          className="px-6 py-3"
        >
          Docs
        </Button>

        <Button
          variant="outline"
          className="px-6 py-3"
        >
          All Bouys
        </Button>
      </div>

      {/* globe */}
      <div className="w-full h-96">
        <World globeConfig={globeConfig} data={locations} />
      </div>
    </main>
  )
}
