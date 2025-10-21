import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './context/ModalProvider.tsx'
import { MidiProvider } from './context/MidiProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MidiProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </MidiProvider>
  </StrictMode>,
)
