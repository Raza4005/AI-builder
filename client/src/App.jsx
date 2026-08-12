import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Layout from './pages/Layout'

const App = () => {
  return (
  <Routes>
    {/* Login Routes */}
    <Route element={<Layout />}>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
    </Route>
  </Routes>  
  )
}

export default App