'use client';

import * as THREE from 'three';

type NavArrowProps = {
  direction: -1 | 1; // -1 = left, 1 = right
  onToggle: (dir: -1 | 1) => void;
  radius?: number;
};

const NavArrow = ({ direction, onToggle, radius = 0.3 }: NavArrowProps) => {
  // Simple flat triangle shape
  const triangleShape = new THREE.Shape();
  triangleShape.moveTo(0, radius * 0.4);
  triangleShape.lineTo(-radius * 0.4, -radius * 0.4);
  triangleShape.lineTo(radius * 0.4, -radius * 0.4);
  triangleShape.closePath();

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        onToggle(direction);
      }}
    >
      {/* Circle */}
      <circleGeometry args={[radius, 32]} />
      <meshBasicMaterial color='black' transparent opacity={0.5} />

      {/* Arrow */}
      <mesh
        position={[direction === 1 ? 0.025 : -0.025, 0, 0.0001]}
        scale={[0.8, 0.8, 1]}
        rotation={[0, 0, direction === 1 ? -Math.PI / 2 : Math.PI / 2]}
        userData={{ nonShootable: true }}
      >
        <shapeGeometry args={[triangleShape]} />
        <meshBasicMaterial color='white' side={THREE.DoubleSide} />
      </mesh>
    </mesh>
  );
};

export default NavArrow;
