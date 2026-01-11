import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';

function AnimatedSphere() {
    const sphereRef = useRef(null);

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float floatIntensity={2} speed={2} rotationIntensity={1}>
            <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2}>
                <MeshDistortMaterial
                    color="#4f46e5"
                    attach="material"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

function FloatingShape({ position, color, speed }) {
    const meshRef = useRef(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01 * speed;
            meshRef.current.rotation.y += 0.02 * speed;
        }
    });

    return (
        <Float floatIntensity={1.5} speed={speed}>
            <mesh ref={meshRef} position={position}>
                <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
                <meshStandardMaterial color={color} roughness={0.1} metalness={0.6} transparent opacity={0.6} />
            </mesh>
        </Float>
    )
}

const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Main Hero Sphere */}
                <mesh position={[2, 0, -2]}>
                    <AnimatedSphere />
                </mesh>

                {/* Floating Shapes */}
                <FloatingShape position={[-3, 2, -3]} color="#ec4899" speed={1.5} />
                <FloatingShape position={[-2, -2, -1]} color="#06b6d4" speed={2} />
                <FloatingShape position={[3, -2, -4]} color="#eab308" speed={1} />

            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none" />
        </div>
    );
};

export default ThreeBackground;
