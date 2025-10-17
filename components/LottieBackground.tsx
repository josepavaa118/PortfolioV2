"use client";

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

const LOTTIE_PATH = '/animations/background-looping.json';

export default function LottieBackground() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    fetch(LOTTIE_PATH)
      .then(res => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  if (!animationData) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <Lottie 
        animationData={animationData}
        loop
        autoplay
        style={{ width: '100vw', height: '100vh' }}
        rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
      />
    </div>
  );
}
