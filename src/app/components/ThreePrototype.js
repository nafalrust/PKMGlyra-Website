import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useRef } from 'react';

function Model() {
  const ref = useRef();
  const { scene } = useGLTF('/glyra.glb');
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01; // putar otomatis
    }
  });
  return <primitive object={scene} ref={ref} />;
}

export default function ModelPrototype() {
  return (
    <Canvas
      style={{ width: 300, height: 300, background: '#f3f3f3' }}
      camera={{ position: [20, 40, 5], fov: 400 }} // zoom out
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 2]} />
      <Model />
      <OrbitControls enablePan={false} enableZoom={true} />
    </Canvas>
  );
}