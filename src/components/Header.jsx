import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../auth/AuthProvider'

export default function Header({ onOpenLogin, onOpenRegister, onProfileOpen }){
  return (
    <header className="w-full py-4 glass">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-11 h-11 rounded-full neon-gradient flex items-center justify-center shadow-neon-sm"
          >
            <span className="text-black font-bold">SI</span>
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold">SkinAI</h1>
            <p className="text-xs text-slate-400">Scan · Detect · Connect</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4" aria-label="Primary navigation">
          <button className="text-sm text-slate-300/90">How it works</button>
          <button className="text-sm text-slate-300/90">About</button>
          <AuthActions onOpenLogin={onOpenLogin} onOpenRegister={onOpenRegister} onProfileOpen={onProfileOpen} />
        </nav>
      </div>
    </header>
  )
}

function AuthActions({ onOpenLogin, onOpenRegister, onProfileOpen }){
  const { user, logout } = useAuth()
  if(user){
    return (
      <div className="flex items-center gap-3">
        <button onClick={onProfileOpen} className="text-sm text-slate-200">{user.name}</button>
        <button onClick={logout} className="px-3 py-1 rounded-md bg-slate-800 text-slate-200 text-sm">Logout</button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2">
      <button onClick={onOpenLogin} className="px-3 py-1 rounded-md neon-gradient text-black text-sm">Sign in</button>
      <button onClick={onOpenRegister} className="px-3 py-1 rounded-md border border-slate-700 text-slate-300 text-sm">Register</button>
    </div>
  )
}
