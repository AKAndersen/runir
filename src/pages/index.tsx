import {HeroSection, VideoSection, ComicSection, MusicSection} from "@/components/HomePage/";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <VideoSection />
     {/* Comic Section */}
      <section className="pt-24 text-center">
        <h3 className="text-sm tracking-widest text-yellow-600 uppercase mb-4">Comic</h3>
        <ComicSection />
      </section>

      {/* Spacer */}
      <div className="h-24" />

      {/* Music Section */}
      <section className="pt-24 px-6 text-center bg-[#0e0e0e] text-white">
        <MusicSection />
      </section>
          </main>
  );
}

