'use client';

import { RoundedBox, Text } from '@react-three/drei';

type CardProps = {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  header?: string;
  subtext?: string;
};

export default function Card({
  width = 1.2,
  height = 1.8,
  depth = 0.02,
  color = 'grey',
  header = 'Header',
  subtext = 'Subtext goes here',
}: CardProps) {
  const padding = 0.1;

  return (
    <group>
      {/* Card Background */}
      <RoundedBox args={[width, height, depth]} radius={0.08} smoothness={4}>
        <meshStandardMaterial attach='material' color={color} />
      </RoundedBox>

      {/* Header Text */}
      <Text
        position={[
          -width / 2 + padding,
          height / 2 - padding - 0.1,
          depth / 2 + 0.001,
        ]}
        fontSize={0.15}
        color='white'
        anchorX='left'
        anchorY='top'
      >
        {header}
      </Text>

      {/* Subtext */}
      <Text
        position={[
          -width / 2 + padding,
          height / 2 - padding - 0.35,
          depth / 2 + 0.001,
        ]}
        fontSize={0.12}
        color='lightgrey'
        anchorX='left'
        anchorY='top'
        maxWidth={width - padding * 2}
        lineHeight={1.2}
      >
        {subtext}
      </Text>
    </group>
  );
}
