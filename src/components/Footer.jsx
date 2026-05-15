"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, MessageCircle, Globe, Share2, Mail, MapPin, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = {
    en: {
      brand: "Krushi",
      desc: "Empowering global agriculture with advanced AI technology. Building a sustainable future — one farm at a time.",
      platformTitle: "Platform",
      platformLinks: [
        ['AI Crop Care', '/crop-care'],
      ],
      resourceTitle: "Resources",
      resourceLinks: [
        ['Fertilizer Guide', '/fertilizer'],
        ['Govt Schemes', '/schemes'],
      ],
      contactTitle: "Contact",
      address: "Maharashtra, India",
      rights: "All rights reserved.",
      legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy']
    },
    mr: {
      brand: "कृषी",
      desc: "आधुनिक AI तंत्रज्ञानाने जागतिक शेतीला सशक्त करत आहोत. एक शेत, एक वेळी — शाश्वत भविष्य घडवत आहोत.",
      platformTitle: "व्यासपीठ",
      platformLinks: [
        ['AI पीक संरक्षण', '/crop-care'],
      ],
      resourceTitle: "संसाधने",
      resourceLinks: [
        ['खत मार्गदर्शक', '/fertilizer'],
        ['सरकारी योजना', '/schemes'],
      ],
      contactTitle: "संपर्क",
      address: "महाराष्ट्र, भारत",
      rights: "सर्व हक्क राखीव.",
      legal: ['गोपनीयता धोरण', 'सेवा अटी', 'कुकी धोरण']
    }
  };

  const curr = mounted ? content[lang] : content.mr;

  return (
    <footer className="relative z-10 border-t border-emerald-900/30 bg-[#020804] pt-24 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#020804] to-[#020804] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center space-x-2.5 mb-6 group">
              <div className="p-2 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 text-black shadow-[0_0_20px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.7)] transition-shadow">
                <Leaf className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                {curr.brand}<span className="text-emerald-400">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-8 leading-relaxed text-sm max-w-xs">
              {curr.desc}
            </p>
            <div className="flex space-x-3">
              {[MessageCircle, Globe, Share2].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-gray-500 hover:text-emerald-400 hover:border-emerald-500/40 hover:scale-110 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" /> {curr.platformTitle}
              </h3>
              <ul className="space-y-3.5">
                {curr.platformLinks.map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center group gap-1">
                      {name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">{curr.resourceTitle}</h3>
              <ul className="space-y-3.5">
                {curr.resourceLinks.map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="text-gray-400 hover:text-emerald-400 transition-colors text-sm flex items-center group gap-1">
                      {name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">{curr.contactTitle}</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>{curr.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {curr.brand}AI. {curr.rights}
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            {curr.legal.map((item, i) => (
              <a key={i} href="#" className="hover:text-emerald-400 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
