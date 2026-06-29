"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const WALK_FRAMES = [
  "/mascot/frames-optimized/walk-1.webp",
  "/mascot/frames-optimized/walk-2.webp",
  "/mascot/frames-optimized/walk-3.webp",
  "/mascot/frames-optimized/walk-4.webp",
] as const;
const IDLE_FRAME = "/mascot/frames-optimized/idle-1.webp";
const WALK_DISTANCE = 180;
const WALK_DURATION_MS = 900;
const FRAME_DURATION_MS = 120;
const MASCOT_IMAGE_SIZES = "(min-width: 640px) 128px, 96px";
const SMALL_MASCOT_SIZE = 96;
const LARGE_MASCOT_SIZE = 128;
const SMALL_PAGE_PADDING = 8;
const LARGE_PAGE_PADDING = 16;
const SMALL_BREAKPOINT = 640;

type PasswordMascotProps = {
  onGenerate: () => void;
};

export function PasswordMascot({ onGenerate }: PasswordMascotProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const [facingDirection, setFacingDirection] = useState<1 | -1>(1);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [position, setPosition] = useState(0);
  const walkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isWalking) {
      return;
    }

    const frameInterval = window.setInterval(() => {
      setFrameIndex((index) => (index + 1) % WALK_FRAMES.length);
    }, FRAME_DURATION_MS);

    return () => window.clearInterval(frameInterval);
  }, [isWalking]);

  useEffect(
    () => () => {
      if (walkTimeoutRef.current) {
        clearTimeout(walkTimeoutRef.current);
        walkTimeoutRef.current = null;
      }
    },
    [],
  );

  const walk = () => {
    if (isWalking) {
      return;
    }

    onGenerate();

    const isLargeViewport = window.innerWidth >= SMALL_BREAKPOINT;
    const mascotSize = isLargeViewport ? LARGE_MASCOT_SIZE : SMALL_MASCOT_SIZE;
    const pagePadding = isLargeViewport ? LARGE_PAGE_PADDING : SMALL_PAGE_PADDING;
    const maxPosition = Math.max(
      0,
      window.innerWidth - mascotSize - pagePadding * 2,
    );
    const walkingDirection = direction;
    const walkDistance = Math.min(WALK_DISTANCE, Math.max(maxPosition * 0.6, 0));
    let nextDirection = walkingDirection;
    let nextPosition = position + walkDistance * walkingDirection;

    if (nextPosition >= maxPosition) {
      nextPosition = maxPosition;
      nextDirection = -1;
    } else if (nextPosition <= 0) {
      nextPosition = 0;
      nextDirection = 1;
    }

    setFacingDirection(walkingDirection);
    setFrameIndex(0);
    setIsWalking(true);
    setPosition(nextPosition);
    walkTimeoutRef.current = setTimeout(() => {
      setDirection(nextDirection);
      setIsWalking(false);
      setFrameIndex(0);
      walkTimeoutRef.current = null;
    }, WALK_DURATION_MS);
  };

  return (
    <button
      type="button"
      aria-label="Generate password with mascot"
      className="fixed bottom-24 left-2 z-40 size-24 cursor-pointer drop-shadow-[0_10px_12px_rgb(0_0_0/25%)] transition-transform ease-linear motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:bottom-6 sm:left-4 sm:size-32"
      style={{
        transform: `translateX(${position}px)`,
        transitionDuration: isWalking ? `${WALK_DURATION_MS}ms` : "200ms",
      }}
      onClick={walk}
    >
      <Image
        src={IDLE_FRAME}
        alt=""
        fill
        sizes={MASCOT_IMAGE_SIZES}
        loading="eager"
        className="pointer-events-none object-contain"
        style={{
          opacity: isWalking ? 0 : 1,
          transform: `scaleX(${facingDirection})`,
        }}
      />
      {WALK_FRAMES.map((frame, index) => (
        <Image
          key={frame}
          src={frame}
          alt=""
          fill
          sizes={MASCOT_IMAGE_SIZES}
          loading="eager"
          className="pointer-events-none object-contain"
          style={{
            opacity: isWalking && frameIndex === index ? 1 : 0,
            transform: `scaleX(${facingDirection})`,
          }}
        />
      ))}
    </button>
  );
}
