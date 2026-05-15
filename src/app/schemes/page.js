"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Sprout, Droplets, IndianRupee, Users } from 'lucide-react';
import AnimatedParticles from '@/components/AnimatedParticles';
import { useLanguage } from '@/context/LanguageContext';

export default function GovernmentSchemes() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    en: {
      tag: "Govt Subsidies",
      title1: "National",
      title2: "Schemes",
      desc: "Access your agricultural benefits, insurance, and financial aid.",
      finBenefit: "Financial Benefit",
      eligibility: "Eligibility",
      schemes: [
        {
          id: 1,
          title: 'PM-KISAN Samman Nidhi',
          department: 'Ministry of Agriculture',
          benefit: '₹6,000 / year',
          description: 'Direct income support to all landholding farmer families in the country, payable in three equal installments of ₹2000.',
          eligibility: ['Small & Marginal Farmers', 'Valid Bank A/C', 'Aadhaar Linked'],
          icon: IndianRupee, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', borderColor: 'border-emerald-500/30'
        },
        {
          id: 2,
          title: 'Pradhan Mantri Krishi Sinchayee Yojana',
          department: 'Ministry of Agriculture',
          benefit: 'Up to 55% Subsidy',
          description: 'Enhance physical access of water on the farm and expand cultivable area under assured irrigation, improve on-farm water use efficiency.',
          eligibility: ['All Farmers', 'Own Farmland'],
          icon: Droplets, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', borderColor: 'border-blue-500/30'
        },
        {
          id: 3,
          title: 'Paramparagat Krishi Vikas Yojana',
          department: 'Organic Farming Board',
          benefit: '₹50,000 / hectare',
          description: 'Financial assistance for 3 years for organic inputs procurement, certification, and labeling to promote organic farming.',
          eligibility: ['Farmer Cluster (20 ha)', 'Willing to go Organic'],
          icon: Sprout, iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400', borderColor: 'border-yellow-500/30'
        },
        {
          id: 4,
          title: 'Agriculture Infrastructure Fund',
          department: 'NABARD',
          benefit: '3% Interest Subvention',
          description: 'Financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets.',
          eligibility: ['FPOs', 'Self Help Groups', 'Agri-entrepreneurs'],
          icon: Landmark, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', borderColor: 'border-purple-500/30'
        },
        {
          id: 5,
          title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
          department: 'Ministry of Agriculture',
          benefit: 'Comprehensive Insurance',
          description: 'Crop insurance scheme integrating multiple stakeholders on a single IT platform to protect farmers against crop failure due to natural calamities.',
          eligibility: ['Loanee Farmers', 'Non-Loanee Farmers', 'Sharecroppers'],
          icon: Landmark, iconBg: 'bg-teal-500/10', iconColor: 'text-teal-400', borderColor: 'border-teal-500/30'
        },
        {
          id: 6,
          title: 'Kisan Credit Card (KCC)',
          department: 'RBI & NABARD',
          benefit: 'Low Interest Credit',
          description: 'Timely and adequate credit support to farmers for their cultivation needs and other agricultural expenditures at a subsidized interest rate.',
          eligibility: ['Individual Farmers', 'Tenant Farmers', 'Joint Borrowers'],
          icon: IndianRupee, iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-400', borderColor: 'border-indigo-500/30'
        },
        {
          id: 7,
          title: 'Soil Health Card Scheme',
          department: 'Dept of Agriculture',
          benefit: 'Free Soil Testing',
          description: 'Provides information to farmers on nutrient status of their soil along with recommendations on appropriate dosage of nutrients to be applied.',
          eligibility: ['All Farmers', 'Every 2 Years'],
          icon: Sprout, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', borderColor: 'border-orange-500/30'
        },
        {
          id: 8,
          title: 'PM-KUSUM',
          department: 'Ministry of New & Renewable Energy',
          benefit: '60% Solar Pump Subsidy',
          description: 'Scheme for farmers for installation of solar pumps and grid-connected solar and other renewable power plants in the country.',
          eligibility: ['Individual Farmers', 'Water User Associations', 'Panchayats'],
          icon: Droplets, iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400', borderColor: 'border-cyan-500/30'
        }
      ]
    },
    mr: {
      tag: "सरकारी अनुदाने",
      title1: "राष्ट्रीय",
      title2: "योजना",
      desc: "तुमचे कृषी लाभ, विमा आणि आर्थिक सहाय्य मिळवा.",
      finBenefit: "आर्थिक लाभ",
      eligibility: "पात्रता",
      schemes: [
        {
          id: 1,
          title: 'PM-KISAN Samman Nidhi',
          department: 'कृषी मंत्रालय',
          benefit: '₹६,००० / वर्ष',
          description: 'देशातील सर्व जमीनधारक शेतकरी कुटुंबांना थेट उत्पन्न सहाय्य, ₹२००० च्या तीन समान हप्त्यांनी देय.',
          eligibility: ['अल्प व सीमांत शेतकरी', 'वैध बँक खाते', 'आधार लिंक'],
          icon: IndianRupee, iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400', borderColor: 'border-emerald-500/30'
        },
        {
          id: 2,
          title: 'Pradhan Mantri Krishi Sinchayee Yojana',
          department: 'कृषी मंत्रालय',
          benefit: '५५% पर्यंत अनुदान',
          description: 'शेतावर पाण्याची भौतिक उपलब्धता वाढवा आणि खात्रीशीर सिंचनाखालील लागवडीयोग्य क्षेत्र वाढवा, शेतावरील पाणी वापराची कार्यक्षमता सुधारा.',
          eligibility: ['सर्व शेतकरी', 'स्वत:ची शेतजमीन'],
          icon: Droplets, iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400', borderColor: 'border-blue-500/30'
        },
        {
          id: 3,
          title: 'Paramparagat Krishi Vikas Yojana',
          department: 'सेंद्रिय शेती मंडळ',
          benefit: '₹५०,००० / हेक्टर',
          description: 'सेंद्रिय शेतीला प्रोत्साहन देण्यासाठी सेंद्रिय निविष्टी खरेदी, प्रमाणन आणि लेबलिंगसाठी ३ वर्षांसाठी आर्थिक सहाय्य.',
          eligibility: ['शेतकरी समूह (20 हे)', 'सेंद्रिय करण्यास तयार'],
          icon: Sprout, iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-400', borderColor: 'border-yellow-500/30'
        },
        {
          id: 4,
          title: 'Agriculture Infrastructure Fund',
          department: 'NABARD',
          benefit: '३% व्याज सवलत',
          description: 'कापणीनंतर व्यवस्थापन पायाभूत सुविधा आणि सामुदायिक शेती मालमत्तांसाठी व्यवहार्य प्रकल्पांमध्ये गुंतवणूकीसाठी वित्तपुरवठा सुविधा.',
          eligibility: ['FPO', 'स्वयंसहाय्यता गट', 'कृषी-उद्योजक'],
          icon: Landmark, iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400', borderColor: 'border-purple-500/30'
        },
        {
          id: 5,
          title: 'प्रधानमंत्री पीक विमा योजना (PMFBY)',
          department: 'कृषी मंत्रालय',
          benefit: 'सर्वसमावेशक विमा',
          description: 'नैसर्गिक आपत्तींमुळे पीक निकामी झाल्यास शेतकऱ्यांना संरक्षण देण्यासाठी एकाच आयटी प्लॅटफॉर्मवर विविध भागधारकांना एकत्रित करणारी पीक विमा योजना.',
          eligibility: ['कर्जदार शेतकरी', 'बिगर-कर्जदार शेतकरी', 'बटईदार'],
          icon: Landmark, iconBg: 'bg-teal-500/10', iconColor: 'text-teal-400', borderColor: 'border-teal-500/30'
        },
        {
          id: 6,
          title: 'किसान क्रेडिट कार्ड (KCC)',
          department: 'RBI आणि NABARD',
          benefit: 'कमी व्याजदराने कर्ज',
          description: 'शेतकऱ्यांना त्यांच्या लागवडीच्या गरजा आणि इतर कृषी खर्चासाठी सवलतीच्या व्याजदराने वेळेवर आणि पुरेशी पतपुरवठा.',
          eligibility: ['वैयक्तिक शेतकरी', 'कुळ शेतकरी', 'संयुक्त कर्जदार'],
          icon: IndianRupee, iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-400', borderColor: 'border-indigo-500/30'
        },
        {
          id: 7,
          title: 'मृदा आरोग्य पत्रिका योजना',
          department: 'कृषी विभाग',
          benefit: 'मोफत माती परीक्षण',
          description: 'शेतकऱ्यांना त्यांच्या मातीच्या पोषक तत्वांच्या स्थितीबद्दल माहिती प्रदान करते आणि लागू करावयाच्या पोषक तत्वांच्या योग्य डोसच्या शिफारसीसह.',
          eligibility: ['सर्व शेतकरी', 'दर २ वर्षांनी'],
          icon: Sprout, iconBg: 'bg-orange-500/10', iconColor: 'text-orange-400', borderColor: 'border-orange-500/30'
        },
        {
          id: 8,
          title: 'पीएम-कुसुम योजना (PM-KUSUM)',
          department: 'नवीन आणि नवीकरणीय ऊर्जा मंत्रालय',
          benefit: '६०% सौर पंप अनुदान',
          description: 'शेतकऱ्यांसाठी सौरपंप बसविण्यासाठी आणि देशातील ग्रिड-कनेक्टेड सौर आणि इतर नवीकरणीय ऊर्जा प्रकल्प उभारण्यासाठी योजना.',
          eligibility: ['वैयक्तिक शेतकरी', 'पाणी वापरकर्ता संघ', 'पंचायती'],
          icon: Droplets, iconBg: 'bg-cyan-500/10', iconColor: 'text-cyan-400', borderColor: 'border-cyan-500/30'
        }
      ]
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  return (
    <div className="min-h-screen flex flex-col pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden bg-[#020804]">
      <AnimatedParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#020804] to-[#020804] pointer-events-none" />
      <div className="glow-bg opacity-40" />

      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Landmark className="w-4 h-4 text-emerald-400 mr-2" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wider">{curr.tag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
              {curr.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-500">{curr.title2}</span>
            </h1>
            <p className="text-gray-400 text-lg">{curr.desc}</p>
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {curr.schemes.map((scheme, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                key={scheme.id}
                className="glass-card flex flex-col p-6 group hover:border-emerald-500/40 transition-colors duration-300"
              >
                <div className="flex items-start justify-between mb-4 border-b border-emerald-900/30 pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${scheme.iconBg} flex items-center justify-center border ${scheme.borderColor} group-hover:scale-110 transition-transform duration-300`}>
                      <scheme.icon className={`w-6 h-6 ${scheme.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{scheme.title}</h3>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{scheme.department}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {scheme.description}
                </p>

                <div className="bg-[#040d08] rounded-xl p-4 mb-6 border border-emerald-900/40 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{curr.finBenefit}</p>
                  <p className="text-xl font-bold text-emerald-400">{scheme.benefit}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-1">
                    <Users className="w-3 h-3" /> {curr.eligibility}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.eligibility.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-900/20 text-emerald-300 rounded-md text-xs border border-emerald-900/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
