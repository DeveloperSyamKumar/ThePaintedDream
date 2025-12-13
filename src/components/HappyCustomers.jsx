
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Judith Black",
    role: "CEO of Workcation",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800",
    quote:
      "Gravida quam mi erat tortor neque molestie. Auctor aliquet at porttitor a enim nunc suscipit tincidunt nunc. Et non lorem tortor posuere.",
  },
  {
    id: 2,
    name: "Alex Morgan",
    role: "Founder of StudioX",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800",
    quote:
      "Nunc eu scelerisque interdum eget tellus non nibh scelerisque bibendum. Integer posuere erat a ante venenatis dapibus.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800",
    quote:
      "Auctor aliquet at porttitor a enim nunc suscipit tincidunt nunc. Nulla vitae elit libero, a pharetra augue.",
  },
];

const HappyCustomers = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="mx-auto max-w-6xl relative">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-8 md:p-12 transition-opacity duration-500 ${
                index === current ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl shadow-lg object-cover"
              />

              {/* Text */}
              <div className="text-slate-100">
                <svg
                  className="h-10 w-10 text-slate-500 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 8.176 2 12.368 2 16.576 2 22.4 6.272 28 12.608 28c4.16 0 7.392-3.232 7.392-7.392 0-4.048-3.008-7.056-7.056-7.056-.448 0-.896.048-1.344.128.832-2.688 3.072-5.696 6.72-9.056L9.352 4zm14.016 0c-4.896 4.176-7.344 8.368-7.344 12.576C16.024 22.4 20.296 28 26.632 28c4.16 0 7.368-3.232 7.368-7.392 0-4.048-2.984-7.056-7.032-7.056-.448 0-.896.048-1.344.128.832-2.688 3.072-5.696 6.72-9.056L23.368 4z" />
                </svg>

                <p className="text-lg text-slate-200 leading-relaxed">
                  {item.quote}
                </p>

                <div className="mt-6">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800 p-3 text-white hover:bg-slate-700"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-800 p-3 text-white hover:bg-slate-700"
        >
          ❯
        </button>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full ${
                index === current
                  ? "bg-white"
                  : "bg-slate-600 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyCustomers;
