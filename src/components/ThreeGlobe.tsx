import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { type CityData, CITIES_DATA } from "../data/cities";
import { Globe, MapPin, Eye, Activity } from "lucide-react";

interface ThreeGlobeProps {
  onSelectCity: (city: CityData) => void;
  selectedCity: CityData | null;
}

export default function ThreeGlobe({ onSelectCity, selectedCity }: ThreeGlobeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SETUP SCENE, CAMERA, & RENDERER ---
    const width = container.clientWidth;
    const height = 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all globe elements
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // --- EARTH PROGRAMMATIC POINT CLOUD ---
    const pointCount = 3500;
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    const isDarkTheme = () => document.documentElement.classList.contains("dark");
    
    // Emerald color arrays
    const darkMint = new THREE.Color("#10B981");
    const darkEmerald = new THREE.Color("#059669");
    const darkTeal = new THREE.Color("#06B6D4");

    const lightMoss = new THREE.Color("#15803D");
    const lightForest = new THREE.Color("#166534");
    const lightLime = new THREE.Color("#4D7C0F");

    const getThemeColor = () => {
      const set = isDarkTheme()
        ? [darkMint, darkEmerald, darkTeal]
        : [lightMoss, lightForest, lightLime];
      return set[Math.floor(Math.random() * set.length)];
    };

    const globeRadius = 2.4;

    for (let i = 0; i < pointCount; i++) {
      // Fibonacci lattice coordinate distribution to create a highly uniform sphere
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;

      const x = globeRadius * Math.sin(phi) * Math.cos(theta);
      const y = globeRadius * Math.sin(phi) * Math.sin(theta);
      const z = globeRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const randomColor = getThemeColor();
      colors[i * 3] = randomColor.r;
      colors[i * 3 + 1] = randomColor.g;
      colors[i * 3 + 2] = randomColor.b;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Custom shader style points material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true
    });

    const earthPoints = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(earthPoints);

    // --- SECONDARY ATMOSPHERIC CANOPY CORE SHELL ---
    const outerCount = 800;
    const outerPositions = new Float32Array(outerCount * 3);
    const outerRadius = globeRadius * 1.08;

    for (let i = 0; i < outerCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / outerCount);
      const theta = Math.sqrt(outerCount * Math.PI) * phi;

      outerPositions[i * 3] = outerRadius * Math.sin(phi) * Math.cos(theta);
      outerPositions[i * 3 + 1] = outerRadius * Math.sin(phi) * Math.sin(theta);
      outerPositions[i * 3 + 2] = outerRadius * Math.cos(phi);
    }

    const outerGeometry = new THREE.BufferGeometry();
    outerGeometry.setAttribute("position", new THREE.BufferAttribute(outerPositions, 3));
    const outerMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: isDarkTheme() ? 0x34D399 : 0x059669,
      transparent: true,
      opacity: 0.25,
      sizeAttenuation: true
    });

    const outerShell = new THREE.Points(outerGeometry, outerMaterial);
    globeGroup.add(outerShell);

    // --- CODES LATITUDE / LONGITUDE SPHERE GRIDS ---
    const gridGeometry = new THREE.SphereGeometry(globeRadius - 0.02, 18, 18);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: isDarkTheme() ? 0x10B981 : 0x16A34A,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    globeGroup.add(gridMesh);

    // --- GEO-SPHERICAL CITY MARKER BEACONS ---
    const convertLatLngToVector3 = (lat: number, lng: number, radius: number) => {
      // Standard conversion mapping coordinates specifically to standard 3D points
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.sin(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      return new THREE.Vector3(x, y, z);
    };

    const pinGeometry = new THREE.SphereGeometry(0.09, 16, 16);
    const pinGroup = new THREE.Group();
    globeGroup.add(pinGroup);

    const cityMeshes: THREE.Mesh[] = [];

    // Filter cities to only display registered locations
    CITIES_DATA.forEach((city) => {
      const pos = convertLatLngToVector3(city.coordinates.lat, city.coordinates.lng, globeRadius);
      
      const activeColor = selectedCity?.id === city.id 
        ? 0x3b82f6 // Selected Blue
        : (isDarkTheme() ? 0x10B981 : 0x15803D); // Emerald Green

      const material = new THREE.MeshBasicMaterial({
        color: activeColor,
        transparent: true,
        opacity: 0.9
      });

      const pinMesh = new THREE.Mesh(pinGeometry, material);
      pinMesh.position.copy(pos);
      // Store city context inside Three Mesh for Raycasting detection
      pinMesh.userData = { city };
      
      pinGroup.add(pinMesh);
      cityMeshes.push(pinMesh);

      // Add a subtle glowing ring around each active pin mesh
      const ringGeometry = new THREE.RingGeometry(0.12, 0.16, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: activeColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(pos);
      ring.lookAt(new THREE.Vector3(0, 0, 0)); // Point ring outward
      globeGroup.add(ring);
    });

    // Adjust entire globe orientation to rotate India towards the front view initially
    globeGroup.rotation.y = Math.PI * 1.5;
    globeGroup.rotation.x = 0.25;

    // --- DRAG INTERACTION CONTROLS ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0.002, y: 0.001 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        dragVelocity = {
          x: deltaX * 0.007,
          y: deltaY * 0.007
        };

        globeGroup.rotation.y += dragVelocity.x;
        globeGroup.rotation.x += dragVelocity.y;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }

      // --- RAYCASTER TO TRACK HOVERED PINS ---
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const intersects = raycaster.intersectObjects(cityMeshes);
      if (intersects.length > 0) {
        const hoveredMesh = intersects[0].object as THREE.Mesh;
        const city = hoveredMesh.userData.city as CityData;
        setHoveredCity(city);
        
        // Tooltip offset coordinates
        setTooltipPos({
          x: e.clientX - rect.left + 15,
          y: e.clientY - rect.top - 100
        });
      } else {
        setHoveredCity(null);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);

      const intersects = raycaster.intersectObjects(cityMeshes);
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const city = clickedMesh.userData.city as CityData;
        onSelectCity(city);
      }
    };

    // Attach listeners
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("click", handleCanvasClick);

    // --- ANIMATION ROTATION LOOP ---
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Earth rotation inertia decay
      if (!isDragging) {
        dragVelocity.x *= 0.95;
        dragVelocity.y *= 0.95;

        // Apply slow continuous auto rotation
        globeGroup.rotation.y += dragVelocity.x + 0.0016;
        globeGroup.rotation.x += dragVelocity.y * 0.5;
        
        // Stabilize drift tilt
        globeGroup.rotation.x = Math.max(-0.4, Math.min(0.4, globeGroup.rotation.x));
      }

      // Atmospheric outer cloud rotates slightly counter-clockwise
      outerShell.rotation.y -= 0.0006;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth;
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
      renderer.setSize(w, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      
      if (renderer && renderer.domElement) {
        renderer.domElement.removeEventListener("mousedown", handleMouseDown);
        renderer.domElement.removeEventListener("click", handleCanvasClick);
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [selectedCity]);

  return (
    <div className="w-full relative bg-bgCard/40 border border-borderMuted rounded-2xl p-6 shadow-premium backdrop-blur-md overflow-hidden min-h-[480px]">
      
      {/* Dynamic Header hud info overlay */}
      <div className="absolute top-6 left-6 z-10 space-y-1 select-none pointer-events-none">
        <span className="bg-accentGreen/10 text-accentGreen border border-accentGreen/20 px-3 py-0.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
          <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "16s" }} />
          EcoSphere 3D Intelligence
        </span>
        <h3 className="text-md font-brand font-extrabold text-headerText tracking-tight">Interactive Smart-City Globe</h3>
        <p className="text-[10px] font-sans font-medium text-cardTextMuted">Drag to orbit Earth. Hover over coordinates to audit diagnostics.</p>
      </div>

      {/* Static HUD parameters inside globe boundary */}
      <div className="absolute bottom-6 left-6 z-10 flex gap-4 text-[10px] font-sans text-cardTextMuted select-none pointer-events-none font-bold">
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-accentGreen" /> 7 Active Beacons</span>
        <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5 text-accentBlue" /> Raycast Active</span>
      </div>

      {/* Main Canvas Mount Div Container */}
      <div ref={containerRef} className="w-full h-[400px] cursor-grab active:cursor-grabbing relative" />

      {/* 3D Tooltip Hover Panel Overlay */}
      {hoveredCity && (
        <div
          className="absolute z-20 pointer-events-none bg-bgCard border border-borderMuted p-4 rounded-xl shadow-premium animate-scaleIn w-[230px]"
          style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
        >
          <div className="flex items-center justify-between border-b border-borderMuted pb-2 mb-2">
            <div>
              <span className="block font-brand font-black text-xs text-headerText">{hoveredCity.name}</span>
              <span className="block text-[8px] text-cardTextMuted uppercase tracking-wider font-semibold">{hoveredCity.state}</span>
            </div>
            <span className={`w-2 h-2 rounded-full ${hoveredCity.metrics.aqi > 150 ? 'bg-red-500 animate-pulse' : 'bg-accentGreen'}`} />
          </div>

          <div className="space-y-1.5 font-sans text-[10px]">
            <div className="flex justify-between items-center">
              <span className="text-cardTextMuted">Air Quality Index (AQI):</span>
              <span className={`font-bold ${hoveredCity.metrics.aqi > 150 ? 'text-red-500' : hoveredCity.metrics.aqi > 100 ? 'text-amber-500' : 'text-accentGreen'}`}>
                {hoveredCity.metrics.aqi}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cardTextMuted">Green Cover Density:</span>
              <span className="font-bold text-headerText">{hoveredCity.metrics.greenCover}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-cardTextMuted">Annual CO2 Emissions:</span>
              <span className="font-bold text-headerText">{hoveredCity.metrics.carbonEmissions}M t</span>
            </div>
          </div>
          
          <div className="mt-3 pt-2 border-t border-borderMuted flex items-center justify-center gap-1.5 text-[9px] font-bold text-accentGreen">
            <Eye className="w-3.5 h-3.5" />
            Click Pin to Audit Platform
          </div>
        </div>
      )}
    </div>
  );
}
