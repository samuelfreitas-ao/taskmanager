import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { TaskProvider } from './presentation/contexts/task'
import { Tasks, NotFound } from './presentation/pages'
const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ duration: 6000 }} />
      <Routes>
        <Route
          path="/"
          element={
            <TaskProvider>
              <Tasks />
            </TaskProvider>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes
