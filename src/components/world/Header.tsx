'use client';

import { HEADER_CONFIG } from '@/constants';
import { Box, Text } from '@react-three/drei';

type HeaderProps = {
  text: string;
  onHit?: () => void;
};

const Header = ({ text, onHit }: HeaderProps) => {
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onHit?.();
      }}
    >
      <Box
        args={[HEADER_CONFIG.width, HEADER_CONFIG.height, HEADER_CONFIG.depth]}
      >
        <meshBasicMaterial color='black' transparent opacity={0.5} />
      </Box>

      <Text
        font={HEADER_CONFIG.fontPath}
        fontSize={HEADER_CONFIG.fontSize}
        color='white'
        anchorX='center'
        anchorY='middle'
        position={[0, 0, HEADER_CONFIG.depth / 2 + 0.01]}
        maxWidth={HEADER_CONFIG.width - 0.6}
      >
        {text}
      </Text>
    </group>
  );
};

export default Header;
