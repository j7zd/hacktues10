'use client'
import React from 'react';
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer } from 'react-leaflet';
// import HeatmapLayer from '@/components/HeatmapLayer';

// const HeatmapLayer = dynamic(() => import('@/components/HeatmapLayer'), {
//   ssr: false,
// });

const MainMapWithHeatmap = ({ data }) => {
  return (
    <MapContainer className="w-full h-96" center={[42.501056, 27.472054]} zoom={12} scrollWheelZoom={true}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* <HeatmapLayer points={data} /> */}
    </MapContainer>
  );
};

export default MainMapWithHeatmap;
