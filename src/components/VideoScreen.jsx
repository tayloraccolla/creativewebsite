import { useEffect, useRef } from 'react';
import track from '../utils/screen-track.json';

// Screen corners were measured in the original 1920 × 1080, 24 fps clip.
// Keep the photo on the video plane so object-cover cropping stays aligned.
const WIDTH = 1920;
const HEIGHT = 1080;
const PHOTO_W = 120;
const PHOTO_H = 90;

function screenTransform(time) {
  const frame = time * track.fps;
  const nextIndex = track.frames.findIndex((entry) => entry[0] > frame);
  const end = nextIndex < 0 ? track.frames.at(-1) : track.frames[nextIndex];
  const start = nextIndex <= 0 ? end : track.frames[nextIndex - 1];
  const mix = start === end ? 0 : (frame - start[0]) / (end[0] - start[0]);
  const p = start.slice(1).map((value, i) => value + (end[i + 1] - value) * mix);
  const [x0, y0, x1, y1, x2, y2, x3, y3] = p;
  const dx1 = x1 - x2;
  const dx2 = x3 - x2;
  const dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2;
  const dy2 = y3 - y2;
  const dy3 = y0 - y1 + y2 - y3;
  const denominator = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / denominator;
  const h = (dx1 * dy3 - dx3 * dy1) / denominator;
  return `matrix3d(${[
    (x1 - x0 + g * x1) / PHOTO_W, (y1 - y0 + g * y1) / PHOTO_W, 0, g / PHOTO_W,
    (x3 - x0 + h * x3) / PHOTO_H, (y3 - y0 + h * y3) / PHOTO_H, 0, h / PHOTO_H,
    0, 0, 1, 0, x0, y0, 0, 1,
  ].join(',')})`;
}

export default function VideoScreen() {
  const videoRef = useRef(null);
  const planeRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    let callback;
    let disposed = false;
    const resize = () => {
      const scale = Math.max(window.innerWidth / WIDTH, window.innerHeight / HEIGHT);
      planeRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    };
    const update = (time) => {
      if (!disposed) photoRef.current.style.transform = screenTransform(time);
    };
    const onSeek = () => update(video.currentTime);
    const tick = (_now, metadata) => {
      if (disposed) return;
      update(metadata ? metadata.mediaTime : video.currentTime);
      callback = video.requestVideoFrameCallback
        ? video.requestVideoFrameCallback(tick)
        : requestAnimationFrame(tick);
    };
    resize();
    update(video.currentTime);
    video.muted = true;
    video.play().catch(() => {});
    callback = video.requestVideoFrameCallback
      ? video.requestVideoFrameCallback(tick)
      : requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    video.addEventListener('seeked', onSeek);
    return () => {
      disposed = true;
      window.removeEventListener('resize', resize);
      video.removeEventListener('seeked', onSeek);
      if (video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(callback);
      else cancelAnimationFrame(callback);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        poster={`${import.meta.env.BASE_URL}video-poster.jpg`}
        src={`${import.meta.env.BASE_URL}background-video.mp4`}
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        ref={planeRef}
        style={{ position: 'absolute', left: '50%', top: '50%', width: WIDTH, height: HEIGHT, transformOrigin: 'center' }}
      >
        <img
          ref={photoRef}
          src={`${import.meta.env.BASE_URL}screen-swans.png`}
          alt="Two swans forming a heart, displayed on the vintage computer screen"
          draggable="false"
          style={{
            position: 'absolute', left: 0, top: 0, width: PHOTO_W, height: PHOTO_H,
            objectFit: 'cover', borderRadius: 5, transformOrigin: '0 0',
            transform: screenTransform(0), filter: 'sepia(0.12) brightness(1.06)',
            opacity: 0.96,
          }}
        />
      </div>
    </div>
  );
}
