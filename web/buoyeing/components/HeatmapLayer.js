import L from 'leaflet';
import 'leaflet.heat';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';


const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    // Create the heatmap layer
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    // Cleanup function to remove heatmap layer when the component unmounts
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]); // Ensure effect runs only when points or map instance changes

  return null;
};

export default HeatmapLayer;
