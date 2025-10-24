import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Model() {
  const ref = useRef();
  const { scene } = useGLTF('/ptype5.glb');

  useEffect(() => {
    if (!ref.current) return;
    // rotate model so it's upright (90 degrees on Z axis)
    ref.current.rotation.y = Math.PI / 2;
    // ref.current.rotation.x = Math.PI/2;
    // compute bounding box and center model (after rotation)
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z);
    // increase multiplier to zoom in more
    const scale = maxAxis > 0 ? (2.4 / maxAxis) : 1;
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
    <Canvas className="w-full h-full" camera={{ position: [0, 0, 0.6], fov: 40 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <Model />
      <OrbitControls enablePan={false} enableZoom={true} target={[0, 0, 0]} />
    </Canvas>
  );
}