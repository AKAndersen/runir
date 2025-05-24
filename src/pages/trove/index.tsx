// /pages/the-trove.tsx
import Head from 'next/head';

export default function TheTrove() {
  return (
    <>
      <Head>
        <title>The Trove | Runir</title>
        <meta name="description" content="Discover weekly tales and treasures from Nordic history and mythology." />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">The Trove</h1>
        <p className="text-lg text-gray-600 mb-8">
          Weekly features of lore, legends, and historical gems from Iceland and beyond.
        </p>

        <div className="mb-8">
          <img
            src="https://www.forlagid.is/wp-content/uploads/2009/07/5920-4001.jpg"
            alt="Egils Saga Manuscript"
            className="w-full h-auto rounded-2xl shadow-md"
          />
        </div>

        {/* Optional Video Instead */}
        {/* 
        <div className="mb-8">
          <video controls className="w-full rounded-2xl shadow-md">
            <source src="/trove/viking-ritual.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        */}

        <article className="prose prose-lg max-w-none">
          <h2>Egils Saga – The Warrior Poet</h2>
          <p>
            Egil Skallagrímsson, a fierce Viking warrior and brilliant skald, is one of the most
            compelling figures in the Icelandic sagas. This week, we dive into his tale of blood,
            exile, and poetry...
          </p>
          <p>
            Written in the 13th century, the saga explores Egil’s violent exploits across
            Scandinavia and England, and how his poetry became a tool of survival, diplomacy, and
            mourning.
          </p>
        </article>
      </main>
    </>
  );
}
