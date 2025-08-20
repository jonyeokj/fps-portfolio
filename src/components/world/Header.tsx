'use client';

import { HEADER_CONFIG } from '@/constants';
import { Box, Text } from '@react-three/drei';

type HeaderProps = {
  text: string;
  onHit?: () => void;
  nonShootable?: boolean;
  width?: number;
  height?: number;
  depth?: number;
};

const Header = ({
  text,
  onHit,
  nonShootable = true,
  width = HEADER_CONFIG.width,
  height = HEADER_CONFIG.height,
  depth = HEADER_CONFIG.depth,
}: HeaderProps) => {
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onHit?.();
      }}
      userData={{ nonShootable }}
    >
      <Box args={[width, height, depth]}>
        <meshBasicMaterial color='black' transparent opacity={0.5} />
      </Box>

      <Text
        font={HEADER_CONFIG.fontPath}
        fontSize={HEADER_CONFIG.fontSize}
        color='white'
        anchorX='center'
        anchorY='middle'
        position={[0, 0, depth / 2 + 0.01]}
        maxWidth={width - 0.6}
      >
        {text}
      </Text>
    </group>
  );
};

export default Header;
