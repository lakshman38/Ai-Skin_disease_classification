import React from 'react'
import { motion } from 'framer-motion'

export default function ScanHistory({ open, onClose, items, onClear }){
  if(!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring' }} className="relative w-full md:max-w-2xl bg-[#071029] glass p-6 rounded-t-xl md:rounded-xl m-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Scan History</h3>
          <div className="flex items-center gap-2">
            <button onClick={onClear} className="text-sm px-3 py-1 rounded-md bg-red-600">Clear</button>
            <button onClick={onClose} className="text-sm px-3 py-1 rounded-md bg-slate-700">Close</button>
          </div>
        </div>

        <div className="mt-4 space-y-3 max-h-80 overflow-auto pr-2">
          {items?.length ? (
            items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-md glass">
                <img src={it.image} alt={`scan-${idx}`} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{it.condition}</div>
                  <div className="text-xs text-slate-400">{it.confidence}% — {new Date(it.time).toLocaleString()}</div>
                </div>
                <div className="text-xs text-slate-300">{it.note ?? ''}</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-400">No scans yet. Perform a scan to populate history.</div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
