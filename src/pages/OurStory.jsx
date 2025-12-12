import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const OurStory = () => {
  return (
    <Layout>
      <div className="bg-black min-h-screen text-white py-20 px-4 font-sans">
        
        {/* HERO HEADER */}
        <div className="container mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif text-yellow-500 mb-6 tracking-wide">
            The Soul of Scent
          </h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto opacity-80"></div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container mx-auto max-w-3xl space-y-12 leading-relaxed text-gray-300 text-lg text-center md:text-left">
          
          {/* Section 1: The Beginning */}
          <section>
            <p className="first-letter:text-5xl first-letter:text-yellow-500 first-letter:font-serif first-letter:float-left first-letter:mr-3">
              It began not as a business, but as an obsession. For our founder, the world was always experienced through fragrance. From the earliest memories, there was a deep, intuitive connection to the power of scent—how a single note could unlock a memory, shift a mood, or define a moment.
            </p>
          </section>

          {/* Section 2: The Vision (2025) */}
          <section className="flex flex-col md:flex-row items-center gap-8 border-y border-gray-800 py-10 my-10">
            <div className="flex-1">
              <h2 className="text-3xl font-serif text-white mb-4">Born in 2025</h2>
              <p>
                As exposure to the world’s finest olfactory masterpieces grew, so did the dream. Being an enthusiast was no longer enough. In 2025, that lifelong passion evolved into a singular purpose: to establish <strong>SOUL Fragrance</strong>, a proud Indian perfume house with a global vision.
              </p>
            </div>
          </section>

          {/* Section 3: The Craft (UPDATED) */}
          <section>
            <p className="mb-6">
              Today, we specialize in crafting luxury-inspired perfumes that make opulence accessible. 
              <span className="text-white font-bold block mt-4">
                We import high-quality oils and handcraft all our perfumes in small batches, using strictly glass equipment to preserve the purity and integrity of every scent.
              </span>
            </p>
            
            <p className="text-yellow-100 italic font-serif text-xl border-l-4 border-yellow-500 pl-6 py-2 mt-8">
              "We are on the verge of a new era—creating our own niche fragrances and fusion scents that blend the richness of Indian heritage with modern global elegance."
            </p>
            
            <p className="mt-6">
              This is just the beginning of our olfactory journey. We invite you to find the scent that speaks to your soul.
            </p>
          </section>

          {/* SIGNATURE */}
          <div className="pt-10 text-center">
            <img src="/logo.png" alt="Soul Logo" className="h-16 mx-auto opacity-50 mb-4" />
            <Link to="/all-products" className="inline-block border border-yellow-500 text-yellow-500 px-8 py-3 rounded hover:bg-yellow-500 hover:text-black transition uppercase tracking-widest font-bold">
              Explore Our Collection
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default OurStory;