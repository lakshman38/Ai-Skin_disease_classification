import React from 'react'
import { motion } from 'framer-motion'

export default function BottomNav({ onHistoryClick, onHomeClick, onConsultClick, onProfileClick }){
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
      <div className="glass rounded-full p-2 flex items-center justify-between">
        <button aria-label="Home" onClick={onHomeClick} className="text-slate-200 text-sm">Home</button>
        <button aria-label="History" onClick={onHistoryClick} className="text-slate-200 text-sm">History</button>
        <div className="-mt-8">
          <motion.button animate={{ y: [0, -6, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-16 h-16 rounded-full neon-gradient flex items-center justify-center text-black font-bold shadow-neon-sm">Scan</motion.button>
        </div>
        <button aria-label="Consult" onClick={onConsultClick} className="text-slate-200 text-sm">Consult</button>
        <button aria-label="Profile" onClick={onProfileClick} className="text-slate-200 text-sm">Profile</button>
      </div>
    </nav>
  )
}
