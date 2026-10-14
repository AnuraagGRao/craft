"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Companion } from "@/lib/data";

interface StageProps {
  companion: Companion;
}

/**
 * Stage: The fixed WebGL 3D backdrop inspired by Emmanuel Wilson's architecture.
 * Features a 3D camera flight down the -z axis across story chapters,
 * ambient dust particles, perspective floor grid, and glowing wireframe set-pieces.
 */
export function Stage({ companion }: StageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
    } catch {
      return; // WebGL not available
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const fog = new THREE.Fog(0x07090e, 10, 80);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);
    camera.position.set(0, 0, 10);

    // 1. Ambient Floating Dust Particles
    const particleCount = 1800;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = Math.random() * 20 - 5;
      positions[i + 2] = 15 - Math.random() * 140;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color(companion.accentHex),
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    // 2. Perspective 3D Floor Grid
    const floor = new THREE.GridHelper(300, 150);
    floor.position.set(0, -3.5, -50);
    const floorMaterial = floor.material as THREE.LineBasicMaterial;
    floorMaterial.color = new THREE.Color(companion.accentHex);
    floorMaterial.transparent = true;
    floorMaterial.opacity = 0.18;
    scene.add(floor);

    // 3. Floating Wireframe Gateway Arches (for Case Studies flight)
    const archGroup = new THREE.Group();
    const archCount = 8;
    for (let i = 0; i < archCount; i++) {
      const archGeom = new THREE.EdgesGeometry(new THREE.BoxGeometry(14, 8, 0.2));
      const archMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(companion.accentHex),
        transparent: true,
        opacity: 0.15 + (i / archCount) * 0.1,
      });
      const arch = new THREE.LineSegments(archGeom, archMat);
      arch.position.set(0, 0.5, -25 - i * 9);
      archGroup.add(arch);
    }
    scene.add(archGroup);

    // 4. Floating Crystalline Polyhedra (for Systems & Sanctuary stages)
    const polyGroup = new THREE.Group();
    const polyCount = 12;
    for (let i = 0; i < polyCount; i++) {
      const polyGeom = new THREE.EdgesGeometry(
        i % 2 === 0 ? new THREE.IcosahedronGeometry(1.2, 0) : new THREE.OctahedronGeometry(1.4, 0)
      );
      const polyMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(companion.accentHex),
        transparent: true,
        opacity: 0.35,
      });
      const poly = new THREE.LineSegments(polyGeom, polyMat);
      const side = i % 2 === 0 ? 1 : -1;
      poly.position.set(
        side * (4.5 + Math.random() * 6),
        Math.random() * 5 - 1,
        -70 - Math.random() * 35
      );
      poly.scale.setScalar(0.4 + Math.random() * 0.8);
      polyGroup.add(poly);
    }
    scene.add(polyGroup);

    // Pointer Parallax
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      pointer.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.targetY = 1 - (e.clientY / window.innerHeight) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Chapter Measure & Camera Stop Planning
    let centres: number[] = [];
    let path: THREE.Vector3[] = [];

    const measureChapters = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      const chapterEls = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      centres = chapterEls.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });

      const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

      // Camera flight stops per chapter
      const stops: Record<string, THREE.Vector3> = {
        hero: v(0, 0, 10),
        "case-studies": v(0, 0.4, -20),
        systems: v(0, 0.2, -50),
        sanctuary: v(0, 0, -80),
        contact: v(0, -0.2, -100),
      };

      path = chapterEls.map((el) => {
        const name = el.dataset.chapter || "hero";
        return stops[name] || stops.hero;
      });

      if (path.length === 0) {
        path = [stops.hero, stops["case-studies"], stops.systems, stops.sanctuary, stops.contact];
      }
    };

    measureChapters();
    const resizeObserver = new ResizeObserver(measureChapters);
    resizeObserver.observe(document.body);

    // Dynamic Animation Loop
    let animationFrameId = 0;
    const currentCameraPos = new THREE.Vector3(0, 0, 10);
    const targetCameraPos = new THREE.Vector3(0, 0, 10);

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.05;
      pointer.y += (pointer.targetY - pointer.y) * 0.05;

      // Scroll fraction calculation
      if (centres.length >= 2) {
        const scrollMid = window.scrollY + window.innerHeight / 2;
        let i = 0;
        while (i < centres.length - 2 && scrollMid > centres[i + 1]) {
          i++;
        }
        const span = Math.max(1, centres[i + 1] - centres[i]);
        const progress = Math.min(1, Math.max(0, (scrollMid - centres[i]) / span));

        // Smooth step
        const smoothProgress = progress * progress * (3 - 2 * progress);

        const from = path[Math.min(i, path.length - 1)];
        const to = path[Math.min(i + 1, path.length - 1)];
        targetCameraPos.lerpVectors(from, to, smoothProgress);
      } else {
        // Fallback smooth scroll calculation
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        const scrollPct = window.scrollY / maxScroll;
        targetCameraPos.set(0, -scrollPct * 0.5, 10 - scrollPct * 110);
      }

      // Smooth camera easing
      currentCameraPos.lerp(targetCameraPos, 0.08);
      camera.position.copy(currentCameraPos);

      // Subtle parallax tilt
      camera.rotation.set(pointer.y * 0.02, -pointer.x * 0.025, 0);

      // Set-piece animations
      dust.position.y = Math.sin(time / 3000) * 0.2;
      for (const p of polyGroup.children) {
        p.rotation.x += 0.005;
        p.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [companion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{
        opacity: 0.9,
        transition: "opacity 0.6s ease",
      }}
    />
  );
}
