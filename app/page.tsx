"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  { name: "Alex J.", text: "I never thought I could stick to a program — Nick made it easy!" },
  { name: "Samantha R.", text: "Amazing coaching and results in just 3 months." },
  { name: "David K.", text: "The accountability and guidance are unmatched." },
  { name: "Maria L.", text: "I feel stronger, healthier, and more confident every day!" },
  { name: "James P.", text: "Nick's coaching is exactly what I needed to stay consistent." },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("https://formspree.io/f/mvzbrblo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      window.location.href = "/Pabs_Iron_Will_Elite_Styled_Blueprint.pdf";
    }

    setLoading(false);
  };

  const handleStripeCheckout = async (priceId: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout error. Check your Stripe Price IDs.");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white text-gray-900 scroll-smooth">

      {/* HEADER */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Pabs Iron Will
          </h1>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500"></div>
        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Pabs Iron Will
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Build strength. Build discipline. Build confidence.
          </p>
        </div>
      </section>

      {/* COACHING */}
      <section id="coaching" className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-14">Coaching Designed for Real Results</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Beginner Program",
              price: "$150 / month",
              desc: "Custom workouts, nutrition guidance, and accountability.",
              priceId: "REPLACE_WITH_PRICE_ID_1",
            },
            {
              title: "Advanced Coaching",
              price: "$500 / month",
              desc: "Weekly check-ins, form reviews, and detailed macro planning.",
              priceId: "REPLACE_WITH_PRICE_ID_2",
            },
            {
              title: "Elite Transformation",
              price: "$1500 / month",
              desc: "Full transformation coaching with daily communication.",
              priceId: "REPLACE_WITH_PRICE_ID_3",
            },
          ].map((tier, i) => (
            <div
              key={i}
              className={`p-10 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                i === 1 ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{tier.title}</h3>
              <p className="text-blue-600 font-semibold mb-6">{tier.price}</p>
              <p className="text-gray-600">{tier.desc}</p>

              <button
                onClick={() => handleStripeCheckout(tier.priceId)}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                Book {tier.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="mx-4 p-8 bg-blue-50 rounded-3xl shadow-xl text-gray-800">
                <p className="italic">"{t.text}"</p>
                <p className="mt-4 font-semibold text-blue-600">- {t.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Pabs Iron Will. All rights reserved.
      </footer>
    </main>
  );
}
