import React from 'react'
import { motion } from 'framer-motion'

export default function HospitalCard({name, distance}){
  return (
    <motion.div whileHover={{ y: -6 }} className="p-3 rounded-md glass flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold">{name}</div>
        <div className="text-xs text-slate-400">{distance}</div>
      </div>
      <button className="text-sm px-3 py-1 rounded-md bg-[#07102a] text-slate-200">Directions</button>
    </motion.div>
  )
}
