'use client';

import { Box, GradientTexture, Text } from '@react-three/drei';
import { useMemo, useState } from 'react';
import {
  CARD_DIMENSIONS,
  CARD_TYPOGRAPHY,
  CARD_SPACING,
  CARD_BULLETS,
} from '@/constants/card';
import SvgBadge from './SvgBadge';

type CardProps = {
  width: number;
  height: number;
  depth: number;
  header?: string;
  subtext?: string[];
  date?: string;
  logo?: string;
  isLocked?: boolean;
  lockCaption?: string;
  bulletPoints?: boolean;
};

const Card = ({
  width,
  height,
  depth,
  header = 'Header',
  subtext = [],
  date,
  logo,
  isLocked = false,
  lockCaption = 'Locked',
  bulletPoints = true,
}: CardProps) => {
  const { padding, topOffset, logoContentWidth } = CARD_DIMENSIONS;
  const contentWidth = width - padding * 2;
  const {
    fontPath,
    headerSize,
    dateSize,
    bodySize,
    lineHeights: { header: lhHeader, date: lhDate, body: lhBody },
  } = CARD_TYPOGRAPHY;
  const { gapHeaderDate, gapDateBullets, gapBetweenBullets } = CARD_SPACING;
  const { gutter: bulletGutter, indentX: bulletIndentX } = CARD_BULLETS;

  const [headerHeight, setHeaderHeight] = useState(0);
  const [dateHeight, setDateHeight] = useState(0);
  const [bulletHeights, setBulletHeights] = useState<number[]>([]);

  const topY = height / 2 - padding - topOffset;
  const zFront = depth / 2 + 0.001;

  const ensureBulletHeights = useMemo(
    () => (idx: number, h: number) => {
      setBulletHeights((prev) => {
        const next = prev.slice();
        next[idx] = h;
        return next;
      });
    },
    [],
  );

  return (
    <group>
      {/* Background */}
      <Box args={[width, height, depth]} castShadow>
        <meshBasicMaterial toneMapped={false}>
          <GradientTexture stops={[0, 1]} colors={['#0d0d0d', '#595959']} />
        </meshBasicMaterial>
      </Box>

      {/* Lock overlay */}
      {isLocked && (
        <group>
          {/* Lock Icon */}
          <SvgBadge
            src={'/assets/lock.svg'}
            width={0.7}
            position={[0, 0.15, zFront]}
            opacity={1}
          />

          {/* Caption */}
          <Text
            font={fontPath}
            position={[0, -0.4, zFront]}
            fontSize={0.12}
            color='white'
            anchorX='center'
            anchorY='middle'
            lineHeight={1.1}
          >
            {lockCaption}
          </Text>
        </group>
      )}

      {/* Header */}
      <Text
        font={fontPath}
        position={[-width / 2 + padding, topY, zFront]}
        fontSize={headerSize}
        color='white'
        anchorX='left'
        anchorY='top'
        maxWidth={logo ? contentWidth - logoContentWidth : contentWidth}
        textAlign='left'
        lineHeight={lhHeader}
        overflowWrap='break-word'
        whiteSpace='normal'
        onSync={(t) => {
          const s = t.geometry
            .boundingBox!.max.clone()
            .sub(t.geometry.boundingBox!.min);
          setHeaderHeight(s.y);
        }}
      >
        {isLocked ? '???' : header}
      </Text>

      {logo && (
        <SvgBadge
          src={logo!}
          width={width * 0.1}
          position={[width / 2 - 0.35, height / 2 - 0.35, zFront]}
          opacity={logo ? (isLocked ? 0 : 1) : 0}
        />
      )}

      {/* Date */}
      {date && (
        <Text
          font={fontPath}
          position={[
            -width / 2 + padding,
            topY - headerHeight - gapHeaderDate,
            zFront,
          ]}
          fontSize={dateSize}
          color='lightgray'
          anchorX='left'
          anchorY='top'
          maxWidth={contentWidth}
          textAlign='left'
          lineHeight={lhDate}
          overflowWrap='break-word'
          whiteSpace='normal'
          onSync={(t) => {
            const s = t.geometry
              .boundingBox!.max.clone()
              .sub(t.geometry.boundingBox!.min);
            setDateHeight(s.y);
          }}
        >
          {isLocked ? '???' : date}
        </Text>
      )}

      {/* Bullet list */}
      {subtext.length > 0 &&
        !isLocked &&
        subtext.map((pt, i) => {
          const bulletsStartY =
            topY -
            headerHeight -
            (date ? gapHeaderDate + dateHeight : 0) -
            gapDateBullets;

          const prevHeights = bulletHeights
            .slice(0, i)
            .reduce((a, b) => a + b, 0);
          const y = bulletsStartY - prevHeights - i * gapBetweenBullets;

          return (
            <group key={i}>
              {/* Bullet dot */}
              {bulletPoints && (
                <Text
                  font={fontPath}
                  position={[-width / 2 + padding + bulletIndentX, y, zFront]}
                  fontSize={bodySize * 0.9}
                  color='white'
                  anchorX='left'
                  anchorY='top'
                  lineHeight={lhBody}
                >
                  •
                </Text>
              )}

              {/* Bullet text */}
              <Text
                font={fontPath}
                position={[
                  -width / 2 + padding + (bulletPoints ? bulletGutter : 0),
                  y,
                  zFront,
                ]}
                fontSize={bodySize}
                color='lightgray'
                anchorX='left'
                anchorY='top'
                maxWidth={contentWidth - (bulletPoints ? bulletGutter : 0)}
                textAlign='left'
                lineHeight={lhBody}
                overflowWrap='break-word'
                whiteSpace='normal'
                onSync={(t) => {
                  const s = t.geometry
                    .boundingBox!.max.clone()
                    .sub(t.geometry.boundingBox!.min);
                  ensureBulletHeights(i, s.y);
                }}
              >
                {pt}
              </Text>
            </group>
          );
        })}
    </group>
  );
};

export default Card;
