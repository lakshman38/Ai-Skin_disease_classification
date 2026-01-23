import React from 'react'
import { motion } from 'framer-motion'

export default function UploadCard({ preview, onFileSelect, onStartAnalysis, loading }){
  function onFile(e){
    const f = e.target.files?.[0]
    if(!f) return
    onFileSelect(f)
  }

  return (
    <div className="glass p-6 rounded-xl shadow-neon-sm">
      <h3 className="text-lg font-semibold">Scan Skin</h3>
      <p className="text-sm text-slate-400">Upload skin image for AI analysis</p>

      <div className="mt-4">
        <label className="block">
          <input aria-label="Upload image" type="file" accept="image/*" onChange={onFile} className="sr-only" />
          <motion.div whileHover={{ scale: 1.01 }} className="cursor-pointer glass p-6 rounded-lg border-dashed border-2 border-transparent hover:border-slate-600 text-center">
            {preview ? (
              <motion.img src={preview} alt="preview" className="mx-auto max-h-48 rounded-md" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} />
            ) : (
              <div className="text-slate-400">Click to upload or drag an image here</div>
            )}
          </motion.div>
        </label>
      </div>

      <div className="mt-4 flex gap-3">
        <motion.button onClick={onStartAnalysis} whileTap={{ scale: 0.98 }} disabled={!preview || loading} className="px-4 py-2 bg-[#0f1724] rounded-md text-slate-100 disabled:opacity-50">{loading ? 'Analyzing...' : 'Start Analysis'}</motion.button>
        <motion.button whileTap={{ scale: 0.98 }} className="px-4 py-2 border border-slate-700 rounded-md text-slate-300">Use camera</motion.button>
      </div>
    </div>
  )
}
