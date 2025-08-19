'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Card from './Card';
import NavArrow from './NavArrow';
import {
  CARD_ANIMATION,
  CARD_DIMENSIONS,
  NAV_ARROW,
} from '@/constants';
import { useUnlockStore } from '@/stores/unlockStore';

type Item = {
  id: string;
  width?: number;
  height?: number;
  depth?: number;
  header?: string;
  date?: string;
  subtext?: string[];
  threshold?: number;
};

type CardGroupProps = {
  items: Item[]; // 1..5
  radiusX?: number;
  radiusZ?: number;
  centerZ?: number;
};

const CardGroup = ({
  items,
  radiusX = 3,
  radiusZ = 1,
  centerZ = 2,
}: CardGroupProps) => {
  const list = items.slice(0, 5);
  const n = list.length;

  const [targetIndex, setTargetIndex] = useState(0);
  const animatedIndex = useRef(0);
  const groupsRef = useRef<(THREE.Group | null)[]>([]);
  const dimRefs = useRef<
    (THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null)[]
  >([]);

  const unlockedMap = useUnlockStore((s) => s.unlocked);
  const listIds = useMemo(() => list.map((x) => x.id), [list]);
  const prevUnlockedRef = useRef<Map<string, boolean>>(new Map());

  const step = (2 * Math.PI) / n;

  // Watches unlock state changes, update carousel target index to the unlocked card
  useEffect(() => {
    for (let i = 0; i < listIds.length; i++) {
      const id = listIds[i];
      const prev = prevUnlockedRef.current.get(id) ?? false;
      const curr = !!unlockedMap[id];

      if (!prev && curr) {
        const current = ((targetIndex % n) + n) % n; // normalize to 0..n-1
        let target = i;

        // Ensure that carousel takes the shortest path clockwise or anti-clockwise
        const diff = target - current;
        if (diff > n / 2) {
          target -= n;
        } else if (diff < -n / 2){
          target += n;
        }

        setTargetIndex(targetIndex + (target - current)); 
        break;
      }
    }

    for (const id of listIds) {
      prevUnlockedRef.current.set(id, !!unlockedMap[id]);
    }
  }, [unlockedMap, listIds, n, targetIndex]);

  // Animate carousel rotation, position, rotation, and scale smoothly each frame
  useFrame((_, delta) => {
    animatedIndex.current = THREE.MathUtils.damp(
      animatedIndex.current,
      targetIndex,
      6,
      delta,
    );

    if (Math.abs(animatedIndex.current - targetIndex) < 0.02) {
      animatedIndex.current = targetIndex;
    }

    for (let i = 0; i < n; i++) {
      const g = groupsRef.current[i];
      const dimMesh = dimRefs.current[i];
      if (!g) continue;

      // Geometry math
      const angle = (i - animatedIndex.current) * step; // position around carousel
      const tx = Math.sin(angle) * radiusX; // target X position
      const tz = centerZ - Math.cos(angle) * radiusZ; // target Z position
      const targetYaw = -Math.atan2(tx, Math.abs(tz) + 0.0001) * 0.2; // inward rotation toward center

      // Focus and scale
      const focus = Math.max(0, Math.cos(angle)); // 1 at center, 0 at back
      const tScale = 1 + focus * CARD_ANIMATION.scaleBoost;
      const s = THREE.MathUtils.damp(
        g.scale.x,
        tScale,
        CARD_ANIMATION.dampScale,
        delta,
      );
      g.scale.setScalar(s);

      // Dim overlay
      const isLocked = !unlockedMap[list[i].id];
      if (dimMesh) {
        if (isLocked) {
          dimMesh.material.opacity = 0.45;
        } else {
          dimMesh.material.opacity = 0.45 * (1 - focus);
        }
      }

      // Animation damping
      g.position.x = THREE.MathUtils.damp(
        g.position.x,
        tx,
        CARD_ANIMATION.dampPos,
        delta,
      );
      g.position.y = THREE.MathUtils.damp(
        g.position.y,
        0,
        CARD_ANIMATION.dampPos,
        delta,
      );
      g.position.z = THREE.MathUtils.damp(
        g.position.z,
        -tz,
        CARD_ANIMATION.dampPos,
        delta,
      );
      g.rotation.y = THREE.MathUtils.damp(
        g.rotation.y,
        targetYaw,
        CARD_ANIMATION.dampPos,
        delta,
      );
    }
  });

  const navArrowLeftX = -(radiusX + NAV_ARROW.offsetX);
  const navArrowRightX = radiusX + NAV_ARROW.offsetX;
  const navArrowY = NAV_ARROW.y;
  const navArrowZ = -centerZ + NAV_ARROW.zOffset;

  if (n === 0) return null;

  return (
    <group>
      {/* Navigation arrows */}
      <group position={[navArrowLeftX, navArrowY, navArrowZ]}>
        <NavArrow
          direction={-1}
          onToggle={() => setTargetIndex((t) => t - 1)}
        />
      </group>
      <group position={[navArrowRightX, navArrowY, navArrowZ]}>
        <NavArrow direction={1} onToggle={() => setTargetIndex((t) => t + 1)} />
      </group>

      {/* Card groups */}
      {list.map((it, i) => {
        const angle = i * step;
        const x = Math.sin(angle) * radiusX;
        const z = centerZ - Math.cos(angle) * radiusZ;

        const w = CARD_DIMENSIONS.width;
        const h = CARD_DIMENSIONS.height;
        const d = CARD_DIMENSIONS.depth;

        const isLocked = !unlockedMap[it.id];
        const need = it.threshold;
        const lockCaption = need ? `Score ${need} to unlock` : 'Locked';

        return (
          <group
            key={it.header ?? i}
            ref={(el) => (groupsRef.current[i] = el)}
            position={[x, 0, -z]}
            rotation={[0, 0, 0]}
            scale={[1, 1, 1]}
            userData={{ nonShootable: true }}
          >
            {/* Card */}
            <Card
              width={w}
              height={h}
              depth={d}
              {...it}
              isLocked={isLocked}
              lockCaption={lockCaption}
            />

            {/* Side dim overlay */}
            <mesh
              ref={(el) =>
                (dimRefs.current[i] = el as THREE.Mesh<
                  THREE.PlaneGeometry,
                  THREE.MeshBasicMaterial
                > | null)
              }
              position={[0, 0, d / 2 + 0.002]}
              renderOrder={10}
            >
              <planeGeometry args={[w, h]} />
              <meshBasicMaterial color='black' transparent opacity={0} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default CardGroup;
