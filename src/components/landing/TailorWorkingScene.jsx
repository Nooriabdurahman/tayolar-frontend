import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, Box, Torus, Cylinder, PerspectiveCamera } from '@react-three/drei';
import characterImg from '../../assets/tailor-character.png';

const SceneContent = () => {
    const scissorsRef = useRef();
    const needleRef = useRef();
    const texture = useTexture(characterImg);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Snip snip animation
        if (scissorsRef.current) {
            scissorsRef.current.rotation.z = Math.sin(time * 8) * 0.15; // Fast snipping
        }

        // Floating needle
        if (needleRef.current) {
            needleRef.current.position.y = Math.sin(time) * 0.5 + 1;
            needleRef.current.rotation.x = time * 0.5;
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />

            {/* The Tailor (Central Character) */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                <mesh position={[0, -0.5, 0]}>
                    <planeGeometry args={[4, 5.5]} />
                    <meshBasicMaterial map={texture} transparent opacity={1} />
                </mesh>
            </Float>

            {/* Animated Scissors Tool */}
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                <group ref={scissorsRef} position={[2.5, 0.5, 1]} rotation={[0, 0, -0.5]}>
                    <mesh position={[0, 0.5, 0]}> {/* Handle */}
                        <torusGeometry args={[0.3, 0.05, 16, 32]} />
                        <meshStandardMaterial color="#fbbf24" metalness={0.8} />
                    </mesh>
                    <mesh position={[0, -0.5, 0]}> {/* Handle */}
                        <torusGeometry args={[0.3, 0.05, 16, 32]} />
                        <meshStandardMaterial color="#fbbf24" metalness={0.8} />
                    </mesh>
                    <mesh position={[1, 0, 0]} rotation={[0, 0, 1.57]}> {/* Blades */}
                        <boxGeometry args={[0.1, 2.5, 0.05]} />
                        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
                    </mesh>
                </group>
            </Float>

            {/* Thread Spools */}
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh position={[-2.5, 1.5, 0]} rotation={[0.5, 0, 0]}>
                    <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
                    <meshStandardMaterial color="#ef4444" /> {/* Red Thread */}
                </mesh>
                <mesh position={[-2.8, 1.5, 0]} rotation={[0.5, 0, 0]} scale={[1.1, 0.8, 1.1]}>
                    <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
                    <meshStandardMaterial color="#ef4444" wireframe />
                </mesh>
            </Float>

            {/* Magic Sewing Particles */}
            {[...Array(15)].map((_, i) => (
                <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
                    <mesh position={[
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 6,
                        (Math.random() - 0.5) * 4
                    ]}>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
                    </mesh>
                </Float>
            ))}
        </>
    );
};

const TailorWorkingScene = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <Canvas>
                <React.Suspense fallback={null}>
                    <SceneContent />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default TailorWorkingScene;
