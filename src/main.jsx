import React from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are bundled into the app (no network needed) — matches the
// weights the UI uses: Cormorant Garamond 500/600 (+500 italic),
// EB Garamond 400 (+italic).
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/500-italic.css'
import '@fontsource/eb-garamond/400.css'
import '@fontsource/eb-garamond/400-italic.css'

import SteadyWord from './SteadyWord.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SteadyWord />
  </React.StrictMode>
)
