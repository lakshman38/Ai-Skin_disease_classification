import React from 'react'

export default function ConsultModal({ open, onClose }){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[#071029] glass p-6 rounded-xl w-full max-w-lg">
        <h3 className="text-lg font-semibold">Consult a Dermatologist</h3>
        <p className="text-sm text-slate-400 mt-2">This demo shows nearby certified dermatologists and contact options.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 glass rounded">
            <div className="font-semibold">Dr. A. Smith</div>
            <div className="text-xs text-slate-400">Dermatologist • 1.2 km</div>
            <div className="mt-2"><button className="px-3 py-1 rounded bg-neon-blue text-black">Chat</button></div>
          </div>
          <div className="p-3 glass rounded">
            <div className="font-semibold">Dr. L. Gomez</div>
            <div className="text-xs text-slate-400">Dermatologist • 2.3 km</div>
            <div className="mt-2"><button className="px-3 py-1 rounded bg-neon-blue text-black">Consult</button></div>
          </div>
        </div>
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded bg-slate-700">Close</button>
        </div>
      </div>
    </div>
  )
}
