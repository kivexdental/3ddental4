import React, { useEffect, useRef, useState } from 'react';

/**
 * DentalCanvas renders the 93-frame 3D dental arch sequence onto a high-DPI HTML5 canvas.
 * Frames: 000.webp to 092.webp
 */
export default function DentalCanvas({
  frameIndex = 0,
  scale = 1,
  positionX = 0,
  positionY = 0,
  onLoaded,
  className = ""
}) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalFrames = 93;
  const isLoadedRef = useRef(false);

  // Preload all 93 frames into memory for instantaneous scrub
  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/frames/frame_${numStr}.webp`;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          isLoadedRef.current = true;
          if (onLoaded) onLoaded();
          drawCurrentFrame(frameIndex);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
      };
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      imagesRef.current = [];
    };
  }, []);

  const drawCurrentFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(index)));
    const img = imagesRef.current[clampedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Compute aspect-ratio cover/contain
    const imgRatio = img.naturalWidth / img.naturalHeight; // 800 / 450 = 1.777
    const canvasRatio = canvas.width / canvas.height;

    let renderW, renderH, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      renderW = canvas.width;
      renderH = canvas.width / imgRatio;
    } else {
      renderH = canvas.height;
      renderW = canvas.height * imgRatio;
    }

    // Apply scale multiplier
    renderW *= scale;
    renderH *= scale;

    offsetX = (canvas.width - renderW) / 2 + positionX * dpr;
    offsetY = (canvas.height - renderH) / 2 + positionY * dpr;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  };

  // Redraw whenever frameIndex, scale, or position change
  useEffect(() => {
    if (imagesRef.current.length === totalFrames) {
      requestAnimationFrame(() => drawCurrentFrame(frameIndex));
    }
  }, [frameIndex, scale, positionX, positionY]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => drawCurrentFrame(frameIndex));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex]);

  return (
    <div className={`relative w-full h-full pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain block transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />
      {loadedCount < totalFrames && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm z-30 transition-opacity duration-300">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-xs font-semibold text-slate-600 tracking-wider uppercase">
            Loading Dental 3D Assets ({Math.round((loadedCount / totalFrames) * 100)}%)
          </p>
        </div>
      )}
    </div>
  );
}
