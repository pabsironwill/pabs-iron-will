"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // ✅ Correct import
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
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    window.location.href = data.url;
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
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

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
            { title: "Beginner Program", price: "$150 / month", desc: "Custom workouts, nutrition guidance, and accountability.", stripeId: "prod_TzgzORj0uSmQod" },
            { title: "Advanced Coaching", price: "$500 / month", desc: "Weekly check-ins, form reviews, and detailed macro planning.", stripeId: "prod_Tzh0zTmOlTE5pL" },
            { title: "Elite Transformation", price: "$1500 / month", desc: "Full transformation coaching with daily communication.", stripeId: "prod_Tzh0FLT5jtDbnE" },
          ].map((tier, i) => (
            <div
              key={i}
              className={`p-10 rounded-3xl backdrop-blur-xl bg-white/70 border border-white/40 shadow-xl shadow-blue-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                i === 1 ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{tier.title}</h3>
              <p className="text-blue-600 font-semibold mb-6">{tier.price}</p>
              <p className="text-gray-600">{tier.desc}</p>

              <button
                onClick={() => handleStripeCheckout(tier.stripeId)}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                Book {tier.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 to-white"></div>
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl shadow-blue-200">
            <Image src="/coach.jpg" alt="Pabs Iron Will Coach" fill className="object-cover hover:scale-105 transition duration-700" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-8">Meet Your Coach</h2>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              I built Pabs Iron Will around one core principle:
              <span className="text-blue-600 font-semibold"> discipline creates transformation.</span>
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Real results come from structure, accountability, and consistency — not shortcuts.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This is about building a body and mindset that lasts.
            </p>
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section id="blueprint" className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl shadow-blue-100 border border-white/40">
          <h2 className="text-4xl font-bold mb-8">Get the Free Beginner Strength Blueprint</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-4 rounded-2xl border border-gray-300 w-full focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-blue-200 transition-all duration-300 hover:scale-105"
            >
              {loading ? "Sending..." : "Get Free Guide"}
            </button>
          </form>
        </div>
      </section>

      {/* APPLY */}
      <section id="apply" className="py-28 px-6 text-center">
        <h2 className="text-4xl font-bold mb-10">Apply for Coaching</h2>
        <a
          href="https://docs.google.com/forms/d/1X9nc4DkoVVTb61da7piUzOz_kFkddw9jv9hcA3V3QjA/edit"
          target="_blank"
          className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-12 py-5 rounded-3xl font-semibold shadow-xl shadow-blue-200 transition-all duration-300 hover:scale-105"
        >
          Start Application
        </a>
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

      {/* SOCIAL */}
      <section className="py-24 px-6 text-center bg-blue-50">
        <h2 className="text-3xl font-bold mb-8">Follow the Journey</h2>
        <div className="flex justify-center gap-8">
          <a href="YOUR_INSTAGRAM_LINK" target="_blank" className="px-8 py-4 rounded-2xl border border-blue-500 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300">Instagram</a>
          <a href="YOUR_TIKTOK_LINK" target="_blank" className="px-8 py-4 rounded-2xl border border-blue-500 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition duration-300">TikTok</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Pabs Iron Will. All rights reserved.
      </footer>
    </main>
  );
}
