export default function VideoSection() {
  return (
    <section className="bg-white dark:bg-[#121417] text-gray-900 dark:text-gray-100 py-24 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto space-y-10 text-center">
        {/* Section Heading */}
        <div className="space-y-2">
            <h1 className="text-5xl text-yellow-500">NORTHHUGR</h1>
          <p className="text-sm uppercase tracking-widest text-yellow-500 font-semibold">
            Latest Release
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Explore the mythical fables of Icelandic paganism
          </h3>
        </div>

        {/* Video */}
        <div className="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/0EQAseSM7XY"
            title="Latest Northhugr Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* CTA */}
        <a
          href="/northhugr"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-bold tracking-wide uppercase transition"
        >
          Visit Northhugr’s Artist Page →
        </a>
      </div>
    </section>
  );
}
