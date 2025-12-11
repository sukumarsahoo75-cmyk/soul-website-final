// src/data.js

export const products = [
  // --- FOR HER (1-4) ---
  { 
    id: 1, name: "Blossom", category: "for-her", price: 599, image: "/images/blossom.jpg",
    inStock: true, // <--- NEW FIELD
    description: "A gorgeous gardenia-based floral scent that feels like a spring garden in full bloom. Cheerful, pear-sweetened, and beautifully feminine.",
    inspiration: "A floral masterpiece comparable to Gucci Flora.",
    notes: { top: "Pear, Red Berries", mid: "Gardenia, Frangipani", base: "Patchouli, Brown Sugar" },
    specs: { gender: "Female", weather: "Spring/Summer", time: "Daytime", longevity: "6-8 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 2, name: "Desire", category: "for-her", price: 599, image: "/images/desire.jpg",
    inStock: true,
    description: "An addictive contrast between light and dark. The energy of black coffee meets the softness of white flowers and vanilla.",
    inspiration: "Shares the addictive coffee-vanilla DNA of YSL Black Opium.",
    notes: { top: "Pear, Pink Pepper", mid: "Coffee, Jasmine, Almond", base: "Vanilla, Patchouli, Cedar" },
    specs: { gender: "Female", weather: "Winter/Autumn", time: "Night/Party", longevity: "7-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 3, name: "Empress", category: "for-her", price: 599, image: "/images/empress.jpg", isSignature: true,
    inStock: true,
    description: "The scent of freedom. A bold floral fragrance blending French lavender with Moroccan orange blossom for a unique floral-musk fusion.",
    inspiration: "A bold floral structure reminiscent of YSL Libre.",
    notes: { top: "Lavender, Mandarin Orange", mid: "Orange Blossom, Jasmine", base: "Madagascar Vanilla, Musk" },
    specs: { gender: "Female", weather: "All Year", time: "Day/Evening", longevity: "8-10 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 4, name: "Divine", category: "for-her", price: 599, image: "/images/divine.jpg",
    inStock: true,
    description: "A powerful aromatic vanilla scent. Three distinct vanillas wrapped in bright lavender create a warm, glowing aura.",
    inspiration: "Captures the golden vanilla allure of Burberry Goddess.",
    notes: { top: "Vanilla Infusion, Lavender", mid: "Vanilla Caviar", base: "Vanilla Absolute, Ginger" },
    specs: { gender: "Female", weather: "Autumn/Winter", time: "Evening", longevity: "7-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },

  // --- FOR HIM (5-8) ---
  { 
    id: 5, name: "Alpha Elixir", category: "for-him", price: 599, image: "/images/alpha-elixir.jpg", isSignature: true,
    inStock: true,
    description: "A burning heat of honey and tobacco. This elixir is intense, charismatic, and incredibly seductive with a golden amber glow.",
    inspiration: "Reflects the golden intensity of JPG Le Male Elixir.",
    notes: { top: "Lavender, Mint", mid: "Benzoin, Vanilla", base: "Honey, Tobacco, Tonka" },
    specs: { gender: "Male", weather: "Winter/Night", time: "Party/Clubbing", longevity: "8-10 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 6, name: "Twilight Elixir", category: "for-him", price: 599, image: "/images/twilight-elixir.jpg",
    inStock: true,
    description: "An unprecedented concentration of spices and woods. A intoxicating blend of nutmeg, cardamom, and licorice that defines modern masculinity.",
    inspiration: "Inspired by the spicy freshness of Dior Sauvage Elixir.",
    notes: { top: "Nutmeg, Cinnamon, Cardamom", mid: "Lavender", base: "Licorice, Sandalwood, Amber" },
    specs: { gender: "Male", weather: "All Year", time: "Evening/Special Occasion", longevity: "10+ Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 7, name: "Closer", category: "for-him", price: 599, image: "/images/closer.jpg",
    inStock: true,
    description: "A warm, spicy, and sweet fragrance. The chestnut accord combined with vanilla makes it irresistible and cozy.",
    inspiration: "A cozy, romantic vibe similar to Armani Stronger With You.",
    notes: { top: "Cardamom, Pink Pepper", mid: "Sage, Melon", base: "Chestnut, Vanilla, Amberwood" },
    specs: { gender: "Male", weather: "Winter/Autumn", time: "Date Night", longevity: "7-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 8, name: "H2O", category: "for-him", price: 599, image: "/images/h2o.jpg",
    inStock: true,
    description: "The quintessential ocean scent. A wave of mint and sea water nuances that feels like a dive into the deep blue.",
    inspiration: "The classic aquatic freshness of Davidoff Cool Water.",
    notes: { top: "Sea Water, Mint, Green Notes", mid: "Sandalwood, Jasmine", base: "Musk, Oakmoss, Cedar" },
    specs: { gender: "Male", weather: "Summer (High Heat)", time: "Day/Gym", longevity: "6-7 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },

  // --- UNISEX (9-18) ---
  { 
    id: 9, name: "Oud Intense", category: "unisex", price: 599, image: "/images/oud-intense.jpg", isSignature: true,
    inStock: true,
    description: "Rare. Exotic. Distinctive. One of the most precious ingredients in a perfumer's arsenal, oud wood is often burned in incense-filled temples.",
    inspiration: "Comparable to the iconic Tom Ford Oud Wood.",
    notes: { top: "Rosewood, Cardamom", mid: "Oud Wood, Sandalwood", base: "Tonka Bean, Amber" },
    specs: { gender: "Unisex", weather: "Winter/Formal", time: "Evening", longevity: "7-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 10, name: "Noir", category: "unisex", price: 599, image: "/images/noir.jpg",
    inStock: true,
    description: "A dark, chypre oriental scent. Black truffle and floral notes collide with earthiness for a gothic, sexy mystery.",
    inspiration: "A dark floral experience like Tom Ford Noir de Noir.",
    notes: { top: "Saffron", mid: "Black Rose, Truffle", base: "Patchouli, Vanilla, Oud" },
    specs: { gender: "Unisex", weather: "Winter/Night", time: "Date/Formal", longevity: "7-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 11, name: "After Hours", category: "unisex", price: 599, image: "/images/after-hours.jpg",
    inStock: true,
    description: "A sweet, boozy, and spicy gourmand delight. Smells like a warm apple pie with cinnamon and dates.",
    inspiration: "Shares the sweet, spicy DNA of Lattafa Khamrah.",
    notes: { top: "Cinnamon, Nutmeg", mid: "Dates, Praline, Tuberose", base: "Vanilla, Tonka, Amberwood" },
    specs: { gender: "Unisex", weather: "Winter", time: "Evening/Party", longevity: "8-10 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 12, name: "Espresso", category: "unisex", price: 599, image: "/images/espresso.jpg",
    inStock: true,
    description: "A rich coffee twist on the classic sweet spice profile. Dark roasted arabica beans blended with cardamom and candied fruits.",
    inspiration: "A coffee-forward twist similar to Khamrah Qahwa.",
    notes: { top: "Ginger, Cinnamon, Cardamom", mid: "Coffee, Candied Fruits", base: "Vanilla, Musk, Tonka" },
    specs: { gender: "Unisex", weather: "Winter", time: "Coffee Date/Evening", longevity: "8-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 13, name: "High Tide", category: "unisex", price: 599, image: "/images/high-tide.jpg",
    inStock: true,
    description: "The ocean during a storm. Dark, salty, and incredibly powerful. This is a marine scent for those who want to be noticed.",
    inspiration: "Captures the nuclear aquatic power of Orto Parisi Megamare.",
    notes: { top: "Seaweed, Calone", mid: "Sea Water, Salt", base: "Musk, Ambroxan, Cedar" },
    specs: { gender: "Unisex (Leans Masculine)", weather: "Summer/All Year", time: "Outdoor", longevity: "12+ Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 14, name: "Fruit Absolu", category: "unisex", price: 599, image: "/images/fruit-absolu.jpg",
    inStock: true,
    description: "A basket of Mediterranean fruits. Sweet citrus, bright berries, and a soft musk base create a joyful, vibrant aura.",
    inspiration: "A fruity explosion reminiscent of Xerjoff Erba Pura.",
    notes: { top: "Orange, Lemon, Bergamot", mid: "Fruit Basket", base: "White Musk, Amber, Vanilla" },
    specs: { gender: "Unisex", weather: "Summer/Spring", time: "Day/Party", longevity: "8-10 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 15, name: "Toxic", category: "unisex", price: 599, image: "/images/toxic.jpg",
    inStock: true,
    description: "Loud. Unapologetic. A firestorm of spices, tobacco, and oud. Not for the faint of heart, this is a statement maker.",
    inspiration: "A beast-mode tobacco scent comparable to Mancera Red Tobacco.",
    notes: { top: "Cinnamon, Agarwood, Saffron", mid: "Patchouli, Jasmine", base: "Tobacco, Vanilla, Sandalwood" },
    specs: { gender: "Unisex (Leans Masculine)", weather: "Winter (Strictly)", time: "Night/Outdoor", longevity: "12+ Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 16, name: "Mystic", category: "unisex", price: 599, image: "/images/mystic.jpg",
    inStock: true,
    description: "An olfactory phenomenon. Bright, sweet, and airy, yet incredibly long-lasting. It smells like crystallized sugar and ambergris.",
    inspiration: "Inspired by the legendary Baccarat Rouge 540.",
    notes: { top: "Saffron, Jasmine", mid: "Amberwood", base: "Fir Resin, Cedar" },
    specs: { gender: "Unisex", weather: "All Year", time: "Anytime", longevity: "8-10 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 17, name: "Reverie", category: "unisex", price: 599, image: "/images/reverie.jpg",
    inStock: true,
    description: "Pure imagination. A clean, soapy, and citrusy tea scent that feels like luxury hotel soap in the best way possible.",
    inspiration: "A fresh citrus tea scent similar to LV Imagination.",
    notes: { top: "Citron, Calabrian Bergamot", mid: "Nigerian Ginger, Ceylon Cinnamon", base: "Chinese Black Tea, Ambroxan" },
    specs: { gender: "Unisex (Leans Masculine)", weather: "Summer/Spring", time: "Daytime/Office", longevity: "7-8 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  },
  { 
    id: 18, name: "Cognac", category: "unisex", price: 599, image: "/images/cognac.jpg", isSignature: true,
    inStock: true,
    description: "Straight from the liquor barrel. A boozy, woody fragrance that smells like cognac aging in oak barrels with a dash of cinnamon.",
    inspiration: "Captures the boozy elegance of Kilian Angels' Share.",
    notes: { top: "Cognac", mid: "Cinnamon, Tonka Bean, Oak", base: "Praline, Vanilla, Sandalwood" },
    specs: { gender: "Unisex", weather: "Winter", time: "Evening/Date", longevity: "8-9 Hours", projection: "1.5-2 Hours" },
    rating: 0, reviews: []
  }
];