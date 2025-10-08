import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalProvider } from './components/UIComponents/ModalContext.tsx'
import { MidiProvider } from './context/MidiProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MidiProvider>
      <BrowserRouter>
        <ModalProvider>
          <App />
        </ModalProvider>
      </BrowserRouter>
    </MidiProvider>
  </StrictMode>,
)
