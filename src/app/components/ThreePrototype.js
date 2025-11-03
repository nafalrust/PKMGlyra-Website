import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Model() {
  const ref = useRef();
  const { scene } = useGLTF('/final.glb');

  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.PI / 2;
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);
    // increase multiplier to zoom in more
    // const scale = maxAxis > 0 ? (2.4 / maxAxis) : 1;
    const scale = 1;
    ref.current.scale.setScalar(scale);
    // re-center to origin
    ref.current.position.x = -center.x * scale;
    ref.current.position.y = -center.y * scale;
    ref.current.position.z = -center.z * scale;
  }, [scene]);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01; // putar otomatis
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelPrototype() {
  return (
    <Canvas
  className="w-full h-full"
  camera={{ position: [0.185, 0.185, 0.185], fov: 40 }}
>
    {/* Cahaya lembut umum */}
    <ambientLight intensity={0.6} />

    {/* Cahaya utama dari arah tertentu */}
    <directionalLight
      position={[5, 5, 5]}
      intensity={1.2}
      castShadow
    />

    {/* Cahaya tambahan dari sisi lain untuk isi bayangan */}
    <directionalLight
      position={[-5, 2, 2]}
      intensity={0.5}
    />

    {/* Sedikit cahaya langit (opsional tapi cantik) */}
    <hemisphereLight
      skyColor={"#ffffff"}
      groundColor={"#666666"}
      intensity={0.8}
    />

    {/* Environment HDRI dari drei (buat pantulan lebih realistis) */}
    <Environment preset="city" />

    <Model />

    <OrbitControls enablePan={false} enableZoom={false} target={[0, 0, 0]} />
  </Canvas>
  );
}