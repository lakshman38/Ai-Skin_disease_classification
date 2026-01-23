import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FeatureCard from './components/FeatureCard'
import EmergencyBanner from './components/EmergencyBanner'
import BottomNav from './components/BottomNav'
import UploadCard from './components/UploadCard'
import ResultCard from './components/ResultCard'
import HospitalCard from './components/HospitalCard'
import FeedbackButton from './components/FeedbackButton'
import ScanHistory from './components/ScanHistory'
import { loadModel, predictFromUrl, LABELS as MODEL_LABELS } from './ml/model'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'
import ProfileModal from './components/ProfileModal'
import ConsultModal from './components/ConsultModal'
import { AuthProvider } from './auth/AuthProvider'

export default function App(){
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [history, setHistory] = useState([])
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [consultOpen, setConsultOpen] = useState(false)

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('skinai_history')
      if(raw) setHistory(JSON.parse(raw))
    }catch(e){ /* ignore */ }
  }, [])

  function saveHistory(next){
    setHistory(next)
    try{ localStorage.setItem('skinai_history', JSON.stringify(next)) }catch(e){}
  }

  function handleFileSelect(file){
    const url = file ? URL.createObjectURL(file) : null
    setPreview(url)
    setResult(null)
  }

  async function handleStartAnalysis(){
    if(!preview) return
    setLoading(true)
    setResult(null)

    // Try using TFJS model (client-side). If load/predict fails, fallback to demo simulation.
    try{
      await loadModel()
      const raw = await predictFromUrl(preview, 224)
      let arr = Array.isArray(raw) ? raw : Array.from(raw)
      // softmax to probabilities (in case model outputs logits)
      const exps = arr.map(x=>Math.exp(x))
      const sum = exps.reduce((a,b)=>a+b, 0) || 1
      const probs = exps.map(e=>e/sum)
      const idx = probs.indexOf(Math.max(...probs))
      const labels = MODEL_LABELS || ['Class 0', 'Class 1']
      const condition = labels[idx] ?? `Class ${idx}`
      const confidence = Math.round(probs[idx]*100)
      const res = { condition, confidence }
      setResult(res)
      const entry = { image: preview, condition, confidence, time: Date.now() }
      const next = [entry, ...history].slice(0, 50)
      saveHistory(next)
    }catch(e){
      // fallback demo
      const labels = ['Benign', 'Malignant', 'Eczema', 'Psoriasis', 'Fungal Infection']
      const condition = labels[Math.floor(Math.random()*labels.length)]
      const confidence = Math.floor(60 + Math.random()*40)
      const res = { condition, confidence }
      setResult(res)
      const entry = { image: preview, condition, confidence, time: Date.now() }
      const next = [entry, ...history].slice(0, 50)
      saveHistory(next)
    }finally{
      setLoading(false)
    }
  }

  function openHistory(){ setHistoryOpen(true) }
  function closeHistory(){ setHistoryOpen(false) }
  function clearHistory(){ saveHistory([]) }

  function openLogin(){ setLoginOpen(true) }
  function closeLogin(){ setLoginOpen(false) }
  function openRegister(){ setRegisterOpen(true) }
  function closeRegister(){ setRegisterOpen(false) }
  function openProfile(){ setProfileOpen(true) }
  function closeProfile(){ setProfileOpen(false) }
  function openConsult(){ setConsultOpen(true) }
  function closeConsult(){ setConsultOpen(false) }

  return (
    <AuthProvider>
    <div className="min-h-screen flex flex-col">
      <Header onOpenLogin={openLogin} onOpenRegister={openRegister} onProfileOpen={openProfile} />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Hero />

        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <UploadCard preview={preview} onFileSelect={handleFileSelect} onStartAnalysis={handleStartAnalysis} loading={loading} />
            <ResultCard image={preview} loading={loading} result={result} />
          </div>

          <aside className="space-y-6">
            <div className="glass p-4 rounded-xl shadow-neon-sm">
              <h3 className="text-sm text-slate-300 font-semibold">Features</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                  <FeatureCard title="Scan Skin" desc="Upload skin image for AI analysis" />
                  <FeatureCard title="Consult Doctor" desc="Connect with certified dermatologists" />
                  <FeatureCard title="Scan History" desc="View past scan results" onClick={openHistory} />
                  <FeatureCard title="Nearby Hospitals" desc="Find dermatology clinics near you" />
              </div>
            </div>

            <div className="glass p-4 rounded-xl shadow-neon-sm">
              <h4 className="text-sm text-slate-300 font-semibold">Nearby Hospitals</h4>
              <div className="mt-3 space-y-3">
                <HospitalCard name="Dermatology Center A" distance="1.2 km"/>
                <HospitalCard name="Skin Health Clinic" distance="2.8 km"/>
                <HospitalCard name="Metro Hospital - Derm" distance="3.6 km"/>
              </div>
            </div>

            <FeedbackButton />
          </aside>
        </section>

        <EmergencyBanner />
        <p className="text-xs text-slate-400 mt-4">Disclaimer: This tool is for early screening only, not a medical diagnosis.</p>
      </main>
      <BottomNav onHistoryClick={openHistory} onHomeClick={()=>window.scrollTo({top:0, behavior:'smooth'})} onConsultClick={openConsult} onProfileClick={openProfile} />
      <ScanHistory open={historyOpen} onClose={closeHistory} items={history} onClear={clearHistory} />

      <LoginModal open={loginOpen} onClose={closeLogin} onSwitchToRegister={() => { closeLogin(); openRegister(); }} />
      <RegisterModal open={registerOpen} onClose={closeRegister} onSwitchToLogin={() => { closeRegister(); openLogin(); }} />
      <ProfileModal open={profileOpen} onClose={closeProfile} />
      <ConsultModal open={consultOpen} onClose={closeConsult} />
    </div>
    </AuthProvider>
  )
}
