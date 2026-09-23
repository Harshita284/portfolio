"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface TechSphereProps {
  tagText?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  infoText?: string;
}

export default function TechSphere({
  tagText = "3D_COORDINATE_SYSTEM",
  titlePrefix = "The Tech ",
  titleHighlight = "Sphere",
  infoText = "Interactive 3D space visualizing core architectural competencies. Drag to explore.",
}: TechSphereProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotVelYRef = useRef(0.0004); // Extremely slow & subtle rotation speed
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    // WebGL Renderer with High DPI & Antialiasing
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Master Group for 3D Globe - Perfectly Upright (rotation.x = 0)
    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0; // Perfectly straight/upright axis
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // 1. Ultra High-Density Fine Wireframe Sphere (Tiny Grid Boxes & Muted Dark Copper Color)
    const sphereGeo = new THREE.SphereGeometry(2.1, 76, 50);
    const wireframeGeo = new THREE.WireframeGeometry(sphereGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5C2108, // Dark muted copper brown
      transparent: true,
      opacity: 0.45,
    });
    const mainSphereLines = new THREE.LineSegments(wireframeGeo, lineMat);
    globeGroup.add(mainSphereLines);

    // 2. Micro Geodesic Triangulation Lattice (Ultra-small subtle dark brown boxes)
    const icoGeo = new THREE.IcosahedronGeometry(2.095, 5);
    const icoWireframe = new THREE.WireframeGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x381303, // Very dark brown background lattice
      transparent: true,
      opacity: 0.2,
    });
    const icoMesh = new THREE.LineSegments(icoWireframe, icoMat);
    globeGroup.add(icoMesh);

    // 3. Crisp Outer Circumference Silhouette Ring (Dark Muted Copper)
    const ringGeo = new THREE.RingGeometry(2.105, 2.115, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x4A1A05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    globeGroup.add(ringMesh);

    // 4. Soft Subtle Backdrop Glow Sprite
    const canvasGlow = document.createElement("canvas");
    canvasGlow.width = 128;
    canvasGlow.height = 128;
    const ctxGlow = canvasGlow.getContext("2d");
    if (ctxGlow) {
      const grad = ctxGlow.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(92, 33, 8, 0.08)");
      grad.addColorStop(0.5, "rgba(56, 19, 3, 0.02)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctxGlow.fillStyle = grad;
      ctxGlow.fillRect(0, 0, 128, 128);
    }
    const textureGlow = new THREE.CanvasTexture(canvasGlow);
    const spriteMat = new THREE.SpriteMaterial({ map: textureGlow, transparent: true, opacity: 0.25 });
    const spriteGlow = new THREE.Sprite(spriteMat);
    spriteGlow.scale.set(5.5, 5.5, 1);
    scene.add(spriteGlow);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop (Extremely Slow & Subtle 360 Y-Axis Rotation)
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (globeGroupRef.current) {
        if (!isDraggingRef.current) {
          // Extremely slow rotation
          globeGroupRef.current.rotation.y += rotVelYRef.current;
        }
        // Keep upright
        globeGroupRef.current.rotation.x = 0;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      wireframeGeo.dispose();
      lineMat.dispose();
      icoGeo.dispose();
      icoWireframe.dispose();
      icoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, []);

  // Mouse & Touch Drag Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !globeGroupRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;

    globeGroupRef.current.rotation.y += deltaX * 0.003;
    globeGroupRef.current.rotation.x = 0;

    rotVelYRef.current = deltaX * 0.0003;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1 || !globeGroupRef.current) return;
    const deltaX = e.touches[0].clientX - lastMousePosRef.current.x;

    globeGroupRef.current.rotation.y += deltaX * 0.003;
    globeGroupRef.current.rotation.x = 0;

    rotVelYRef.current = deltaX * 0.0003;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <section id="tech-sphere" className="w-full bg-[#050302] text-white py-8 sm:py-10 border-y border-amber-900/20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 relative z-10 space-y-2">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="space-y-1">
            <span
              className="text-[11px] font-black uppercase tracking-[0.25em] text-[#D97706]/90 block"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              {tagText}
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: "var(--font-orbitron), system-ui, sans-serif" }}
            >
              {titlePrefix}
              <span className="text-[#D97706]">{titleHighlight}</span>
            </h2>
          </div>
        </div>

        {/* Real Three.js WebGL 3D Globe Container */}
        <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center my-2">
          <div
            ref={mountRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              handleMouseUp();
              setIsHovering(false);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className={`w-full h-full max-w-[800px] flex items-center justify-center ${
              isHovering ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
          />
        </div>

        {/* Bottom Right Info Text */}
        <div className="flex justify-end">
          <p
            className="text-xs text-[#A3A3A3] max-w-xs text-right leading-relaxed font-sans"
            style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
          >
            {infoText}
          </p>
        </div>
      </div>
    </section>
  );
}
