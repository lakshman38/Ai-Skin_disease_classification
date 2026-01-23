import React from 'react'
import { useAuth } from '../auth/AuthProvider'

export default function ProfileModal({ open, onClose }){
  const { user } = useAuth()
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[#071029] glass p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-lg font-semibold">Profile</h3>
        {user ? (
          <div className="mt-4">
            <div className="text-sm text-slate-300">Name</div>
            <div className="font-medium text-slate-100">{user.name}</div>
            <div className="text-sm text-slate-300 mt-2">Email</div>
            <div className="font-medium text-slate-100">{user.email}</div>
          </div>
        ) : (
          <div className="mt-4 text-sm text-slate-400">Not signed in.</div>
        )}
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1 rounded bg-slate-700">Close</button>
        </div>
      </div>
    </div>
  )
}
