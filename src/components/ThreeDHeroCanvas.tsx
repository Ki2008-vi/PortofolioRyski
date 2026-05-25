/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import { LuxuryAccent } from "../types";

interface ThreeDHeroCanvasProps {
  accent: LuxuryAccent;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
  size?: number;
}

interface Edge {
  a: number;
  b: number;
}

export default function ThreeDHeroCanvas({ accent }: ThreeDHeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Mouse interpolation triggers for springy physics
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const angleRef = useRef({ y: 0, x: 0 }); // Auto rotation counter

  // Track the resize of the container correctly using ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
        if (canvasRef.current) {
          canvasRef.current.width = width * window.devicePixelRatio;
          canvasRef.current.height = height * window.devicePixelRatio;
          canvasRef.current.style.width = `${width}px`;
          canvasRef.current.style.height = `${height}px`;
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Track global pointer/mouse movement relative to window center
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Coordinates normalized relative to center of screen [-1, 1]
      mouseRef.current.targetX = (e.clientX - cx) / cx;
      mouseRef.current.targetY = (e.clientY - cy) / cy;
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  // Set colors based on the luxurious theme
  const getAccentColorsHex = () => {
    switch (accent) {
      case "gold":
        return { primary: "#fbbf24", glow: "rgba(251, 191, 36, 0.4)", secondary: "#f59e0b" };
      case "emerald":
        return { primary: "#34d399", glow: "rgba(52, 211, 153, 0.4)", secondary: "#10b981" };
      case "bronze":
        return { primary: "#fb923c", glow: "rgba(251, 146, 60, 0.4)", secondary: "#f97316" };
      case "platinum":
        return { primary: "#cbd5e1", glow: "rgba(203, 213, 225, 0.4)", secondary: "#94a3b8" };
      case "crimson":
        return { primary: "#f43f5e", glow: "rgba(244, 63, 94, 0.4)", secondary: "#e11d48" };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0 || dimensions.height === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Generate 3D geometry vertices (e.g., a double nested rotating geodesic sphere)
    const vertices: Point3D[] = [];
    const sphereRadius = 150;
    const innerRadius = 75;

    // Build octahedron / structural core vertices
    // Top, bottom, and equatorial points
    vertices.push({ x: 0, y: sphereRadius, z: 0 }); // 0: Top
    vertices.push({ x: 0, y: -sphereRadius, z: 0 }); // 1: Bottom

    // Equatorial ring
    const segments = 8;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      vertices.push({
        x: Math.cos(angle) * sphereRadius,
        y: 0,
        z: Math.sin(angle) * sphereRadius,
      });
    }

    // Inner core sphere points representing clusters
    for (let i = 0; i < 12; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      vertices.push({
        x: innerRadius * Math.sin(phi) * Math.cos(theta),
        y: innerRadius * Math.sin(phi) * Math.sin(theta),
        z: innerRadius * Math.cos(phi),
        size: Math.random() * 2 + 1,
      });
    }

    // Build logical connections/edges mapping
    const edges: Edge[] = [];
    // Connect top and bottom to all equatorial vertices
    for (let i = 2; i < 10; i++) {
      edges.push({ a: 0, b: i });
      edges.push({ a: 1, b: i });
      // Connect adjacent around the equatorial circle
      const nextIndex = i === 9 ? 2 : i + 1;
      edges.push({ a: i, b: nextIndex });
    }

    // Floating micro dust particles
    const dustCount = 80;
    const dustParticles: Array<{ x: number; y: number; z: number; size: number; speed: number }> = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: (Math.random() - 0.5) * dimensions.width,
        y: (Math.random() - 0.5) * dimensions.height,
        z: (Math.random() - 0.5) * 800,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    // The Render / Animation Frame Loop
    const render = () => {
      // Background erase with a luxurious near-black translucent fade
      ctx.fillStyle = "rgba(10, 10, 10, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const themeColors = getAccentColorsHex();

      // Soft spring feedback interpolation on mouse offset coords
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base auto rotation incremental updates
      angleRef.current.y += 0.003;
      angleRef.current.x += 0.001;

      // Camera dynamic transformation parameters
      const fov = 400; // Focal length
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Camera tilt mapping from normalized mouse coordinates
      const pitch = mouse.y * 0.35 + angleRef.current.x; // Rotation around X (Pitch)
      const yaw = mouse.x * 0.35 + angleRef.current.y;   // Rotation around Y (Yaw)

      // Trigonometric cache for performance
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);

      // 1. Draw connecting grids in deep perspective space (Luxury floor grid)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      const gridCount = 6;
      const gridSpacing = 80;
      for (let i = -gridCount; i <= gridCount; i++) {
        // Horizontal relative lines
        const zStart = -400 + mouse.y * 100;
        const zEnd = 400 + mouse.y * 100;
        const xVal = i * gridSpacing + mouse.x * 50;

        // Start projection
        const scaleS = fov / (fov + zStart + 300);
        const scaleE = fov / (fov + zEnd + 300);

        ctx.beginPath();
        ctx.moveTo(cx + xVal * scaleS, cy + 200 * scaleS);
        ctx.lineTo(cx + xVal * scaleE, cy + 200 * scaleE);
        ctx.stroke();
      }

      // 2. Render and update background deep dust particles
      dustParticles.forEach((part) => {
        // Float upwards
        part.y -= part.speed;
        if (part.y < -dimensions.height / 2) {
          part.y = dimensions.height / 2;
        }

        // Apply mouse sway
        const rotX = part.x;
        const rotY = part.y;
        const rotZ = part.z;

        // Project
        const depth = fov + rotZ + 400;
        if (depth > 10) {
          const depthScale = fov / depth;
          const px = cx + (rotX + mouse.x * 120) * depthScale;
          const py = cy + (rotY + mouse.y * 120) * depthScale;
          const rad = part.size * depthScale * 1.5;

          // Draw spec
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.1, rad), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(180, 180, 180, ${Math.min(0.6, 120 / depth)})`;
          ctx.fill();
        }
      });

      // 3. Project and draw rotating 3D vector core mesh
      const projectedPoints: { x: number; y: number; r: number }[] = [];

      vertices.forEach((v) => {
        // First rotate around Y (Yaw)
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.z * cosY + v.x * sinY;

        // Next rotate around X (Pitch)
        let y2 = v.y * cosP - z1 * sinP;
        let z2 = z1 * cosP + v.y * sinP;

        // Shift along Z center
        const zOffset = 300;
        const d = fov + z2 + zOffset;

        // Save projected screen points
        if (d > 20) {
          const s = fov / d;
          projectedPoints.push({
            x: cx + x1 * s,
            y: cy + y2 * s,
            r: s * (v.size || 3.5),
          });
        } else {
          projectedPoints.push({ x: 0, y: 0, r: 0 });
        }
      });

      // Draw Edges / Wireframes
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(${parseInt(themeColors.primary.slice(1, 3), 16)}, ${parseInt(themeColors.primary.slice(3, 5), 16)}, ${parseInt(themeColors.primary.slice(5, 7), 16)}, 0.18)`;

      edges.forEach((edge) => {
        const ptA = projectedPoints[edge.a];
        const ptB = projectedPoints[edge.b];

        if (ptA && ptB && ptA.r > 0 && ptB.r > 0) {
          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.stroke();
        }
      });

      // Draw connection rays from dynamic interactive Cursor offset
      // Creating virtual nodes that bridge to vertices
      const mxProjected = cx + mouse.x * 240;
      const myProjected = cy + mouse.y * 120;

      // Draw vertices nodes with luxurious radial drops
      projectedPoints.forEach((pt, idx) => {
        if (!pt || pt.r <= 0) return;

        // Central vertices glow
        const gradient = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, pt.r * 2.5);
        gradient.addColorStop(0, themeColors.primary);
        gradient.addColorStop(0.3, themeColors.primary + "88");
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // High intensity connections to pointer projection
        const distToCursor = Math.hypot(pt.x - mxProjected, pt.y - myProjected);
        if (distToCursor < 300) {
          ctx.strokeStyle = `rgba(${parseInt(themeColors.primary.slice(1, 3), 16)}, ${parseInt(themeColors.primary.slice(3, 5), 16)}, ${parseInt(themeColors.primary.slice(5, 7), 16)}, ${0.1 * (1 - distToCursor / 300)})`;
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(mxProjected, myProjected);
          ctx.stroke();
        }
      });

      // Orbiting planetary satellite core ring
      ctx.beginPath();
      ctx.ellipse(
        cx,
        cy,
        220 + mouse.x * 40,
        70 + mouse.y * 20,
        Math.PI / 12 + angleRef.current.y * 0.5,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `rgba(${parseInt(themeColors.primary.slice(1, 3), 16)}, ${parseInt(themeColors.primary.slice(3, 5), 16)}, ${parseInt(themeColors.primary.slice(5, 7), 16)}, 0.08)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, accent]);

  return (
    <div
      id="hero-3d-canvas-container"
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none"
      style={{ zIndex: 0 }}
    >
      <canvas
        id="hero-3d-canvas"
        ref={canvasRef}
        className="block opacity-75 md:opacity-90 transition-opacity duration-700 bg-neutral-950"
      />
    </div>
  );
}
