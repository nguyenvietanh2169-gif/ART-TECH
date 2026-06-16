import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter/100.css'
import '@fontsource/inter/100-italic.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/200-italic.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/300-italic.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
