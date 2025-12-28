import { useEffect, useState } from "react";

export default function LuxuryBirthdayGiftModal({ isOpen, onClose }) {
  const images = [
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1762534677/likki_01_nifvff.jpg",
    "https://res.cloudinary.com/dmyu5kjzs/image/upload/v1763579906/likki_03_pdy961.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [touchX, setTouchX] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIndex(0);
      setScale(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const prev = () => setIndex((index - 1 + images.length) % images.length);
  const next = () => setIndex((index + 1) % images.length);

  const onWheel = (e) => {
    e.preventDefault();
    setScale((s) =>
      Math.min(Math.max(s + (e.deltaY < 0 ? 0.15 : -0.15), 1), 3)
    );
  };

  const onTouchStart = (e) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (!touchX) return;
    const diff = touchX - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    setTouchX(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-yellow-400/30 shadow-2xl bg-gradient-to-b from-[#1a1208] to-[#0f0b06] animate-scaleIn"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl z-10"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center p-5 bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1a1208]">
          <h1 className="text-xl font-bold">Luxury Birthday Gift Box</h1>
          <p className="text-xs font-medium mt-1">
            Elegant • Personalized • Premium
          </p>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center p-4">
          <img
            src={images[index]}
            onWheel={onWheel}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{ transform: `scale(${scale})` }}
            className="h-64 rounded-xl transition-transform duration-200"
            alt="Gift"
          />

          <button
            onClick={prev}
            className="absolute left-2 text-white text-3xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 text-white text-3xl"
          >
            ›
          </button>
        </div>

        {/* Content */}
        <div className="px-4 pb-4 space-y-3">
          <div className="rounded-xl border border-yellow-400/30 bg-white/5 p-3">
            <h3 className="text-yellow-300 text-sm font-semibold">
              🎁 Pre-Loaded Gift Box
            </h3>
            <p className="text-gray-300 text-xs mt-1">
              Curated premium items with elegant packaging
            </p>
          </div>

          <div className="rounded-xl border border-yellow-400/30 bg-white/5 p-3">
            <h3 className="text-yellow-300 text-sm font-semibold">
              ✨ Customized Gift Box
            </h3>
            <p className="text-gray-300 text-xs mt-1">
              Photos, messages & themes of your choice
            </p>
          </div>

          <a
            href="https://wa.me/919030577270"
            target="_blank"
            className="block text-center bg-gradient-to-r from-yellow-400 to-yellow-200 text-[#1a1208] font-bold py-3 rounded-xl"
          >
            💬 Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}