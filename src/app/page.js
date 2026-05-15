"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scan, Mic, CloudRain, ShieldCheck, Sprout, BarChart3, Upload, MessageSquare, Star, Droplets, Wind, Zap } from 'lucide-react';
import Link from 'next/link';
import AnimatedParticles from '@/components/AnimatedParticles';
import FloatingIcons from '@/components/FloatingIcons';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

const Section = ({ children, className = "", id = "" }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
    }}
    className={`relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full ${className}`}
  >
    {children}
  </motion.section>
);

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    en: {
      heroTag: "THE NEXT GENERATION OF FARMING IS HERE",
      heroTitle1: "Empowering Farmers",
      heroTitle2: "with Artificial Intelligence",
      heroDesc: "KrushiAI brings modern agricultural technology to your fingertips. Increase yield, detect diseases early, and connect with global markets.",
      btnScan: "Start AI Scan",
      btnVoice: "Voice Assistant",
      featuresTitle1: "A Complete Ecosystem",
      featuresTitle2: "for Modern Farming",
      featuresDesc: "Everything you need to run a highly efficient, sustainable, and profitable farm.",
      features: [
        { icon: <Scan className="w-8 h-8 text-emerald-400" />, title: "AI Crop Scan", desc: "Instant disease detection via computer vision." },
        { icon: <Mic className="w-8 h-8 text-emerald-400" />, title: "Voice Assistant", desc: "Multilingual support for on-farm guidance." },
        { icon: <CloudRain className="w-8 h-8 text-emerald-400" />, title: "Hyper-local Weather", desc: "Accurate weather forecasting for your farm." },
        { icon: <Sprout className="w-8 h-8 text-emerald-400" />, title: "Fertilizer Guide", desc: "Optimal nutrition recommendations for crops." },
        { icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />, title: "Govt Schemes", desc: "Automated eligibility checking." },
        { icon: <BarChart3 className="w-8 h-8 text-emerald-400" />, title: "Yield Prediction", desc: "AI-powered yield estimation for better planning." }
      ],
      scanTitle1: "Identify crop health",
      scanTitle2: "Instantly",
      scanDesc: "Just upload a photo of your crop's leaves. Our deep learning models detect pests, diseases, and nutrient deficiencies in milliseconds.",
      scanList: ['Detects 100+ crop diseases', 'Provides actionable treatment plans', 'Works offline on mobile app'],
      scanLink: "Use Scanner Now",
      scanBoxScan: "Scanning leaf sample...",
      scanBoxStatus: "Status: Healthy",
      scanBoxConf: "Confidence: 98.7%",
      voiceTitle1: "Talk to your farm",
      voiceTitle2: "in your language",
      voiceDesc: "No need to type. Just ask about weather forecasts, market prices, or disease treatments. The AI speaks 20+ regional languages.",
      voicePrompt: '"What is the current mandi rate for soybean?"',
      voiceProcess: "AI Processing...",
      voiceLink: "Start Voice Assistant",
      voiceListening: "Listening...",
      voiceSpeakNow: "Speak now for instant answers",

      ctaTitle: "Ready to transform your farm?",
      ctaDesc: "Join the agricultural revolution today. It's free to get started.",
      ctaBtn: "Create Free Account"
    },
    mr: {
      heroTag: "पुढच्या पिढीची शेती आली आहे",
      heroTitle1: "शेतकऱ्यांना सशक्त",
      heroTitle2: "करतोय कृत्रिम बुद्धिमत्तेने",
      heroDesc: "कृषीAI आधुनिक कृषी तंत्रज्ञान तुमच्या हातात आणतो. उत्पादन वाढवा, रोग लवकर ओळखा आणि जागतिक बाजारपेठेशी जोडले जा.",
      btnScan: "AI स्कॅन सुरू करा",
      btnVoice: "व्हॉइस सहाय्यक",
      featuresTitle1: "आधुनिक शेतीसाठी",
      featuresTitle2: "संपूर्ण परिसंस्था",
      featuresDesc: "अत्यंत कार्यक्षम, शाश्वत आणि फायदेशीर शेती चालवण्यासाठी तुम्हाला लागणारे सर्वकाही.",
      features: [
        { icon: <Scan className="w-8 h-8 text-emerald-400" />, title: "AI पीक स्कॅन", desc: "कॉम्प्युटर व्हिजनद्वारे तात्काळ रोग ओळख." },
        { icon: <Mic className="w-8 h-8 text-emerald-400" />, title: "व्हॉइस सहाय्यक", desc: "शेतावरील मार्गदर्शनासाठी बहुभाषिक सहाय्य." },
        { icon: <CloudRain className="w-8 h-8 text-emerald-400" />, title: "स्थानिक हवामान", desc: "तुमच्या शेतासाठी अचूक हवामान अंदाज." },
        { icon: <Sprout className="w-8 h-8 text-emerald-400" />, title: "अचूक खत मार्गदर्शन", desc: "पिकांसाठी सर्वोत्तम पोषण शिफारसी." },
        { icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />, title: "सरकारी योजना", desc: "स्वयंचलित पात्रता तपासणी." },
        { icon: <BarChart3 className="w-8 h-8 text-emerald-400" />, title: "उत्पादन अंदाज", desc: "AI-आधारित उत्पादन अंदाज आणि नियोजन." }
      ],
      scanTitle1: "पिकाचे आरोग्य",
      scanTitle2: "तात्काळ ओळखा",
      scanDesc: "फक्त तुमच्या पिकाच्या पानांचा फोटो अपलोड करा. आमचे डीप लर्निंग मॉडेल कीटक, रोग आणि पोषक तत्वांची कमतरता मिलिसेकंदात ओळखतात.",
      scanList: ['१००+ पीक रोग ओळखतो', 'कृतीयोग्य उपचार योजना दिली जाते', 'मोबाइल अ‍ॅपवर ऑफलाइन काम करते'],
      scanLink: "आता स्कॅनर वापरा",
      scanBoxScan: "पानांचा नमुना स्कॅन करत आहे...",
      scanBoxStatus: "स्थिती: निरोगी",
      scanBoxConf: "विश्वासार्हता: ९८.७%",
      voiceTitle1: "तुमच्या शेताशी बोला",
      voiceTitle2: "तुमच्या भाषेत",
      voiceDesc: "टाइप करण्याची गरज नाही. हवामान अंदाज, बाजारभाव किंवा रोग उपचारांबद्दल सहज बोलून विचारा. AI २०+ प्रादेशिक भाषा बोलतो.",
      voicePrompt: '"सोयाबीनचा सध्याचा मंडी भाव काय आहे?"',
      voiceProcess: "AI प्रक्रिया सुरू...",
      voiceLink: "व्हॉइस सहाय्यक सुरू करा",
      voiceListening: "ऐकत आहे...",
      voiceSpeakNow: "तात्काळ उत्तर मिळवण्यासाठी आता बोला",

      ctaTitle: "तुमची शेती बदलायला तयार आहात?",
      ctaDesc: "आजच कृषी क्रांतीत सामील व्हा. सुरुवात करणे मोफत आहे.",
      ctaBtn: "मोफत खाते तयार करा"
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#020804]">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center w-full pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#020804]/90 z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute top-0 w-full h-[300px] bg-gradient-to-b from-[#020804] to-transparent z-10" />
          <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-[#020804] to-transparent z-10" />
        </div>

        <AnimatedParticles />
        <FloatingIcons />
        <div className="glow-bg" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="flex flex-col items-center"
          >
            <motion.div variants={itemVariants} className="mb-8 inline-flex items-center px-5 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 mr-3 animate-pulse"></span>
              <span className="text-sm font-semibold text-emerald-300 tracking-wider uppercase">{curr.heroTag}</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              {curr.heroTitle1} <br className="hidden md:block" />
              <span className="text-gradient">{curr.heroTitle2}</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="max-w-2xl text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed font-light">
              {curr.heroDesc}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link href="/crop-care" className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-black bg-gradient-to-r from-emerald-400 to-green-500 rounded-full overflow-hidden transition-transform hover:scale-105 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-20"></span>
                <Scan className="w-6 h-6 mr-3" />
                {curr.btnScan}
              </Link>
              
              <Link href="/crop-care" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white glass-panel rounded-full hover:bg-emerald-900/50 hover:border-emerald-500/50 transition-all hover:scale-105">
                <Mic className="w-6 h-6 mr-3 text-emerald-400" />
                {curr.btnVoice}
                <ArrowRight className="w-5 h-5 ml-3 opacity-70" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Section */}
      <Section id="features" className="z-20">
        <div className="text-center mb-20">
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6"><span className="text-gradient">{curr.featuresTitle1}</span> {curr.featuresTitle2}</motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto">{curr.featuresDesc}</motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {curr.features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -15, scale: 1.02 }}
              className="glass-card p-10 flex flex-col items-start text-left group cursor-default"
            >
              <div className="p-4 rounded-2xl bg-emerald-900/30 border border-emerald-500/20 mb-8 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 3. AI Scan Demo Section */}
      <Section className="z-20 border-t border-emerald-900/30">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{curr.scanTitle1} <span className="text-gradient">{curr.scanTitle2}</span></h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {curr.scanDesc}
            </p>
            <ul className="space-y-6 mb-10">
              {curr.scanList.map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/crop-care" className="text-emerald-400 font-bold flex items-center hover:text-emerald-300 transition-colors text-lg">
              {curr.scanLink} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
            <div className="glass-card p-2 relative z-10 border border-emerald-500/30 overflow-hidden group">
              <div className="w-full h-80 bg-zinc-900 rounded-2xl flex flex-col items-center justify-center border border-emerald-900/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400 shadow-[0_0_20px_#34d399] animate-[scan_3s_ease-in-out_infinite]" />
                <Upload className="w-16 h-16 text-emerald-500/50 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-gray-500 font-medium">{curr.scanBoxScan}</p>
                <div className="absolute bottom-4 left-4 right-4 glass-panel rounded-xl p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div>
                    <p className="text-emerald-400 font-bold text-sm">{curr.scanBoxStatus}</p>
                    <p className="text-xs text-gray-400">{curr.scanBoxConf}</p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 4. Voice Assistant Demo */}
      <Section className="z-20 border-t border-emerald-900/30">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">{curr.voiceTitle1} <span className="text-gradient">{curr.voiceTitle2}</span></h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {curr.voiceDesc}
            </p>
            <div className="glass-panel p-6 rounded-2xl mb-6 flex gap-4 items-start relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-medium mb-2">{curr.voicePrompt}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />)}
                  </div>
                  <span className="text-xs text-emerald-400">{curr.voiceProcess}</span>
                </div>
              </div>
            </div>
            <Link href="/crop-care" className="text-emerald-400 font-bold flex items-center hover:text-emerald-300 transition-colors text-lg">
              {curr.voiceLink} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="w-full lg:w-1/2 relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
            <div className="glass-card p-8 relative z-10 border border-emerald-500/30 flex flex-col items-center text-center">
              <div className="relative mb-12">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
                <div className="absolute -inset-8 rounded-full bg-emerald-500/10 animate-pulse" />
                <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                  <Mic className="w-14 h-14 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{curr.voiceListening}</h3>
              <p className="text-gray-400">{curr.voiceSpeakNow}</p>
            </div>
          </motion.div>
        </div>
      </Section>



      {/* 8. Call to Action */}
      <Section className="z-20 pb-0">
        <motion.div variants={itemVariants} className="glass-card border-emerald-500/40 p-12 md:p-20 text-center relative overflow-hidden group mb-[-2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight relative z-10">{curr.ctaTitle}</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto relative z-10">{curr.ctaDesc}</p>
          <button className="relative z-10 px-10 py-5 text-lg font-bold text-black bg-emerald-400 rounded-full hover:bg-emerald-300 transition-colors shadow-[0_0_30px_rgba(52,211,153,0.5)]">
            {curr.ctaBtn}
          </button>
        </motion.div>
      </Section>

      {/* Footer */}
      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
