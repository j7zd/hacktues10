'use client'

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json"; // Ensure you have this JSON data for globe polygons

extend({ ThreeGlobe });

const aspect = 1.2;
const cameraZ = 300;

export function Globe({ globeConfig, data }) {
  const globeRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // Set globe properties and initial materials
    const globeMaterial = globeRef.current.globeMaterial();
    globeMaterial.color = new Color(globeConfig.globeColor || "#1d072e");
    globeMaterial.emissive = new Color(globeConfig.emissive || "#000000");
    globeMaterial.emissiveIntensity = globeConfig.emissiveIntensity || 0.1;
    globeMaterial.shininess = globeConfig.shininess || 0.9;

    globeRef.current
      .pointsData(data.map(d => ({
        lat: d.lat,
        lng: d.lng,
        color: d.color,
        altitude: 0.01,
      })))
      .pointColor('color')
      .pointAltitude('altitude')
      .pointRadius(globeConfig.pointSize || 0.1);

    // Set rings to pulse at each data point
    globeRef.current
      .ringsData(data)
      .ringColor((d) => d.color)
      .ringAltitude(0.01)
      .ringMaxRadius(0.8)
      .ringPropagationSpeed(0.1)
      .ringRepeatPeriod(2000); // Adjust for desired pulsing speed

    // Adjustments for globe polygons, atmosphere, etc., can be made here
    globeRef.current
      .hexPolygonsData(countries.features.filter(d => d.properties.ISO_A2 !== "AQ"))
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(globeConfig.showAtmosphere)
      .atmosphereColor(globeConfig.atmosphereColor)
      .atmosphereAltitude(globeConfig.atmosphereAltitude || 0.1)
      .hexPolygonColor(() => globeConfig.polygonColor || "rgba(255,255,255,0.7)");

  }, [globeRef, data, globeConfig]);

  return (
    <>
      <threeGlobe ref={globeRef} />
    </>
  );
}

export function World(props) {
  const { globeConfig } = props;
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);
  return (
    <Canvas scene={scene} camera={new PerspectiveCamera(50, aspect, 180, 1800)}>
      <ambientLight color={globeConfig.ambientLight || "#ffffff"} intensity={0.6} />
      <directionalLight
        color={globeConfig.directionalLeftLight || "#ffffff"}
        position={new Vector3(-400, 100, 400)}
      />
      <directionalLight
        color={globeConfig.directionalTopLight || "#ffffff"}
        position={new Vector3(-200, 500, 200)}
      />
      <pointLight
        color={globeConfig.pointLight || "#ffffff"}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <Globe {...props} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={cameraZ}
        maxDistance={cameraZ}
        autoRotate={globeConfig.autoRotate || false}
        autoRotateSpeed={globeConfig.autoRotateSpeed || 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  );
}
