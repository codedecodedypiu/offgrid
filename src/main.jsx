import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css'
import App from './App.jsx'
import T1 from './t1.jsx'
import T2 from './t2.jsx'
import T3 from './T3.jsx'
import T4 from './T4.jsx'
import T5 from './T5.jsx'
import T6 from './T6.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/1" element={<T1 />} />
        <Route path="/2" element={<T2 />} />
                <Route path="/3" element={<T3 />} />
                <Route path="/4" element={<T4 />} />
                <Route path="/5" element={<T5 />} />
                <Route path="/6" element={<T6 />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
)