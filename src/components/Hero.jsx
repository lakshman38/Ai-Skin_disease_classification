import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="mt-6 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold">AI-powered skin analysis at your fingertips</h2>
      <p className="text-sm text-slate-400 mt-2">Upload an image or use camera to start a scan</p>

      <div className="mt-8 flex justify-center">
        <motion.button
          aria-label="Start scan"
          className="relative w-40 h-40 rounded-full flex items-center justify-center neon-gradient text-black font-bold text-lg ring-neon"
          animate={{ scale: [1, 1.06, 1], boxShadow: ["0 0 0 0 rgba(72,181,255,0.15)", "0 0 40px 20px rgba(138,107,255,0.08)", "0 0 0 0 rgba(72,181,255,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div className="absolute inset-0 rounded-full mix-blend-overlay opacity-70" animate={{ opacity: [0.6, 0.85, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
          <div className="relative z-10">Scan</div>
        </motion.button>
      </div>
      <p className="text-xs text-slate-400 mt-3">Pulsing to indicate active scanning</p>
    </section>
  )
}
