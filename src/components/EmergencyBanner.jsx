import React from 'react'
import { motion } from 'framer-motion'

export default function EmergencyBanner(){
  return (
    <motion.div className="mt-6 p-3 rounded-md bg-gradient-to-r from-red-600 to-red-400 text-white flex items-center gap-3" animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 1, repeat: Infinity }}>
      <div className="w-3 h-3 rounded-full bg-white/80" />
      <div className="text-sm font-semibold">Emergency Alert – Seek medical help immediately for high-risk conditions</div>
    </motion.div>
  )
}
