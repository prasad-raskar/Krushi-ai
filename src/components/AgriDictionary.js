"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Droplets, Bug, Leaf, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AgriDictionary() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('fertilizer'); // 'fertilizer' | 'medicine'

  const data = {
    mr: {
      title: "कृषी शब्दकोश (खते आणि औषधे)",
      fertilizerTab: "खते (Fertilizers)",
      medicineTab: "औषधे (Medicines)",
      fertilizers: [
        { name: "युरिया (४६% नत्र)", use: "पिकाच्या जलद वाढीसाठी आणि पानांना गडद हिरवा रंग देण्यासाठी." },
        { name: "DAP (१८:४६:०)", use: "मुळांच्या मजबूत वाढीसाठी आणि पिकाच्या सुरुवातीच्या अवस्थेत उपयुक्त." },
        { name: "MOP (म्युरेट ऑफ पोटॅश)", use: "फळांचा आकार, चकाकी वाढवण्यासाठी आणि पिकाची रोगप्रतिकारक शक्ती वाढवण्यासाठी." },
        { name: "१०:२६:२६ NPK", use: "फुले आणि फळे लागण्याच्या अवस्थेत पिकाच्या सर्वांगीण वाढीसाठी." },
        { name: "१९:१९:१९ (Water Soluble)", use: "पानांद्वारे फवारणीतून पिकाला जलद आणि संतुलित पोषण देण्यासाठी." },
        { name: "मॅग्नेशियम सल्फेट", use: "पानांचा पिवळसरपणा (विशेषतः लाल्या) दूर करून प्रकाशसंश्लेषण वाढवण्यासाठी." },
        { name: "चिलेटेड झिंक (Zinc)", use: "पानांचा आकार लहान होणे टाळण्यासाठी आणि नवीन फुटीसाठी." }
      ],
      medicines: [
        { name: "कोराजन (Bayer Coragen)", use: "अळी, खोडकिडा आणि फळ पोखरणारी अळी यांवर अत्यंत प्रभावी कीटकनाशक." },
        { name: "अमिस्टार टॉप (Amistar Top)", use: "करपा, भुरी आणि पानांवरील डाग यांसारख्या बुरशीजन्य रोगांवर प्रभावी." },
        { name: "उलाला (Ulala)", use: "पांढरी माशी, मावा, आणि तुडतुडे या रस शोषक किडींचा नायनाट करण्यासाठी." },
        { name: "साफ (SAAF Fungicide)", use: "बुरशीमुळे होणारी मूळकुज आणि पानांवरील डाग थांबवण्यासाठी प्रतिबंधात्मक उपाय." },
        { name: "प्लॅनोफिक्स (Planofix - PGR)", use: "फुले व फळे गळणे थांबवण्यासाठी अत्यंत उपयुक्त टॉनिक." },
        { name: "इमामेक्टिन बेंझोएट", use: "सर्व प्रकारच्या अळ्यांच्या (विशेषतः बोंडअळी) नियंत्रणासाठी स्वस्त आणि मस्त." },
        { name: "इमिडाक्लोप्रिड", use: "रस शोषक किडी आणि फुलकिड्यांच्या (थ्रिप्स) नियंत्रणासाठी उत्तम." }
      ]
    },
    en: {
      title: "Agri Dictionary (Fertilizers & Medicines)",
      fertilizerTab: "Fertilizers",
      medicineTab: "Medicines",
      fertilizers: [
        { name: "Urea (46% N)", use: "For rapid vegetative growth and intense green color in leaves." },
        { name: "DAP (18:46:0)", use: "Excellent for root development and early stage crop establishment." },
        { name: "MOP (Muriate of Potash)", use: "Increases fruit size, shine, and overall disease resistance." },
        { name: "10:26:26 NPK", use: "Balanced nutrient supply during flowering and fruiting stages." },
        { name: "19:19:19 (Water Soluble)", use: "Quick foliar absorption for immediate nutrient supply." },
        { name: "Magnesium Sulphate", use: "Prevents yellowing of leaves and boosts photosynthesis." },
        { name: "Chelated Zinc", use: "Prevents stunted growth and small leaf syndrome." }
      ],
      medicines: [
        { name: "Coragen (Bayer)", use: "Highly effective against stem borers, fruit borers, and caterpillars." },
        { name: "Amistar Top", use: "Controls fungal diseases like blight, powdery mildew, and leaf spots." },
        { name: "Ulala", use: "Excellent for controlling sucking pests like whiteflies and aphids." },
        { name: "SAAF Fungicide", use: "Prevents root rot and fungal leaf spot diseases." },
        { name: "Planofix (PGR)", use: "Prevents flower and fruit drop effectively." },
        { name: "Emamectin Benzoate", use: "Effectively controls all types of worms and caterpillars." },
        { name: "Imidacloprid", use: "Broad-spectrum control for sucking pests and thrips." }
      ]
    }
  };

  const t = data[lang] || data.en;
  const list = activeTab === 'fertilizer' ? t.fertilizers : t.medicines;

  return (
    <div className="mt-12 bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-800 p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      <div className="flex items-center gap-3 mb-8">
        <Book className="w-6 h-6 text-emerald-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white">{t.title}</h2>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={() => setActiveTab('fertilizer')}
          className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'fertilizer'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              : 'bg-gray-800/80 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-gray-200'
          }`}
        >
          <Leaf className="w-5 h-5" />
          {t.fertilizerTab}
        </button>
        <button
          onClick={() => setActiveTab('medicine')}
          className={`flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
            activeTab === 'medicine'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
              : 'bg-gray-800/80 text-gray-400 border border-gray-700 hover:bg-gray-700 hover:text-gray-200'
          }`}
        >
          <Bug className="w-5 h-5" />
          {t.medicineTab}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((item, idx) => (
          <motion.div
            key={idx + activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50 transition-colors group"
          >
            <div className={`p-2 rounded-lg shrink-0 transition-colors ${
              activeTab === 'fertilizer' 
                ? 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20' 
                : 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20'
            }`}>
              {activeTab === 'fertilizer' ? <Droplets className="w-5 h-5" /> : <FlaskConical className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1.5 text-base">{item.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.use}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
