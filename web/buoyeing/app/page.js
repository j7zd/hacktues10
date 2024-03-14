"use client"
import 'leaflet/dist/leaflet.css';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button } from "@/components/ui/button"


export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      {/* Title  */}
      <div className="flex  flex-col items-center space-y-4">
        <h1 className="text-5xl font-bold">Bouy Data</h1>
        {/* description */}
        <p className="text-lg">This is a simple app to display data from a network of bouys</p>
      </div>

      {/* map */}
      <MapContainer className='w-full h-96' center={[42.501056, 27.472054]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>

      {/* docs and all bouys button */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          // square big button
          className="px-6 py-3"
        >
          Docs
        </Button>

        <Button
          variant="outline"
        >
          All Bouys
        </Button>
      </div>
    </main>
  )
}
