import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'

export default function LoginModal({ open, onClose, onSwitchToRegister }){
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  if(!open) return null

  function submit(e){
    e.preventDefault()
    const ok = login({ email, password })
    if(!ok) return setError('Invalid credentials')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form onSubmit={submit} className="relative bg-[#071029] glass p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-lg font-semibold">Sign in</h3>
        {error && <div className="text-sm text-red-400 mt-2">{error}</div>}
        <label className="block mt-4 text-sm">Email
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full p-2 rounded bg-[#07121f]" />
        </label>
        <label className="block mt-3 text-sm">Password
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full p-2 rounded bg-[#07121f]" />
        </label>

        <div className="mt-4 flex items-center justify-between">
          <button type="submit" className="px-4 py-2 neon-gradient text-black rounded">Sign in</button>
          <button type="button" onClick={onSwitchToRegister} className="text-sm text-slate-300">Register</button>
        </div>
      </form>
    </div>
  )
}
