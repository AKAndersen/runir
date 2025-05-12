import Image from "next/image";
import heroImage from "@/assets/heroImg.jpg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section className="relative w-full h-[calc(100vh-6.5rem)] overflow-hidden">
      {/* Background image */}
      <Image
        src={heroImage}
        alt="Hero background"
        fill
        className="object-cover brightness-75"
        priority
      />

      {/* Text content */}
      <div className="relative z-10 flex flex-col justify-center items-start h-full max-w-5xl mx-auto px-6 text-white">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extralight mb-6">
            Welcome to <span className="text-yellow-500 font-extrabold">STUDIO RÚNIR</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl font-sans leading-relaxed">
            A digital sanctuary for European tradition, myth, and art — rooted in
            Christian belief and ancestral wisdom. We share sagas, music, comics,
            and culture that honor our spiritual and historical heritage.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
