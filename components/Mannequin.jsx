// MannequinZoom3D.jsx
// React + react-three-fiber component that loads a glTF mannequin, lets you click body parts
// to zoom the camera to that part, and uses GSAP to animate DOM "cards" that appear.
// Requirements: react, react-dom, three, @react-three/fiber, @react-three/drei, gsap, tailwindcss

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// -------------------------
// Hardcoded camera positions & look targets (tweak these to fit your model)
// -------------------------
const PART_CAM_POSITIONS = {
  head: { pos: [0, 1.85, 0.7], lookAt: [0, 1.7, 0] },
  torso: { pos: [0, 1.2, 1.5], lookAt: [0, 1.2, 0] },
  leftArm: { pos: [-1.1, 1.35, 1.5], lookAt: [-0.6, 1.3, 0] },
  rightArm: { pos: [1.1, 1.35, 1.5], lookAt: [0.6, 1.3, 0] },
  leftLeg: { pos: [-0.6, 0.3, 2.2], lookAt: [-0.3, 0.3, 0] },
  rightLeg: { pos: [0.6, 0.3, 2.2], lookAt: [0.3, 0.3, 0] },
  body: { pos: [0, 1.3, 2.6], lookAt: [0, 1.1, 0] },
  default: { pos: [0, 1.6, 3], lookAt: [0, 1.3, 0] },
};
// -------------------------
// Helper: camera animator using GSAP
// -------------------------
function animateCameraTo(camera, controls, targetPos, targetLookAt, onComplete) {
  if (!camera || !controls) return;

  gsap.killTweensOf([camera.position, controls.target]);

  gsap.to(camera.position, {
    x: targetPos.x,
    y: targetPos.y,
    z: targetPos.z,
    duration: 0.5,
    ease: 'power3.out',
    onUpdate: () => camera.updateProjectionMatrix(),
    onComplete: () => onComplete && onComplete(),
  });

  gsap.to(controls.target, {
    x: targetLookAt.x,
    y: targetLookAt.y,
    z: targetLookAt.z,
    duration: 0.5,
    ease: 'power3.out',
    onUpdate: () => controls.update(),
  });
}

// -------------------------
// Component that renders the GLTF model and builds a simple name map
// -------------------------
function Mannequin({ modelUrl }) {
  const gltf = useGLTF(modelUrl, true);

  // simple traversal log (optional) — you can remove in production
  useEffect(() => {
    if (!gltf) return;
    gltf.scene.traverse((node) => {
      if (node.isMesh) {
        // console.log('mesh', node.name, node.userData);
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} dispose={null} />;
}

// -------------------------
// Main Viewer
// -------------------------
export default function MannequinZoom3D({ modelUrl }) {
  const [selectedPart, setSelectedPart] = useState(null);
  const cardsRef = useRef(null);
  const controlsRef = useRef();
  const cameraRef = useRef();
  const lastClickedRef = useRef(null);

  // Animate cards in/out when selectedPart changes
  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    gsap.killTweensOf(el.children);

    if (selectedPart) {
      gsap.fromTo(
        Array.from(el.children),
        { y: 10, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.33, stagger: 0.06, ease: 'power2.out' }
      );
    } else {
      gsap.to(Array.from(el.children), { y: 6, opacity: 0, scale: 0.98, duration: 0.18, stagger: 0.03, ease: 'power2.in' });
    }
  }, [selectedPart]);

  // moveCamera uses the hardcoded map
  function moveCameraToPart(partKey) {
    const data = PART_CAM_POSITIONS[partKey] || PART_CAM_POSITIONS.default;
    const cam = cameraRef.current;
    const controls = controlsRef.current;
    if (!cam || !controls) return;

    const targetPos = new THREE.Vector3(...data.pos);
    const targetLookAt = new THREE.Vector3(...data.lookAt);

    animateCameraTo(cam, controls, targetPos, targetLookAt, () => {
      // set selected part after animation for clarity
      setSelectedPart(partKey === 'default' ? null : partKey);
    });
  }

  // reset camera to default
  function resetCamera() {
    moveCameraToPart('default');
    lastClickedRef.current = null;
  }

  // keep existing pointer-based selection as a fallback (still attempts heuristics)
  function handlePointerDown(e) {
    const inter = e.intersections && e.intersections[0];
    if (!inter) return;

    const obj = inter.object;
    const name = (obj.name || '').toLowerCase();
    let partKey = null;

    if (name.includes('head')) partKey = 'head';
    else if (name.includes('torso') || name.includes('chest') || name.includes('spine')) partKey = 'torso';
    else if (name.includes('left') && (name.includes('arm') || name.includes('shoulder'))) partKey = 'leftArm';
    else if (name.includes('right') && (name.includes('arm') || name.includes('shoulder'))) partKey = 'rightArm';
    else if (name.includes('arm')) partKey = 'rightArm';
    else if (name.includes('left') && (name.includes('leg') || name.includes('thigh') || name.includes('calf'))) partKey = 'leftLeg';
    else if (name.includes('right') && (name.includes('leg') || name.includes('thigh') || name.includes('calf'))) partKey = 'rightLeg';
    else if (name.includes('leg') || name.includes('thigh') || name.includes('calf')) partKey = 'rightLeg';
    else partKey = 'body';

    // toggle behavior
    if (lastClickedRef.current === partKey) {
      setSelectedPart((s) => (s === partKey ? null : partKey));
      lastClickedRef.current = null;
      resetCamera();
    } else {
      lastClickedRef.current = partKey;
      moveCameraToPart(partKey);
    }
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        onPointerDown={handlePointerDown}
        className="rounded-lg"
        camera={{ position: PART_CAM_POSITIONS.default.pos, fov: 50 }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera ref={cameraRef} makeDefault position={PART_CAM_POSITIONS.default.pos} />

          {/* Lights */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

          <OrbitControls ref={controlsRef} enablePan={false} maxPolarAngle={Math.PI / 1.6} />

          <Mannequin modelUrl={modelUrl} />

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[6, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.0} />
          </mesh>
        </Suspense>
      </Canvas>

      {/* UI: Hardcoded body-part buttons + Reset */}
      <div className="absolute left-4 top-4 flex flex-col gap-2 z-40">
        <button
          className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm"
          onClick={() => moveCameraToPart('head')}
        >
          Head
        </button>
        <button
          className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm"
          onClick={() => moveCameraToPart('torso')}
        >
          Torso
        </button>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm"
            onClick={() => moveCameraToPart('leftArm')}
          >
            Left Arm
          </button>
          <button
            className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm"
            onClick={() => moveCameraToPart('rightArm')}
          >
            Right Arm
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm"
            onClick={() => moveCameraToPart('leftLeg')}
          >
            Left Leg
          </button>
          <button
            className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm"
            onClick={() => moveCameraToPart('rightLeg')}
          >
            Right Leg
          </button>
        </div>
        <button
          className="px-3 py-1 rounded-md bg-white/90 shadow pointer-events-auto text-sm mt-1"
          onClick={resetCamera}
        >
          Reset
        </button>
      </div>

      {/* DOM overlay for cards (animated with GSAP) */}
      <div className="absolute right-6 top-6 w-80 pointer-events-none z-40">
        <div ref={cardsRef} className="space-y-3">
          {selectedPart ? (
            <div className="pointer-events-auto bg-white/95 dark:bg-slate-900/90 rounded-xl p-4 shadow-2xl">
              <h3 className="text-lg font-semibold">{selectedPart}</h3>
              <p className="text-sm mt-2">Quick info about the {selectedPart} use this area to show anatomy, measurements, or controls.</p>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 rounded-md bg-sky-500 text-white text-sm">Action</button>
                <button className="px-3 py-1 rounded-md border text-sm">More</button>
              </div>
            </div>
          ) : (
            <div className="pointer-events-auto bg-white/90 dark:bg-slate-900/80 rounded-xl p-3 shadow">
              <p className="text-sm">Click a body part (head, torso, limbs) to zoom in and view details, or use the buttons on the left.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/*
Usage notes (short):
- Provide a glTF/GLB URL to the `modelUrl` prop (ideally a lightweight exported mannequin with reasonable node names).
- Hardcoded camera positions are defined in PART_CAM_POSITIONS — tweak them to line up with your model visually.
- The UI provides buttons for each part and a Reset button. Pointer-based raycast selection is preserved as a fallback.
- For snappy UX: use small animation durations (0.35-0.6s), enable draco compression on the GLB, and reduce polygon count.
*/