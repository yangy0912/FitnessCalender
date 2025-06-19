import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainPage from './MainPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainPage />
  </StrictMode>,
)
