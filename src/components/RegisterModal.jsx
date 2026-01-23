import React, { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'

export default function RegisterModal({ open, onClose, onSwitchToLogin }){
  const { register } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if(!open) return null

  function submit(e){
    e.preventDefault()
    register({ name, email, password })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <form onSubmit={submit} className="relative bg-[#071029] glass p-6 rounded-xl w-full max-w-sm">
        <h3 className="text-lg font-semibold">Register</h3>
        <label className="block mt-3 text-sm">Name
          <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full p-2 rounded bg-[#07121f]" />
        </label>
        <label className="block mt-3 text-sm">Email
          <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full p-2 rounded bg-[#07121f]" />
        </label>
        <label className="block mt-3 text-sm">Password
          <input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full p-2 rounded bg-[#07121f]" />
        </label>

        <div className="mt-4 flex items-center justify-between">
          <button type="submit" className="px-4 py-2 neon-gradient text-black rounded">Create account</button>
          <button type="button" onClick={onSwitchToLogin} className="text-sm text-slate-300">Sign in</button>
        </div>
      </form>
    </div>
  )
}
