import React from 'react'
import { motion } from 'framer-motion'

export default function ResultCard({ image, result, loading }){
  const confidence = result?.confidence ?? 0
  const condition = result?.condition ?? '—'

  return (
    <div className="glass p-6 rounded-xl shadow-neon-sm">
      <h3 className="text-lg font-semibold">Prediction Result</h3>
      <div className="mt-3">
        {loading ? (
          <p className="text-sm text-slate-300">Analyzing image... please wait.</p>
        ) : result ? (
          <p className="text-sm text-slate-300">Result from AI (demo):</p>
        ) : (
          <p className="text-sm text-slate-300">No image analyzed yet. Upload an image to see results.</p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 items-center">
        <div className="p-3 rounded-md bg-slate-900/40">
          <p className="text-xs text-slate-400">Condition</p>
          <p className="font-semibold text-slate-100">{condition}</p>
        </div>
        <div className="p-3 rounded-md bg-slate-900/40">
          <p className="text-xs text-slate-400">Confidence</p>
          <p className="font-semibold text-slate-100">{result ? `${confidence}%` : '—'}</p>
        </div>
      </div>

      <div className="mt-4">
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <motion.div className="h-3 bg-gradient-to-r from-[#48b5ff] to-[#8a6bff]" initial={{ width: 0 }} animate={{ width: `${confidence}%` }} transition={{ duration: 1.2 }} />
        </div>
      </div>

      {image && (
        <div className="mt-4">
          <p className="text-xs text-slate-400">Analyzed image</p>
          <img src={image} alt="analyzed preview" className="mt-2 rounded-md max-h-40" />
        </div>
      )}

    </div>
  )
}
