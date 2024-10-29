import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Dashboard } from './componentes/dashboard/Dashboard.tsx'
import { Author } from './componentes/Author/Author.tsx'
Author

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Dashboard></Dashboard> */}
    <Author></Author>


  </StrictMode>,
)
