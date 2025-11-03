'use client';

import { motion } from 'framer-motion';

interface Props {
  locale: 'en' | 'bn';
}

const translations = {
  en: {
    headline: 'Enterprise-grade Online Exams with Proctoring AI',
    sub: 'Deploy high-stakes assessments with fullscreen lock, device fingerprinting, and Bangladesh-ready payments.',
    cta: 'Explore Candidate Dashboard',
  },
  bn: {
    headline: 'এন্টারপ্রাইজ মানের অনলাইন পরীক্ষা ও এআই প্রোক্টরিং',
    sub: 'ফুলস্ক্রিন লক, ডিভাইস ফিঙ্গারপ্রিন্ট ও বাংলাদেশী পেমেন্টসহ উচ্চ ঝুঁকির পরীক্ষা পরিচালনা করুন।',
    cta: 'প্রার্থী ড্যাশবোর্ড দেখুন',
  },
};

export default function DashboardHero({ locale }: Props) {
  const copy = translations[locale];
  return (
    <motion.section
      className="glass-card mx-auto flex w-full max-w-5xl flex-col gap-6 p-10"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-accent">Anti-cheat • Payments • Analytics</p>
      <h2 className="text-4xl font-semibold leading-tight text-white drop-shadow-lg">{copy.headline}</h2>
      <p className="max-w-3xl text-lg text-slate-200">{copy.sub}</p>
      <div className="flex flex-wrap gap-4">
        <motion.button whileTap={{ scale: 0.95 }} className="glass-card px-6 py-3 font-medium text-primary-foreground">
          {copy.cta}
        </motion.button>
        <motion.button
          whileHover={{ translateY: -2 }}
          className="rounded-2xl border border-white/30 px-6 py-3 text-sm text-white/90"
        >
          Watch Proctor Replay
        </motion.button>
      </div>
    </motion.section>
  );
}
