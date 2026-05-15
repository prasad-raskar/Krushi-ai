"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, IndianRupee, Wheat, MapPin, Layers, CloudRain, Sprout, ArrowUpRight, ArrowDownRight, Zap, Target, Droplets, Leaf, ShieldAlert, Calendar } from 'lucide-react';
import AnimatedParticles from '@/components/AnimatedParticles';
import { useLanguage } from '@/context/LanguageContext';

export default function YieldPrediction() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const [selectedCrop, setSelectedCrop] = useState('');
  const [landArea, setLandArea] = useState(5);
  const [selectedSoil, setSelectedSoil] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('Kharif');
  const [selectedPlanting, setSelectedPlanting] = useState('');
  const [predicted, setPredicted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const content = {
    en: {
      tag: "Neural Yield Engine",
      title1: "AI Yield",
      title2: "Prediction",
      desc: "Set your field parameters and let our deep learning model predict seasonal yield with 97.3% accuracy.",
      cropLabel: "Select Crop",
      locationLabel: "Location (District/Taluka)",
      areaLabel: "Land Area (Acres)",
      soilLabel: "Soil Type",
      seasonLabel: "Season",
      btnPredict: "Generate Prediction",
      btnComputing: "Computing Model...",
      processMsg: "Neural graph processing...",
      processSub: "Matching Soil × Climate × Crop Genome Data",
      emptyTitle: "Set parameters to view prediction",
      emptySub: "Select crop, land area, soil type, and season from the left panel, then click Generate Prediction.",
      kpiYield: "Predicted Yield",
      kpiRev: "Revenue",
      kpiHarvest: "Harvest Time",
      kpiRate: "Market Rate",
      resTitle: "Resource Optimizer",
      resWater: "Water Required",
      resSeed: "Seed Quantity",
      resFert: "Fertilizer Need",
      aiPlanTitle: "AI Action Plan",
      aiPlan1: "Optimal Sowing",
      aiPlan1Desc: "Sow early in the season to maximize pre-monsoon soil moisture.",
      aiPlan2: "Pest Alert",
      aiPlan2Desc: "High humidity predicted. Pre-emptive spraying recommended.",
      aiPlan3: "Nutrient Strategy",
      aiPlan3Desc: "Apply split doses of nitrogen at day 30 and 45 for maximum yield.",
      cropPlaceholder: "e.g. Wheat, Cotton, Soybean...",
      locationPlaceholder: "e.g. Pune, Maharashtra",
      plantingLabel: "Planting Type",
      plantingList: ['Seeds', 'Saplings', 'Tubers / Bulbs', 'Cuttings / Grafts', 'Rhizomes'],
      soilList: ['Alluvial', 'Black (Regur)', 'Red & Laterite', 'Sandy', 'Clayey'],
      seasonsList: ['Kharif', 'Rabi', 'Zaid']
    },
    mr: {
      tag: "न्यूरल उत्पादन इंजिन",
      title1: "AI उत्पादन",
      title2: "अंदाज",
      desc: "तुमच्या शेताचे पॅरामीटर्स सेट करा आणि आमच्या डीप लर्निंग मॉडेलला ९७.३% अचूकतेने हंगामी उत्पादनाचा अंदाज द्या.",
      cropLabel: "पीक निवडा",
      locationLabel: "ठिकाण (जिल्हा/तालुका)",
      areaLabel: "जमीन क्षेत्रफळ (एकर)",
      soilLabel: "मातीचा प्रकार",
      seasonLabel: "हंगाम",
      btnPredict: "अंदाज तयार करा",
      btnComputing: "प्रक्रिया सुरू...",
      processMsg: "न्यूरल ग्राफ प्रक्रिया सुरू...",
      processSub: "माती × हवामान × पीक जीनोम डेटा जुळवत आहे",
      emptyTitle: "सेटिंग करा आणि अंदाज पहा",
      emptySub: "डाव्या बाजूच्या पॅनेलमधून पीक, जमीन क्षेत्रफळ, मातीचा प्रकार आणि हंगाम निवडा, नंतर अंदाज तयार करा वर क्लिक करा.",
      kpiYield: "अंदाजित उत्पादन",
      kpiRev: "महसूल",
      kpiHarvest: "कापणीचा काळ",
      kpiRate: "बाजारभाव",
      resTitle: "संसाधन ऑप्टिमायझर",
      resWater: "पाण्याची आवश्यकता",
      resSeed: "बियाण्यांचे प्रमाण",
      resFert: "खताची आवश्यकता",
      aiPlanTitle: "AI कृती आराखडा",
      aiPlan1: "पेरणीची योग्य वेळ",
      aiPlan1Desc: "पावसाळ्याचा जास्तीत जास्त फायदा घेण्यासाठी हंगामाच्या सुरुवातीलाच पेरणी करा.",
      aiPlan2: "कीटक धोक्याचा इशारा",
      aiPlan2Desc: "जास्त आर्द्रतेचा अंदाज आहे. प्रतिबंधात्मक फवारणी करणे सुचविले जाते.",
      aiPlan3: "पोषण रणनीती",
      aiPlan3Desc: "जास्तीत जास्त उत्पादनासाठी ३० आणि ४५ व्या दिवशी नायट्रोजनचे विभागून डोस द्या.",
      cropPlaceholder: "उदा. गहू, कापूस, सोयाबीन...",
      locationPlaceholder: "उदा. पुणे, महाराष्ट्र",
      plantingLabel: "लागवडीचा प्रकार",
      plantingList: ['बियाणे', 'रोपे', 'कंद / कांदे', 'कलमे', 'रायझोम'],
      soilList: ['गाळवयुक्त', 'काळी (रेगूर)', 'तांबडी जांभया', 'वाळूमिश्र', 'चिकणमाती'],
      seasonsList: ['Kharif', 'Rabi', 'Zaid']
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  useEffect(() => {
    if (mounted && curr && curr.soilList) {
      if (!selectedSoil || !curr.soilList.includes(selectedSoil)) {
        const timer = setTimeout(() => {
          setSelectedSoil(curr.soilList[0]);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [lang, mounted, curr, selectedSoil]);

  useEffect(() => {
    if (mounted && curr && curr.plantingList) {
      if (!selectedPlanting || !curr.plantingList.includes(selectedPlanting)) {
        const timer = setTimeout(() => {
          setSelectedPlanting(curr.plantingList[0]);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [lang, mounted, curr, selectedPlanting]);

  const predict = async () => {
    if (!selectedCrop.trim()) {
      alert(lang === 'mr' ? 'कृपया पीक भरा.' : 'Please enter a crop name.');
      return;
    }
    setAnimating(true);
    setPredicted(false);
    
    try {
      const response = await fetch('/api/yield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          crop: selectedCrop, 
          area: landArea, 
          soil: selectedSoil, 
          season: selectedSeason, 
          plantingType: selectedPlanting,
          lang 
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate prediction");
      }
      const data = await response.json();
      setPredictionData(data);
      setPredicted(true);
    } catch (error) {
      console.error(error);
      alert(lang === 'mr' 
        ? 'अंदाज मिळवण्यात अडचण आली. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा. (हे API Rate Limit मुळे होऊ शकते)' 
        : 'Failed to generate prediction. Please try again later. (This might be due to API Rate Limits)');
    } finally {
      setAnimating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-28 pb-20 px-4 sm:px-6 relative overflow-x-hidden bg-[#020804]">
      <AnimatedParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/15 via-[#020804] to-[#020804] pointer-events-none" />
      <div className="glow-bg opacity-40" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col">

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Target className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-xs font-semibold text-emerald-300 tracking-wider">{curr.tag}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
            {curr.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">{curr.title2}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">{curr.desc}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-card p-6">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <Wheat className="w-4 h-4 text-emerald-400" /> {curr.cropLabel}
              </label>
              <input
                type="text"
                placeholder={curr.cropPlaceholder}
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-[#040d08] border border-emerald-900/40 focus:border-emerald-500/50 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium"
              />
            </div>

            <div className="glass-card p-6">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <MapPin className="w-4 h-4 text-emerald-400" /> {curr.areaLabel}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={landArea}
                  onChange={(e) => setLandArea(Number(e.target.value))}
                  className="flex-1 accent-emerald-500 h-2 bg-emerald-900/40 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                />
                <span className="text-2xl font-black text-emerald-400 min-w-[60px] text-right font-mono">{landArea}</span>
              </div>
            </div>

            <div className="glass-card p-6">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <Sprout className="w-4 h-4 text-emerald-400" /> {curr.plantingLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {curr.plantingList.map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlanting(p)}
                    className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-300 border
                      ${selectedPlanting === p
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                        : 'bg-[#040d08] text-gray-400 border-emerald-900/30 hover:border-emerald-500/30 hover:text-white'
                      }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <Layers className="w-4 h-4 text-emerald-400" /> {curr.soilLabel}
              </label>
              <div className="flex flex-col gap-2">
                {curr.soilList.map(soil => (
                  <button
                    key={soil}
                    onClick={() => setSelectedSoil(soil)}
                    className={`py-3 px-4 rounded-xl text-sm font-bold text-left transition-all duration-300 border
                      ${selectedSoil === soil
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                        : 'bg-[#040d08] text-gray-400 border-emerald-900/30 hover:border-emerald-500/30 hover:text-white'
                      }`}
                  >
                    {soil}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                <CloudRain className="w-4 h-4 text-emerald-400" /> {curr.seasonLabel}
              </label>
              <div className="flex gap-2">
                {curr.seasonsList.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSeason(s)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 border
                      ${selectedSeason === s
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                        : 'bg-[#040d08] text-gray-400 border-emerald-900/30 hover:border-emerald-500/30'
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={predict}
              disabled={animating}
              className="w-full py-5 bg-gradient-to-r from-emerald-400 to-green-600 text-black font-black text-lg rounded-2xl hover:shadow-[0_0_40px_rgba(52,211,153,0.4)] transition-all uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {animating ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                    <Zap className="w-6 h-6" />
                  </motion.div>
                  {curr.btnComputing}
                </>
              ) : (
                <>
                  <BarChart3 className="w-6 h-6" /> {curr.btnPredict}
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-8 flex flex-col gap-6">
            
            {animating && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-16 flex flex-col items-center justify-center border-emerald-500/30 h-full min-h-[600px]">
                <div className="relative w-32 h-32 mb-8">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-2 border-t-emerald-400 border-r-emerald-400/50 border-b-transparent border-l-transparent" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-3 rounded-full border-2 border-t-transparent border-r-transparent border-b-emerald-400 border-l-emerald-400/50" />
                  <div className="absolute inset-0 flex items-center justify-center"><Sprout className="w-12 h-12 text-emerald-400" /></div>
                </div>
                <p className="text-emerald-400 font-mono text-lg tracking-widest uppercase">{curr.processMsg}</p>
                <p className="text-gray-500 text-sm mt-2">{curr.processSub}</p>
              </motion.div>
            )}

            {!predicted && !animating && (
              <div className="glass-card p-16 flex flex-col items-center justify-center text-center border-emerald-900/20 h-full min-h-[600px]">
                <BarChart3 className="w-20 h-20 text-emerald-900/60 mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">{curr.emptyTitle}</h3>
                <p className="text-gray-500 max-w-md">{curr.emptySub}</p>
              </div>
            )}

            {predicted && !animating && predictionData && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6 h-full">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  
                  {/* Resource Optimizer */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 border-emerald-900/30 flex flex-col h-full">
                    <h3 className="text-white font-bold tracking-wide text-lg mb-6 flex items-center">
                      <Layers className="w-5 h-5 text-emerald-400 mr-2" /> {curr.resTitle}
                    </h3>
                    
                    <div className="space-y-4 flex-1">
                      <div className="bg-[#040d08] p-4 rounded-xl border border-emerald-900/40 relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                        <div className="absolute left-0 top-0 w-1 h-full bg-blue-500" />
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm text-gray-400 flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-400" /> {curr.resWater}</p>
                          <p className="font-bold text-white">{predictionData.waterRequired}</p>
                        </div>
                        <div className="w-full bg-blue-900/20 h-1.5 rounded-full mt-3 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${predictionData.waterFill}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-blue-400 rounded-full" />
                        </div>
                      </div>

                      <div className="bg-[#040d08] p-4 rounded-xl border border-emerald-900/40 relative overflow-hidden group hover:border-yellow-500/40 transition-colors">
                        <div className="absolute left-0 top-0 w-1 h-full bg-yellow-500" />
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm text-gray-400 flex items-center gap-2"><Wheat className="w-4 h-4 text-yellow-400" /> {predictionData.plantingLabel || curr.resSeed}</p>
                          <p className="font-bold text-white">{predictionData.plantingMaterial || predictionData.seedsRequired}</p>
                        </div>
                        <div className="w-full bg-yellow-900/20 h-1.5 rounded-full mt-3 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${predictionData.plantingFill || predictionData.seedsFill}%` }} transition={{ duration: 1, delay: 0.6 }} className="h-full bg-yellow-400 rounded-full" />
                        </div>
                      </div>

                      <div className="bg-[#040d08] p-4 rounded-xl border border-emerald-900/40 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                        <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500" />
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm text-gray-400 flex items-center gap-2"><Leaf className="w-4 h-4 text-emerald-400" /> {curr.resFert}</p>
                          <p className="font-bold text-white">{predictionData.fertilizerRequired}</p>
                        </div>
                        <div className="w-full bg-emerald-900/20 h-1.5 rounded-full mt-3 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${predictionData.fertilizerFill}%` }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-emerald-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* AI Action Plan */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 border-emerald-900/30 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[100px] pointer-events-none" />
                    
                    <h3 className="text-white font-bold tracking-wide text-lg mb-6 flex items-center">
                      <Zap className="w-5 h-5 text-emerald-400 mr-2" /> {curr.aiPlanTitle}
                    </h3>

                    <div className="space-y-4 flex-1">
                      {predictionData.actionPlan && predictionData.actionPlan.map((plan, index) => {
                        const icons = [Calendar, ShieldAlert, Sprout];
                        const Icon = icons[index % icons.length];
                        
                        const colorClasses = [
                          { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
                          { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
                          { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' }
                        ];
                        const color = colorClasses[index % colorClasses.length];

                        return (
                          <div key={index} className="flex gap-4 items-start">
                            <div className={`w-10 h-10 rounded-full ${color.bg} border ${color.border} flex items-center justify-center shrink-0`}>
                              <Icon className={`w-4 h-4 ${color.text}`} />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold text-sm mb-1">{plan.title}</h4>
                              <p className="text-xs text-gray-400 leading-relaxed">{plan.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>
    </div>
  );
}
