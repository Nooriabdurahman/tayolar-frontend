import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Cylinder, Box, Torus, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Stylized Scissors Component
function Scissors({ position, rotation }) {
    const group = useRef();
    const blade1 = useRef();
    const blade2 = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Scissor cutting animation
        const angle = Math.sin(t * 3) * 0.2 + 0.2;
        blade1.current.rotation.z = angle;
        blade2.current.rotation.z = -angle;

        // Float gently
        group.current.position.y = position[1] + Math.sin(t) * 0.1;
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={0.5}>
            <group ref={blade1} position={[0, 0, 0]}>
                <Box args={[0.2, 3, 0.05]} position={[0, 1.5, 0]} rotation={[0, 0, -0.1]}>
                    <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
                </Box>
                <Torus args={[0.3, 0.05, 16, 32]} position={[0, -0.2, 0]}>
                    <meshStandardMaterial color="#334155" />
                </Torus>
            </group>
            <group ref={blade2} position={[0, 0, 0.06]}>
                <Box args={[0.2, 3, 0.05]} position={[0, 1.5, 0]} rotation={[0, 0, 0.1]}>
                    <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
                </Box>
                <Torus args={[0.3, 0.05, 16, 32]} position={[0, -0.2, 0]}>
                    <meshStandardMaterial color="#334155" />
                </Torus>
            </group>
            <Cylinder args={[0.05, 0.05, 0.2, 8]} rotation={[1.57, 0, 0]} position={[0, 0.5, 0.03]}>
                <meshStandardMaterial color="#000" />
            </Cylinder>
        </group>
    );
}

// Stylized Needle and Thread
function NeedleThread({ position }) {
    const group = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        group.current.position.y = position[1] + Math.cos(t * 1.5) * 0.2;
        group.current.rotation.z = Math.sin(t) * 0.2;
    });

    return (
        <group ref={group} position={position} scale={0.4}>
            {/* Needle */}
            <Cylinder args={[0.02, 0.01, 3, 8]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#e2e8f0" metalness={0.8} roughness={0.2} />
            </Cylinder>
            {/* Thread Loop (Torus) */}
            <Torus args={[0.8, 0.02, 16, 50, 4]} position={[0.5, 1.5, 0]} rotation={[0, 0, 1]}>
                <meshStandardMaterial color="#f43f5e" emissive="#f43f5e" emissiveIntensity={0.2} />
            </Torus>
        </group>
    )
}

// Stylized Fabric Roll
function FabricRoll({ position, color, rotation }) {
    return (
        <group position={position} rotation={rotation} scale={0.8}>
            <Cylinder args={[1, 1, 4, 32]} rotation={[0, 0, 1.57]}>
                <MeshDistortMaterial color={color} distort={0.2} speed={1} roughness={0.6} />
            </Cylinder>
            <Cylinder args={[0.2, 0.2, 4.1, 16]} rotation={[0, 0, 1.57]}>
                <meshStandardMaterial color="#f1f5f9" />
            </Cylinder>
        </group>
    )
}

const Tailor3DScene = () => {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} intensity={1.5} angle={0.3} penumbra={1} />
                <pointLight position={[-10, -5, 5]} intensity={1} color="#6366f1" />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <Scissors position={[-2, 0, 0]} rotation={[0, 0.5, 0.2]} />
                    <NeedleThread position={[2, 0.5, 0]} />
                    <FabricRoll position={[0, -2, -2]} color="#4f46e5" rotation={[0.5, 0.5, 0]} />

                    {/* Decorative Spheres (Buttons) */}
                    <mesh position={[1.5, -1.5, 1]}>
                        <sphereGeometry args={[0.2, 32, 32]} />
                        <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.2} />
                    </mesh>
                    <mesh position={[1.8, -1.2, 0.5]}>
                        <sphereGeometry args={[0.15, 32, 32]} />
                        <meshStandardMaterial color="#ec4899" metalness={0.6} roughness={0.2} />
                    </mesh>
                </Float>
            </Canvas>
        </div>
    );
};

export default Tailor3DScene;
