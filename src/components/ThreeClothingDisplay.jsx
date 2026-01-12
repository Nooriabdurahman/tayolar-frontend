import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Cylinder, Sphere, PerspectiveCamera, OrbitControls, Image } from '@react-three/drei';

const Mannequin = ({ color = "#4f46e5", image }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y += 0.005; // Slow rotation display
        }
    });

    if (image) {
        return (
            <group ref={ref} position={[0, -0.5, 0]}>
                {/* Pedestal */}
                <mesh position={[0, -2.1, 0]}>
                    <cylinderGeometry args={[1.5, 1.8, 0.2, 32]} />
                    <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
                </mesh>
                <mesh position={[0, -2.0, 0]}>
                    <cylinderGeometry args={[1.3, 1.3, 0.1, 32]} />
                    <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.5} />
                </mesh>

                {/* The "3D" Cloth Display */}
                <group position={[0, 0, 0]}>
                    {/* Front View */}
                    <Image
                        url={image}
                        transparent
                        opacity={1}
                        scale={[3.2, 4.2, 1]}
                        position={[0, 0, 0.05]}
                    />
                    {/* Back View (Mirrored for better effect) */}
                    <Image
                        url={image}
                        transparent
                        opacity={0.8}
                        scale={[3.2, 4.2, 1]}
                        position={[0, 0, -0.05]}
                        rotation={[0, Math.PI, 0]}
                    />

                    {/* Decorative aura */}
                    <mesh position={[0, 0, 0]}>
                        <planeGeometry args={[3.5, 4.5]} />
                        <meshBasicMaterial color="#6366f1" transparent opacity={0.05} />
                    </mesh>
                </group>
            </group>
        );
    }

    return (
        <group ref={ref} position={[0, -1, 0]}>
            {/* Stand */}
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.1, 0.4, 0.2, 32]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
            </mesh>
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 4, 16]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>

            {/* Torso (Abstract) */}
            <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.5, 0.3, 1.5, 32]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
            </mesh>

            {/* Shoulders */}
            <mesh position={[0, 3.25, 0]}>
                <sphereGeometry args={[0.55, 32, 16]} />
                <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
            </mesh>

            {/* The "Clothes" - A Semi-transparent overlay representing fabric */}
            <mesh position={[0, 2.6, 0]} scale={[1.1, 1, 1.1]}>
                <cylinderGeometry args={[0.52, 0.32, 1.4, 32]} />
                <meshStandardMaterial color={color} transparent opacity={0.7} side={2} />
            </mesh>
            {/* Sleeves */}
            <mesh position={[-0.6, 3.1, 0]} rotation={[0, 0, 0.5]}>
                <cylinderGeometry args={[0.15, 0.2, 0.6, 32]} />
                <meshStandardMaterial color={color} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.6, 3.1, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.15, 0.2, 0.6, 32]} />
                <meshStandardMaterial color={color} transparent opacity={0.7} />
            </mesh>

        </group>
    );
};

const ThreeClothingDisplay = ({ color, image }) => {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 1, 5]} />
                <ambientLight intensity={0.7} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -5, -10]} color={color || "#4f46e5"} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <Mannequin color={color} image={image} />
                </Float>

                <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
        </div>
    );
};

export default ThreeClothingDisplay;
