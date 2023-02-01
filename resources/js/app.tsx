import React from 'react'
import { createRoot } from 'react-dom/client'
import MyRoutes from './routes'

createRoot(document.getElementById('app') as HTMLDivElement).render(<MyRoutes />)