import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './shared/components/Navbar'
import { Footer } from './shared/components/Footer'
import { Toaster } from './shared/components/ui/toaster'

// Pages
import HomePage from './features/properties/pages/HomePage'
import PropertiesPage from './features/properties/pages/PropertiesPage'
import PropertyDetailPage from './features/properties/pages/PropertyDetailPage'
import ContactPage from './features/contact/pages/ContactPage'
import AboutPage from './features/about/pages/AboutPage'
import ServicesPage from './features/services/pages/ServicesPage'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import DashboardPage from './features/properties/pages/DashboardPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        {/* Public routes with navbar and footer */}
        <Route path="/" element={
          <>
            <Navbar />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/inmuebles" element={
          <>
            <Navbar />
            <PropertiesPage />
            <Footer />
          </>
        } />
        <Route path="/inmuebles/:id" element={
          <>
            <Navbar />
            <PropertyDetailPage />
            <Footer />
          </>
        } />
        <Route path="/contacto" element={
          <>
            <Navbar />
            <ContactPage />
            <Footer />
          </>
        } />
        <Route path="/nosotros" element={
          <>
            <Navbar />
            <AboutPage />
            <Footer />
          </>
        } />
        <Route path="/servicios" element={
          <>
            <Navbar />
            <ServicesPage />
            <Footer />
          </>
        } />
        
        {/* Auth routes without navbar/footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        
        {/* Dashboard routes without navbar/footer */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App