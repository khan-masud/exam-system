'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import DashboardHero from '../components/dashboard-hero';

export default function LandingPage() {
  const { theme, setTheme } = useTheme();
  const [locale, setLocale] = useState<'en' | 'bn'>('en');

  return (
    <div className="flex min-h-screen flex-col gap-10 px-6 py-12">
      <header className="flex items-center justify-between">
        <motion.h1 className="text-3xl font-semibold" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          ProctorX Exam Suite
        </motion.h1>
        <div className="flex items-center gap-4 text-sm">
          <button className="glass-card px-4 py-2" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="glass-card px-4 py-2" onClick={() => setLocale(locale === 'en' ? 'bn' : 'en')}>
            {locale === 'en' ? 'বাংলা' : 'English'}
          </button>
          <Link href="/dashboard" className="glass-card px-4 py-2 font-medium">
            Launch Demo
          </Link>
        </div>
      </header>

      <DashboardHero locale={locale} />
    </div>
  );
}
