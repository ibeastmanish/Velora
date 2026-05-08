import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function AbstractGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Compass Rings (Wireframe)
    const createRing = (radius: number, color: number, rotationX: number) => {
      const geometry = new THREE.TorusGeometry(radius, 0.005, 16, 100);
      const material = new THREE.MeshBasicMaterial({ 
        color, 
        transparent: true, 
        opacity: 0.25 
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = rotationX;
      return ring;
    };

    const ring1 = createRing(2, 0xD4A3A3, Math.PI / 2); // Rose
    const ring2 = createRing(2, 0x8DA399, Math.PI / 4); // Sage
    const ring3 = createRing(2, 0xC47F6B, -Math.PI / 4); // Clay
    
    const compassGroup = new THREE.Group();
    compassGroup.add(ring1, ring2, ring3);
    scene.add(compassGroup);

    // Soft Light Trails (Particles)
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const accentColors = [
      new THREE.Color(0xD4A3A3),
      new THREE.Color(0x8DA399),
      new THREE.Color(0xC47F6B),
      new THREE.Color(0xD4B16A)
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + (Math.random() - 0.5) * 0.1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const color = accentColors[Math.floor(Math.random() * accentColors.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      compassGroup.rotation.y += 0.0015;
      compassGroup.rotation.z += 0.0005;
      particles.rotation.y += 0.002;
      particles.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: 0.6 }}
    />
  );
}
