"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingCart, PlusCircle, Star, MapPin, TrendingUp, ShieldCheck } from 'lucide-react';
import AnimatedParticles from '@/components/AnimatedParticles';
import { useLanguage } from '@/context/LanguageContext';

export default function Marketplace() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    en: {
      tag: "Direct Trade Network",
      title1: "Global",
      title2: "Marketplace",
      desc: "Connect directly with verified buyers and sellers.",
      sellCrop: "Sell Crop",
      orders: "Orders",
      searchHint: "Search crops, farmers...",
      filters: "Filters",
      categories: ['All', 'Vegetables', 'Fruits', 'Grains', 'Seeds'],
      stock: "Stock:",
      rating: "Rating",
      buyLot: "Buy Lot",
      emptyTitle: "No listings found",
      emptyDesc: "Try changing your search or category filters.",
      products: [
        {
          id: 1, name: 'Organic Red Tomatoes', category: 'Vegetables', price: 45, unit: 'kg', quantity: 500,
          image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
          farmer: { name: 'Ramesh Patil', rating: 4.8, location: 'Pune, MH' }, verified: true
        },
        {
          id: 2, name: 'Premium Golden Wheat', category: 'Grains', price: 32, unit: 'kg', quantity: 2000,
          image: 'https://images.unsplash.com/photo-1574323347407-2cb25a07e849?w=500&q=80',
          farmer: { name: 'Suresh Kumar', rating: 4.9, location: 'Ludhiana, PB' }, verified: true
        },
        {
          id: 3, name: 'Fresh Fuji Apples', category: 'Fruits', price: 120, unit: 'kg', quantity: 300,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80',
          farmer: { name: 'Amit Sharma', rating: 4.7, location: 'Shimla, HP' }, verified: false
        },
        {
          id: 4, name: 'Sweet Yellow Corn', category: 'Vegetables', price: 25, unit: 'kg', quantity: 1500,
          image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&q=80',
          farmer: { name: 'Vijay Singh', rating: 4.5, location: 'Indore, MP' }, verified: true
        },
        {
          id: 5, name: 'Russet Potatoes', category: 'Vegetables', price: 18, unit: 'kg', quantity: 5000,
          image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
          farmer: { name: 'Prakash Das', rating: 4.6, location: 'Agra, UP' }, verified: true
        },
        {
          id: 6, name: 'High-Yield Soybeans', category: 'Seeds', price: 65, unit: 'kg', quantity: 800,
          image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80',
          farmer: { name: 'Nitin Rao', rating: 4.9, location: 'Nagpur, MH' }, verified: true
        }
      ]
    },
    mr: {
      tag: "थेट व्यापार नेटवर्क",
      title1: "जागतिक",
      title2: "बाजारपेठ",
      desc: "सत्यापित खरेदीदार आणि विक्रेत्यांशी थेट जोडले जा.",
      sellCrop: "पीक विका",
      orders: "ऑर्डर्स",
      searchHint: "पिके, शेतकरी शोधा...",
      filters: "फिल्टर्स",
      categories: ['सर्व', 'भाजीपाला', 'फळे', 'धान्य', 'बियाणे'],
      stock: "साठा:",
      rating: "रेटिंग",
      buyLot: "लॉट खरेदी करा",
      emptyTitle: "कोणतेही सूची सापडली नाही",
      emptyDesc: "तुमचे शोध किंवा वर्ग फिल्टर बदलून पहा.",
      products: [
        {
          id: 1, name: 'सेंद्रिय लाल टोमॅटो', category: 'भाजीपाला', price: 45, unit: 'kg', quantity: 500,
          image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&q=80',
          farmer: { name: 'Ramesh Patil', rating: 4.8, location: 'Pune, MH' }, verified: true
        },
        {
          id: 2, name: 'प्रीमियम सोनेरी गहू', category: 'धान्य', price: 32, unit: 'kg', quantity: 2000,
          image: 'https://images.unsplash.com/photo-1574323347407-2cb25a07e849?w=500&q=80',
          farmer: { name: 'Suresh Kumar', rating: 4.9, location: 'Ludhiana, PB' }, verified: true
        },
        {
          id: 3, name: 'ताजे फुजी सफरचंद', category: 'फळे', price: 120, unit: 'kg', quantity: 300,
          image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&q=80',
          farmer: { name: 'Amit Sharma', rating: 4.7, location: 'Shimla, HP' }, verified: false
        },
        {
          id: 4, name: 'गोड पिवळा मका', category: 'भाजीपाला', price: 25, unit: 'kg', quantity: 1500,
          image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&q=80',
          farmer: { name: 'Vijay Singh', rating: 4.5, location: 'Indore, MP' }, verified: true
        },
        {
          id: 5, name: 'रसेट बटाटे', category: 'भाजीपाला', price: 18, unit: 'kg', quantity: 5000,
          image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
          farmer: { name: 'Prakash Das', rating: 4.6, location: 'Agra, UP' }, verified: true
        },
        {
          id: 6, name: 'उच्च-उत्पादन सोयाबीन', category: 'बियाणे', price: 65, unit: 'kg', quantity: 800,
          image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80',
          farmer: { name: 'Nitin Rao', rating: 4.9, location: 'Nagpur, MH' }, verified: true
        }
      ]
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  // Sync category names when language changes
  useEffect(() => {
    if (activeCategory === 'All' || activeCategory === 'सर्व') {
      setActiveCategory(curr.categories[0]);
    }
  }, [lang, curr.categories, activeCategory]);

  const filteredProducts = curr.products.filter(product => {
    const matchesCategory = activeCategory === curr.categories[0] || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.farmer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden bg-[#020804]">
      <AnimatedParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#020804] to-[#020804] pointer-events-none" />
      <div className="glow-bg opacity-50" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wider">{curr.tag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              {curr.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">{curr.title2}</span>
            </h1>
            <p className="text-gray-400 text-lg">{curr.desc}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-[#040d08] border border-emerald-500/50 text-emerald-400 font-bold rounded-xl hover:bg-emerald-900/40 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.1)] flex items-center justify-center">
              <PlusCircle className="w-5 h-5 mr-2" /> {curr.sellCrop}
            </button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 mr-2" /> {curr.orders}
            </button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-4 rounded-2xl border border-emerald-500/20 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder={curr.searchHint}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#020804] border border-emerald-900/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-all"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {curr.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300
                  ${activeCategory === cat 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                    : 'bg-transparent text-gray-400 hover:text-white border border-transparent hover:border-emerald-900/50'}`}
              >
                {cat}
              </button>
            ))}
            <button className="px-4 py-2.5 rounded-full text-gray-400 hover:text-emerald-400 transition-colors border border-emerald-900/50 flex items-center shrink-0">
              <Filter className="w-4 h-4 mr-2" /> {curr.filters}
            </button>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="glass-card flex flex-col group overflow-hidden border-emerald-900/30 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/30 uppercase tracking-widest">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#020804] to-transparent z-10" />
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white leading-tight line-clamp-1 group-hover:text-emerald-400 transition-colors">{product.name}</h3>
                  </div>
                  
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-500">₹{product.price}</span>
                    <span className="text-gray-400 mb-1">/{product.unit}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-400 mb-6 border-b border-emerald-900/30 pb-4">
                    <span>{curr.stock} <strong className="text-white">{product.quantity} {product.unit}</strong></span>
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1 text-emerald-500" /> {product.farmer.location}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center border border-emerald-500/30 text-emerald-400 font-bold">
                        {product.farmer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm flex items-center gap-1">
                          {product.farmer.name}
                          {product.verified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                        </p>
                        <p className="text-xs text-yellow-400 flex items-center">
                          <Star className="w-3 h-3 fill-current mr-1" /> {product.farmer.rating} {curr.rating}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold rounded-xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 uppercase tracking-widest text-sm flex items-center justify-center">
                    {curr.buyLot}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredProducts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <ShoppingCart className="w-16 h-16 text-emerald-900 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">{curr.emptyTitle}</h3>
            <p className="text-gray-400">{curr.emptyDesc}</p>
          </div>
        )}

      </div>
    </div>
  );
}
