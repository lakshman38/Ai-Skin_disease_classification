import React from 'react'
import { motion } from 'framer-motion'

export default function FeatureCard({title, desc, onClick}){
  return (
    <motion.div onClick={onClick} role={onClick ? 'button' : undefined} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="glass p-3 rounded-lg cursor-pointer">
      <h4 className="text-sm font-semibold text-slate-100">{title}</h4>
      <p className="text-xs text-slate-400 mt-1">{desc}</p>
    </motion.div>
  )
}
