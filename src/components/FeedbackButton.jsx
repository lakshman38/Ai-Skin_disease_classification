import React from 'react'
import { motion } from 'framer-motion'

export default function FeedbackButton(){
  return (
    <div className="glass p-3 rounded-lg text-center">
      <p className="text-sm text-slate-300">Was this result helpful?</p>
      <div className="mt-2 flex justify-center gap-3">
        <motion.button whileTap={{ scale: 0.95 }} className="px-3 py-1 rounded-md bg-[#05233b] text-slate-100">Yes</motion.button>
        <motion.button whileTap={{ scale: 0.95 }} className="px-3 py-1 rounded-md border border-slate-700 text-slate-300">No</motion.button>
      </div>
    </div>
  )
}
