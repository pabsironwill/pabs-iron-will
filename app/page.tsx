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
        alert("Stripe checkout failed. Check your Price IDs.");
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
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm transition-all duration-300 ${
          scrolled ? "py-2" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Pabs Iron Will
          </h1>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#coaching" className="hover:text-blue-600 transition">Coaching</a>
            <a href="#blueprint" className="hover:text-blue-600 transition">Blueprint</a>
            <a href="#apply" className="hover:text-blue-600 transition">Apply</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative py-36 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-300 to-blue-500 animate-gradient-slow"></div>

        <div className="relative z-10">
          <h1 className="text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
            Pabs Iron Will
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Build strength. Build discipline. Build confidence.
          </p>
          <a
            href="#apply"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-10 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-105"
          >
            Apply Now
          </a>
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
              priceId: "price_1T1yyeFmV0HeKaGAaWL8vwev",
            },
            {
              title: "Advanced Coaching",
              price: "$500 / month",
              desc: "Weekly check-ins, form reviews, and detailed macro planning.",
              priceId: "price_1T1yz3FmV0HeKaGAUEjiCom3",
            },
            {
              title: "Elite Transformation",
              price: "$1500 / month",
              desc: "Full transformation coaching with daily communication.",
              priceId: "price_1T1yzVFmV0HeKaGAg3gnDbbw",
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

      {/* KEEP ALL YOUR OTHER SECTIONS EXACTLY AS THEY WERE */}

    </main>
  );
}
