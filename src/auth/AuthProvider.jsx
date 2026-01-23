import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('skinai_user')
      if(raw) setUser(JSON.parse(raw))
    }catch(e){}
  }, [])

  function register({ name, email, password }){
    // store in localStorage as simple users list (demo only)
    const raw = localStorage.getItem('skinai_users')
    const users = raw ? JSON.parse(raw) : []
    users.push({ name, email, password })
    localStorage.setItem('skinai_users', JSON.stringify(users))
    // auto-login after register
    const u = { name, email }
    setUser(u)
    localStorage.setItem('skinai_user', JSON.stringify(u))
    return true
  }

  function login({ email, password }){
    const raw = localStorage.getItem('skinai_users')
    const users = raw ? JSON.parse(raw) : []
    const found = users.find(u => u.email === email && u.password === password)
    if(found){
      const u = { name: found.name, email: found.email }
      setUser(u)
      localStorage.setItem('skinai_user', JSON.stringify(u))
      return true
    }
    return false
  }

  function logout(){
    setUser(null)
    try{ localStorage.removeItem('skinai_user') }catch(e){}
  }

  const value = { user, register, login, logout }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
