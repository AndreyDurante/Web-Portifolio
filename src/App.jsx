import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'

const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div
            className="mx-auto min-h-screen w-full max-w-6xl px-5 py-12"
            aria-label="Carregando página"
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos/:repo" element={<ProjectDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
