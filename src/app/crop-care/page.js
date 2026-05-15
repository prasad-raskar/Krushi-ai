"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldPlus, Bug, Droplets, Leaf, Activity, CheckCircle, Search, Clock, AlertTriangle, FlaskConical, Bot, Sparkles, Loader2, Mic, Camera, ImageIcon, X, ScanLine } from 'lucide-react';
import AnimatedParticles from '@/components/AnimatedParticles';
import { useLanguage } from '@/context/LanguageContext';

export default function CropCare() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    en: {
      tag: "AI Diagnostics",
      title1: "Crop",
      title2: "Care Assistant",
      desc: "Describe your crop's problem, use your voice, or upload a photo to get AI-powered recommendations.",
      searchHint: "Describe symptoms... e.g., 'leaves are turning yellow'",
      askButton: "Ask AI",
      analyzingText: "AI is analyzing...",
      listeningText: "Listening...",
      welcomeTitle: "What issue is your crop facing today?",
      welcomeDesc: "Type your problem, use voice, or upload a photo of the diseased crop.",
      emptyTitle: "No exact match found.",
      emptyDesc: "Try describing the symptoms differently or uploading a clearer photo.",
      medicineOpt: "Medicine Action",
      fertilizerOpt: "Fertilizer Action",
      bestChoice: "AI Recommended",
      timeToResult: "Est. Recovery:",
      problems: [
        {
          id: 1,
          symptom: "Yellowing of Lower Leaves (Chlorosis)",
          keywords: ["yellow", "yellowing", "chlorosis", "pale"],
          crop: "Wheat, Maize, Sugarcane",
          cause: "Nitrogen Deficiency",
          medicine: "Not recommended unless viral infection is detected.",
          fertilizer: "Apply Urea or NPK 19-19-19 via foliar spray immediately.",
          bestAction: "fertilizer",
          recoveryTime: "4 - 7 Days",
          icon: Leaf,
          colorClass: "from-yellow-400 to-amber-600",
          shadowClass: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
          borderClass: "border-amber-500/30"
        },
        {
          id: 2,
          symptom: "White Powdery Spots on Leaves",
          keywords: ["white", "powdery", "spots", "mildew", "powder"],
          crop: "Grapes, Tomatoes, Cucurbits",
          cause: "Powdery Mildew (Fungal Infection)",
          medicine: "Spray Sulfur 80% WDG or Hexaconazole 5% SC.",
          fertilizer: "Avoid excess Nitrogen; it promotes rapid fungal growth.",
          bestAction: "medicine",
          recoveryTime: "7 - 10 Days",
          icon: Bug,
          colorClass: "from-red-400 to-rose-600",
          shadowClass: "shadow-[0_0_30px_rgba(225,29,72,0.15)]",
          borderClass: "border-rose-500/30"
        },
        {
          id: 3,
          symptom: "Leaves curling upwards & stunted growth",
          keywords: ["curling", "curl", "stunted", "thrips", "aphids", "insects"],
          crop: "Chilli, Cotton, Tomato",
          cause: "Thrips / Aphids Attack",
          medicine: "Spray Imidacloprid 17.8% SL or Neem Oil extract.",
          fertilizer: "Apply Amino Acid bio-stimulants 3 days after spraying.",
          bestAction: "medicine",
          recoveryTime: "3 - 5 Days",
          icon: Bug,
          colorClass: "from-blue-400 to-indigo-600",
          shadowClass: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
          borderClass: "border-indigo-500/30"
        },
        {
          id: 4,
          symptom: "Reddening of Cotton Leaves",
          keywords: ["red", "reddening", "red leaves"],
          crop: "Cotton",
          cause: "Magnesium Deficiency",
          medicine: "No chemical pesticides required for this condition.",
          fertilizer: "Spray Magnesium Sulfate (Epsom Salt) 2% solution.",
          bestAction: "fertilizer",
          recoveryTime: "5 - 8 Days",
          icon: Droplets,
          colorClass: "from-pink-400 to-rose-500",
          shadowClass: "shadow-[0_0_30px_rgba(244,63,94,0.15)]",
          borderClass: "border-pink-500/30"
        },
        {
          id: 5,
          symptom: "Sudden Wilting of Entire Plant",
          keywords: ["wilt", "wilting", "drooping", "dying", "rot"],
          crop: "Banana, Tomato, Tur (Pigeon Pea)",
          cause: "Fusarium Wilt / Root Rot",
          medicine: "Drenching with Trichoderma Viride or Carbendazim.",
          fertilizer: "Stop synthetic nitrogen; use organic manure only.",
          bestAction: "medicine",
          recoveryTime: "10 - 15 Days",
          icon: Activity,
          colorClass: "from-orange-400 to-amber-600",
          shadowClass: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
          borderClass: "border-orange-500/30"
        },
        {
          id: 6,
          symptom: "Holes in Pods / Fruits",
          keywords: ["holes", "borer", "worm", "caterpillar", "pod", "fruit"],
          crop: "Gram (Chana), Cotton (Bollworm)",
          cause: "Fruit Borer / Pod Borer",
          medicine: "Spray Emamectin Benzoate 5% SG.",
          fertilizer: "Provide adequate Potash (K) during the fruiting stage.",
          bestAction: "medicine",
          recoveryTime: "2 - 4 Days",
          icon: Bug,
          colorClass: "from-purple-400 to-fuchsia-600",
          shadowClass: "shadow-[0_0_30px_rgba(192,38,211,0.15)]",
          borderClass: "border-fuchsia-500/30"
        }
      ]
    },
    mr: {
      tag: "AI निदान",
      title1: "पीक",
      title2: "संरक्षण असिस्टंट",
      desc: "तुमच्या पिकाची समस्या सांगा, आवाज वापरा किंवा फोटो अपलोड करा आणि AI कडून अचूक उपाय मिळवा.",
      searchHint: "लक्षणे सांगा... उदा. 'पाने पिवळी पडत आहेत'",
      askButton: "AI ला विचारा",
      analyzingText: "AI तपासत आहे...",
      listeningText: "ऐकत आहे...",
      welcomeTitle: "आज मी तुमच्या पिकाला कशी मदत करू शकतो?",
      welcomeDesc: "तुमची समस्या खाली लिहा, माईक वापरून बोला किंवा रोगग्रस्त पिकाचा फोटो अपलोड करा.",
      emptyTitle: "मला या समस्येचे अचूक निदान सापडले नाही.",
      emptyDesc: "कृपया लक्षणांचे वेगळ्या शब्दात वर्णन करा किंवा अधिक स्पष्ट फोटो अपलोड करा.",
      medicineOpt: "औषधाचा पर्याय",
      fertilizerOpt: "खताचा पर्याय",
      bestChoice: "AI शिफारस",
      timeToResult: "अपेक्षित वेळ:",
      problems: [
        {
          id: 1,
          symptom: "खालची पाने पिवळी पडणे",
          keywords: ["पिवळी", "पिवळे", "पडणे", "हरितद्रव्य", "yellow"],
          crop: "गहू, मका, ऊस",
          cause: "नायट्रोजनची कमतरता (नत्र)",
          medicine: "फवारणीची गरज नाही (विषाणूजन्य रोग नसल्यास).",
          fertilizer: "युरिया किंवा NPK १९-१९-१९ ची तातडीने फवारणी करा.",
          bestAction: "fertilizer",
          recoveryTime: "४ - ७ दिवस",
          icon: Leaf,
          colorClass: "from-yellow-400 to-amber-600",
          shadowClass: "shadow-[0_0_30px_rgba(251,191,36,0.15)]",
          borderClass: "border-amber-500/30"
        },
        {
          id: 2,
          symptom: "पानांवर पांढऱ्या पावडरसारखे डाग (भुरी)",
          keywords: ["पांढरे", "पांढऱ्या", "डाग", "पावडर", "भुरी", "white", "spots"],
          crop: "द्राक्षे, टोमॅटो, काकडीवर्गीय पिके",
          cause: "भुरी रोग (बुरशीजन्य आजार)",
          medicine: "सल्फर ८०% WDG किंवा हेक्झाकोनाझोलची फवारणी करा.",
          fertilizer: "जास्त नायट्रोजन (युरिया) देणे टाळा, यामुळे बुरशी वाढते.",
          bestAction: "medicine",
          recoveryTime: "७ - १० दिवस",
          icon: Bug,
          colorClass: "from-red-400 to-rose-600",
          shadowClass: "shadow-[0_0_30px_rgba(225,29,72,0.15)]",
          borderClass: "border-rose-500/30"
        },
        {
          id: 3,
          symptom: "पाने वरच्या बाजूला वळणे आणि वाढ खुंटणे",
          keywords: ["वळणे", "खुंटणे", "कीड", "मावा", "फुलकिडे", "चुरडा", "मुरडा"],
          crop: "मिरची, कापूस, टोमॅटो",
          cause: "फुलकिडे / मावा (रस शोषक कीड)",
          medicine: "इमिडाक्लोप्रिड १७.८% SL किंवा निम अर्काची फवारणी करा.",
          fertilizer: "फवारणीनंतर ३ दिवसांनी अमिनो ऍसिड (Bio-stimulant) द्यावे.",
          bestAction: "medicine",
          recoveryTime: "३ - ५ दिवस",
          icon: Bug,
          colorClass: "from-blue-400 to-indigo-600",
          shadowClass: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
          borderClass: "border-indigo-500/30"
        },
        {
          id: 4,
          symptom: "कपाशीची पाने लाल पडणे (Reddening)",
          keywords: ["लाल", "लाल्या", "red"],
          crop: "कापूस",
          cause: "मॅग्नेशियमची कमतरता",
          medicine: "या समस्येसाठी रासायनिक कीटकनाशकाची गरज नाही.",
          fertilizer: "मॅग्नेशियम सल्फेट (इप्सम सॉल्ट) २% फवारा.",
          bestAction: "fertilizer",
          recoveryTime: "५ - ८ दिवस",
          icon: Droplets,
          colorClass: "from-pink-400 to-rose-500",
          shadowClass: "shadow-[0_0_30px_rgba(244,63,94,0.15)]",
          borderClass: "border-pink-500/30"
        },
        {
          id: 5,
          symptom: "संपूर्ण झाड अचानक कोमेजणे (मर रोग)",
          keywords: ["कोमेजणे", "मर", "सुखणे", "वाळणे", "wilt"],
          crop: "केळी, टोमॅटो, तूर",
          cause: "फ्युजेरियम विल्ट / मूळकुज (बुरशी)",
          medicine: "ट्रायकोडर्मा किंवा कार्बेंडाझिमची आळवणी (Drenching) करा.",
          fertilizer: "रासायनिक नत्र थांबवा; फक्त सेंद्रिय खतांचा वापर करा.",
          bestAction: "medicine",
          recoveryTime: "१० - १५ दिवस",
          icon: Activity,
          colorClass: "from-orange-400 to-amber-600",
          shadowClass: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
          borderClass: "border-orange-500/30"
        },
        {
          id: 6,
          symptom: "फळांना किंवा शेंगांना छिद्रे पडणे",
          keywords: ["छिद्रे", "अळी", "घाटेअळी", "बोंडअळी", "फळ", "शेंगा", "hole"],
          crop: "हरभरा (घाटेअळी), कापूस (बोंडअळी)",
          cause: "फळ पोखरणारी अळी (Borer)",
          medicine: "इमामेक्टिन बेंझोएट ५% SG ची फवारणी करा.",
          fertilizer: "फळधारणेच्या काळात पालाश (Potash) पुरेशा प्रमाणात द्या.",
          bestAction: "medicine",
          recoveryTime: "२ - ४ दिवस",
          icon: Bug,
          colorClass: "from-purple-400 to-fuchsia-600",
          shadowClass: "shadow-[0_0_30px_rgba(192,38,211,0.15)]",
          borderClass: "border-fuchsia-500/30"
        }
      ]
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  const handleAnalyze = async (e, explicitQuery = null, explicitImageFile = null) => {
    e?.preventDefault();
    const currentImg = explicitImageFile || selectedImage;
    const queryText = explicitQuery !== null ? explicitQuery : (currentImg ? inputText || "Analyze this uploaded image for crop diseases." : inputText);
    if (!queryText.trim() && !currentImg) return;

    setIsAnalyzing(true);
    setResults(null);

    try {
      let imageData = null;
      if (currentImg) {
        const base64Data = await getBase64(currentImg);
        imageData = {
          data: base64Data,
          mimeType: currentImg.type
        };
      }

      // Call the real AI API
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, lang, image: imageData })
      });

      if (response.status === 429) {
        throw new Error("RATE_LIMIT");
      }

      if (!response.ok) {
        throw new Error("Failed to fetch from AI");
      }

      const data = await response.json();
      
      // Map AI response to UI structure
      const aiResult = {
        id: Date.now(),
        symptom: data.symptom || queryText,
        crop: data.crop || 'Unknown',
        cause: data.cause || 'AI Analysis Complete',
        medicine: data.medicine || 'Not specified',
        fertilizer: data.fertilizer || 'Not specified',
        fertilizerSchedule: data.fertilizerSchedule || (lang === 'mr' ? 'माहिती उपलब्ध नाही' : 'Not specified'),
        fertilizerResultTime: data.fertilizerResultTime || null,
        medicineSchedule: data.medicineSchedule || null,
        medicineResultTime: data.medicineResultTime || null,
        bestAction: data.bestAction === 'fertilizer' ? 'fertilizer' : 'medicine',
        recoveryTime: data.recoveryTime || 'N/A',
        icon: Activity,
        colorClass: "from-indigo-400 to-purple-600",
        shadowClass: "shadow-[0_0_30px_rgba(99,102,241,0.15)]",
        borderClass: "border-indigo-500/30"
      };

      setResults([aiResult]);

    } catch (error) {
      console.error(error);
      setResults([]);
      if (error.message === "RATE_LIMIT") {
        alert(lang === 'mr' ? 'सर्व्हरवर सध्या खूप ट्रॅफिक आहे. कृपया १ मिनिट थांबून पुन्हा प्रयत्न करा.' : 'High server traffic. Please wait 1 minute and try again.');
      } else {
        alert(lang === 'mr' ? 'AI सर्व्हरशी संपर्क होऊ शकला नाही. कृपया पुन्हा प्रयत्न करा.' : 'Failed to connect to AI server. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(lang === 'mr' ? 'तुमचा ब्राउझर व्हॉइस इनपुटला सपोर्ट करत नाही.' : 'Your browser does not support voice input.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'mr' ? 'mr-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setInputText(curr.listeningText);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      
      // Auto submit after voice
      setTimeout(() => {
        handleAnalyze(null, transcript);
      }, 500);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
      setInputText('');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };


  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setInputText('');
      
      // Auto analyze the image
      handleAnalyze(null, null, file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden bg-[#020804]">
      <AnimatedParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#020804] to-[#020804] pointer-events-none" />
      <div className="glow-bg opacity-40" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <Bot className="w-4 h-4 text-indigo-400 mr-2" />
              <span className="text-xs font-semibold text-indigo-300 tracking-wider">{curr.tag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              {curr.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-500">{curr.title2}</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">{curr.desc}</p>
          </motion.div>
        </div>

        {/* Image Preview Area */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }} 
              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }} 
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="max-w-3xl"
            >
              <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 glass-panel p-2 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                <img src={previewUrl} alt="Uploaded crop" className="w-full h-auto max-h-[400px] object-cover rounded-xl" />
                
                {/* AI Scanning Overlay */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl z-10 m-2 border border-indigo-500/50">
                    <div className="relative w-20 h-20 mb-4">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-400 blur-[1px]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ScanLine className="w-8 h-8 text-indigo-400" />
                      </div>
                      <motion.div 
                        initial={{ top: 0 }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-indigo-400 shadow-[0_0_10px_#818cf8]" 
                      />
                    </div>
                    <p className="text-indigo-200 font-bold tracking-widest uppercase text-sm animate-pulse">{curr.analyzingText}</p>
                  </div>
                )}

                {!isAnalyzing && (
                  <button 
                    onClick={() => { setSelectedImage(null); setPreviewUrl(null); setResults(null); setInputText(''); }}
                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-red-500/80 rounded-full text-white backdrop-blur-md transition-all shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Input Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 max-w-3xl"
        >
          <form onSubmit={handleAnalyze} className="glass-panel p-2 rounded-2xl border border-indigo-500/30 flex items-center bg-[#040d08]/80 shadow-[0_0_30px_rgba(99,102,241,0.1)] focus-within:border-indigo-400 focus-within:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all">
            
            <div className="pl-4 py-3 shrink-0">
              {selectedImage ? <ImageIcon className="w-5 h-5 text-indigo-400" /> : <Search className="w-5 h-5 text-indigo-400" />}
            </div>
            
            <input 
              type="text" 
              placeholder={curr.searchHint}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-transparent border-none py-4 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-lg"
              disabled={isAnalyzing || isListening || selectedImage}
            />

            {/* Mic Button */}
            <button 
              type="button" 
              onClick={handleMicClick}
              disabled={isAnalyzing || selectedImage}
              className={`shrink-0 p-3 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'hover:bg-indigo-900/30 text-indigo-400 disabled:opacity-50'}`}
              title="Voice Input"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Camera / Image Upload Button */}
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing || isListening}
              className="shrink-0 p-3 hover:bg-indigo-900/30 text-indigo-400 rounded-xl transition-all mr-2 disabled:opacity-50"
              title="Upload Photo"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              hidden 
              accept="image/*" 
              onChange={handleImageUpload} 
            />

            <button 
              type="submit"
              disabled={isAnalyzing || isListening || (!inputText.trim() && !selectedImage)}
              className="shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-500 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all mr-1"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="hidden sm:inline">{curr.analyzingText}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span className="hidden sm:inline">{curr.askButton}</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Welcome State (If not searched yet) */}
        {!results && !isAnalyzing && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center py-20 opacity-60"
          >
            <ShieldPlus className="w-20 h-20 text-indigo-900 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-3">{curr.welcomeTitle}</h2>
            <p className="text-gray-400 max-w-md text-lg">{curr.welcomeDesc}</p>
          </motion.div>
        )}

        {/* Diagnostic Results Grid */}
        {results && results.length > 0 && (
          <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <AnimatePresence>
              {results.map((prob, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  key={prob.id}
                  className={`glass-card p-6 flex flex-col relative overflow-hidden group hover:border-indigo-500/40 transition-all duration-300 ${prob.shadowClass}`}
                >
                  {/* Background Glow */}
                  <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${prob.colorClass} opacity-5 rounded-full blur-[40px] pointer-events-none group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Header (Problem) */}
                  <div className="flex items-start gap-4 mb-6 relative z-10 border-b border-indigo-900/30 pb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-[#040d08] shrink-0 flex items-center justify-center border ${prob.borderClass} shadow-inner`}>
                      <prob.icon className={`w-7 h-7 text-transparent bg-clip-text bg-gradient-to-br ${prob.colorClass}`} style={{ color: 'white' }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-white mb-1.5 leading-tight group-hover:text-indigo-300 transition-colors">{prob.symptom}</h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="px-2.5 py-0.5 bg-indigo-900/20 text-indigo-300 rounded text-xs font-bold border border-indigo-500/20">
                          {prob.crop}
                        </span>
                        <span className="text-sm font-semibold text-gray-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-orange-400" /> {prob.cause}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Comparison (Medicine vs Fertilizer) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    
                    {/* Medicine Card */}
                    <div className={`rounded-xl p-5 border relative overflow-hidden transition-all duration-300 ${
                      prob.bestAction === 'medicine' 
                        ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                        : 'bg-[#040d08] border-gray-800 opacity-60 hover:opacity-100'
                    }`}>
                      {prob.bestAction === 'medicine' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                          <FlaskConical className="w-3.5 h-3.5" /> {curr.medicineOpt}
                        </p>
                        {prob.bestAction === 'medicine' && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {curr.bestChoice}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm font-semibold leading-relaxed ${prob.bestAction === 'medicine' ? 'text-emerald-100' : 'text-gray-400'}`}>
                        {prob.medicine}
                      </p>
                      {prob.medicineSchedule && prob.medicineSchedule !== 'Not specified' && prob.medicineSchedule !== 'माहिती उपलब्ध नाही' && (
                        <div className="mt-3 pt-3 border-t border-emerald-900/30 flex items-start gap-2">
                          <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-emerald-200/80 font-medium leading-relaxed">
                            {prob.medicineSchedule}
                          </p>
                        </div>
                      )}
                      {prob.bestAction === 'medicine' && prob.medicineResultTime && prob.medicineResultTime !== 'Not specified' && prob.medicineResultTime !== 'माहिती उपलब्ध नाही' && (
                        <div className="mt-2 flex items-start gap-2">
                          <Activity className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-emerald-100 font-bold leading-relaxed">
                            अपेक्षित वेळ: {prob.medicineResultTime}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Fertilizer Card */}
                    <div className={`rounded-xl p-5 border relative overflow-hidden transition-all duration-300 ${
                      prob.bestAction === 'fertilizer' 
                        ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
                        : 'bg-[#040d08] border-gray-800 opacity-60 hover:opacity-100'
                    }`}>
                      {prob.bestAction === 'fertilizer' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500" />
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                          <Leaf className="w-3.5 h-3.5" /> {curr.fertilizerOpt}
                        </p>
                        {prob.bestAction === 'fertilizer' && (
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-900/30 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {curr.bestChoice}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm font-semibold leading-relaxed ${prob.bestAction === 'fertilizer' ? 'text-amber-100' : 'text-gray-400'}`}>
                        {prob.fertilizer}
                      </p>
                      {prob.fertilizerSchedule && prob.fertilizerSchedule !== 'Not specified' && prob.fertilizerSchedule !== 'माहिती उपलब्ध नाही' && (
                        <div className="mt-3 pt-3 border-t border-amber-900/30 flex items-start gap-2">
                          <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-200/80 font-medium leading-relaxed">
                            {prob.fertilizerSchedule}
                          </p>
                        </div>
                      )}
                      {prob.bestAction === 'fertilizer' && prob.fertilizerResultTime && prob.fertilizerResultTime !== 'Not specified' && prob.fertilizerResultTime !== 'माहिती उपलब्ध नाही' && (
                        <div className="mt-2 flex items-start gap-2">
                          <Activity className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-100 font-bold leading-relaxed">
                            अपेक्षित वेळ: {prob.fertilizerResultTime}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State (If searched and no results) */}
        {results && results.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="py-16 flex flex-col items-center justify-center text-center glass-panel rounded-3xl border border-indigo-500/20 max-w-2xl mx-auto w-full"
          >
            <ShieldPlus className="w-16 h-16 text-indigo-900 mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">{curr.emptyTitle}</h3>
            <p className="text-gray-400">{curr.emptyDesc}</p>
          </motion.div>
        )}

      </div>
    </div>
  );
}
