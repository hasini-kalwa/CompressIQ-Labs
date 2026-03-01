import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar, Footer } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { SignIn } from "@/pages/SignIn";
import { GetStarted } from "@/pages/GetStarted";
import { Solution } from "@/pages/Solution";
import { Impact } from "@/pages/Impact";
import { Dashboard } from "@/pages/Dashboard";
import { History } from "@/pages/History";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Hero onStart={() => navigate("/get-started")} />
      <Features />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg-primary text-text-primary font-sans selection:bg-accent-green/30">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/get-started" element={<GetStarted />} />
              
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/history" 
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
