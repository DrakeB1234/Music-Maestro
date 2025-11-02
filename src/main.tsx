import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ModalProvider } from './context/ModalProvider.tsx'

if (import.meta.env.DEV) {
  import('react-scan').then(({ scan }) => {
    scan()
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </StrictMode>,
)
